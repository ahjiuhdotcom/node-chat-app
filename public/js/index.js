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
    
    // create a html element <li>
    var li = jQuery('<li></li>');
    // put the text into it
    li.text(`${message.from}: ${message.text}`);
    // append it to dom
    jQuery('#messages').append(li);
});

/*
// EXAMPLE OF ADDING ACKNOWLEDGEMENT
// 3rd argument (callback function) will be run when
// server aknowledge the message
socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data){
    console.log('Got it!', data);
});
*/

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        
    });
});
