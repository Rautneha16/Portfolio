import './globals.css';

export const metadata = {
  title: 'Neha Raut | Web Developer Portfolio',
  description: 'I build modern, responsive websites for businesses. Web Developer, Designer, and Freelancer.',
  themeColor: '#ff2a7a',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Neha Raut | Web Developer Portfolio',
    description: 'I build modern, responsive websites for businesses. Web Developer, Designer, and Freelancer.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neha Raut | Web Developer Portfolio',
    description: 'I build modern, responsive websites for businesses.',
  }
};

import logoImage from '../components/images/logo.png';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={logoImage.src} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
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
