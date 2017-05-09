const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// create a custom http server instead of use default express server
// so that we can create server with socketIO
var server = http.createServer(app); // change the app.listen() to server.listen()
var io = socketIO(server);

app.use(express.static(publicPath));

// 'connection' is io built in event
// which emitted whenever there is new client connected to the server
io.on('connection', (socket) => {
    console.log('New user connected');
    /*
    socket.emit('newMessage', {
       from: 'John',
       text: 'See you then',
       createdAt: 123123
    });
    */
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // 'socket.io' emit an event to single connection
        // 'io.emit' emit an event to every single connection
        // overall mechanism: when receive a message from certain client,
        // emit it to all the rest of the client who maintain the connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
    
    /*
    // EXAMPLE EMAIL APP
    // emit custom event
    // important: name of the custom event for 'emit' and 'on' must be same
    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey, What is going on',
        createdAt: 123
    });
    
    // custom event
    socket.on('createEmail', (newEmail) => {
       console.log('createEmail', newEmail); 
    });
    */
    
    // 'disconnect' is io built in event
    // which emitted whenever there is new client disconnected from the server
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


/*
// Why we module 'path'
console.log(__dirname + '/../public');
console.log(publicPath);
*/

/*
SOCKET IO BASIC EXPLANATION
Server side:
1. npm instal socket.io and load it as 'const socketIO = require('socket.io');'
2. create custom http server for express (instead of default express server) 
    by create 'var server = http.createServer(app);'. 
    Notice that app.listen() change to server.listen()
3. create a sokect connection called 'io' by load in the custom server to socketIO by 'var io = socketIO(server);'
4. socket is created. We can call/listen to event by 'io.'

Client side: 
1. load in socket.io script: '<script src="/socket.io/socket.io.js"></script>'
2. then in the following script, create socket by 'var socket = io();'
3. socket is created. We can call/listen to event by 'socket.'
*/