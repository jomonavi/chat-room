var fs = require('fs'),
	path = require('path'),
	mime = require('mime');

module.exports = (function(){
	function send404(response) {
		response.writeHead(404, {'content-type': 'text/plain'});
		response.write('Error 404: resource not found.');
		response.end();
	};

	function sendFile(response, filePath, fileContents) {
		response.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))})
		response.end(fileContents);
	};

	function serveStatic(response, cache, absPath) {
		if (cache[absPath]) {
			sendFile(response, absPath, cache[absPath]);
		} else {
			fs.exists(absPath, function(exists) {
		 		if (exists) {
		 			fs.readFile(absPath, function(err, data) {
		 				if (err) {
		 					send404(response);
		 				} else {
		 					cache[absPath] = data;
		 					sendFile(response, absPath, data);
		 				}
		 			});
		 		} else {
					send404(response);
		 		}
		 	});
	 	}
	};

	return {
		send404: send404,
		sendFile: sendFile,
		serveStatic: serveStatic
	};

})()