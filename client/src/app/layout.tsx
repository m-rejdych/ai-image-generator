import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-900">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
