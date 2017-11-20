console.log("browser-reload loaded");

function getPort(url) {
	url = url.match(/^(([a-z]+:)?(\/\/)?[^\/]+).*$/)[1] || url;
	var parts = url.split(':'),
		port = parseInt(parts[parts.length - 1], 10);
	if(parts[0] === 'http' && (isNaN(port) || parts.length < 3)) {
		return 80;
	}
	if(parts[0] === 'https' && (isNaN(port) || parts.length < 3)) {
		return 443;
	}
	if(parts.length === 1 || isNaN(port)) return 80;
	return port;
}

function getScriptPort()
{
	var scripts = document.getElementsByTagName('script');
	for ( i in scripts )
	{
		if ( scripts[i].src && scripts[i].src.indexOf("/browser-reload-client.js") > -1 )
			return getPort(scripts[i].src);
	}
}

function listen()
{
	console.log("browser-reload listening...")
	var socket = io.connect("http://localhost:" + getScriptPort());
	socket.on("hotswap", function()
	{
		location.reload();
	});
}

if ( io === undefined ) {
	var script = document.createElement('script');
	script.onload = listen();
	script.src = "http://localhost:" + getScriptPort() + "/socket.io/socket.io.js";
	document.body.appendChild(script);
}
else
{
	listen();
}



