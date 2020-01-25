var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn');
//  по нажатию на кнопку отправить - отправить на сервер nickname:message
sendButton.addEventListener('click', sendUserMessage);

getMessagesfromServer() 
// каждые 500 милисекунд забирать сообщение
function start(){
  setInterval(getMessagesfromServer, 500);
}
// шаг1
// сообщение с сервера
async function getMessagesfromServer() 
{
     // получаем фссинхронный ответ
     var response = await fetch('https://fchatiavi.herokuapp.com/get/arick/?offset=0&limit=200');
      // декодируем его из строкив обьекты javascript 
     response = await response.json();

    console.log(response);
 var allMessagesHtml = '';
  for( var i = 0; i < response.length; i++){
    var messageData = response [i];
        var message = '<div class="message"><div class="message-nickname">'+messageData.Name+'</div><div class="message-text">'+messageData.Message+'</div>';
allMessagesHtml = allMessagesHtml + message;
}
// добавить в messages-wrapper письма
messages.innerHTML = allMessagesHtml;
}

async function sendUserMessage(){
    //получить что написал пользователь в поле nickname
    var userNickname = document.getElementById('nickname-input').value;
    var UserMessage = document.getElementById('message-input').value;
if(UserMessage.length === 0){
  alert ("You should write name");
  return;
}

if(UserMessage.length === 0){
  alert ("You should write message!");
  return;
}
  
await fetch('https://fchatiavi.herokuapp.com/send/arick/',{
  method:'POST',
  body: JSON.stringify({
  Name:userNickname,
  Message:UserMessage,
})
});


getMessagesfromServer() 



}