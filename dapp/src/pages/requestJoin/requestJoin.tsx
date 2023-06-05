import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box } from '@chakra-ui/layout'
import GetPublicKey from '~/components/GetPublicKey'
import RequestJoin from '~/components/requestJoin'
import { AccountInfo, WalletNumber } from '~components'

import { useAppContext } from '../AppContext'
import css from './requestJoin.module.scss'

const JoinRequest: NextPage = () => {
    const { currentAccount, legionAddress } = useAppContext()

    return (
        <div className="page">
            <div className={css.requestJoinContainer}>
                <WalletNumber />
                <AccountInfo />
                <GetPublicKey />
                <RequestJoin currentAccount={currentAccount} addressContract={legionAddress} />
            </div>
        </div>
    )
}

export default JoinRequest

{
    /* <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Request join
                    </Heading>
                    <RequestJoin currentAccount={currentAccount} addressContract={legionAddress} />
                </Box> */
}
