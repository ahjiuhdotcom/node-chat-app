// 'io' method make available after with load in the script above
// initiate a connection and keep the it open for client side
var socket = io();

// 'connect' is built in event
// which emitted when connected to server
socket.on('connect', function() {
    console.log('Connected to server');
    
    /*
    // Commented out bcoz we want real time user input
    socket.emit('createMessage', {
       from: 'Andrew',
       text: 'Yup, that works for me.'
    });
    */
    
    /*
    // EXAMPLE EMAIL APP
    // custom event
    socket.on('newEmail', function(email) {
       console.log('New email', email); 
    });
    
    // custom event
    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey, this is Andrew'
    });
    */
});


// 'disconnect' is built in event
// which emitted when disconnected to server
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});
