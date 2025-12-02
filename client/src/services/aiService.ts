import api from './api';

export const aiAPI = {
  analyzeImage: (imageBase64: string) => 
    api.post('/ai/analyze-image', { imageBase64 }),
  
  findMatches: (itemId: string) => 
    api.get(`/ai/find-matches/${itemId}`)
};

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
