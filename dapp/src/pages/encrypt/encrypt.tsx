import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box } from '@chakra-ui/layout'
import EncryptMessage from '../../components/encrypt'
import { AccountInfo } from '../../components/AccountInfo'
import { WalletNumber } from '@/components'

const Home: NextPage = () => {
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
                    <EncryptMessage />
                </Box>
                ...
            </VStack>
        </>
    )
}

export default Home
