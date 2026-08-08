import '../src/index.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Klasik Wardrobe | Zero Flow',
  description: "Klasik Wardrobe is Nigeria's premier luxury streetwear brand, offering premium 240-300 GSM organic cotton and silk-blend heavyweight t-shirts.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Syne:wght@400..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#f8f8f8',
              color: '#1a1a1a',
              borderRadius: '0px',
              border: '1px solid #e5e5e5',
              padding: '16px',
              fontFamily: 'DM Sans, sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#1a1a1a',
                secondary: '#f8f8f8',
              },
            },
          }}
        />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
