'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from "../../components/ui/button"

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce((sum, item: CartItem) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="flex items-center space-x-4 border-b py-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₱{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    variant="outline"
                    size="icon"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-bold text-xl">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full mt-6">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
