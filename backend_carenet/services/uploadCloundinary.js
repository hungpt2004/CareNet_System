// cloudinaryUpload.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Cấu hình mặc định cho upload
cloudinary.config({
  resource_type: 'raw',
  allowed_formats: ['pdf'],
  max_file_size: 10485760, // 10MB
  use_filename: false,
  unique_filename: false,
  overwrite: true,
  format: 'pdf'
});

module.exports = {
  cloudinary // Export cloudinary instance để có thể sử dụng các API khác
};
