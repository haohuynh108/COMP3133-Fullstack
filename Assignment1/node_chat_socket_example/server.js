const path = require('path');

const http = require('http');

const express = require('express');

var bodyParser = require('body-parser')

const socketio = require('socket.io');

const formatMsg = require('./features/messages');

var mongoose = require('mongoose');

const {
  userJoin,
  getUser,
  userLeave,
  getRoomUsers
} = require('./features/users');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'main')));

const bot = 'MEE';

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit('message', formatMsg(bot, 'Welcome to Chat Room!'));


    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMsg(bot, `${user.username} has joined the room chat`)
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('chatMsg', msg => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', formatMsg(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMsg(bot, `${user.username} has left the room chat`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var models = mongoose.model('Message',{
  name : String,
  message : String
})


app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{ 
    if(err)
    {
      //sendStatus(500);
      console.log(err)
    }

    //Send Message to all users
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

var dbUrl = 'mongodb+srv://sa:rrfYrY3mSzHSgzJR@cluster0.qa3t4.mongodb.net/gbc-fall2020?retryWrites=true&w=majority'


mongoose.connect(dbUrl , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
      console.log('mongodb connected',err);
  }else{
      console.log('Successfully mongodb connected');
  }
})
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
