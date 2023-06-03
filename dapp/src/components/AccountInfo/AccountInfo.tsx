import React from 'react'
// import cls from 'classnames'
import { Heading, Box } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import { useAppContext } from '../../pages/AppContext'

import css from './AccountInfo.module.scss'

export function AccountInfo() {
    const { currentAccount, balance, chainId, chainName } = useAppContext()

    return currentAccount ? (
        <div className={css.accInfoContainer}>
            <h3>Account info</h3>
            <h5>ETH balance of current account:</h5>
            <h5 className={css.lemon}>{balance}</h5>
            <h5>Chain info:</h5>
            <h5 className={css.lemon}>
                ChainId {chainId} name {chainName}
            </h5>
            <h5 className={css.lemon}>Chain must be matic!</h5>
        </div>
    ) : (
        <></>
    )
}
