import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es l'assistant IA spécialisé pour le BIA (Brevet d'Initiation Aéronautique). 
Ton rôle est d'aider les élèves à comprendre les concepts complexes de l'aéronautique : 
Météorologie, Aérodynamique, Connaissance des aéronefs, Navigation, et Histoire de l'aviation.
Réponds de manière pédagogique, précise et encourageante.
Utilise des termes techniques français appropriés.
Si on te pose une question hors sujet, rappelle poliment ton rôle d'expert BIA.
`;

export const getGeminiResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    
    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer.";
  }
};