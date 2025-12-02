import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzeImage = async (imageBase64: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analyze this image and provide a detailed description of the item shown. 
    Focus on: color, brand, type, distinctive features, condition. 
    Keep the description concise but informative for a lost and found system.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64
        }
      }
    ]);

    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return '';
  }
};

export const findSimilarItems = async (
  itemDescription: string,
  itemImage: string,
  candidateItems: Array<{ description: string; title: string; _id: string }>
): Promise<Array<{ itemId: string; similarity: number; reason: string }>> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const candidatesText = candidateItems
      .map((item, idx) => `${idx + 1}. ${item.title}: ${item.description}`)
      .join('\n');

    const prompt = `You are helping match lost and found items. 
    
    Target Item: ${itemDescription}
    
    Candidate Items:
    ${candidatesText}
    
    Analyze which candidate items might match the target item. 
    Return a JSON array of matches with format:
    [{"index": 1, "similarity": 85, "reason": "Both are black iPhones with similar features"}]
    
    Only include items with similarity > 60%. Return empty array [] if no good matches.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const matches = JSON.parse(jsonMatch[0]);
    
    return matches.map((match: any) => ({
      itemId: candidateItems[match.index - 1]._id,
      similarity: match.similarity,
      reason: match.reason
    }));
  } catch (error) {
    console.error('Gemini matching error:', error);
    return [];
  }
};

export const extractItemDetails = async (imageBase64: string): Promise<{
  suggestedCategory?: string;
  suggestedTitle?: string;
  detectedText?: string;
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analyze this image and extract:
    1. Item category (Electronics, Clothing, Books, IDs/Cards, Keys, Bags, Accessories, or Other)
    2. Suggested title (short, descriptive)
    3. Any visible text (brand names, labels, etc.)
    
    Return as JSON: {"category": "...", "title": "...", "text": "..."}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64
        }
      }
    ]);

    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {};
  } catch (error) {
    console.error('Gemini extraction error:', error);
    return {};
  }
};
