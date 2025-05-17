// uploadMiddleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../services/uploadCloundinary');

/**
 * Tạo middleware upload cho một loại ảnh cụ thể
 * @param {Object} options - Tùy chọn của middleware
 * @param {String} options.folder - Thư mục lưu trữ trên Cloudinary
 * @param {Array} options.allowedFormats - Định dạng cho phép
 * @param {Array} options.transformation - Biến đổi ảnh
 * @returns {Object} - Middleware multer đã cấu hình
 */
const createUploadMiddleware = (options = {}) => {
  // Tạo storage trực tiếp với Cloudinary
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: options.folder || 'uploads',
      allowed_formats: options.allowedFormats || ['jpg', 'jpeg', 'png', 'gif'],
      transformation: options.transformation || [{ quality: 'auto' }]
    }
  });

  // Tạo và cấu hình multer với storage
  return multer({
    storage: storage,
    limits: {
      fileSize: options.maxFileSize || 5 * 1024 * 1024 // Mặc định 5MB
    },
    fileFilter: (req, file, cb) => {
      // Kiểm tra loại file
      if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Chỉ chấp nhận file ảnh hoặc PDF'), false);
      }
    }
  });
};

// Middleware upload avatar
const avatarUpload = createUploadMiddleware({
  folder: 'avatars',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [
    { width: 400, height: 400, crop: 'fill' },
    { quality: 'auto:best' }
  ],
  maxFileSize: 2 * 1024 * 1024 // 2MB
});

// Middleware upload ảnh event
// Được phép upload 10 ảnh
const eventImageUpload = createUploadMiddleware({
  folder: 'posts',
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
  transformation: [{ quality: 'auto:best' }],
  maxFileSize: 10 * 1024 * 1024 // 10MB
}).array('images', 10);

// Middleware upload giấy tờ tổ chức
// Được phép upload 5 file (ảnh hoặc PDF)
const organizationDocumentUpload = createUploadMiddleware({
  folder: 'organization_documents',
  allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
  transformation: [{ quality: 'auto:best' }],
  maxFileSize: 5 * 1024 * 1024 // 5MB
}).array('documents', 10);

// Middleware upload certifcateQR
// Được phép upload 1 file (ảnh hoặc PDF)
const certificateQRupload = createUploadMiddleware({
  folder: 'certificate',
  allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
  transformation: [{ quality: 'auto:best' }],
  maxFileSize: 5 * 1024 * 1024 // 5MB
});


// Add debug logs
const debugOrganizationDocumentUpload = (req, res, next) => {
  console.log('Debug - Starting organization document upload middleware');
  console.log('Debug - Request headers:', req.headers);
  console.log('Debug - Request body:', req.body);
  
  organizationDocumentUpload(req, res, (err) => {
    if (err) {
      console.error('Debug - Upload error:', err);
      return res.status(400).json({
        status: 'error',
        message: 'Upload failed',
        error: err.message
      });
    }
    console.log('Debug - Upload successful');
    console.log('Debug - Files:', req.files);
    next();
  });
};

// Dữ liệu trả về từ cloudinary ví dụ
/*
{
   fieldname: 'avatar',
   originalname: 'myphoto.png',
   encoding: '7bit',
   mimetype: 'image/png',
   path: 'https://res.cloudinary.com/your_cloud/image/upload/v123456/avatars/abcd1234.png',
   filename: 'avatars/abcd1234',       // chính là public_id
   size: 12345
}
*/

// Middleware đã giúp upload nên không cần xử lý trong controller
// Chỉ cần lấy địa chỉ file lưu vào database => req.file.path (url)

module.exports = {
  avatarUpload,
  eventImageUpload,
  organizationDocumentUpload: debugOrganizationDocumentUpload,
  createUploadMiddleware
};