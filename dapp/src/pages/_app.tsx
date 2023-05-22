import { useContext } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { PageContextProvider } from './PageContext'
import NoSSR from '@mpth/react-no-ssr'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NoSSR>
            <PageContextProvider>
                <ChakraProvider>
                    <Layout>
                        <Component {...pageProps}></Component>
                    </Layout>
                </ChakraProvider>
            </PageContextProvider>
        </NoSSR>
    )
}

export default MyApp
