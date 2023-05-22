import type { NextPage } from 'next'
import Head from 'next/head'
//import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import GetPublicKey from '../components/getPuclicKey'
import { usePageContext } from './PageContext'
import { AccountInfo, WalletNumber } from '@/components'

declare let window: any

const Home: NextPage = () => {
    const { currentAccount, onClickConnect, onClickDisconnect, balance, chainId, chainName } =
        usePageContext()

    return (
        <>
            <Head>
                <title>Metamask Public Key</title>
            </Head>

            <Heading as="h3" my={4}>
                Attach your wallet to tgid
            </Heading>

            <VStack>
                <WalletNumber />
                <AccountInfo />
                <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Get public key associated to your wallet
                    </Heading>
                    <GetPublicKey currentAccount={currentAccount} />
                </Box>
                ...
            </VStack>
        </>
    )
}

export default Home
