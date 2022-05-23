const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	// Req contains lots of useful informations
	// Res is the response we send back to the browser
	res.setHeader('Content-Type', 'text/html');
	let path = './views/';
	switch (req.url) {
		case '/':
			path += 'index.html';
			res.statusCode = 200;			
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-me':
			res.statusCode = 301;
			res.setHeader('Location', 'about');
			res.end();
			break;
		case '/devs':
			fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, data) => {
				const devs = JSON.parse(data)
				res.writeHead(200, {'Content-type': 'application/json'});
				res.end(data);
			})
			break;	
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}

	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.end();
		} else {
			res.end(data);
		}
	})
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