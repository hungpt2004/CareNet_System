// cloudinaryUpload.js
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
require('dotenv').config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload một ảnh lên Cloudinary không cần lưu tạm vào disk
 * @param {Buffer|String} fileBuffer - Buffer của file ảnh hoặc URL/Base64 string
 * @param {Object} options - Các tùy chọn upload
 * @param {String} options.folder - Thư mục lưu trữ trên Cloudinary
 * @param {Array} options.allowedFormats - Các định dạng file cho phép
 * @param {Object} options.transformation - Các biến đổi ảnh
 * @returns {Promise<Object>} - Thông tin về ảnh đã upload
 */
const uploadSingleImage = async (fileBuffer, options = {}) => {
  try {
    // Thiết lập các tùy chọn mặc định
    const uploadOptions = {
      folder: options.folder || 'uploads',
      allowed_formats: options.allowedFormats || ['jpg', 'jpeg', 'png', 'gif'],
      resource_type: 'auto',
      transformation: options.transformation || [{ quality: 'auto' }]
    };

    // Tạo một promise để xử lý upload
    return new Promise((resolve, reject) => {
      // Nếu là string (URL hoặc Base64), upload trực tiếp
      if (typeof fileBuffer === 'string') {
        cloudinary.uploader.upload(
          fileBuffer,
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      } 
      // Nếu là buffer, sử dụng stream
      else {
        // Tạo stream từ buffer
        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        // Chuyển buffer thành stream và pipe đến upload stream
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);
        bufferStream.pipe(stream);
      }
    });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Upload nhiều ảnh lên Cloudinary
 * @param {Array<Buffer|String>} filesArray - Mảng các buffer hoặc URL/Base64 của ảnh
 * @param {Object} options - Các tùy chọn upload
 * @returns {Promise<Array<Object>>} - Mảng thông tin về các ảnh đã upload
 */
const uploadMultipleImages = async (filesArray, options = {}) => {
  try {
    // Kiểm tra nếu filesArray không phải là mảng
    if (!Array.isArray(filesArray)) {
      throw new Error('Files must be provided as an array');
    }

    // Upload nhiều ảnh song song
    const uploadPromises = filesArray.map(file => uploadSingleImage(file, options));
    
    // Chờ tất cả uploads hoàn thành
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images to Cloudinary:', error);
    throw new Error(`Failed to upload images: ${error.message}`);
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  cloudinary // Export cloudinary instance để có thể sử dụng các API khác
};