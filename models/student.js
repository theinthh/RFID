const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    student_id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    parents: {
        type: String,
        required: true
    },
    township: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    shift:  {
        type: String,
        required: true
    },
    current_status:  {
        type: String,
        required: true
    },
    date: { 
        type: String,
        required: true
    }
})
mongoose.set('useCreateIndex', true);
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;