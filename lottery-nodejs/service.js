let http = require('http');
let lottery = require('lottery');

const port = 9200;
/*
http.createServer(function(req,res){
    res.writeHead(200);
    lottery.draw(50,6).then( nums => res.end(JSON.stringify(nums)) )
}).listen(port);
*/
http.createServer(async (req,res) => {
    res.writeHead(200);
    let nums = await lottery.draw(50,6);
    res.end(JSON.stringify(nums));
}).listen(port);

console.log(`Listening on port ${port}`);