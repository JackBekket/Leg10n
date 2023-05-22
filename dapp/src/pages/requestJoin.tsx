import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import GetPublicKey from '../components/getPuclicKey'
import RequestJoin from '../components/requestJoin'
import { AccountInfo, WalletNumber } from '../components'

import { usePageContext } from './PageContext'

const Home: NextPage = () => {
    const { currentAccount } = usePageContext()

    return (
        <>
            <Head>
                <title>Request Join</title>
            </Head>
            <Heading as="h3" my={4}>
                LYOD
            </Heading>

            <VStack>
                <WalletNumber />
                <AccountInfo />
                <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Get public key associated to your wallet
                    </Heading>
                    <GetPublicKey />
                </Box>
                <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Request join
                    </Heading>
                    <RequestJoin
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
