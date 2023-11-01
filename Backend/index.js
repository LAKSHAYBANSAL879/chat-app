
// handle socket io connections
const io=require('socket.io')(8000);
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',userName=>{
        console.log("new-user",userName);
users[socket.id]=userName;
socket.broadcast.emit('user-joined',userName)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{userName:users[socket.id],message:message});
    });
    socket.on('send-image', (imageBase64) => {
        socket.broadcast.emit('receive-image', { userName: users[socket.id], image: imageBase64 });
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
