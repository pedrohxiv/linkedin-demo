import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

export const metadata: Metadata = {
  title: "LinkedIn",
  icons: { icon: "/icon.svg" },
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <html>
        <body className="min-h-screen flex flex-col bg-[#f4f2ed]">
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
