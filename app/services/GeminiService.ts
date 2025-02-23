import { GoogleGenerativeAI } from "@google/generative-ai";
import "react-native-get-random-values"; // React Native support ekata oni

const API_KEY = "AIzaSyAv4LhIhdDt4yuN5fnHa5M5-42LGg2bZxY"; // API key eka mekata daganna

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text(); // AI response return karanawa
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process that request.";
  }
};
