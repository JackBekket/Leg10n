import React from 'react'
// import cls from 'classnames'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useAppContext } from '../AppContext'

import css from './WalletNumber.module.scss'

export function WalletNumber() {
    const { currentAccount, onClickConnect, onClickDisconnect, userWallet } = useAppContext()

    // console.log('USER WALLET & CURRENT ACCOUNT:', userWallet, currentAccount)
    // console.log('USER WALLET:', userWallet)
    // console.log('CURRENT ACCOUNT:', currentAccount)

    return (
        <div className={css.walletNumberContainer}>
            {currentAccount ? (
                <div className={css.disconnectButton} onClick={onClickDisconnect}>
                    <h4>Account:</h4>
                    <h4 className={css.walletNumber}>{currentAccount}</h4>
                </div>
            ) : (
                <button className={css.connectButton} onClick={onClickConnect}></button>
            )}
        </div>
    )
}
