import React from 'react'
import { useAppContext } from '../AppContext'

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
