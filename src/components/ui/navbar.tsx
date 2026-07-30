"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import SearchModal from "./search-model";


const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

export default function Navbar() {
  const pathname = usePathname();

  const { handleCartClick, cartCount } = useShoppingCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 lg:h-18 max-w-7xl items-center justify-between px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          Nex<span className="text-blue-600">Cart</span>
        </Link>
       
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-lg font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "text-blue-600 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 rounded-full hover:bg-gray-100">
          <SearchModal  />

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartClick}
            className="relative"
          >
            <ShoppingBag className="h-5 w-5" />

            {cartCount && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
