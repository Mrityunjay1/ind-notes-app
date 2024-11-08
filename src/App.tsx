import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Notes } from './pages/Notes';
import { Layout } from './components/Layout';
import { ToastContainer, useToast } from './components/ToastContainer';
import { User } from './types';

export function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const { toasts, show, remove } = useToast();

  const handleAuth = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    show('Successfully logged in!', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    show('Successfully logged out', 'info');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={user ? <Navigate to="/notes" /> : <Navigate to="/login" />} />
          <Route path="login" element={!user ? <Login onAuth={handleAuth} /> : <Navigate to="/notes" />} />
          <Route path="register" element={!user ? <Register onAuth={handleAuth} /> : <Navigate to="/notes" />} />
          <Route path="notes" element={user ? <Notes user={user} showToast={show} /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} onRemove={remove} />
    </BrowserRouter>
  );
}