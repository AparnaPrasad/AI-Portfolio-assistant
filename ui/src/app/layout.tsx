import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatBotLayout } from '../components/ChatBot/ChatBotLayout';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Goal based Financial Portfolio Manager",
  description: "Track and manage your financial portfolios for different goals like retirement, education, emergency funds, and travel goals",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed="true">
      <body className={`${inter.variable} antialiased`}>
        <ChatBotLayout>
          {children}
        </ChatBotLayout>
      </body>
    </html>
  );
}