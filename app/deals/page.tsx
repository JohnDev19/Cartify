'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../contexts/CartContext'
import { Button } from "../../components/ui/button"
import { useToast } from "../../components/ui/use-toast"
import { Badge } from "../../components/ui/badge"

const deals = [
  { id: 1, name: 'Summer Sale Wireless Earbuds', price: 850, originalPrice: 1200, discount: 29, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
  { id: 2, name: 'Limited Time Smart Watch Offer', price: 5200, originalPrice: 6500, discount: 20, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
  { id: 3, name: 'Flash Sale: Premium Yoga Mat', price: 400, originalPrice: 500, discount: 20, category: 'Fitness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=M3wxMjA=format&fit=crop&w=1000&q=80' },
  { id: 4, name: 'Clearance: Gourmet Coffee Maker', price: 1500, originalPrice: 2000, discount: 25, category: 'Home', image: 'https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=M3wxMjA=format&fit=crop&w=1000&q=80' },
  { id: 5, name: 'Special Offer: Leather Backpack', price: 700, originalPrice: 1000, discount: 30, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA=format&fit=crop&w=1000&q=80' },
  { id: 6, name: 'Deal of the Day: Portable Speaker', price: 1200, originalPrice: 1500, discount: 20, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA=format&fit=crop&w=1000&q=80' },
]

export default function Deals() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({})

  const handleAddToCart = (deal: any) => {
    addToCart(deal)
    setAddedToCart({ ...addedToCart, [deal.id]: true })
    toast({
      title: "Added to Cart",
      description: `${deal.name} has been added to your cart.`,
    })
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [deal.id]: false })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hot Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={deal.image}
                alt={deal.name}
                layout="fill"
                objectFit="cover"
              />
              <Badge className="absolute top-2 right-2 bg-red-500">
                {deal.discount}% OFF
              </Badge>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{deal.name}</h2>
              <p className="text-gray-600 mb-2">{deal.category}</p>
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-primary">₱{deal.price.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">₱{deal.originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <Link href={`/product/${deal.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Button 
                  onClick={() => handleAddToCart(deal)} 
                  disabled={addedToCart[deal.id]}
                >
                  {addedToCart[deal.id] ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

