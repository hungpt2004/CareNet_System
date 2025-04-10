const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AnswerSchema = new Schema({
  question: { type: String, required: true }, // Câu hỏi đúng theo formData
  type: {
    type: String,
    enum: ["text", "checkbox", "radio", "dropdown"],
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed, // string hoặc array<string>
    required: true
  }
}, { _id: false });

const EventRegistrationSchema = new Schema({
   event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   registeredAt: { type: Date, default: Date.now },
   status: {
     type: String,
     enum: ["pending", "approved", "rejected", "cancelled"],
     default: "pending"
   },
   answers: [AnswerSchema],
   isCancelledByUser: { type: Boolean, default: false },
   cancellationReason: { type: String },
   approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
   approvedAt: { type: Date }
 });
 
 module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);