const Feedback = require("../models/feedback.model");
const asyncHandler = require("../middleware/asyncHandler");
const { checkContent } = require("../services/chatgptCheckInstance");

// Define the async function
exports.createFeedback = asyncHandler (async (req, res) => {
   const { rating, comment } = req.body;
   const { id } = req.params;
   const currentUser = req.user.user;
 
   try {
     // Check content with OpenAI before creating feedback
     const contentCheck = await checkContent(comment);
     if (!contentCheck.isAppropriate) {
       return res.status(400).json({
         status: "fail",
         message: "Nội dung không phù hợp",
         reason: contentCheck.reason,
       });
     }
 
     // Create feedback if content is appropriate
     const feedback = await Feedback.create({
       event: id,
       user: currentUser._id,
       rating,
       comment,
     });
 
     return res.status(201).json({
       status: "success",
       message: "Tạo đánh giá thành công",
       feedback: feedback,
     });
   } catch (error) {
     console.error("Error creating feedback:", error);
     return res.status(500).json({
       status: "fail",
       message: "Lỗi khi tạo đánh giá",
     });
   }
 })

