'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: number
  name: string
  price: number
  quantity?: number
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        toast({
          title: "Updated Cart",
          description: `${product.name} quantity has been updated in your cart.`,
        })
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      })
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId)
      const removedItem = prevCart.find(item => item.id === productId)
      if (removedItem) {
        toast({
          title: "Removed from Cart",
          description: `${removedItem.name} has been removed from your cart.`,
        })
      }
      return updatedCart
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
    const updatedItem = cart.find(item => item.id === productId)
    if (updatedItem) {
      toast({
        title: "Updated Cart",
        description: `${updatedItem.name} quantity has been updated in your cart.`,
      })
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

