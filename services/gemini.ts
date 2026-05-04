
import { GoogleGenAI, Type, FunctionDeclaration, GenerateContentResponse } from "@google/genai";
import { ChatMessage, Property } from "../types";
import { PROPERTIES } from "../constants";

// Tool Definitions
const getPropertyDetailsTool: FunctionDeclaration = {
  name: 'getPropertyDetails',
  parameters: {
    type: Type.OBJECT,
    description: 'Get detailed information about a specific property in the Marbitech catalog.',
    properties: {
      propertyId: {
        type: Type.STRING,
        description: 'The unique ID of the property.',
      },
    },
    required: ['propertyId'],
  },
};

const calculateInvestmentROITool: FunctionDeclaration = {
  name: 'calculateROI',
  parameters: {
    type: Type.OBJECT,
    description: 'Calculate the expected Return on Investment for a property.',
    properties: {
      purchasePrice: { type: Type.NUMBER, description: 'The cost of the property (can be derived from formal quote).' },
      expectedAnnualRent: { type: Type.NUMBER, description: 'The expected annual rental income.' },
      appreciationRate: { type: Type.NUMBER, description: 'Expected annual appreciation percentage (default 15).' },
    },
    required: ['purchasePrice', 'expectedAnnualRent'],
  },
};

const tools = [{
  functionDeclarations: [getPropertyDetailsTool, calculateInvestmentROITool]
}, {
  googleSearch: {}
}];

/**
 * Generate a luxury property visualization using Gemini image generation models.
 */
export const generatePropertyVision = async (prompt: string): Promise<string | null> => {
  if (!process.env.API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-end architectural visualization of a luxury property in Nigeria: ${prompt}. Professional architectural render, 8K resolution, gold accents, elite real estate photography style, cinematic lighting, ultra-realistic textures.`
          }
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Property Vision Generation Error:", error);
    return null;
  }
};

export const streamGeminiResponse = async (
  history: ChatMessage[], 
  currentMessage: string,
  onChunk: (text: string, grounding?: any[]) => void,
  onToolCall: (name: string, args: any) => Promise<any>
) => {
  if (!process.env.API_KEY) {
    onChunk("API Key is missing. Please check your configuration.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are the Elite AI Concierge for Marbitech Properties and Investment Ltd (RC: 758318). 
      
      MARBITECH CONTEXT:
      - Founded: 2008.
      - Identity: Nigeria's leading integrated real estate and investment firm.
      - Official Email: marbitechproperties@gmail.com
      - Location: Lagos, Nigeria.
      
      VOICE RULES:
      - Always use plural pronouns (we, our, us) to reflect the firm's collective expertise.
      - Maintain a sophisticated, helpful, and professional tone.
      
      PRICING & ROI:
      - Property prices are primarily "Price on Request".
      - Use 'calculateROI' for investment projections.
      - Use 'googleSearch' for real-time market news and trends.`,
      tools: tools,
    }
  });

  try {
    const result = await chat.sendMessageStream({ message: currentMessage });
    
    for await (const chunk of result) {
      const text = chunk.text;
      const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (text) onChunk(text, groundingChunks);
      
      const calls = chunk.candidates?.[0]?.content?.parts?.filter(p => p.functionCall);
      if (calls && calls.length > 0) {
        for (const part of calls) {
          const fc = part.functionCall!;
          const toolResult = await onToolCall(fc.name, fc.args);
          
          const nextStream = await chat.sendMessageStream({
            message: JSON.stringify(toolResult) 
          });
          for await (const nextChunk of nextStream) {
            const nextText = nextChunk.text;
            if (nextText) onChunk(nextText);
          }
        }
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n\n*Connection disrupted. Please refresh or try again shortly.*");
  }
};

export const toolHandlers = {
  getPropertyDetails: async (args: { propertyId: string }) => {
    const property = PROPERTIES.find(p => p.id === args.propertyId);
    return property || { error: "Asset not found in our current portfolio." };
  },
  calculateROI: async (args: { purchasePrice: number, expectedAnnualRent: number, appreciationRate?: number }) => {
    const rate = args.appreciationRate || 15;
    const rentalYield = (args.expectedAnnualRent / args.purchasePrice) * 100;
    const totalROI = rentalYield + rate;
    return {
      rentalYield: `${rentalYield.toFixed(2)}%`,
      projectedAppreciation: `${rate}%`,
      totalAnnualReturn: `${totalROI.toFixed(2)}%`,
      note: "Based on prime Lagos/Abuja market benchmarks."
    };
  }
};
