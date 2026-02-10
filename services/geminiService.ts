import { GoogleGenAI, Type } from "@google/genai";

export const getBreakAdvice = async (breakType: string) => {
  try {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      throw new Error("API Key not found");
    }
    
    const ai = new GoogleGenAI({ apiKey });
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
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.warn("Gemini Service Fallback:", error);
    return {
      tip: "Jangan lupa minum air putih dan regangkan otot Anda.",
      quote: "Istirahat sejenak adalah kunci produktivitas yang berkelanjutan."
    };
  }
};