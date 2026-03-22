import type { Metadata } from "next";
import { Cormorant_Garamond, Menlo } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const menlo = Menlo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-menlo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apartment Booking | Luxury Residence",
  description:
    "Book your perfect space - rooms and facilities at our luxury residence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${menlo.variable}`}
      suppressHydrationWarning
    >
      <body className="font-en antialiased">{children}</body>
    </html>
  );
}
