
import { GoogleGenAI, Type } from "@google/genai";

// API Key tetap menggunakan env variable agar aman
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Service untuk mendapatkan saran kesehatan internal.
 * Menggunakan engine cerdas untuk memberikan tips yang relevan.
 */
export const getBreakAdvice = async (breakType: string) => {
  try {
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
    
    const jsonStr = response.text || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    // Fallback data jika service mengalami gangguan
    return {
      tip: "Jangan lupa minum air putih dan regangkan otot Anda sejenak.",
      quote: "Kualitas kerja ditentukan oleh kualitas istirahat Anda."
    };
  }
};
