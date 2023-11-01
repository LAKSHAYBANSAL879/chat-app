// const socket=io('http://localhost:8000',{transports:["websocket"]});
// const form=document.getElementById("sent-form");
// const welcomeMessage=document.getElementById("Welcome-message");
// const messageInput=document.getElementById("sent")

// const messgaeContainer=document.getElementById("container")
// var audio=new Audio('../dist/news-ting-6832.mp3')
// const append = (message,className) => {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message',className);
//     messageElement.innerText = message;
  
//     messgaeContainer.append(messageElement);
//     audio.play();
//   };
//   form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const message=messageInput.value;
// append(`You: ${message}`,'outgoing-message')
// socket.emit('send',message);
// messageInput.value='';
//   })
// const userName=prompt("enter your userName to start chat");
// socket.emit('new-user-joined',userName);
// welcomeMessage.innerText=`Wecome ${userName} to my chat app`
// socket.on('user-joined',userName=>{

// append(`${userName} joined the chat`,'user-joined-message')

// })
// socket.on('receive',data=>{
//   append(`${data.userName} : ${data.message}`,'incoming-message')
//   })
//   socket.on('left',userName=>{
//     append(`${userName} left the chat`,'user-left-message');
//   })
const socket = io('http://localhost:8000', { transports: ['websocket'] });
const form = document.getElementById("sent-form");
const messageInput = document.getElementById("sent");
const messageContainer = document.getElementById("container");
const imageInput = document.getElementById("imageInput");
const audio = new Audio('../dist/news-ting-6832.mp3');
const welcomeMessage = document.getElementById("Welcome-message");

const append = (message, className) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
    audio.play();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'outgoing-message');
    socket.emit('send', message);
    messageInput.value = '';
});


const userName = prompt("Enter your userName to start chat");
socket.emit('new-user-joined', userName);

welcomeMessage.innerText = `Welcome ${userName} to my chat app`;
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const imageBase64 = e.target.result;
          append(`You sent an image:`, 'outgoing-message');
          socket.emit('send-image', imageBase64);
      };
      reader.readAsDataURL(file);
  }
});

socket.on('user-joined', (userName) => {
    append(`${userName} joined the chat`, 'user-joined-message');
});

socket.on('receive', (data) => {
    append(`${data.userName}: ${data.message}`, 'incoming-message');
});

socket.on('receive-image', (data) => {
    append(`${data.userName} sent an image:`, 'incoming-message');
    const imageElement = document.createElement('img');
    imageElement.src = data.image;
    imageElement.style.width='300px';
    imageElement.style.height='250px';
    messageContainer.appendChild(imageElement);
});

socket.on('left', (userName) => {
    append(`${userName} left the chat`, 'user-left-message');
});
