import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  </React.StrictMode>
);
