import './globals.css';

export const metadata = {
  metadataBase: new URL('https://nehaaraut.vercel.app'),
  title: 'Neha Raut | Web Developer Portfolio',
  description: 'I build modern, responsive websites for businesses. Web Developer, Designer, and Freelancer based in Pune, India.',
  themeColor: '#ff2a7a',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Neha Raut | Web Developer Portfolio',
    description: 'I build modern, responsive websites for businesses. Web Developer, Designer, and Freelancer.',
    type: 'website',
    url: 'https://nehaaraut.vercel.app',
    siteName: 'Neha Raut Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neha Raut | Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neha Raut | Web Developer Portfolio',
    description: 'I build modern, responsive websites for businesses.',
    images: ['/og-image.png'],
  },
};

import logoImage from '../components/images/logo.png';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={logoImage.src} />
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Trimmed to only the 3 font families actually used, with minimal weights */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&family=Poppins:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Neha Raut" />
        <meta name="application-name" content="Neha Raut" />
        <meta name="msapplication-TileColor" content="#ff2a7a" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

