import type { AppProps } from 'next/app'
import { CartProvider } from '../app/contexts/CartContext'
import { Toaster } from "../components/ui/toaster"
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster />
    </CartProvider>
  )
}

export default MyApp

