import 'ethereumjs-util'
import '@metamask/eth-sig-util'
import clsx from 'clsx'
import { useAppContext } from '../AppContext'

import css from './GetPublicKey.module.scss'

export default function GetPublicKey() {
    const { currentAccount, public_key, getPublicKeyClient } = useAppContext()

    return public_key ? (
        <div className={css.retrievedPubKey}>
            <h5>Your public key:</h5>
            <h5 className="lemon">{public_key}</h5>
        </div>
    ) : (
        <div className={clsx(css.publicKeycontainer, { [css.active]: Boolean(!currentAccount) })}>
            <h4>Get public key associated to your wallet</h4>
            <button onClick={getPublicKeyClient}>Get public key</button>
        </div>
    )
}
