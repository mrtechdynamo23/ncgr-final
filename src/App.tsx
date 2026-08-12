import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
