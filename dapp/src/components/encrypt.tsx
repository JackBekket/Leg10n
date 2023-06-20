import React, { useState, useEffect } from 'react'
import { Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import '@ethereumjs/util'
import '@metamask/eth-sig-util'

import { useAppContext } from '../pages/AppContext'

// TODO: проверить необходимость пропсов
interface Props {
    addressContract: string
    currentAccount: string | null
}

declare let window: any

export default function EncryptMessage() {
    const {
        currentAccount,
        legionAddress,
        userWallet,
        setUserWallet,
        userName,
        setUserName,
        public_key,
        getPublicKey
    } = useAppContext()

    const ethUtil = require('ethereumjs-util')
    const sigUtil = require('@metamask/eth-sig-util')

    var [message_text, setMessageText] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var name = queryParams.get('user_tg_name')

        //setUserName(name);
    }, [])

    async function encryptText(plain_text: string, public_key: string) {
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const encryptedMessage = ethUtil.bufferToHex(
            Buffer.from(
                JSON.stringify(
                    sigUtil.encrypt({
                        publicKey: public_key,
                        data: plain_text,
                        version: 'x25519-xsalsa20-poly1305'
                    })
                ),
                'utf8'
            )
        )
        // setMessageText(encryptMessage);
        return encryptedMessage
    }

    async function encryptMessage(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        if (!public_key) return

        var encrypted_text = await encryptText(message_text, public_key)
        setMessageText(encrypted_text)
    }

    async function getRemotePublicKey(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        if (!userWallet) return
        await getPublicKey(userWallet)
    }

    async function getRemoteAddress(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)
        await Legion.GetWalletByNickName(userName).then((result: string) => {
            console.log('result: ', result)
            setUserWallet(result)
        })
    }

    // * TODO:
    // * 1. separate buttons for get sender address, get sender public key
    // * 2. those buttons should be disabled when those data getted
    // * 3.

    return (
        <form onSubmit={encryptMessage}>
            <FormControl>
                <FormLabel htmlFor="TGID">Message encrypting</FormLabel>
                <Input
                    id="tg_name"
                    type="text"
                    required
                    placeholder="input codename *TO WHOM* you want to encrypt"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    my={3}
                />
                <Button isDisabled={!currentAccount} onClick={getRemoteAddress}>
                    Get Sender Address
                </Button>
                <Text>{userWallet}</Text>
                <Button isDisabled={!currentAccount} onClick={getRemotePublicKey}>
                    Get Sender Public Key
                </Button>
                <Text>{public_key}</Text>
                <Input
                    id="text_to_send"
                    type="text"
                    required
                    placeholder="Input text to encrypt"
                    onChange={e => setMessageText(e.target.value)}
                    value={message_text}
                    my={3}
                />
                <Button type="submit" isDisabled={!currentAccount}>
                    Encrypt message!
                </Button>
            </FormControl>
        </form>
    )
}
