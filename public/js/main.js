var conn = new WebSocket('ws://localhost:9090')

conn.onopen = function () {
    console.log("Connecting to signalling server.");
} 

conn.onmessage = function(msg) {
    console.log(msg);
    send({client:"response from client"});
}

conn.onerror = function(error) {
    console.error(error);
}

function send(message) {
    conn.send(JSON.stringify(message));
}