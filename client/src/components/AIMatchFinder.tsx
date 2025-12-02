import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ExternalLink } from 'lucide-react';
import { aiAPI } from '../services/aiService';

interface Match {
  itemId: string;
  similarity: number;
  reason: string;
  item: any;
}

interface AIMatchFinderProps {
  itemId: string;
}

export default function AIMatchFinder({ itemId }: AIMatchFinderProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findMatches();
  }, [itemId]);

  const findMatches = async () => {
    try {
      const response = await aiAPI.findMatches(itemId);
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Failed to find matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 text-blue-600">
          <Sparkles className="animate-pulse" />
          <span>AI is searching for similar items...</span>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
        <Sparkles className="mx-auto mb-2 text-gray-400" size={32} />
        <p>No similar items found at this time</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          AI-Powered Similar Items ({matches.length})
        </h3>
      </div>
      
      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.itemId}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <Link
                to={`/items/${match.itemId}`}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>{match.item.title}</span>
                <ExternalLink size={14} />
              </Link>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                {match.similarity}% match
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{match.item.description}</p>
            <p className="text-xs text-gray-500 italic">
              AI Reason: {match.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
