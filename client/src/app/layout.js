"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { GameProvider } from "@/context/GameProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-900`}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
