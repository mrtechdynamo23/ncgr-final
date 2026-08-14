import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { DataStoreProvider } from './data/mockDataStore';
import { router } from './router';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataStoreProvider>
          <RouterProvider router={router} />
        </DataStoreProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
