var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room') ) {
    window.location = 'index.html';
    throw new Error('Required name and room');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function () {
    console.log('Connected to the server');
    socket.emit('enterChat', user, function(resp) {
        renderUsers(resp);
    });

});

// listen
socket.on('disconnect', function() {
    console.log('Lost connection');
});

// listen info
socket.on('createMsg', function(msg) {
    renderMsg(msg, false);
    scrollBottom();
}); 

// listen info users
socket.on('listPeople', function(people) {
    renderUsers(people);
}); 

// private messages
socket.on('msgPrivate', function(msg) {
    console.log('Private ', msg);
}); 