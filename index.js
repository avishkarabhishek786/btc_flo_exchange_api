const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const WebSocket = require('ws');

const port = process.env.PORT || 7788

const app = express()

const wss = new WebSocket.Server({ port: 9090 });

app.set('view engine', 'ejs')

const middleware = [
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({
        extended: true
    })
]

wss.on('connection', function(ws) {
    console.log("server connected");
    
    ws.on('open', open=()=>{
        ws.send('some text from server')
    })
    
    ws.on('message', incoming=(msg)=>{
        console.log(msg);
    })

    ws.on('close', ()=>{
        console.log("Server connection closed");
    })

    sendTo(ws, {server: "message from server"})

})

function sendTo(ws, message) {
    ws.send(JSON.stringify(message));
    console.log(JSON.stringify(message));
}


app.use(middleware)

app.use('/', routes)

app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Page Broke!");
});

app.listen(port, () => {
    console.log("Application is running on port " + port);
});