import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// In a real app, ensure process.env.API_KEY is defined in your build environment.
// For this MVP demo, we assume the environment variable is injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'DEMO_KEY_PLACEHOLDER' });

export const getCoachAdvice = async (
  userContext: string, 
  personality: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI Coach: (Demo Mode) Great job! Keep pushing your limits. Ensure you're hydrating well.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a fitness coach with a ${personality} personality. 
                 The user just asked or did: ${userContext}. 
                 Provide a short, punchy, motivating response under 50 words.`,
    });
    
    return response.text || "Keep moving forward!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to Neural Link unstable. Keep training.";
  }
};

export const analyzeForm = async (imageData: string): Promise<string> => {
   if (!process.env.API_KEY) {
    return "AI Analysis: (Demo) Your squat depth is good, but try to keep your chest up more.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageData } },
          { text: "Analyze the exercise form in this image. Give 3 bullet points of feedback." }
        ]
      }
    });
    return response.text || "Analysis complete.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Visual sensors calibrating. Try again.";
  }
};
