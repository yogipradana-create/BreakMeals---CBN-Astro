
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Service untuk mendapatkan saran kesehatan internal.
 * Inisialisasi dilakukan di dalam fungsi untuk memastikan API_KEY terbaru digunakan.
 */
export const getBreakAdvice = async (breakType: string) => {
  try {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      throw new Error("API Key is not configured");
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
    
    const jsonStr = response.text || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.warn("AI Service fallback triggered:", error);
    // Fallback data jika service mengalami gangguan atau API key tidak ada
    return {
      tip: "Jangan lupa minum air putih dan regangkan otot Anda sejenak.",
      quote: "Kualitas kerja ditentukan oleh kualitas istirahat Anda."
    };
  }
};
