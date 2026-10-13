"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Geist, Noto_Sans_JP } from "next/font/google";


const geist = Geist({
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}



