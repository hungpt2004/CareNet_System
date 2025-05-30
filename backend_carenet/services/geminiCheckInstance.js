const { GoogleGenerativeAI } = require("@google/generative-ai");
const asyncHandler = require("../middleware/asyncHandler");

//Create model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

exports.checkWordByGemini = asyncHandler(async (content) => {
  try {
    const prompt = `Kiểm tra nội dung sau có chứa từ ngữ không phù hợp hay không (trả lời chỉ "YES" hoặc "NO") * CHÚ Ý HÃY KIỂM TRA TRONG TẤT CẢ CÁC LOẠI NGÔN NGỮ: "${content}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    return responseText === "YES"; // Trả về true nếu có từ ngữ không phù hợp
  } catch (error) {
    console.error("Lỗi kiểm tra nội dung bằng Gemini:", error);
    return false; // Nếu lỗi xảy ra, mặc định không chặn nội dung
  }
});

exports.suggestEventByGemini = asyncHandler(async (content) => {
  
});

exports.chatboxWithGemini = asyncHandler(async(content) => {})

// ✅ BỎ asyncHandler - đây là nguyên nhân gây lỗi
exports.generateTextByGemini = async (prompt) => {
  console.log("Đang tạo nội dung bằng Gemini với prompt:", prompt);

  try {
    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return {
        status: 'fail',
        data: null,
        message: 'Prompt phải là một chuỗi text hợp lệ'
      };
    }

    // Gửi prompt đến Gemini
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    console.log("Nội dung được tạo thành công:", responseText);

    return {
      status: 'success',
      data: responseText,
      message: 'Tạo nội dung thành công'
    };

  } catch (error) {
    console.error("Lỗi tạo nội dung bằng Gemini:", error);

    return {
      status: 'fail',
      data: null,
      message: error.message || 'Có lỗi xảy ra khi tạo nội dung'
    };
  }
};