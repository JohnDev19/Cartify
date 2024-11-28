import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Cartify</h3>
            <p>Your one-stop shop for all your needs. Quality products, great prices, and excellent customer service.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><Link href="/products" className="hover:text-accent">Products</Link></li>
              <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-accent">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-accent">Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="mb-4">Follow us on social media for updates and promotions.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 JohnDev19. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

