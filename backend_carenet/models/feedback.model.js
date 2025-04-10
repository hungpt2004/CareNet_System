const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
   userId: {type: Schema.ObjectId, ref: 'User'},
   eventId: {type: Schema.ObjectId, ref: 'Event'},
   rating: {type: Number, min: 1, max: 5},
   content: {type: String, default: null},
   createdAt: {type: Date, default: Date.now},
   like: {type: Number, default: 0}
})

module.exports = mongoose.model('Feedback', FeedbackSchema);
