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

var count = 1;

app.get('/', function(req, res){
  res.sendfile(__dirname + 'index.html');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });


io.on('connection', function(socket){

  // socket.broadcast.emit('hi');
  // socket.broadcast.emit('user connected');


  console.log('a user connected');
  var now = time();

  //default room
  socket.room = "Room Manarola";
  socket.username = "anonymous"+count;
  count++;
  socket.timestr = now;
  socket.join(socket.room);


  // current room user list
  var pile = getUsersInRoom('Room Manarola')
  io.to('Room Manarola').emit("CONNECTED USERS",pile);


  // Disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);
  });


  // Chat Message
  socket.on('chat message', function(msg){
    
    if (!socket.username) {
      socket.username = "anonymous"
    };

    var now = time();
    io.sockets.in(socket.room).emit('chat message', { name: socket.username, message: msg, time: now } );
  });

  // Chat Name - one 2 one case
  socket.on('username', function(username){
    // store the username in the socket session for this client
    socket.username = username;

    var now = time();

    io.to(socket.id).emit("SERVER FEED","Name Changed Successfully .... " + now);

    //update user list
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);

    // store the room name in the socket session for this client
    // socket.room = 'room1';
    // // add the client's username to the global list
    // usernames[username] = username;
    // // send client to room 1
    // socket.join('room1');
    // // echo to client they've connected
    // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // // echo to room 1 that a person has connected to their room
    // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    // socket.emit('updaterooms', rooms, 'room1');
  });

  // switch Room
  socket.on('room', function(newroom){
    var now = time();

    socket.leave(socket.room);
    console.log('user rooms switched ... '+socket.room);
    socket.join(newroom);

    // socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
    
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit("SERVER FEED",socket.username + " has left the "+socket.room+" "+now);

    // old room user list
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);
    
    // // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit("SERVER FEED",socket.username + " has joined the "+socket.room+" "+now);

    // new room user list
    var pile = getUsersInRoom(socket.room)
    io.to(socket.room).emit("CONNECTED USERS",pile);
    
    io.to(socket.id).emit("SERVER FEED"," room switched to "+newroom+" "+now);

    // socket.emit('updaterooms', rooms, newroom);

    // socket.room = room;
    // io.emit("SERVER FEED",socket.username + " joins the "+room);
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