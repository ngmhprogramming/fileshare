socket.on('welcome', function(data){
	document.getElementById('console').innerHTML += '<p>' + data.message + '</p>';
});