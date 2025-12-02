import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { aiAPI, convertImageToBase64 } from '../services/aiService';

interface AIImageAnalyzerProps {
  onAnalysisComplete: (data: {
    suggestedTitle?: string;
    suggestedCategory?: string;
    analysis?: string;
  }) => void;
}

export default function AIImageAnalyzer({ onAnalysisComplete }: AIImageAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string>('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Analyze with AI
    setAnalyzing(true);
    try {
      const base64 = await convertImageToBase64(file);
      const response = await aiAPI.analyzeImage(base64);
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-blue-500 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          AI-Powered Image Analysis
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload an image and let AI help describe your item
        </p>
        
        <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Upload size={16} className="mr-2" />
          {analyzing ? 'Analyzing...' : 'Upload Image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={analyzing}
          />
        </label>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
          </div>
        )}

        {analyzing && (
          <div className="mt-4">
            <div className="animate-pulse text-blue-600">
              Analyzing image with AI...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
