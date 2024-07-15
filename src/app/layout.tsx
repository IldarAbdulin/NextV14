import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Providers from '@/redux/Provider';

const inter = Montserrat({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Users page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
