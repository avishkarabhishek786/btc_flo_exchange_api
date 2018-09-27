const bodyParser = require('body-parser')

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

const port = process.env.PORT || 7788

const routes = require('./routes')(io)

const middleware = [bodyParser.urlencoded({extended: true})]

app.use(middleware)

app.use('/', routes)

app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Page Broke!");
});

server.listen(port, () => {
    console.log("Application is running on port " + port);
});