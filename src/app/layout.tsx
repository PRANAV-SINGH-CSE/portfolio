import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pranav Singh | Full-Stack Developer & AI Systems Engineer',
  description:
    'Full-Stack Developer building modern web applications, AI-powered products, and high-concurrency systems using React, Next.js, Python, Flask, Firebase, and PostgreSQL.',
  keywords: [
    'Pranav Singh',
    'Full Stack Developer',
    'AI Engineer',
    'Next.js Portfolio',
    'Full Stack Engineer',
    'React',
    'Python',
    'Flask',
    'Firebase',
    'ZentiqAI',
    'Software Engineer India',
  ],
  authors: [{ name: 'Pranav Singh' }],
  creator: 'Pranav Singh',
  metadataBase: new URL('https://pranavsingh.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pranavsingh.dev',
    title: 'Pranav Singh | Full-Stack Developer & AI Systems Engineer',
    description:
      'Full-Stack Developer building modern web applications and AI-powered products using React, Next.js, Python, Flask, and Firebase.',
    siteName: 'Pranav Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Singh | Full-Stack Developer & AI Systems Engineer',
    description:
      'Full-Stack Developer building modern web applications and AI-powered products.',
    creator: '@pranav_builds',
  },
  icons: {
    icon: '/profile.jpg',
    shortcut: '/profile.jpg',
    apple: '/profile.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} data-theme="violet">
      <head>
        <link rel="icon" href="/profile.jpg" />
        <link rel="shortcut icon" href="/profile.jpg" />
        <link rel="apple-touch-icon" href="/profile.jpg" />
      </head>
      <body className="min-h-screen bg-[#030712] font-sans antialiased text-zinc-100">
        {children}
      </body>
    </html>
  );
}
