import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import { Text, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { usePageContext } from './PageContext'

import { PageContextProvider } from './PageContext'
import { AccountInfo, WalletNumber } from '@/components'

declare let window: any

const Home: NextPage = () => {
    const { currentAccount, onClickConnect, onClickDisconnect, balance, chainId, chainName } =
        usePageContext()

    return (
        <>
            <Head>
                <title>LYOD</title>
            </Head>

            <Heading as="h3" my={4}>
                LYOD
            </Heading>
            <VStack>
                <WalletNumber />
                <AccountInfo />
                ...
            </VStack>
        </>
    )
}

export default Home
