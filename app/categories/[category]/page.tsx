'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../contexts/CartContext'
import { Button } from "../../../components/ui/button"
import { useToast } from "../../../components/ui/use-toast"

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
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

export default function CategoryPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: `${product.name} added to cart`,
      description: 'You can view your cart at any time',
    })
  }

  const category = params.category

  const filteredProducts = category
    ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    : products

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="rounded-lg border border-gray-300 p-4">
              <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-auto object-cover rounded-lg" />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
              <Button onClick={() => handleAddToCart(product)} className="mt-4 w-full">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
          <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredProducts.length}>Next</Button>
        </div>
      </div>
    </>
  )
}
