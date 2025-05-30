const mongoose = require('mongoose')

const MonthlyPaymentSchema = new mongoose.Schema({
  organization: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Organization', 
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  month: { 
    type: Number, 
  }, 
  year: { 
    type: Number, 
    default: new Date().getFullYear()
  }, 
  amount: { 
    type: Number, 
    required: true ,
    default: 0
  }, 
  status: { 
    type: String, 
    enum: ['NOT PAID', 'PAID', 'NO REVENUE'], 
    default: 'NOT PAID' 
  }, // Trạng thái thanh toán
  paymentDate: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('MonthlyPayment', MonthlyPaymentSchema);