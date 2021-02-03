var http = require('http')
var express = require ('express')
var app = express()


var server = http.createServer(app)

// Pass a http.Server instance to the listen method
var io = require ('socket.io').listen(server)

// The server should start listening
const server = app.listen(8088, () => {

    console.log(`chat app running on port: 8088`);

});

var io = require('socket.io')(server);

var io = myServer.listen(server);

//Register the index route of your app that return 
app.get('/', function (req,res) {
    console.log("Homepage")
    res.sendFile(__dirname + '/index.html')
})



//Expose the node_modules folder as static resource
app.use('/static', express.static('node_modules'))

// Handle connection

io.on("connection" , (socket) => {
    console.log("Connected successfully to the socket ...")
    
    var news =[
        {title: "The cure of the Sadness is to play Videogame"},
        {title: "Batman saves Racoon City"},
        {title: "Deadpool doesn't want to do a third part of"},
        {title: "Quicksilver demand Warner Bros. due to plagig"}
    ]

    // Send news on socket
    socket.emit('news', news)

    socket.on('my other event', function(data){
        console.log(data)
    }) 
})


/*
var http = require('http');

var express = require('express');

var app = express();



//var server = http.createServer(app);



const server = app.listen(8088, () => {

    console.log(`chat app running on port: 8088`);

});



// Pass a http.Server instance to the listen method

var io = require('socket.io')(server);



//var io = myServer.listen(server);



// Register the index route of your app that returns the HTML file

app.get('/', function (req, res) {

    console.log("Homepage");

    res.sendFile(__dirname + '/index.html');

});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)

app.use('/static', express.static('node_modules'));



io.on("connection" , (socket) => {

    console.log("New Connection received...")

});*/