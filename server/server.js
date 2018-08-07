const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const http = require('http');
const {generateMessage, getLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public/');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

const server = http.createServer(app);
const IO = socketIO(server);

IO.on('connection',(socket)=>{
    // console.log('new user connected');
    socket.emit('newMessage', generateMessage("Admin",'Welcome to the app'));
    socket.broadcast.emit('newMessage', generateMessage("Admin",'New user has just joined'));
    socket.on('createMessage', (message, callback)=>{
        IO.emit('newMessage', generateMessage(message.from,message.text));
        callback();
    });
    socket.on('sendLocation', (locationMessage, callback)=>{
        // console.log("from sendLocation");
        IO.emit('shareLocation', getLocationMessage(locationMessage.latitude, locationMessage.longitude));
        callback();
    });

});

server.listen(PORT,()=>{
    console.log('connected to app succesfully on some port')
});