import { GoogleGenAI, Type } from "@google/genai";

/**
 * Service untuk mendapatkan saran kesehatan internal.
 */
export const getBreakAdvice = async (breakType: string) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key is missing, using fallback advice.");
      throw new Error("API Key not found");
    }
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Berikan 1 tips kesehatan singkat dan 1 kutipan motivasi untuk karyawan gudang yang sedang mengambil istirahat "${breakType}". Jawab dalam Bahasa Indonesia yang profesional, ramah, dan membangkitkan semangat.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tip: {
              type: Type.STRING,
              description: 'Tips kesehatan singkat untuk pekerja warehouse.',
            },
            quote: {
              type: Type.STRING,
              description: 'Kutipan motivasi profesional.',
            },
          },
          required: ["tip", "quote"],
        },
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Service error:", error);
    return {
      tip: "Regangkan otot tangan dan punggung Anda sejenak untuk menghindari kaku otot.",
      quote: "Keselamatan dan kesehatan Anda adalah prioritas utama kami di warehouse."
    };
  }
};