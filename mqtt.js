var mqtt = require('mqtt')
const express = require('express')
const app = express()
var router = express.Router();
app.set('views', './views');
app.set('view engine', 'pug');
const Student = require('./models/student')


export default function(io){
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
    client.on('message', async (topic, mess) => {
        tap_id = mess.toString()
        console.log(mess.toString())
    
    })
    router.get('/', async (res, req, next) => {
        const filter = { student_id: tap_id }
        const update = { date: Date.now() }

        let student = await Student.findOneAndUpdate(filter, update, { new: true }, () => {
            io.of("/").on('connection', (socket) => {
                client.on('message', (topic, mess) => {
                    console.log("Io connected");
                    socket.emit('mess');
                })

            })
        })
        //     Student.findOne({ student_id: tap_id }).exec((err, student) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         else {
        //             console.log(student);
        //             socket.emit('mess', student);
        //         };
        //     })
        return res.render('index.html')
    })
    return router;

}

// router.get('/list', async (req, res, next) => {

//     Student.findOne({ student_id: tap_id }).exec((err, student) => {
//         if (err) {
//             return next(err)
//         }
//         else {
//             console.log(student.tap_id);
//             current = student.date.getHours() + ":" + student.date.getMinutes() + ":" + student.date.getSeconds();
//             return res.render('index.html', {
//                 name: student.name,
//                 id: student.student_id,
//                 classroom: student.class,
//                 phone: student.phone,
//                 township: student.township,
//                 shift: student.shift,
//                 time: current,
//                 address: student.address,
//                 status: student.current_status
//             });
//         }
//     })
// })
// module.exports = router;
