import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { itemsAPI } from '../services/api';
import { Plus, X } from 'lucide-react';
import AIImageAnalyzer from '../components/AIImageAnalyzer';

const categories = ['Electronics', 'Clothing', 'Books', 'IDs/Cards', 'Keys', 'Bags', 'Accessories', 'Other'];
const locations = ['Library', 'Student Center', 'Gym', 'Cafeteria', 'Parking Lot', 'Classroom Building', 'Dorm', 'Other'];

export default function PostItem() {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [securityQuestions, setSecurityQuestions] = useState([{ question: '', answer: '' }]);
  const [showAI, setShowAI] = useState(false);
  const navigate = useNavigate();
  const itemType = watch('type');

  const handleAIAnalysis = (data: any) => {
    if (data.suggestedTitle) setValue('title', data.suggestedTitle);
    if (data.suggestedCategory) setValue('category', data.suggestedCategory);
    if (data.analysis) setValue('description', data.analysis);
  };

  const addSecurityQuestion = () => {
    if (securityQuestions.length < 5) {
      setSecurityQuestions([...securityQuestions, { question: '', answer: '' }]);
    }
  };

  const removeSecurityQuestion = (index: number) => {
    if (securityQuestions.length > 1) {
      setSecurityQuestions(securityQuestions.filter((_, i) => i !== index));
    }
  };

  const updateSecurityQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...securityQuestions];
    updated[index][field] = value;
    setSecurityQuestions(updated);
  };

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setSelectedImages([...selectedImages, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      // Append security questions if lost item
      if (itemType === 'lost') {
        formData.append('securityQuestions', JSON.stringify(securityQuestions));
      }

      // Append images
      selectedImages.forEach(image => {
        formData.append('images', image);
      });

      await itemsAPI.create(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to post item:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Post an Item</h1>
        <button
          type="button"
          onClick={() => setShowAI(!showAI)}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
        >
          <span>{showAI ? 'Hide' : 'Show'} AI Helper</span>
        </button>
      </div>

      {showAI && (
        <div className="mb-6">
          <AIImageAnalyzer onAnalysisComplete={handleAIAnalysis} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-2xl rounded-2xl p-6 space-y-6 border border-gray-100 glass">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="lost"
                {...register('type', { required: true })}
                className="mr-2"
              />
              Lost Item
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="found"
                {...register('type', { required: true })}
                className="mr-2"
              />
              Found Item
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            {...register('title', { required: true, maxLength: 100 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Black iPhone 13"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            {...register('category', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            {...register('description', { required: true, maxLength: 1000 })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide detailed description..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date {itemType === 'lost' ? 'Lost' : 'Found'}
            </label>
            <input
              type="date"
              {...register('date', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              {...register('location', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {itemType === 'found' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
            <input
              type="text"
              {...register('currentLocation')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Where is the item now?"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
          <input
            type="tel"
            {...register('phoneNumber')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (Max 5)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center py-4"
            >
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm text-gray-600">Click to upload images</span>
              <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB each</span>
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {itemType === 'lost' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Security Questions (for claim verification)
            </label>
            <div className="space-y-3">
              {securityQuestions.map((sq, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Question {index + 1}</span>
                    {securityQuestions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSecurityQuestion(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={sq.question}
                    onChange={(e) => updateSecurityQuestion(index, 'question', e.target.value)}
                    placeholder="e.g., What color is it?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={sq.answer}
                    onChange={(e) => updateSecurityQuestion(index, 'answer', e.target.value)}
                    placeholder="Answer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              {securityQuestions.length < 5 && (
                <button
                  type="button"
                  onClick={addSecurityQuestion}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Plus size={16} />
                  <span>Add Question</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all btn-gradient ripple"
          >
            🚀 Post Item
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
