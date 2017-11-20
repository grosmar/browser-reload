

var reloadDelay = 10;


var fs = require("fs");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var execSync = require('child_process').execSync;

var argsv = require('minimist')(process.argv.slice(2));

var watchDir = argsv.watch;
var compileCommand = argsv.cmd;
var port = argsv.port;

console.log("browser-reload is running...");
console.log("");
console.log("Watching:        " + argsv.watch);
console.log("CompileCommand:  " + argsv.cmd);
console.log("Port:            " + argsv.port);
console.log("");
console.log("Add to the bottom of <body> tag");
console.log("<script src='http://localhost:" + argsv.port + "/browser-reload-client.js'></script>");
console.log("");


app.get('/browser-reload-client.js', function(req, res){
	res.sendFile(__dirname + '/browser-reload-client.js');
});

io.on('connection', function(socket){
	console.log('a user connected');
});

http.listen(port, function(){
	console.log('listening...');
});

var reloadTimeout;

function hotSwap()
{
	try
	{
		console.log("compile");
		code = execSync(compileCommand);

		console.log("reload");
		io.sockets.emit("hotswap");
	}
	catch (e)
	{
		console.log("failed");
	}
}

fs.watch(watchDir, function (event, filename) {
	console.log('event is: ', event, filename);
	if ( reloadTimeout != null )
		clearTimeout(reloadTimeout);
	reloadTimeout = setTimeout(hotSwap, reloadDelay);
});
