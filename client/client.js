var users = 1;

function random(limit){
	id = '';
	choices = '0123456789abcdef';
	for(var i = 0; i < limit; i++){
		id += choices.charAt(Math.floor(Math.random()*16));
	}
	console.log(id);
	return id;
}

function people(){
	socket.emit('people');
}

function create(){
	id = prompt('Key in Custom Room ID, blank for Random');
	if(id == ''){
		id = random(Math.log10(users)+1);
	}
	socket.emit('room', {id:id});
	alert('Your room ID is ' + id + '. Please join now.');
}

var socket = io();
socket.on('welcome', function(data){
	document.getElementById('console').innerHTML += '<p>' + data.message + '</p>';
});
socket.on('people', function(data){
	users = data.people;
	document.getElementById('users').innerHTML = users + ' users online';
})
setInterval(people(), 1000);