import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import api, { getAccessToken } from './utils/api';

// Layout & Common Components
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/common/ScrollToTop';

// Eagerly Loaded Pages for 100% Mobile Reliability & Zero Chunk Load Errors
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CartPage from './pages/CartPage';
import FAQsPage from './pages/FAQsPage';
import DiscountsPage from './pages/DiscountsPage';

// Policy Pages
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import MoneyBackPage from './pages/MoneyBackPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Protected & Admin Pages
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import MyCoursesPage from './pages/MyCoursesPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AdminTestimonialsPage from './pages/AdminTestimonialsPage';
import FreeResourcesPage from './pages/free-resources/FreeResourcesPage';
import AdminPmpQuestionsPage from './pages/AdminPmpQuestionsPage';
import AdminUploadTestPage from './pages/free-resources/AdminUploadTestPage';
import AdminCurrenciesPage from './pages/AdminCurrenciesPage';
import AdminSchedulesPage from './pages/AdminSchedulesPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AdminBlogsPage from './pages/AdminBlogsPage';

const LoadingFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center bg-slate-50/50">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Global Error Boundary to catch any unexpected runtime errors gracefully
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Global Error Boundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-150 max-w-md w-full">
            <div className="w-12 h-12 bg-amber-50 text-[#f97316] rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl">
              !
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Page Reload Required</h2>
            <p className="text-xs text-slate-600 mb-6 font-medium">
              We updated LearnersKart for maximum speed and security. Please tap below to refresh cleanly.
            </p>
            <button 
              onClick={() => {
                sessionStorage.clear();
                localStorage.removeItem('lk_app_version');
                window.location.reload(true);
              }}
              className="w-full bg-[#098ce9] hover:bg-[#0770bb] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-98"
            >
              Refresh Site Now
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Protected Route wrapper component
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Admin Route wrapper component
const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

// All Courses wrapper component
const CoursesPageWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  return <CoursesPage />;
};

// Free Resources wrapper component
const FreeResourcesRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login?redirect=free-resources");
      return;
    }
    const token = getAccessToken();
    const role = user.role || 'learner';
    const lmsUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:5174' 
      : 'https://lms.learnerskart.com';
    window.location.href = `${lmsUrl}/lms/dashboard?token=${token}&role=${role}`;
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <LoadingFallback />;
  }

  return <LoadingFallback />;
};

export default function App() {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes with Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                
                {/* Courses Navigation Route */}
                <Route path="courses" element={<CoursesPageWrapper />} />
                <Route path="courses/:slug" element={<CourseDetailPage />} />
                <Route path="course/:slug" element={<CourseDetailPage />} />
                
                {/* Information Pages */}
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact" element={<ContactPage />} />
                
                {/* Blog Pages */}
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogDetailPage />} />
                <Route path="blogs/:slug" element={<BlogDetailPage />} />

                {/* Free Resources Route */}
                <Route path="free-resources" element={<FreeResourcesPage />} />
                <Route path="free-resources/:section" element={<FreeResourcesPage />} />
                <Route path="free-resources/*" element={<FreeResourcesPage />} />
                
                {/* Special Discounts Pages */}
                <Route path="discounts" element={<DiscountsPage />} />
                <Route path="discounts/:type" element={<DiscountsPage />} />
                
                {/* Utility Pages */}
                <Route path="cart" element={<CartPage />} />
                <Route path="faqs" element={<FAQsPage />} />
                
                {/* Policy Pages */}
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="refund-policy" element={<RefundPolicyPage />} />
                <Route path="money-back-guarantee" element={<MoneyBackPage />} />

                {/* Auth Pages */}
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />

                <Route path="checkout" element={<CheckoutPage />} />

                {/* Protected Learner Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="dashboard/courses" element={<MyCoursesPage />} />
                  <Route path="dashboard/profile" element={<ProfilePage />} />
                  <Route path="dashboard/orders" element={<OrdersPage />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="admin/testimonials" element={<AdminTestimonialsPage />} />
                  <Route path="admin/pmp-questions" element={<AdminPmpQuestionsPage />} />
                  <Route path="admin/upload-test" element={<AdminUploadTestPage />} />
                  <Route path="admin/currencies" element={<AdminCurrenciesPage />} />
                  <Route path="admin/schedules" element={<AdminSchedulesPage />} />
                  <Route path="admin/courses" element={<AdminCoursesPage />} />
                  <Route path="admin/blogs" element={<AdminBlogsPage />} />
                </Route>

                {/* 404 Route */}
                <Route path=":slug" element={<CourseDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}
