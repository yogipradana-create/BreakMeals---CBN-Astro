
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client with named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBreakAdvice = async (breakType: string) => {
  try {
    // Calling generateContent with the model name and prompt using recommended responseSchema
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berikan 1 tips kesehatan singkat dan 1 kutipan motivasi untuk karyawan yang sedang mengambil istirahat "${breakType}". Jawab dalam Bahasa Indonesia yang profesional dan ramah.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tip: {
              type: Type.STRING,
              description: 'Tips kesehatan singkat.',
            },
            quote: {
              type: Type.STRING,
              description: 'Kutipan motivasi.',
            },
          },
          required: ["tip", "quote"],
        },
      }
    });
    
    // Accessing .text property directly as it is a getter
    const jsonStr = response.text || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("System Service Error:", error);
    return {
      tip: "Jangan lupa minum air putih dan regangkan otot Anda.",
      quote: "Istirahat sejenak adalah kunci produktivitas yang berkelanjutan."
    };
  }
};
