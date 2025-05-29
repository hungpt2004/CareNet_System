const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    participants: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    type: {
        type: String,
        enum: ['private', 'group'],
        default: 'private'
    },
    lastMessage: {
        type: Schema.ObjectId,
        ref: 'Message'
    },
    lastMessageAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);