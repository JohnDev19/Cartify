'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '../../contexts/CartContext'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"

const products = [
{ id: 1, name: 'Wireless Earbuds', price: 3999.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 2, name: 'Smart Watch', price: 9999.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 3, name: 'Yoga Mat', price: 1499.99, category: 'Fitness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 4, name: 'Coffee Maker', price: 4499.99, category: 'Home', image: 'https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 5, name: 'Leather Backpack', price: 2999.99, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 6, name: 'Portable Speaker', price: 2499.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 7, name: 'Digital Camera', price: 19999.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 8, name: 'Running Shoes', price: 4499.99, category: 'Fitness', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 9, name: 'Blender', price: 3499.99, category: 'Home', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 10, name: 'Sunglasses', price: 6499.99, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 11, name: 'Wireless Keyboard', price: 2999.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 12, name: 'Resistance Bands', price: 999.99, category: 'Fitness', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 13, name: 'Air Purifier', price: 7499.99, category: 'Home', image: 'https://images.unsplash.com/photo-1626436214453-703f6aa9e7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 14, name: 'Dress Watch', price: 9999.99, category: 'Fashion', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
{ id: 15, name: 'Wireless Mouse', price: 1499.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
]

export default function ProductDetail() {
  const params = useParams()
  const { addToCart } = useCart()
  const productId = Number(params.id)
  const product = products.find(p => p.id === productId)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <div className="text-center text-2xl mt-10">Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96 md:h-full">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-gray-600">(4.5)</span>
            </div>
            <p className="text-3xl font-bold mb-6">₱{product.price.toFixed(2)}</p>
            <p className="mb-6">{product.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-full">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-xl"
                variant="ghost"
              >
                -
              </Button>
              <span className="px-3 py-1">{quantity}</span>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-xl"
                variant="ghost"
              >
                +
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

