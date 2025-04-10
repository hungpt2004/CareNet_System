const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OrganizationLevelSchema = new Schema({
   name: { type: String, required: true, enum: ['basic', 'premium'], default: 'basic'}, // Basic, Pro, etc.
   pricePerMonth: { type: Number, default: 0 }, // VNĐ
   description: { type: String }, // mô tả gói
});

module.exports = mongoose.model('OrganizationLevel', OrganizationLevelSchema);
 