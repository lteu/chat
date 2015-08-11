// var app = require('express')();
// var http = require('http').Server(app);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser')

// var redis = require("redis")
//   , subscriber = redis.createClient()
//   , publisher  = redis.createClient();

app.use(bodyParser.json());


app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
  // res.sendfile('index.html');
});

app.post('/send/:room/', function(req, res) {
    var room = req.params.room;
    // var message = req.body;

    // var msgg = JSON.stringify(req);

    // console.log("Session: %j", req.params);
     console.log(req.body);  
        console.log('listening on * '+room);
        io.emit('chat message', room);
    // io.sockets.in(room).emit('message', { room: room, message: message });

    res.end('message sent');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });


io.on('connection', function(socket){

  // socket.broadcast.emit('hi');
  // socket.broadcast.emit('user connected');

  // var subscribe = redis.createClient();
  // subscribe.subscribe('pubsub');


  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    socket.broadcast.emit('chat message','user connected');
  });
});


http.listen(8080, function(){
  console.log('listening on *:8080');
});
