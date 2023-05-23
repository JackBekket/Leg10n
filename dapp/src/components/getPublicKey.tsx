import { Button, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
//import {abi} from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
//import { Contract } from "ethers"
import 'ethereumjs-util'
import '@metamask/eth-sig-util'
import { useAppContext } from '../pages/AppContext'

export default function GetPublicKey() {
    const { currentAccount, public_key, getPublicKeyClient } = useAppContext()

    return (
        <form onSubmit={getPublicKeyClient}>
            <FormControl>
                <FormLabel htmlFor="TGID">Get your own public key </FormLabel>
                <div>
                    <Text>
                        <b>Public key of your own wallet</b>: {public_key}
                    </Text>
                </div>
                <Button type="submit" isDisabled={!currentAccount}>
                    Get your own public key
                </Button>
            </FormControl>
        </form>
    )
}
