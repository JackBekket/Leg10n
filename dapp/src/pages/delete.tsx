import type { NextPage } from 'next'
import Head from 'next/head'
//import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
//import GetPublicKey from '../components/getPuclicKey'
import Delete from '../components/delete'
import { usePageContext } from './PageContext'
import { AccountInfo } from '../components/AccountInfo'
import { WalletNumber } from '@/components'

declare let window: any

const Home: NextPage = () => {
    const { currentAccount, onClickConnect, onClickDisconnect, balance, chainId, chainName } =
        usePageContext()

    return (
        <>
            <Head>
                <title>Deletion</title>
            </Head>

            <Heading as="h3" my={4}>
                LYOD
            </Heading>
            <VStack>
                <WalletNumber />
                <AccountInfo />
                <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Deletion
                    </Heading>
                    <Delete
                        currentAccount={currentAccount}
                        addressContract="0xf86C79Da432c84ce57f323DC2f6e852eCE48F1C1"
                    />
                </Box>
                ...
            </VStack>
        </>
    )
}

export default Home
