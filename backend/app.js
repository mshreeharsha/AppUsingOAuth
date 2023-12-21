const http = require('http');
const app = require('./server');
const port = process.env.PORT


const server = http.createServer(app);
server.listen(port,()=>{console.log('this app is running on '+ port)});