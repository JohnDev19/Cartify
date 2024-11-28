'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart, Search, User, Menu } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Cartify</Link>
          <div className="hidden md:flex items-center space-x-4">
            <form className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="py-1 px-3 pr-10 rounded-full text-black w-64"
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 text-gray-500">
                <Search size={20} />
              </Button>
            </form>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/products" className="hover:text-accent">Products</Link></li>
                <li><Link href="/categories" className="hover:text-accent">Categories</Link></li>
                <li><Link href="/deals" className="hover:text-accent">Deals</Link></li>
              </ul>
            </nav>
            <Link href="/cart" className="flex items-center hover:text-accent">
              <ShoppingCart size={24} />
              <span className="ml-1">{cart.length}</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full mb-4 text-black"
            />
            <nav>
              <ul className="space-y-2">
                <li><Link href="/products" className="block hover:text-accent">Products</Link></li>
                <li><Link href="/categories" className="block hover:text-accent">Categories</Link></li>
                <li><Link href="/deals" className="block hover:text-accent">Deals</Link></li>
                <li><Link href="/cart" className="block hover:text-accent">Cart ({cart.length})</Link></li>
                <li><Link href="/profile" className="block hover:text-accent">My Account</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

