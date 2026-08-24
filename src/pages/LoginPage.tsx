import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../components/common/NCGRLogo';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff, Check, Globe } from 'lucide-react';
import './LandingPage.css';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorKey, setErrorKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(password);
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/welcome', { replace: true });
        }, 750);
      } else {
        setError(
          isRtl
            ? 'رمز الدخول غير صالح. يرجى إدخال كلمة المرور المصرح بها للمركز الوطني لنظم الموارد الحكومية.'
            : 'Invalid access code. Please enter the authorized NCGR security password.'
        );
        setErrorKey(k => k + 1);
        setIsLoading(false);
      }
    }, 350);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <div className={`login-root ${isRtl ? 'rtl' : 'ltr'} ${isSuccess ? 'login-transitioning' : ''}`}>
      {/* ─── ARCHITECTURAL BACKDROP WITH CONTROLLED ATMOSPHERIC GRADIENT ── */}
      <div
        className="login-backdrop-image"
        style={{ backgroundImage: `url('/assets/landing/hero-kafd-01.jpg')` }}
        aria-hidden="true"
      >
        <div className="login-backdrop-overlay" />
        <div className="login-backdrop-grid" />
      </div>

      {/* ─── TOP HEADER BAR ─────────────────────────────────────────── */}
      <header className="login-top-bar">
        <div className="login-top-brand">
          <NCGRLogo height={32} variant="white" />
          <div className="login-top-divider" />
          <span className="login-top-title">
            {isRtl ? 'بوابة إدارة تقنية المعلومات الموحدة' : 'Unified IT Management Portal'}
          </span>
        </div>

        <button
          className="login-lang-btn"
          onClick={toggleLanguage}
          aria-label={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <Globe size={13} />
          <span>{isRtl ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* ─── FLOATING EXECUTIVE AUTHENTICATION PANEL ─────────────────── */}
      <main className="login-main-container">
        <div className="login-auth-card">
          {/* Success Overlay Animation */}
          {isSuccess && (
            <div className="login-success-overlay">
              <div className="login-success-icon-wrap">
                <Check size={28} />
              </div>
              <h3 className="login-success-title">
                {isRtl ? 'تم التحقق من الصلاحيات' : 'Access Authorized'}
              </h3>
              <p className="login-success-sub">
                {isRtl ? 'جاري الانتقال إلى المنظومة التنفيذية...' : 'Entering executive operating environment...'}
              </p>
            </div>
          )}

          {/* Card Header */}
          <div className="login-card-header">
            <div className="login-card-logo">
              <NCGRLogo height={42} variant="full" />
            </div>
            <h1 className="login-card-title">
              {isRtl ? 'المركز الوطني لنظم الموارد الحكومية' : 'NCGR Unified IT Management Portal'}
            </h1>
            <p className="login-card-subtitle">
              {isRtl ? 'الدخول التنفيذي المؤمن' : 'Secure Executive Access'}
            </p>
          </div>

          {/* Card Body */}
          <div className="login-card-body">
            <div className="login-secure-notice">
              <ShieldCheck size={15} />
              <span>
                {isRtl
                  ? 'وصول مصرح به إلى عمليات تقنية المعلومات، والحوكمة، والكوادر الوطنية.'
                  : 'Authorized access to integrated IT operations, governance and workforce management.'}
              </span>
            </div>

            {error && (
              <div className="login-error-box login-error-shake" key={errorKey} role="alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="security-access-password" className="login-label">
                {isRtl ? 'رمز الدخول الأمني' : 'Security Access Code'}
              </label>

              <div className="login-input-wrapper">
                <div className="login-input-icon">
                  <Lock size={17} />
                </div>
                <input
                  id="security-access-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRtl ? 'أدخل كلمة المرور الأمنية' : 'Enter security access password'}
                  required
                  autoFocus
                  className="login-input"
                  aria-describedby="login-access-hint"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="login-submit-button"
              >
                <span>{isLoading ? (isRtl ? 'جاري التحقق…' : 'Authenticating…') : (isRtl ? 'متابعة الدخول بأمان' : 'Continue Securely')}</span>
                {!isLoading && (isRtl ? <ArrowLeft size={17} /> : <ArrowRight size={17} />)}
              </button>
            </form>

            <div className="login-card-footer">
              <span>{isRtl ? 'المركز الوطني لنظم الموارد الحكومية (NCGR) © 2026' : 'National Center for Government Resources (NCGR) © 2026'}</span>
              <span className="login-card-footer-sub">
                {isRtl ? 'محمي بواسطة طبقة التحقق والوصول المؤسسي' : 'Protected by Enterprise Access Assurance Layer'}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
