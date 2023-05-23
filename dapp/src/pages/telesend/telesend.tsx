import type { NextPage } from 'next'
import Head from 'next/head'
//import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

//import GetPublicKey from '../components/getPuclicKey'
//import EncryptMessage from '../components/telesend'
import EncryptMessage from '../../components/telesend'
import { useAppContext } from '../AppContext'
import { AccountInfo, WalletNumber } from '@/components'

//import type { GetServerSideProps } from "next";

declare let window: any

/*
export const getServerSideProps: GetServerSideProps = async () => {
    const fileExists = fs.existsSync("/some-file"); 
  
    return {
      props: {
        doesFileExist: fileExists,
      },
    };
  };
*/

const Home: NextPage = () => {
    const { currentAccount, legionAddress } = useAppContext()

    return (
        <>
            <Head>
                <title>Encrypt message</title>
            </Head>

            <Heading as="h3" my={4}>
                LYOD
            </Heading>
            <VStack>
                <WalletNumber />
                <AccountInfo />
                <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Encrypt message
                    </Heading>
                    <EncryptMessage
                        currentAccount={currentAccount}
                        addressContract={legionAddress}
                    />
                </Box>
                ...
            </VStack>
        </>
    )
}

export default Home
