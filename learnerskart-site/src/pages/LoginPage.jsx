import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [loginNotice, setLoginNotice] = useState('');
  useEffect(() => {
    try {
      const notice = localStorage.getItem('lk_login_notice');
      if (notice) {
        setLoginNotice(notice);
        localStorage.removeItem('lk_login_notice');
      }
    } catch(e) {}
  }, []);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  // If already logged in, redirect to target or dashboard
  useEffect(() => {
    if (user) {
      const searchParams = new URLSearchParams(location.search);
      const redirectParam = searchParams.get('redirect');
      const token = localStorage.getItem('token') || localStorage.getItem('lk_token') || '';
      const email = user?.email || '';
      const role = user?.role || 'learner';
      const query = `?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`;
      
      const baseLMS = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? 'http://localhost:5174'
        : 'https://lms.learnerskart.com';

      // Checkout redirect stays on main site
      if (redirectParam === 'checkout') {
        navigate('/checkout', { replace: true });
        return;
      }
      if (redirectParam === 'free-resources') {
        window.location.href = `${baseLMS}/lms/free-resources${query}`;
        return;
      }
      if (redirectParam === 'lms' || redirectParam === 'my-courses') {
        window.location.href = `${baseLMS}/lms/my-courses${query}`;
        return;
      }

      // Default: go to LMS dashboard
      window.location.href = `${baseLMS}/lms/my-courses${query}`;
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.message);
    }
  };

  // Google SSO Trigger
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setError('');
    setShowGooglePopup(true);
    setShowCustomForm(false);
  };

  const handleSelectGoogleAccount = async (selectedName, selectedEmail) => {
    setShowGooglePopup(false);
    setLoading(true);
    setError('');
    const mockGooglePassword = 'googlepassword123';

    try {
      let res = await login(selectedEmail, mockGooglePassword);

      if (!res.success) {
        const regRes = await register({
          name: selectedName || 'LearnersKart User',
          email: selectedEmail,
          password: mockGooglePassword,
          phone: '9876543210',
          country: 'India',
          company: 'Google SSO Inc',
          designation: 'Professional Learner'
        });

        if (!regRes.success) {
          setError(regRes.message || 'Google SSO login failed.');
          setLoading(false);
          return;
        }
      }

      const searchParams = new URLSearchParams(location.search);
      const redirectParam = searchParams.get('redirect');
      const token = localStorage.getItem('token') || localStorage.getItem('lk_token') || '';
      const email = user?.email || '';
      const role = user?.role || 'learner';
      const query = `?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`;
      
      const baseLMS = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? 'http://localhost:5174'
        : 'https://lms.learnerskart.com';

      if (redirectParam === 'checkout') {
        navigate('/checkout', { replace: true });
        return;
      }
      if (redirectParam === 'free-resources') {
        window.location.href = `${baseLMS}/lms/free-resources${query}`;
        return;
      }
      if (redirectParam === 'lms' || redirectParam === 'my-courses') {
        window.location.href = `${baseLMS}/lms/my-courses${query}`;
        return;
      }

      window.location.href = `${baseLMS}/lms/my-courses${query}`;
    } catch (err) {
      console.error('Google Login Error:', err);
      setError('Google SSO encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    const inferredName = customName.trim() || customEmail.split('@')[0].replace(/\./g, ' ');
    handleSelectGoogleAccount(inferredName, customEmail.trim());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-100 p-8 sm:p-10 rounded-2xl shadow-xl">
        
        {/* Header Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group justify-center mx-auto mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a3d91] to-[#f97316] flex items-center justify-center text-white font-black text-lg shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              LK
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0a3d91] font-sans">
              Learners<span className="text-[#f97316]">Kart</span>
            </span>
          </Link>
          <h2 className="mt-6 text-2xl font-extrabold text-textdark">Welcome Back</h2>
          <p className="mt-1.5 text-xs text-textmuted font-semibold leading-none">
            Log in to continue your professional certification journey
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs font-semibold text-left">
            {error}
          </div>
        )}

        {/* Login Form */}
                {loginNotice && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-xs font-bold mb-4 text-center">
            🔔 {loginNotice}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
          {/* Email */}
          <div>
            <label className="block font-bold text-slate-600 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary px-4 py-3 pl-10 rounded-xl outline-none text-xs sm:text-sm font-semibold transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-bold text-slate-600 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="font-bold text-accent hover:underline text-[11px]"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary px-4 py-3 pl-10 pr-10 rounded-xl outline-none text-xs sm:text-sm font-semibold transition-all"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 text-sm flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2 font-bold">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent inline-block"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider OR */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
            OR
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-slate-50 text-textdark border border-slate-200 font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        {/* Bottom sign up helper */}
        <p className="text-center text-xs text-textmuted font-semibold pt-4">
          Don't have an account?{' '}
          <Link to="/register" className="font-extrabold text-accent hover:underline pl-0.5">
            Create Account
          </Link>
        </p>

      </div>

      {/* Standard Google Account Selector Modal */}
      {showGooglePopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white w-full max-w-[380px] p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-100 text-center relative select-none animate-scale-up">
            
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setShowGooglePopup(false)}
              className="absolute right-4.5 top-4.5 text-slate-400 hover:text-slate-600 text-2xl font-semibold leading-none"
            >
              &times;
            </button>

            {/* Google Logo */}
            <svg className="w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>

            <h3 className="text-lg font-bold text-slate-800 leading-snug">Sign in with Google</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">to continue to LearnersKart</p>

            {!showCustomForm ? (
              /* Account Chooser List */
              <div className="space-y-2.5 text-left">
                {/* Account 1 */}
                <button
                  type="button"
                  onClick={() => handleSelectGoogleAccount('Learner Account', 'learner.user@gmail.com')}
                  className="w-full flex items-center gap-3 p-3 border border-slate-100 hover:border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                    L
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">Learner Account</p>
                    <p className="text-[10px] text-slate-400 truncate">learner.user@gmail.com</p>
                  </div>
                </button>

                {/* Account 2 */}
                <button
                  type="button"
                  onClick={() => handleSelectGoogleAccount('Student Account', 'student.user@gmail.com')}
                  className="w-full flex items-center gap-3 p-3 border border-slate-100 hover:border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">Student Account</p>
                    <p className="text-[10px] text-slate-400 truncate">student.user@gmail.com</p>
                  </div>
                </button>

                {/* Use another account */}
                <button
                  type="button"
                  onClick={() => setShowCustomForm(true)}
                  className="w-full flex items-center gap-3 p-3 border border-dashed border-slate-200 hover:border-primary/40 rounded-xl hover:bg-blue-50/50 transition-all text-left text-primary"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-base leading-none">
                    +
                  </div>
                  <span className="text-xs font-bold">Use another account</span>
                </button>
              </div>
            ) : (
              /* Custom Account Form */
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Google Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 pl-9 rounded-xl outline-none text-xs font-semibold focus:bg-white focus:border-primary transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 pl-9 rounded-xl outline-none text-xs font-semibold focus:bg-white focus:border-primary transition-all"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(false)}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2.5 rounded-xl text-xs transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            <p className="text-[10px] text-slate-400 mt-5 leading-relaxed text-left">
              To continue, Google will share your name, email address, language preference, and profile picture with LearnersKart.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
