const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require("socket.io")(http);
app.use(express.static('views'))
app.set('views', './views');
app.set('view engine', 'pug');
var mqtt = require('mqtt')
app.set('views', './views');
app.set('view engine', 'pug');
const Student = require('./models/student')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rfid', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

var client = mqtt.connect('http://172.20.10.2:1883/')
client.on('connect', () => {
    client.subscribe('Tapped', (err) => {
        if (err) {
            console.log("Cant Connect")
        }
        console.log("a");
    })
})
var tap_id;
var abc = null;
// client.on('message', async (topic, mess) => {
//     tap_id = mess.toString()
//     const filter = { student_id: tap_id }
//     const update = { date: Date.now() }

//     let student = await Student.findOneAndUpdate(filter, update, { new: true })
//     current = student.date.getHours() + ":" + student.date.getMinutes() + ":" + student.date.getSeconds();
//     console.log(current)
//     abc.emit('message', JSON.stringify(student));
// })
io.of('/').on('connection',async (socket) => {
    abc = socket
    client.on('message', async (topic, mess) => {
        const time = new Date();
        var current = time.getHours() + ":" +time.getMinutes() + ":" + time.getSeconds();

        tap_id = mess.toString()
        const filter = { student_id: tap_id }

        let abc = await Student.findOne(filter);
        console.log(abc)
        if (abc.current_status === 'OFF') {
            const update = { date: current, current_status : 'ON' }
            let student = await Student.findOneAndUpdate(filter, update, { new: true })
            console.log(student)
            console.log(student.current_status)
            socket.emit('message', JSON.stringify(student));
        }
        else {
           
            const update = { date: current, current_status : 'OFF'}
            let student = await Student.findOneAndUpdate(filter, update, { new: true })
            socket.emit('message', JSON.stringify(student));
            console.log(student)
            console.log(student.current_status)
        }
    })
})
app.get('/', async (res, req, next) => {
    return res.render('index.html')  
})

app.use((req,res,next) => {
    var err = new Error ('File not found');
    err.status = 404;
    next(err);
});

app.use( (err, req, res,next) => {
    res.status(err.status || 500);
    res.send(err.message);
})
const port = 2000
http.listen(port, () =>{
    console.log("fjfkgklagklj")
})