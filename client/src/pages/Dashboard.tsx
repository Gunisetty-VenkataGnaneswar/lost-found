import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemsAPI } from '../services/api';
import { Item } from '../types';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';

export default function Dashboard() {
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const response = await itemsAPI.getAll();
      const filtered = response.data.items.filter((item: Item) => item.userId._id === user?.id);
      setMyItems(filtered);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDelete = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        await itemsAPI.delete(itemId);
        // Refresh the list
        fetchMyItems();
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const lostItems = myItems.filter(item => item.type === 'lost');
  const foundItems = myItems.filter(item => item.type === 'found');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Manage your posted items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-xl text-white card-hover animate-slideInLeft">
          <div className="text-4xl font-bold mb-2 animate-float">{myItems.length}</div>
          <div className="text-blue-100">Total Items Posted</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-2xl shadow-xl text-white card-hover animate-scaleIn" style={{ animationDelay: '0.1s' }}>
          <div className="text-4xl font-bold mb-2 animate-float" style={{ animationDelay: '0.5s' }}>{lostItems.length}</div>
          <div className="text-red-100">Lost Items</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl text-white card-hover animate-slideInRight">
          <div className="text-4xl font-bold mb-2 animate-float" style={{ animationDelay: '1s' }}>{foundItems.length}</div>
          <div className="text-green-100">Found Items</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🔴 My Lost Items
        </h2>
        {lostItems.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500 border border-gray-100">
            <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">No lost items posted yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lostItems.map(item => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <Link to={`/items/${item._id}`} className="flex-1">
                    <div className="flex space-x-4">
                      {item.images[0] && (
                        <img
                          src={`http://localhost:5000${item.images[0]}`}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📍 {item.location}</span>
                          <span>📅 {format(new Date(item.date), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      item.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickDelete(item._id);
                      }}
                      className="px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          🟢 My Found Items
        </h2>
        {foundItems.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500 border border-gray-100">
            <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">No found items posted yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {foundItems.map(item => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <Link to={`/items/${item._id}`} className="flex-1">
                    <div className="flex space-x-4">
                      {item.images[0] && (
                        <img
                          src={`http://localhost:5000${item.images[0]}`}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📍 {item.location}</span>
                          <span>📅 {format(new Date(item.date), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      item.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickDelete(item._id);
                      }}
                      className="px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
