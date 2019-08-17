// var mqtt = require('mqtt');
// var client = mqtt.connect('http://172.20.10.2:1883')
// const Student = require('./models/student')

// client.on('connect', function () {
//     // console.log("Connected with mqtt !");
//     client.subscribe('Tapped', function (err) {
//         if (err) {
//             console.log("Cant get data");
//         }

//     });

// });
// var tap_id
// // var student = Student.findOne({ student_id: tap_id }).exec((err, student) => {
// //     if (err) {
// //         console.log(err)
// //     }
// //     else {
// //         console.log(student);
// //         return student;
//         // current = student.date.getHours() +":" +student.date.getMinutes() + ":"+ student.date.getSeconds();
//         // student = {
//         //     name: student.name,
//         //     id: student.student_id,
//         //     classroom: student.class,
//         //     phone: student.phone,
//         //     township: student.township,
//         //     shift: student.shift,
//         //     time: current,
//         //     address: student.address,
//         //     status: student.current_status
//         // });
// //     }
// // })
// module.exports = (io) => {
//     io.of("/list").on('connection', (socket) => {
//         // client.on('message', (topic, mess) => {
//         //     console.log("Io connected");
//         //     socket.emit('mess',);
//         // })
//         client.on('message', async (topic, mess) => {
//             tap_id = mess.toString()
//             const filter = { student_id: mess.toString() }
//             const update = { date: Date.now() }
//             console.log(mess.toString())
//             let student = await Student.findOneAndUpdate(filter, update, { new: true });
           
            
//         })
//         Student.findOne({ student_id: tap_id }).exec((err, student) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 console.log(student);
//                 socket.emit('mess',student);
//             }
//         })
        
//     })
// }