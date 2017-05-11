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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    //render the message to the screen
    // create a html element <li>
    var li = jQuery('<li></li>');
    // put the text into it
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // append it to dom
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
   
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
   
    li.append(a);
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

// when 'send' button is clicked
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    var messageTextbox = jQuery('[name=message]');
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');   
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    // navigator.geolocation is built in api in modern browser
   if (!navigator.geolocation) {
       return alert('Geolocation not supported by your browser');
   }
   
   locationButton.attr('disabled', 'disabled').text('Sending location...');
   
   navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      });
   }, function() {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location'); 
   });
});
