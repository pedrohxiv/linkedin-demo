import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/header";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkedIn",
  icons: { icon: "/icon.svg" },
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="bg-[#f4f2ed] flex-1 w-full">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
