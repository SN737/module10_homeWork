const url = 'wss://echo-ws-service.herokuapp.com';
const btnSend = document.querySelector('.btn--send');
const btnGeo = document.querySelector('.btn--geo');
const input = document.querySelector('.inputfield');
const messages = document.querySelector('.messagearea');
const footer = document.querySelector('.footer');
let websocket;

// страница загружена - устанавливаем соединение
document.addEventListener('DOMContentLoaded', riseConnection);

//проверяем поле на наличие значения на отправку по нажатию на кнопку send
btnSend.addEventListener('click', ()=>{
  if (!input.value) {    
    return;
    }else { 
      createMessage(input.value);}
    });

// создаём сообщение с текстом из инпута и вызываем ф-ю отправки.
function createMessage(textMsg){
    const outMsg =document.createElement('div');
    outMsg.textContent = textMsg;
    outMsg.classList.add('outMsg', 'msg');
    messages.append(outMsg);
    sendMsg(textMsg);
}
 
//отрисовка полученных сообщеий
function recievMessage(text){
  const inMsg =document.createElement('div');
    inMsg.innerHTML = `<div class = "text">${text}</div>`;
    inMsg.classList.add('inMsg','msg');
    messages.append(inMsg);
}

//установка и обработка соединения
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

// обработка ответного сообщения
  websocket.onmessage = (e) => {
      recievMessage(e.data);
    }; 

// отображение разорванного соединения + возможность переподключиться
  websocket.onclose = (e)=> {
    console.log("DISCONNECTED");
    input.disabled = true;   //дизаблим инпут и кнопку т.к. сооединение disconected 
    btnSend.disabled = true;
    const indicatorText  = document.querySelector('.indicatortext');
    indicatorText.innerHTML = 'disconnected';
    const indicator = document.querySelector('.indicator');
    indicator.classList.toggle('indred');
    // клик по индикатору для повторной установки соединения 
    indicator.addEventListener('click', ()=> {
        indicator.remove();
        indicatorText.remove();
        riseConnection();
      });
    };       
}

// отправляем сообщение
async function sendMsg(textMsg){
  await websocket.send(textMsg);
  input.value = '';
}

// слушаем кнопку геолокации, определяем возможность гео в браузере
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

// формируем ссылку на отправку.
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  createMessage(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);  
};