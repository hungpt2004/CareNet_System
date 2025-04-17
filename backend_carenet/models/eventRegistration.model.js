const mongoose = require('mongoose')
const Schema = mongoose.Schema


const EventRegistrationSchema = new Schema({
   event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   registeredAt: { type: Date, default: Date.now },
   status: {
     type: String,
     enum: ["pending", "approved", "rejected", "cancelled"],
     default: "pending"
   },
   answers: [{type: String, default: null}],
   cancellationReason: { type: String, default: null},
   approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
   approvedAt: { type: Date, default: null}
 });
 
 module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);