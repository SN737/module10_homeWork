const url = 'wss://echo-ws-service.herokuapp.com';
const btnSend = document.querySelector('.btn--send');
const btnGeo = document.querySelector('.btn--geo');
const messages = document.querySelector('.messagearea');
let websocket;

btnSend.addEventListener('click', sendMsg);


function sendMsg(){
   websocket = new websocket(url); 
}