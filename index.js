var express = require('express');
var socket = require('socket.io');
var path = require( 'path' );

// App setup
var app = express();
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// app.use(allowCrossDomain); 

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function(){
    console.log(`listening for requests on ${PORT}`);
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data); // broadcast will send this message to everyone except the sender
    });

});
