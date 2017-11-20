console.log("browser-reload loaded");

function listen()
{
	console.log("browser-reload listening...")
	var socket = io.connect("http://localhost:3998");
	socket.on("hotswap", function()
	{
		location.reload();
	});
}

if ( io === undefined ) {
	var script = document.createElement('script');
	script.onload = listen();
	script.src = "/socket.io/socket.io.js";
	document.body.appendChild(script);
}
else
{
	listen();
}




