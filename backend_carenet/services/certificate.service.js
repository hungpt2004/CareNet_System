const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cloudinary = require('../services/uploadCloundinary');
const fs = require('fs');
const path = require('path');

// Khởi tạo Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCertificateHTML = async (data) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Tạo một mẫu HTML cho chứng chỉ với các thông tin sau:
    - Tiêu đề: ${data.title}
    - Nội dung: ${data.description}
    - Tên người nhận: ${data.recipientName}
    - Ngày cấp: ${data.issueDate}
    - Mẫu thiết kế: ${data.template}
    
    Yêu cầu:
    1. Sử dụng HTML và CSS để tạo một chứng chỉ đẹp và chuyên nghiệp
    2. Thêm các hiệu ứng và border phù hợp
    3. Đảm bảo responsive và có thể in được
    4. Thêm vị trí cho logo và chữ ký
    5. Sử dụng font chữ phù hợp cho chứng chỉ
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

const generateCertificatePDF = async (html, outputPath) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Đợi cho các font và hình ảnh load xong
  await page.evaluateHandle('document.fonts.ready');
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  await browser.close();
  
  // Lưu file PDF tạm thời
  fs.writeFileSync(outputPath, pdf);
  return outputPath;
};

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'certificates',
      resource_type: 'auto'
    });
    
    // Xóa file tạm sau khi upload
    fs.unlinkSync(filePath);
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

const generateCertificate = async (data) => {
  try {
    // Tạo HTML từ Gemini
    const html = await generateCertificateHTML(data);
    
    // Tạo đường dẫn tạm thời cho file PDF
    const tempPath = path.join(__dirname, '../temp', `certificate-${Date.now()}.pdf`);
    
    // Tạo PDF từ HTML
    await generateCertificatePDF(html, tempPath);
    
    // Upload lên Cloudinary
    const certificateUrl = await uploadToCloudinary(tempPath);
    
    return {
      success: true,
      certificateUrl
    };
  } catch (error) {
    console.error('Error generating certificate:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  generateCertificate
}; 