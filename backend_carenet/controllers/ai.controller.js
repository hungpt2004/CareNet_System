const asyncHandler = require('../middleware/asyncHandler');
const { generateTextByGemini } = require('../services/geminiCheckInstance');

exports.requestAIContent = asyncHandler(async (req, res) => {  
   const { contentData } = req.body;
   
   if (!contentData) {
      return res.status(400).json({
         status: 'fail',
         message: 'Content data is required',
      });
   }
   
   try {
      console.log('Calling generateTextByGemini with:', contentData);
      
      const result = await generateTextByGemini(contentData);
      
      console.log('Result from Gemini:', result);
      
      if (!result) {
         return res.status(500).json({
            status: 'fail',
            message: 'No response from Gemini service',
         });
      }

      const { status, data, message } = result;

      console.log('Câu trả lời từ Gemini:', data);

      if (status === 'success') {
         return res.status(200).json({
            status: 'success',
            message: 'AI content generated successfully',
            content: data,
         });
      } else {
         return res.status(500).json({
            status: 'fail',
            message: message || 'Failed to generate content from AI',
         });
      }

   } catch (error) {
      console.error('Error generating AI content:', error);
      return res.status(500).json({
         status: 'fail',
         message: 'Failed to generate AI content',
         error: error.message
      });
   }
});