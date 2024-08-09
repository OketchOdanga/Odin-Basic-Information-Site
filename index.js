const { createServer } = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const hostname = 'localhost';
const PORT = process.env.PORT || 8000;

const server = createServer((req, res) => {

    let filepath = path.join(__dirname, 'Public', req.url === '/' ? 'index.html': req.url);
    let extname = path.extname(filepath);

    // defines the content type of the file
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/JSON'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpeg':
            contentType = 'image/jpeg'
            break;
    }

    //if the page is not found this page will be displayed.
    fs.readFile(filepath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'Public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.end(content, 'utf-8');
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            } 
        } else {
            //we set the statusCode property to 200, to indicate a successful response.
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content, 'utf-8');

        }
    })
});

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });
