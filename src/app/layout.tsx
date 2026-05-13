import type { Metadata } from 'next';
import { Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SiteFooter } from '@/components/site-footer';
import { ConvexClientProvider } from './convex-client-provider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://idonnno.vercel.app'),
  title: 'idonnno',
  description:
    'A global button counter where everyone can click, track presses, and see live country stats.',
  openGraph: {
    title: 'idonnno',
    description:
      'A global button counter where everyone can click, track presses, and see live country stats.',
    url: 'https://idonnno.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://idonnno.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'idonnno preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'idonnno',
    description:
      'A global button counter where everyone can click, track presses, and see live country stats.',
    images: ['https://idonnno.vercel.app/og-image.png'],
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
        <ConvexClientProvider>
          <div className="flex min-h-full w-full flex-1 flex-col">
            {children}
            <SiteFooter />
          </div>
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
