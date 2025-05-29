const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
   eventId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Event',
     required: true,
   },
   userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true,
   },
   status: {
     type: String,
     enum: ["registered", "attended", "cancelled"],
     default: "registered"
   },
   checkInTime: {type: Date, default:  Date.now},
   levelRating: {
    type: String,
    enum: ["Very Good", "Good", "Average", "Bad", "Very Bad"],
    default: "Good"
   },
   checkOutTime: {type: Date, default:  null},
   message: {type: String, default: null},
});
 
module.exports = mongoose.model('Attendance', AttendanceSchema);