import { GoogleGenAI, Type } from "@google/genai";

/**
 * Mendapatkan saran kesehatan menggunakan model Gemini 3 Pro.
 */
export const getBreakAdvice = async (breakType: string) => {
  try {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      console.warn("API Key missing, using local fallback.");
      return getFallbackAdvice();
    }
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Berikan 1 tips kesehatan singkat dan 1 kutipan motivasi kerja untuk karyawan gudang yang sedang istirahat "${breakType}". Jawab dalam Bahasa Indonesia yang profesional dan ramah.`,
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
    console.error("Gemini service error:", error);
    return getFallbackAdvice();
  }
};

const getFallbackAdvice = () => ({
  tip: "Minum air putih yang cukup dan regangkan otot punggung Anda sejenak.",
  quote: "Istirahat sejenak adalah investasi untuk produktivitas yang lebih besar."
});