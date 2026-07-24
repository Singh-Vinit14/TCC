import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/components/PWARegister";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Taad Cricket Club",
    template: "%s | Taad Cricket Club"
  },
  description: "Official Taad Cricket Club website for players, live scores, statistics, match history and gallery.",
  applicationName: "Taad Cricket Club",
  manifest: "/manifest.json",
  openGraph: {
    title: "Taad Cricket Club",
    description: "Premium cricket club website with live scoring and player statistics.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <PWARegister />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
