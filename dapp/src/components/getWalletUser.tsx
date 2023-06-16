import React, { useState, useEffect } from 'react'
import {
    Button,
    Input,
    NumberInput,
    NumberInputField,
    FormControl,
    FormLabel,
    Text
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import { useAppContext } from '../pages/AppContext'

declare let window: any

export default function GetWalletByTelegramNickNameTG() {
    const { currentAccount, legionAddress, userName, setUserName } = useAppContext()

    var [user_wallet, setUserWallet] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var name = queryParams.get('user_tg_name')

        //setUserName(name);
    }, [])

    async function getWalletByUsername(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)
        Legion.GetWalletByNickName(userName).then((result: string) => {
            console.log(result)
            setUserWallet(result)
        })
    }

    return (
        <form onSubmit={getWalletByUsername}>
            <FormControl>
                <FormLabel htmlFor="TGID">Input codename to get its eth address </FormLabel>
                <Input
                    id="tg_name"
                    type="text"
                    required
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    my={3}
                />
                <Button type="submit" isDisabled={!currentAccount}>
                    Get wallet address
                </Button>
            </FormControl>
            <div>
                <Text>
                    <b>Ethereum address associated with this codename</b>: {user_wallet}
                </Text>
            </div>
        </form>
    )
}
