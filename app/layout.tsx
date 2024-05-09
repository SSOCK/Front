import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Navigation from '@/components/navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Running Mate',
  description: 'Running Mate with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false`}
        />
        {children}
        <Navigation />
      </body>
    </html>
  );
}
