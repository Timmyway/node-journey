const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	// Req contains lots of useful informations
	// Res is the response we send back to the browser
	res.setHeader('Content-Type', 'application/json');
	if (req.url === '/') {
		res.write('{ "name": "Tim", "job": "developer" }');
		res.end();
	}
	else if (req.url === '/about') {
		res.end('About page');
	}
	else if (req.url === '/developers') {
		fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, data) => {
			const devs = JSON.parse(data)
			res.writeHead(200, {'Content-type': 'application/json'});
			res.end(data);
		})
	}
	else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world'
		})
		res.end('<h2>404 page not found !</h2>');
	}
})

server.listen(3000, () => {
	console.log('Listening on port 3000...');
})

const footVideoStream = fs.createReadStream('./media/foot.mp4');
const footVideoWriteStream = fs.createWriteStream('./media/copy-foot.mp4');

// footVideoStream.on('data', (chunk) => {
// 	console.log('---- NEW CHUNK ----');
// 	footVideoWriteStream.write(chunk);
// });

footVideoStream.pipe(footVideoWriteStream);