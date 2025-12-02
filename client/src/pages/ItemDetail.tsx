import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsAPI } from '../services/api';
import { Item } from '../types';
import { MapPin, Calendar, User, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { useAuthStore } from '../store/authStore';
import AIMatchFinder from '../components/AIMatchFinder';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [claimResult, setClaimResult] = useState<any>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await itemsAPI.getById(id!);
      setItem(response.data);
      setAnswers(new Array(response.data.securityQuestions?.length || 0).fill(''));
    } catch (error) {
      console.error('Failed to fetch item:', error);
    }
  };

  const handleClaim = async () => {
    try {
      const response = await itemsAPI.claim(id!, answers);
      setClaimResult(response.data);
    } catch (error: any) {
      setClaimResult({ success: false, message: error.response?.data?.message || 'Claim failed' });
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  const handleDelete = async () => {
    try {
      await itemsAPI.delete(id!);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleStatusUpdate = async (status: string) => {
    try {
      await itemsAPI.update(id!, { status });
      fetchItem();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (!item) return <div className="text-center py-12">Loading...</div>;

  const isOwner = user?.id === item.userId._id;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden card-hover border border-gray-100">
        {item.images.length > 0 && (
          <div className="relative">
            <img 
              src={`http://localhost:5000${item.images[0]}`} 
              alt={item.title} 
              className="w-full h-96 object-cover" 
            />
            {item.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex space-x-2 overflow-x-auto">
                {item.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000${img}`}
                    alt={`${item.title} ${idx + 2}`}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 text-sm font-semibold rounded ${
              item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {item.type.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">{item.category}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
          <p className="text-gray-700 mb-6">{item.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin size={20} />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{item.location}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar size={20} />
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">{format(new Date(item.date), 'MMM d, yyyy')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <User size={20} />
              <div>
                <div className="text-sm text-gray-500">Posted by</div>
                <div className="font-medium">{item.userId.displayName}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="text-sm text-gray-500">Status</div>
              <div className="font-medium capitalize">{item.status}</div>
            </div>
          </div>

          {item.currentLocation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <div className="text-sm text-blue-800">Current Location: {item.currentLocation}</div>
            </div>
          )}

          {isOwner ? (
            <div className="space-y-4">
              <div className="flex space-x-4">
                {item.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate('claimed')}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                      ✓ Mark as Claimed
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('resolved')}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                      ✓ Mark as Resolved
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete Item</span>
              </button>
            </div>
          ) : user?.role === 'admin' ? (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-purple-900">Admin View - Contact Information</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail size={16} className="text-purple-600" />
                  <span className="font-medium">Email:</span>
                  <span>{item.contactInfo.email}</span>
                </div>
                {item.contactInfo.phone && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone size={16} className="text-purple-600" />
                    <span className="font-medium">Phone:</span>
                    <span>{item.contactInfo.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            item.type === 'found' && item.status === 'active' && (
              <button
                onClick={() => setShowClaimModal(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
              >
                Claim This Item
              </button>
            )
          )}
        </div>
      </div>

      {item.status === 'active' && (
        <div className="mt-6">
          <AIMatchFinder itemId={item._id} />
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Item?</h2>
              <p className="text-gray-600">
                This action cannot be undone. Please select a reason:
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <input
                  type="radio"
                  name="deleteReason"
                  value="found"
                  checked={deleteReason === 'found'}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">✓ Item Found/Returned</div>
                  <div className="text-sm text-gray-500">I found my lost item or returned the found item</div>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <input
                  type="radio"
                  name="deleteReason"
                  value="duplicate"
                  checked={deleteReason === 'duplicate'}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">Duplicate Post</div>
                  <div className="text-sm text-gray-500">I posted this item by mistake</div>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                <input
                  type="radio"
                  name="deleteReason"
                  value="other"
                  checked={deleteReason === 'other'}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">Other Reason</div>
                  <div className="text-sm text-gray-500">No longer needed</div>
                </div>
              </label>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  if (deleteReason) {
                    handleDelete();
                  } else {
                    alert('Please select a reason for deletion');
                  }
                }}
                disabled={!deleteReason}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  deleteReason
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteReason('');
                }}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Claim Item</h2>
            {!claimResult ? (
              <>
                <p className="text-gray-600 mb-4">
                  Please answer the security questions to verify ownership:
                </p>
                <div className="space-y-4">
                  {item.securityQuestions?.map((sq: any, index: number) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {sq.question}
                      </label>
                      <input
                        type="text"
                        value={answers[index]}
                        onChange={(e) => {
                          const newAnswers = [...answers];
                          newAnswers[index] = e.target.value;
                          setAnswers(newAnswers);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleClaim}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowClaimModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={`p-4 rounded-md mb-4 ${
                  claimResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {claimResult.message}
                </div>
                {claimResult.success && claimResult.contactInfo && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} />
                      <span>{claimResult.contactInfo.email}</span>
                    </div>
                    {claimResult.contactInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone size={16} />
                        <span>{claimResult.contactInfo.phone}</span>
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowClaimModal(false);
                    setClaimResult(null);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
