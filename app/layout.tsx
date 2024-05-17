import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import RecoilRootWrapper from './RecoilRootWrapper';

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
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=drawing`}
        />
        <main className="w-full h-full flex flex-col">
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </main>
      </body>
    </html>
  );
}
