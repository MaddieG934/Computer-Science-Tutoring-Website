// Launch main page:

var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    const filePath = path.join(__dirname, 'websitetest.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Error reading HTML file');
            return;
        }
        const url = request.url;
        if (url === '/style.css') {
            response.writeHead(200, { 'Content-Type': 'text/css' }); // http header
            fs.createReadStream(__dirname + "/style.css", "utf8").pipe(response);
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' }); // http header
            fs.createReadStream(__dirname + "/websitetest.html", "utf8").pipe(response);
        }
    })
}).listen(3000);

console.log('Server running at http://localhost:3000/');