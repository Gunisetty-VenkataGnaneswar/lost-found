import { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import { adminAPI } from '../services/adminApi';
import { Item } from '../types';
import { format } from 'date-fns';
import { Users, Package, TrendingUp, AlertCircle, Trash2, CheckCircle, XCircle, UserX } from 'lucide-react';

export default function AdminPanel() {
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalUsers: 0,
    lostItems: 0,
    foundItems: 0,
    resolvedItems: 0,
    activeItems: 0
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'users'>('overview');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; email: string; name: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsRes, usersRes] = await Promise.all([
        itemsAPI.getAll(),
        adminAPI.getAllUsers()
      ]);

      const allItems = itemsRes.data.items;
      setItems(allItems);
      setUsers(usersRes.data.users || []);

      // Calculate stats
      setStats({
        totalItems: allItems.length,
        totalUsers: usersRes.data.users?.length || 0,
        lostItems: allItems.filter((i: Item) => i.type === 'lost').length,
        foundItems: allItems.filter((i: Item) => i.type === 'found').length,
        resolvedItems: allItems.filter((i: Item) => i.status === 'resolved').length,
        activeItems: allItems.filter((i: Item) => i.status === 'active').length
      });
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemsAPI.delete(itemId);
        fetchData();
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    const action = currentStatus ? 'suspend' : 'activate';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await adminAPI.toggleUserStatus(userId, !currentStatus);
        fetchData();
      } catch (error) {
        console.error('Failed to toggle user status:', error);
        alert('Failed to update user status. Please try again.');
      }
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string, userName: string) => {
    setUserToDelete({ id: userId, email: userEmail, name: userName });
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await adminAPI.deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      fetchData();
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      alert(error.response?.data?.message || 'Failed to delete user. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-purple-100">Manage users, items, and monitor system activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Package className="text-blue-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalItems}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Users className="text-green-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Users</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Registered Users</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Lost</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.lostItems}</div>
          <div className="text-sm text-gray-600">Lost Items</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Found</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.foundItems}</div>
          <div className="text-sm text-gray-600">Found Items</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'items'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📦 Manage Items
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            👥 Manage Users
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Item Status Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Active Items</span>
                      <span className="font-bold text-blue-600">{stats.activeItems}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Resolved Items</span>
                      <span className="font-bold text-green-600">{stats.resolvedItems}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Success Rate</span>
                      <span className="font-bold text-purple-600">
                        {stats.totalItems > 0 ? Math.round((stats.resolvedItems / stats.totalItems) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">System running smoothly</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{stats.totalItems} items in database</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{stats.totalUsers} registered users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Items Tab */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">All Items</h3>
                <span className="text-sm text-gray-600">{items.length} total items</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {item.images[0] && (
                        <img
                          src={`http://localhost:5000${item.images[0]}`}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full ${
                            item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                          <span>{format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
                          <span>by {item.userId.displayName}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">All Users</h3>
                <span className="text-sm text-gray-600">{users.length} total users</span>
              </div>
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.displayName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{user.displayName}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-blue-600 font-medium">📱 {user.phoneNumber || 'No phone'}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.isActive ? 'Active' : 'Suspended'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                        className={`p-2 rounded-lg transition-all ${
                          user.isActive
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.isActive ? 'Suspend User' : 'Activate User'}
                      >
                        {user.isActive ? <XCircle size={20} /> : <CheckCircle size={20} />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id, user.email, user.displayName)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete User Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scaleIn">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <UserX className="text-red-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete User?</h2>
              <p className="text-gray-600">
                This action cannot be undone!
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="text-red-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
                <div className="text-sm text-red-800">
                  <p className="font-semibold mb-2">This will permanently delete:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>User: <strong>{userToDelete.name}</strong></li>
                    <li>Email: <strong>{userToDelete.email}</strong></li>
                    <li>All items posted by this user</li>
                    <li>All user data and history</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={confirmDeleteUser}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Yes, Delete User
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
