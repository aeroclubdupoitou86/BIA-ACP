import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es l'assistant IA spécialisé pour le BIA (Brevet d'Initiation Aéronautique). 
Ton rôle est d'aider les élèves à comprendre les concepts complexes de l'aéronautique (météo, aérodynamique, navigation, etc.).
Réponds de manière pédagogique, précise et encourageante.
Utilise des termes techniques français appropriés.
Si on te pose une question hors sujet aéronautique, rappelle poliment ton rôle de copilote BIA.
`;

export const getGeminiResponse = async (userPrompt: string) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "L'assistant n'est pas configuré (Clé API manquante). Veuillez contacter un administrateur.";
  }

  // Initialisation correcte selon les nouvelles directives
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    
    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant. Vérifiez la connexion.";
  }
};