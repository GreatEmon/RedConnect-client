import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from 'aos'
import 'aos/dist/aos.css';

const queryClient = new QueryClient();
Aos.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>
);
