const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
   conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
   senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   content: { type: String },
   attachments: [String], // nếu sau này có ảnh, file...
   createdAt: { type: Date, default: Date.now },
   readBy: [{ type: Schema.Types.ObjectId, ref: "User" }] // để đánh dấu đã đọc
 });
 
 module.exports = mongoose.model("Message", MessageSchema);
 