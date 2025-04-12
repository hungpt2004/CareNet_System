class AppError extends Error {
   constructor(message, statusCode) {
     super(message); // kế thừa message từ Error
 
     this.statusCode = statusCode;
     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
     this.isOperational = true; // chỉ định lỗi này là lỗi dự đoán được (không phải lỗi hệ thống)
 
     Error.captureStackTrace(this, this.constructor);
   }
 }
 
 module.exports = AppError;
 