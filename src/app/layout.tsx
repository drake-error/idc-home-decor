import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "IDC Home Decor | Luxury Interior Design",
  description: "Modern, professional, premium luxury interior design company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} font-sans antialiased text-gray-900 bg-[#f9f9f9] flex flex-col min-h-screen`}
      >
        <main className="flex-grow w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
