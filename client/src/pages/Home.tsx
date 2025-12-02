import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemsAPI } from '../services/api';
import { Item } from '../types';
import { Search, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const categories = ['Electronics', 'Clothing', 'Books', 'IDs/Cards', 'Keys', 'Bags', 'Accessories', 'Other'];

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [search, type, category]);

  const fetchItems = async () => {
    try {
      const params: any = {};
      if (search) params.search = search;
      if (type) params.type = type;
      if (category) params.category = category;
      
      const response = await itemsAPI.getAll(params);
      setItems(response.data.items);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-slideInLeft glass">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Find Your Lost Items
        </h2>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
          >
            <option value="">All Types</option>
            <option value="lost">🔴 Lost Items</option>
            <option value="found">🟢 Found Items</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Link
              key={item._id}
              to={`/items/${item._id}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover border border-gray-100 animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.images[0] ? (
                <div className="relative">
                  <img
                    src={`http://localhost:5000${item.images[0]}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                      item.type === 'lost' 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    }`}>
                      {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} className="text-blue-500" />
                    <span className="font-medium">{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} className="text-purple-500" />
                    <span className="font-medium">{format(new Date(item.date), 'MMM d')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No items found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
