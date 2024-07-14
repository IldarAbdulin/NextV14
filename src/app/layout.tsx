import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
