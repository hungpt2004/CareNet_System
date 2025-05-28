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
    required: true 
  }, 
  year: { 
    type: Number, 
    required: true,
    default: new Date().getFullYear()
  }, 
  amount: { 
    type: Number, 
    required: true ,
    default: 0
  }, 
  status: { 
    type: String, 
    enum: ['PENDING', 'PAID'], 
    default: 'PENDING' 
  }, // Trạng thái thanh toán
  paymentDate: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('MonthlyPayment', MonthlyPaymentSchema);