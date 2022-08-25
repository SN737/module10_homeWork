const url = 'wss://echo-ws-service.herokuapp.com';
const btnSend = document.querySelector('.btn--send');
const btnGeo = document.querySelector('.btn--geo');
const input = document.querySelector('.inputfield');
const messages = document.querySelector('.messagearea');
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
    outMsg.textContent = 'отправленная мессага' + textMsg;
    outMsg.classList.add('outMsg');
    messages.append(outMsg);
    sendMsg(textMsg);

}

function recievMessage(){
  const inMsg =document.createElement('div');
    inMsg.textContent = 'полученная мессага';
    inMsg.classList.add('inMsg');
    messages.append(inMsg);

}


  function riseConnection(){
  websocket = new WebSocket(url); 
  websocket.onopen = ()=>{ 
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


    };
        
};
  websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
  };
  // websocket.onmessage = (e) => {
  //   recievMessage(e.data);
  // }; 
    
//   websocket.onerror = function(evt) {
//     console.log(
//       '<span style="color: red;">ERROR:</span> ' + evt.data
//     );
//   };
// };


async function sendMsg(textMsg){
  await websocket.send(textMsg);
  input.value = '';
}