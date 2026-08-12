import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            maxWidth: '600px',
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '1px solid #334155',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
          }}>
            <h1 style={{ color: '#EF4444', fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 600 }}>
              Application Error
            </h1>
            <p style={{ color: '#94A3B8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              An unexpected error occurred while rendering this page.
            </p>
            {this.state.error && (
              <pre style={{
                backgroundColor: '#090D16',
                padding: '1rem',
                borderRadius: '8px',
                color: '#F1F5F9',
                fontSize: '0.85rem',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '1.5rem',
                border: '1px solid #334155',
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#074A76',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#09649e')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#074A76')}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
