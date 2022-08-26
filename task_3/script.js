const url = 'wss://echo-ws-service.herokuapp.com';
const btnSend = document.querySelector('.btn--send');
const btnGeo = document.querySelector('.btn--geo');
const input = document.querySelector('.inputfield');
const messages = document.querySelector('.messagearea');
const footer = document.querySelector('.footer');

let websocket;
document.addEventListener('DOMContentLoaded', riseConnection);

input.addEventListener('input', () => {
  if(!input.value){
      btnSend.disabled = true;
  } else{
      btnSend.disabled = false;}  
});


btnSend.addEventListener('click', ()=>{
  if (!input.value) {    
    return;
    }else { 
      createMessage(input.value);}
    });


function createMessage(textMsg){
    const outMsg =document.createElement('div');
    outMsg.textContent = textMsg;
    outMsg.classList.add('outMsg', 'msg');
    messages.append(outMsg);
    sendMsg(textMsg);
}

function recievMessage(text){
  const inMsg =document.createElement('div');
    inMsg.innerHTML = `<div class = "text">${text}</div>`;
    inMsg.classList.add('inMsg','msg');
    messages.append(inMsg);
}

  function riseConnection(){
  websocket = new WebSocket(url); 
  websocket.onopen = ()=>{ 
    const indicatorText = document.createElement('span');
    indicatorText.classList.add('indicatortext');
    footer.append(indicatorText);
    indicatorText.innerHTML = 'connected';
    const indicator = document.createElement('div');    
    indicator.classList.add('indicator');    
    footer.append(indicator);
    console.log("CONNECTED");
    input.disabled = false;    
  };

    websocket.onmessage = (e) => {
      recievMessage(e.data);
    }; 

    websocket.onclose = (e)=> {
      console.log("DISCONNECTED");
      input.disabled = true;
      btnSend.disabled = true;
      let  indicatorText  = document.querySelector('.indicatortext');
      indicatorText.innerHTML = 'disconnected';
      const indicator = document.querySelector('.indicator');
      indicator.classList.toggle('indred');
      indicator.addEventListener('click', ()=> {
        indicator.remove();
        indicatorText.remove();
        riseConnection();
      });
    };       
}

async function sendMsg(textMsg){
  await websocket.send(textMsg);
  input.value = '';
}

btnGeo.addEventListener('click', () => {   
  if (!navigator.geolocation) {
    createMessage ('не поддерживается');
  } else {    
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

const error = () => {
  createMessage('Невозможно получить местоположение');
};

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  createMessage(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);  
};