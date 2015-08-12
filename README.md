#Chat Room

This chat room aimes to demonstrate the basic functions of 
Node.js, Socket.io and its integration with php.

In particular, it solves parts of the homeworks assigned by the [socket.io tutorial](http://socket.io/get-started/chat/)

- Broadcast a message to connected users when someone connects or disconnects, ok
- Add support for nicknames, ok
- Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter. needed
- Add “{user} is typing” functionality. needed
- Show who’s online. ok
- Add private messaging. needed

Besides, we'll see also how to send message from outside world (how php sends json/message to nodejs and nodejs distributes it to online users) without using Redis. 
On the socket.io website, they propose to use socket.io-redis and socket.io-emitter, however this is no documentation and demo available.
And it seems that, this requires Redis server running on another port, it means you need to run both nodejs and redis server in the same time and use the publish subscribe paradigm to accomplish the task. For the purpose of reducing the configuration complexity, such task could also be achieved by only using the [express.io](http://express-io.org/) framework where nodejs could make available a namespace for php program to communicate.


To start the demo, we assume you have already node.js installed.

- configuration

$npm install

- launch app

$node app.js


- open your browser and go to: [http://localhost/chat/](http://localhost/chat/) without putting #port

- php <-> nodejs 

$php test.php

References:

- Tutorial socket.io. [https://github.com/rauchg/chat-example](https://github.com/rauchg/chat-example)
- Demo, room, one2one, channel broadcast. [https://github.com/mmukhin/psitsmike_example_2](https://github.com/mmukhin/psitsmike_example_2)
- nodejs integrated with PHP, mysql. [https://github.com/jdutheil/nodePHP](https://github.com/jdutheil/nodePHP)
- css template, [http://themeandphoto.com/bootstrap-chat-example-template/](http://themeandphoto.com/bootstrap-chat-example-template/)

Execution Example:

![Demo](https://github.com/lteu/chat/blob/master/demo.png)