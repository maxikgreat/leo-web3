const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer(function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (!req.url || req.url === '/') {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    return res.end('No file')
  }

  const fileName = req.url.replace('/', '');
  const filePath = path.join(__dirname, fileName)

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    return res.end('No file')
  }
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': stat.size
  });

  let readStream = fs.createReadStream(path.join(__dirname, fileName));
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
});

app.listen(process.env.PORT || 3000);
