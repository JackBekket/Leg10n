import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box } from '@chakra-ui/layout'
import GetPublicKey from '~/components/getPublicKey'
import RequestJoin from '~/components/requestJoin'
import { AccountInfo, WalletNumber } from '~components'

import { useAppContext } from '../AppContext'

const JoinRequest: NextPage = () => {
    const { currentAccount, legionAddress } = useAppContext()

    return (
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
                <RequestJoin currentAccount={currentAccount} addressContract={legionAddress} />
            </Box>{' '}
        </VStack>
    )
}

export default JoinRequest
