import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { AppContextProvider } from './AppContext'
import NoSSR from '@mpth/react-no-ssr'
import '../index.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NoSSR>
            <AppContextProvider>
                <ChakraProvider>
                    <Layout>
                        <Component {...pageProps}></Component>
                    </Layout>
                </ChakraProvider>
            </AppContextProvider>
        </NoSSR>
    )
}

export default MyApp
