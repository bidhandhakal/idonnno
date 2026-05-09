import type { Metadata } from 'next';
import { Geist_Mono, Manrope } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ConvexClientProvider } from './convex-client-provider';

const manrope = Manrope({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'idonnno',
  description: 'idonnno is a idonnno that idonnno idonnno',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
