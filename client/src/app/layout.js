"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { GameProvider } from "@/context/GameProvider";
import { PlayerProvider } from "@/context/PlayerProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-900 `}>
        <GameProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </GameProvider>
      </body>
    </html>
  );
}
