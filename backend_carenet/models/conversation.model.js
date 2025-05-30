const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: [
    { type: Schema.Types.ObjectId, ref: "User", required: true }
  ],
  isGroup: { type: Boolean, default: false },
  groupName: { type: String }, // nếu là group chat
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }, // tối ưu performance
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversation", ConversationSchema);
