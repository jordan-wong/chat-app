const express = require('express');
const http = require('http')
const socketio = require('socket.io');
/*
//const mongo = req
var mongoose = require('mongoose');
var dbUrl = 'mongodb+srv://jordan:mongoJ0r@cluster0.fsowp.mongodb.net/Cluster0?retryWrites=true&w=majorityongodb://wjor390:mongoJ0r@cluster0-shard-00-02.fsowp.mongodb.net:27017’

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})
var Message = mongoose.model('Message', {name : String, message : String})
*/
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('server is running on port: ', server.address().port);
})

//setting static folder
app.use(express.static(__dirname+'/frontend'));

//Client connection actions
io.on('connection', socket =>{
    console.log('a user has connected')
    socket.emit('message', 'Welcome to the chat!');

    //socket.broadcast to all OTHER clients
    socket.broadcast.emit('message', 'A user has joined the chat!')

    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left the chat')
    });
});
//http.listen(3000, () => console.log("listening on 3000"))