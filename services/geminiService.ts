import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es l'assistant IA spécialisé pour le BIA (Brevet d'Initiation Aéronautique). 
Ton rôle est d'aider les élèves à comprendre les concepts complexes de l'aéronautique.
Réponds de manière pédagogique, précise et encourageante.
Utilise des termes techniques français appropriés.
`;

export const getGeminiResponse = async (userPrompt: string) => {
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || "";
  
  if (!apiKey) {
    return "L'assistant n'est pas configuré. Veuillez contacter un administrateur.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
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
    return "Une erreur est survenue lors de la communication avec l'assistant.";
  }
};