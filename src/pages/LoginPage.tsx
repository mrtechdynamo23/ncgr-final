import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NCGRLogo from '../components/common/NCGRLogo';
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid Security Access Code. Please enter the authorized NCGR password.');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0A1628 0%, #074A76 50%, #05263F 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--card-bg, #FFFFFF)',
          borderRadius: 16,
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Top Header Card */}
        <div
          style={{
            padding: '32px 28px 24px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7F6 100%)',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <NCGRLogo height={48} variant="full" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#074A76', margin: 0, letterSpacing: '-0.01em' }}>
            NCGR ITMS Executive Dashboard
          </h1>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: 6, margin: '6px 0 0' }}>
            Enterprise Operational Assurance & Management Portal
          </p>
        </div>

        {/* Form Area */}
        <div style={{ padding: '28px 28px 32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              background: 'rgba(64, 144, 79, 0.1)',
              border: '1px solid rgba(64, 144, 79, 0.3)',
              borderRadius: 6,
              fontSize: '0.75rem',
              color: '#40904F',
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            <ShieldCheck size={16} />
            <span>RESTRICTED ACCESS — AUTHORIZED PERSONNEL ONLY</span>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                background: '#FEE2E2',
                border: '1px solid #FCA5A5',
                borderRadius: 6,
                color: '#991B1B',
                fontSize: '0.8125rem',
                marginBottom: 20,
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="security-password"
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text, #1E293B)', marginBottom: 8 }}
              >
                Security Access Code / Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
                />
                <input
                  id="security-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security access password"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    fontSize: '0.9375rem',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #40904F 0%, #2E6B39 100%)',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(64, 144, 79, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              {isLoading ? 'Authenticating...' : 'Sign In to ITMS Portal'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
            National Center for Government Resources (NCGR) © 2026<br />
            Protected by Enterprise Access Assurance Layer
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
