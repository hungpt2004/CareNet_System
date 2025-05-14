const OpenAI = require("openai");
require("dotenv").config();

// Initialize OpenAI
const openai = new OpenAI({
   apiKey: process.env.OPEN_API_KEY,
});

// Comprehensive list of inappropriate words and phrases
const inappropriateWords = [
   // Profanity
   "fuck", "shit", "ass", "bitch", "dick", "pussy", "cock", "cunt",
   // Vietnamese profanity
   "đụ", "địt", "đcm", "đm", "đéo", "đít", "đcm", "đcmn", "đcmnl", "đcmn", "đcmnl",
   // Offensive terms
   "ngu", "ngu ngốc", "đần", "đần độn", "ngu si", "đần độn", "ngu ngốc",
   // Hate speech
   "đồ ngu", "đồ ngốc", "đồ đần", "đồ đần độn", "đồ ngu si", "đồ đần độn", "đồ ngu ngốc",
   // Other inappropriate content
   "chết", "chết mẹ", "chết cha", "chết bà", "chết ông", "chết tiệt",
   "đồ khốn", "đồ khốn nạn", "đồ khốn kiếp", "đồ khốn nạn",
   "đồ chó", "đồ chó má", "đồ chó đẻ", "đồ chó má",
   "đồ chết tiệt", "đồ chết bầm", "đồ chết mẹ", "đồ chết cha"
];

/**
 * Simple content check as fallback
 * @param {string} content - The content to check
 * @returns {{isAppropriate: boolean, reason: string}}
 */
const simpleContentCheck = (content) => {
   // Convert content to lowercase and remove special characters
   const normalizedContent = content.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');

   // Check for inappropriate words
   const foundWords = inappropriateWords.filter(word => 
      normalizedContent.includes(word.toLowerCase())
   );
   
   if (foundWords.length > 0) {
      return {
         isAppropriate: false,
         reason: `Nội dung chứa từ ngữ không phù hợp: ${foundWords.join(", ")}`
      };
   }
   
   return {
      isAppropriate: true,
      reason: "Nội dung phù hợp"
   };
};

/**
 * Check content for inappropriate words using ChatGPT
 * @param {string} content - The content to check
 * @returns {Promise<{isAppropriate: boolean, reason: string}>} - Result of the check
 */
const checkContent = async (content) => {
   try {
      const prompt = `Please analyze the following content for inappropriate or offensive language in Vietnamese and English. 
      Respond with a JSON object containing:
      {
         "isAppropriate": boolean,
         "reason": string (explanation if inappropriate, or "Content is appropriate" if appropriate)
      }
      
      Content to analyze: "${content}"`;

      const response = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [
            {
               role: "system",
               content: "You are a content moderation assistant. Your task is to check content for inappropriate language in both Vietnamese and English, and provide a clear explanation if any issues are found."
            },
            {
               role: "user",
               content: prompt
            }
         ],
         temperature: 0.3,
         max_tokens: 150
      });

      // Extract and parse the response
      const result = response.choices[0].message.content;
      const parsedResult = JSON.parse(result);

      return {
         isAppropriate: parsedResult.isAppropriate,
         reason: parsedResult.reason
      };
   } catch (error) {
      console.error("Error checking content with OpenAI:", error);
      
      // Check if it's a quota error
      if (error.code === 'insufficient_quota' || error.status === 429) {
         console.log("OpenAI quota exceeded, falling back to simple content check");
         return simpleContentCheck(content);
      }
      
      // For other errors, also fall back to simple check
      console.log("OpenAI error, falling back to simple content check");
      return simpleContentCheck(content);
   }
};

/**
 * Check multiple content items in batch
 * @param {string[]} contents - Array of content to check
 * @returns {Promise<Array<{content: string, isAppropriate: boolean, reason: string}>>} - Results for each content
 */
const checkContentBatch = async (contents) => {
   try {
      const results = await Promise.all(
         contents.map(async (content) => {
            const checkResult = await checkContent(content);
            return {
               content,
               ...checkResult
            };
         })
      );
      return results;
   } catch (error) {
      console.error("Error in batch content check:", error);
      throw new Error("Failed to perform batch content check");
   }
};

module.exports = {
   checkContent,
   checkContentBatch
};
