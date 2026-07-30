import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/navbar";
import ShoppingCartModal from "@/components/ui/shoppingcartmodel";
import CartProvider from "@/components/ui/providers";
import "./globals.css";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import Footer from "@/components/ui/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Technology Used: Next.js, Sanity, Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
           <AnnouncementBar />
          <Navbar />
          <ShoppingCartModal />
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}