const express = require('express');
const router = express.Router();

let sendTo = (socket, message) => {
    if (typeof socket !== undefined) {
        socket.emit("message", JSON.stringify(message));
        console.log(JSON.stringify(message));
    }
}

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'BTC FLO Exchange API'
    })
})

module.exports = (io) => {
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
    return router
}