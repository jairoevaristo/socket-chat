const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (_, res) => {
  res.render('index.html');
});

const messages = [];

io.on('connection', socket => {
  console.log('Connect: ', socket.id);
  socket.emit('previewMessage', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('recividMessage', data);
  });
  
});

server.listen(3000);

