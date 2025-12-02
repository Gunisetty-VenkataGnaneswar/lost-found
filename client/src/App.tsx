import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PostItem from './pages/PostItem';
import ItemDetail from './pages/ItemDetail';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  const { token } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
      
      <Route element={<Layout />}>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/post" element={token ? <PostItem /> : <Navigate to="/login" />} />
        <Route path="/items/:id" element={token ? <ItemDetail /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token ? <AdminPanel /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
