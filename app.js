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

var users = [];
var rooms = [];

io.on('connection', function(socket){
	console.log('Connection. ID: ' + users.length);
	socket.id = users.length;
	users.push(socket);
	socket.emit('welcome', {message:"Hello!"});
	socket.on('people', function(){
		socket.emit('people', {people:users.length});
	});
	socket.on('disconnect', function(){
		users.splice(socket.id);
		console.log('Disconnection.' + socket.id);
	});
});