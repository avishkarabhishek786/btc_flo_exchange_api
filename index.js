const bodyParser = require('body-parser')

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

const port = process.env.PORT || 7788

const middleware = [bodyParser.urlencoded({extended: true})]

app.use(middleware)

app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Page Broke!");
});

/**Socket functions */

let sendTo = (socket, message) => {
    if (typeof socket !== undefined) {
        socket.emit("message", JSON.stringify(message));
        console.log(JSON.stringify(message));
    }
}

io.on('connection', (socket)=>{
    console.log("Server connected!");
    
    socket.on('message', (message)=>{
        console.log("Client: ", message);
    })

    socket.on('close', ()=>{
        console.log("Server closed");
    })

    sendTo(socket, `{"Server: ":"Hello from Server!"}`)
})

server.listen(port, () => {
    console.log("Application is running on port " + port);
});