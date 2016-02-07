var http = require('http'),
	cache = {},
	chatServer = require('./lib/socket-server'),
	staticModule = require('./lib/sending-module');



var server = http.createServer(function(req, res){
	var filePath;

	if(req.url === "/") {
		filePath = 'public/index.html';
	} else {
		filePath = "public" + req.url;
	}

	var absPath  = "./" + filePath;
	staticModule.serveStatic(res, cache, absPath);
});

server.listen(3000, function(){
	console.log("Server listening on port 3000.")
});

chatServer.listen(server);