import React from 'react'
import { useAppContext } from '../../pages/AppContext'

import css from './AccountInfo.module.scss'

export function AccountInfo() {
    const { currentAccount, balance, chainId, chainName } = useAppContext()

    return currentAccount ? (
        <div className={css.accInfoContainer}>
            <h5>Account info</h5>
            <h6>ETH balance of current account:</h6>
            <h6 className={css.lemon}>{balance}</h6>
            <h6>Chain info:</h6>
            <h6 className={css.lemon}>
                ChainId {chainId} name {chainName}
            </h6>
            <h6 className={css.lemon}>Chain must be matic!</h6>
        </div>
    ) : (
        <></>
    )
}
