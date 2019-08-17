const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require("socket.io")(http);
app.use(express.static('views'))
app.set('views', './views');
app.set('view engine', 'pug');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rfid', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
const Student = require('./models/student')
const port = 2000

const routes = require('./mqtt')(io);
app.use('/' ,routes);


app.use((req,res,next) => {
    var err = new Error ('File not found');
    err.status = 404;
    next(err);
});

app.use( (err, req, res,next) => {
    res.status(err.status || 500);
    res.send(err.message);
})

// client.on('connect', function () {
//     client.subscribe('Tapped', function (err) {
//         if (err) {
//             console.log("Cant get data");
//         }
      
//     }); 
  
// });
// io.on('connection', (socket) => {
//     console.log("Io connected");
//     socket.on('message', (mess) => {
//         console.log(mess);
//         client.publish("LED", mess, err => {
//             if (err) {
//                 console.log("Cant get data");
//             }
//             console.log("Data sent !");
//         });
//     });
  
http.listen(port, () =>{
    console.log("fjfkgklagklj")
})