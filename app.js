var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendFile(__dirname+'/client/index.html');
});

app.get('/client/client.js', function(req,res){
	res.sendFile(__dirname+'/client/client.js');
});

server.listen(8080);
console.log('Server Started.');

io.on('connection', function(socket){
	console.log("Connection.");
	socket.emit("welcome", {message:"Hello!"});
});