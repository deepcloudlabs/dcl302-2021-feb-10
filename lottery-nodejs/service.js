let http = require('http');
const port = 9000;
http.createServer(function(req,res){
    res.writeHead(200);
    res.end(JSON.stringify([4,8,15,16,23,42]));
}).listen(port);
console.log(`Listening on port ${port}`);