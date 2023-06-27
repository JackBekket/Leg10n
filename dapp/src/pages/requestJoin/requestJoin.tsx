import type { NextPage } from 'next'
import GetPublicKey from '~/components/GetPublicKey'
import RequestJoin from '~/components/requestJoin'
import { AccountInfo, WalletNumber } from '~components'

import css from './RequestJoin.module.scss'

const JoinRequest: NextPage = () => {
    return (
        <div className="page">
            <div className={css.requestJoinContainer}>
                <WalletNumber />
                <AccountInfo />
                <GetPublicKey />
                <RequestJoin />
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
