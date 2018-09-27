const express = require('express');
const router = express.Router();
var crypto = require('crypto');

let sendTo = (socket, message) => {
    if (typeof socket !== undefined) {
        socket.emit("message", JSON.stringify(message));
        console.log(JSON.stringify(message));
    }
}

let hash = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = (io) => {
    io.on('connection', (socket)=>{
        console.log("Server connected!");
        
        socket.on('message', (message)=>{
            
            let msg;

            try {
                msg = JSON.parse(message);
            } catch (error) {
                console.error("Failed to parse object.");
                return
            }

            if (typeof msg.data === undefined || msg.type === undefined) {
                return console.error("Response is not a valid object.");
            }

            switch (msg.type) {
                case "trade":
                    trade(msg);
                    break;
            
                default:
                    break;
            }
        })

        socket.on('close', ()=>{
            console.log("Server closed");
        })

        let trade = (response) => {
            if (response.type === undefined || response.type != "trade") {
                return console.error("Response is not a valid object.");
            }

            let res_hash = hash(JSON.stringify(response.data));
 
            let server_res = {
                "type": "trade",
                "data": null
            }

            if (response.sha256 === res_hash) {
                  server_res.data = `Hash received: ${res_hash}`;
            }
            sendTo(socket, {"Server: ": JSON.stringify(server_res)});
        }
    })
    return router
}