

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')

app.use(bodyParser.json());

var count = 1;

app.get('/', function(req, res){
  res.sendfile(__dirname + 'index.html');
});

app.post('/send/:variable/', function(req, res) {
    var variable = req.params.variable;
    var content = req.body;
    // var message = req.body;

    // var msgg = JSON.stringify(req);

    // console.log("Session: %j", req.params);
     console.log(content.msg);  
        // console.log('listening on * '+room);
    // io.to(socket.room).emit('chat message', room);
    io.sockets.in(content.room).emit("SERVER FEED","External Message From "+content.name + " \" "+content.msg+" \"  "+time());

    // socket.broadcast.to(socket.room).emit("SERVER FEED",socket.username + " has left the "+socket.room+" "+now);


    res.end('message sent');
});


io.on('connection', function(socket){

  console.log('a user connected');

  var now = time();

  // default room and name
  socket.room = "Room Manarola";
  socket.username = "anonymous"+count;
  socket.timestr = now;
  socket.join(socket.room);
  count++;

  // send user list
  var pile = getUsersInRoom('Room Manarola')
  io.to(socket.room).emit("CONNECTED USERS",pile);


  // Disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
    var pile = getUsersInRoom(socket.room);
    io.to(socket.room).emit("CONNECTED USERS",pile);
    socket.leave(socket.room);
  });


  // Handle Chat Message - Demo: channel emit
  socket.on('chat message', function(msg){
    var now = time();
    io.sockets.in(socket.room).emit('chat message', { name: socket.username, message: msg, time: now } );
  });

  // Handle Change username - Demo: server 2 one client
  socket.on('username', function(username){

    // store the username in the socket session for this client
    socket.username = username;

    var now = time();

    io.to(socket.id).emit("SERVER FEED","Name Changed Successfully .... " + now);

    //update user list
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);

  });

  // Switch Room
  socket.on('room', function(newroom){
    var now = time();

    socket.leave(socket.room);
    socket.join(newroom);

    // notify leaving for OLD room. Demo: Broadcast
    socket.broadcast.to(socket.room).emit("SERVER FEED",socket.username + " has left the "+socket.room+" "+now);

    // update user list of OLD room.
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);
    
    // notify coming for NEW room. Demo: Broadcast
    socket.room = newroom;
    socket.broadcast.to(newroom).emit("SERVER FEED",socket.username + " has joined the "+socket.room+" "+now);

    // update user list of NEW room.
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);
    
    // notify a successful operation ...
    // io.to(socket.id).emit("SERVER FEED"," room switched to "+newroom+" "+now);

  });

});


http.listen(8080, function(){
  var addr = http.address();
  console.log('app listening on localhost or http://' + addr.address + ':' + addr.port);
  // console.log('listening on *:8080');
});



function getUsersInRoom(room){
    var clients = io.sockets.adapter.rooms[room];
  var pile = [];
  for (var clientId in clients) {
    var clientSocket = io.sockets.connected[clientId];
    // console.log('connected in rooms '+socket.room+" "+clientSocket.username+" "+now);
    var clientename = clientSocket.username;
    var clientetime = clientSocket.timestr;
    var tmpuer = {name:clientename, time:clientetime};
    pile.push(tmpuer);
  };
  return pile;

}

function time(){
  var d = new Date();
  return  d.getHours()+":"+d.getMinutes()+" "+d.getDate()+"/"+(d.getMonth()+1);
}