import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Header } from "@/components/header";

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
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="bg-[#f4f2ed] flex-1 w-full">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
