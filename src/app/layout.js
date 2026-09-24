import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
