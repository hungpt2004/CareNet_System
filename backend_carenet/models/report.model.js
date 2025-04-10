const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
   senderId: {type: Schema.ObjectId, ref: 'User'},
   receiveId: {type: Schema.ObjectId, ref: 'User'},
   problemContent: {type: String, required: true},
   solveContent: {type: String, default: null},
   createdAt: {type: Date, default: Date.now},
   replyAt: {type: Date, default: null}
})

module.exports = mongoose.model('Report', ReportSchema);