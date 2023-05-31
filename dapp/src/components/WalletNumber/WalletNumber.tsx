import React from 'react'
// import cls from 'classnames'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useAppContext } from '../../pages/AppContext'

import css from './WalletNumber.module.scss'

export function WalletNumber() {
    const { currentAccount, onClickConnect, onClickDisconnect } = useAppContext()

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
