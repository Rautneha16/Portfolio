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
import { Orbitron, Share_Tech_Mono, Poppins } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-share-tech-mono',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={logoImage.src} />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Neha Raut" />
        <meta name="application-name" content="Neha Raut" />
        <meta name="msapplication-TileColor" content="#ff2a7a" />
      </head>
      <body className={`${orbitron.variable} ${shareTechMono.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}

