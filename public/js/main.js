var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");
})

socket.on('message', function(msg) {
    console.log(msg);

    try {
        var data = JSON.parse(msg);
    } catch(e) {
        var data = msg;
    }    

    switch (data.type) {
        case "foo":
            console.log("foo");
            break;

        case "bar":
            console.log('bar');
            break;

        default:
            console.log('default');
            break;
    }
})

socket.on('error', function(err) {
    console.error(err);
})

// alias for sending JSON encoded message
function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }
    //conn.send(JSON.stringify(message));
    socket.emit('message', JSON.stringify(message));
}