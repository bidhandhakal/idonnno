import type { Metadata } from 'next';
import { Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ConvexClientProvider } from './convex-client-provider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://idonnno.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'idonnno',
  description: 'idonnno is a idonnno that idonnno idonnno',
  openGraph: {
    title: 'idonnno',
    description: 'idonnno is a idonnno that idonnno idonnno',
    siteName: 'idonnno',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'idonnno',
    description: 'idonnno is a idonnno that idonnno idonnno',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
