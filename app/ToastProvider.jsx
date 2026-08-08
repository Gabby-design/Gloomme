"use client";

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster 
      position="top-center"
      toastOptions={{
        style: {
          background: '#f8f8f8',
          color: '#1a1a1a',
          borderRadius: '0px',
          border: '1px solid rgba(26, 26, 26, 0.1)',
          fontFamily: 'inherit',
          fontSize: '14px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        },
        success: {
          iconTheme: {
            primary: '#1a1a1a',
            secondary: '#f8f8f8',
          },
        },
      }}
    />
  );
}
