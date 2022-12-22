import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import Link from 'next/link' 
import Sidebar from '../Main/Sidebar'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <ChakraProvider>
      <Sidebar>
      <Component {...pageProps} />
      </Sidebar>
    </ChakraProvider>
    </>
  )
}

export default MyApp
