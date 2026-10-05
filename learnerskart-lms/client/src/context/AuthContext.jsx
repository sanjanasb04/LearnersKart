import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile on initial load with SSO & local storage sync
    const fetchUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token') || urlParams.get('sso_token');
      const urlRole = urlParams.get('role') || urlParams.get('sso_role');
      const urlEmail = urlParams.get('email') || urlParams.get('sso_email');

      if (urlToken) {
        localStorage.setItem('token', urlToken);
        localStorage.setItem('lk_token', urlToken);
      }

      let token = localStorage.getItem('token') || localStorage.getItem('lk_token');
      let savedUserStr = localStorage.getItem('user') || localStorage.getItem('lk_user');
      let localUser = null;

      if (savedUserStr) {
        try {
          localUser = JSON.parse(savedUserStr);
        } catch (e) {}
      }

      if (urlEmail || urlRole || urlToken || token || localUser) {
        const emailVal = urlEmail || localUser?.email || (urlRole === 'admin' ? 'admin@learnerskart.com' : 'learner@learnerskart.com');
        const rawName = localUser?.name || (emailVal ? emailVal.split('@')[0] : 'Learner User');
        const nameVal = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        
        // Strict Role Differentiation: Admin vs Learner
        const isExplicitAdmin = (urlRole === 'admin') || (localUser?.role === 'admin') || (emailVal.toLowerCase().includes('admin'));
        const derivedRole = isExplicitAdmin ? 'admin' : 'learner';
        
        const activeUser = {
          id: localUser?.id || localUser?._id || ('user_' + Date.now()),
          name: nameVal,
          email: emailVal,
          role: derivedRole,
          xp: localUser?.xp || (derivedRole === 'admin' ? 200 : 50),
          level: localUser?.level || 'Gold',
          streak: localUser?.streak || 5
        };

        localStorage.setItem('user', JSON.stringify(activeUser));
        localStorage.setItem('lk_user', JSON.stringify(activeUser));
        setUser(activeUser);
        setLoading(false);
        return;
      }

      setUser(null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('lk_token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('lk_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        if (res.data.xpAwarded > 0) {
          toast(`⚡ +${res.data.xpAwarded} XP Daily Login Streak!`, { icon: '🔥' });
        }
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, password, role, enrollCode) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/register', { name, email, phone, password, role, enrollCode });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setUser(res.data.user);
        toast.success('Registration successful!');
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const googleAuth = async (email, name, avatar) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/google', { email, name, avatar });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setUser(res.data.user);
        toast.success('Logged in with Google');
        return { success: true };
      }
    } catch (err) {
      toast.error('Google login failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const res = await api.put('/users/me', formData);
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Profile updated successfully');
        return { success: true };
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Profile update failed');
      return { success: false };
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Avatar uploaded successfully');
        return { success: true, avatar: res.data.avatar };
      }
    } catch (err) {
      toast.error('Avatar upload failed');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, googleAuth, updateProfile, uploadAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
