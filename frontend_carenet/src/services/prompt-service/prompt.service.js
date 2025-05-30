import axios from "axios";

export default class PromptService {
   async generatePrompt(prompt) {
      try {
         const response = await axios.post('http://localhost:5000/ai/generate-text', {
            contentData: prompt
         });

         if (response.data.status !== 'success') {
            throw new Error('Failed to generate prompt');
         }

         console.log('Front-end data gemini trả về: ', response.data);

         return response.data; // Assuming the API returns { response: "..." }
      } catch (error) {
         console.error('Error generating prompt:', error);
         throw error;
      }
   }
}