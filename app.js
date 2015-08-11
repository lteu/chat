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

  //default room
  socket.room = "Room Manarola";
  socket.username = "anonymous"
  socket.join(socket.room);

  var clients = io.sockets.adapter.rooms['Room Manarola'];
  for (var clientId in clients) {
    console.log('connected in rooms '+socket.room+" "+clientId);
  };
  // Disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // Chat Message
  socket.on('chat message', function(msg){
    
    if (!socket.username) {
      socket.username = "anonymous"
    };

// io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    io.sockets.in(socket.room).emit('chat message', { name: socket.username, message: msg } );
    // socket.broadcast.emit('chat message','user connected');
  });

  // Chat Name - one 2 one case
  socket.on('username', function(username){
    // store the username in the socket session for this client
    socket.username = username;

    io.to(socket.id).emit("SERVER FEED","Name Changed Successfully .... ");
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

  // Change Room
  socket.on('room', function(newroom){
    socket.leave(socket.room);
    console.log('user rooms searches ... '+socket.room);
    socket.join(newroom);

    // socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
    
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit("SERVER FEED",socket.username + " has left the "+socket.room);
    
    // // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit("SERVER FEED",socket.username + " has joined the "+socket.room);
    
    io.to(socket.id).emit("SERVER FEED"," room switched to "+newroom);

    // socket.emit('updaterooms', rooms, newroom);

    // socket.room = room;
    // io.emit("SERVER FEED",socket.username + " joins the "+room);
  });

});


http.listen(8080, function(){
  console.log('listening on *:8080');
});
