const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
