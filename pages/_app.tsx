import type { AppProps } from 'next/app'
import { CartProvider } from '../app/contexts/CartContext'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp

