import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";

import Footers from "@/components/footer";
import Header from "@/components/header";
import { UserContextProvider } from "@/context/UserProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Fieldnotes",
    template: "%s | Fieldnotes",
  },
  description:
    "Notes on building for the web, a small product catalogue, a newsroom, and a members' dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <UserContextProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footers />
        </UserContextProvider>
      </body>
    </html>
  );
}
