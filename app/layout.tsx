import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/app/ui/mainComponents/Header';
import Footer from '@/app/ui/mainComponents/Footer';

const workSans = Work_Sans({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MultiMart | Online shopping',
  description: 'Variety Meets Convenience ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${workSans.className}`}>
        <Header />
        <main className='p-6 lg:p-12 flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
