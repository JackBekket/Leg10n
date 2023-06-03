import { Button, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
//import {abi} from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
//import { Contract } from "ethers"
import 'ethereumjs-util'
import '@metamask/eth-sig-util'
import clsx from 'clsx'
import { useAppContext } from '../../pages/AppContext'

import css from './GetPublicKey.module.scss'

export default function GetPublicKey() {
    const { currentAccount, public_key, getPublicKeyClient } = useAppContext()

    return public_key ? (
        <div className={css.retrievedPubKey}>
            <h5>Your public key:</h5>
            <h5 className="lemon">{public_key}</h5>
        </div>
    ) : (
        // <div className={css.publicKeycontainer}>
        <div className={clsx(css.publicKeycontainer, { [css.active]: Boolean(!currentAccount) })}>
            <h3>Get public key associated to your wallet</h3>
            <button onClick={getPublicKeyClient}>Get public key</button>
        </div>
    )
}

// <form onSubmit={getPublicKeyClient}>
//     <FormControl>
//         <FormLabel htmlFor="TGID">Get your own public key </FormLabel>
//         <div>
//             <Text>
//                 <b>Public key of your own wallet</b>: {public_key}
//             </Text>
//         </div>
//         <Button type="submit" isDisabled={!currentAccount}>
//             Get your own public key
//         </Button>
//     </FormControl>
// </form>
