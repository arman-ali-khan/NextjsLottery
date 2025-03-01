'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
        <Link href="/">
          <div className="text-xl font-bold text-primary">My Logo</div>
        </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium hover:text-primary">Home</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">About</NavigationMenuLink>
                    <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Services</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium hover:text-primary">Products</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Category 1</NavigationMenuLink>
                    <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Category 2</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" className="text-sm font-medium hover:text-primary">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" className="text-sm">Login</Button>
            </Link>
            <Button className="text-sm">Sign Up</Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2 mt-2">
              <Link href="/" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded">
                Home
              </Link>
              <Link href="/about" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded">
                About
              </Link>
              <Link href="/products" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded">
                Products
              </Link>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded">
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-2 mt-4 px-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link href="/register">
              <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
