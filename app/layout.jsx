import '../src/index.css';
import { ToastProvider } from './ToastProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
        <ToastProvider />
        <div id="root">
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
