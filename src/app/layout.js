import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBand, { CtaBandGate } from "@/components/sections/CtaBand";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Shruhani",
  description: "Real-time fraud & credit-risk intelligence for Indian BFSI.",
  manifest: "/manifest.json",
};

/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: "#E536A3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <CtaBandGate>
          <CtaBand />
        </CtaBandGate>
        <Footer />
      </body>
    </html>
  );
}
