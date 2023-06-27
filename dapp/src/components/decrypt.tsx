import React, { useState, useEffect } from 'react'
import { Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import '@ethereumjs/util'
import '@metamask/eth-sig-util'
import { useAppContext } from './AppContext'

declare let window: any

export default function DecryptMessage() {
    const { currentAccount, setUserWallet } = useAppContext()

    const ethUtil = require('ethereumjs-util')
    const sigUtil = require('@metamask/eth-sig-util')

    var [message_text, setMessageText] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var message = queryParams.get('q')

        setMessageText(message!)
    }, [])

    // decrypt text using users key from accounts[0]
    async function decryptText(plain_text: string) {
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        let s_address = currentAccount!
        console.log('s_address: ', s_address)
        setUserWallet(s_address)

        window.ethereum
            .request({
                method: 'eth_decrypt',
                params: [message_text, s_address]
            })
            .then(
                (result: string) => setMessageText(result)
                // console.log('The decrypted message is:', decryptedMessage)
            )
            .catch((error: TypeError) => console.log(error.message))
        // setMessageText(encryptMessage);
        // return decryptedMessage;
    }

    async function decryptMessage(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        decryptText(message_text)
    }

    return (
        <form onSubmit={decryptMessage}>
            <FormControl>
                <FormLabel htmlFor="TGID">Input cyphered text to decrypt</FormLabel>
                <Input
                    id="text to send"
                    type="text"
                    required
                    placeholder="Input text to decrypt"
                    onChange={e => setMessageText(e.target.value)}
                    value={message_text}
                    my={3}
                />
                <Button type="submit" isDisabled={!currentAccount}>
                    Decrypt message!
                </Button>
            </FormControl>
        </form>
    )
}
