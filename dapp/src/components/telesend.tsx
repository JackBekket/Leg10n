import React, { useState, useEffect } from 'react'
import { Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import TelegramBot from 'node-telegram-bot-api'

import '@ethereumjs/util'
import '@metamask/eth-sig-util'
import { get } from 'http'
//import TelegramChat from './telebot_2'
import { useAppContext } from '../pages/AppContext'

//const token = process.env.TELEGRAM_KEY!;
//const token = "";
declare let window: any

const tg_bot = process.env.TELEGRAM_KEY

export default function EncryptMessage() {
    const { currentAccount, public_key, getPublicKey, legionAddress } = useAppContext()

    const ethUtil = require('ethereumjs-util')
    const sigUtil = require('@metamask/eth-sig-util')

    //var token =  process.env.TELEGRAM_KEY!;
    //const token = tg_token;

    var [user_name, setUserName] = useState<string>('')
    var [user_wallet, setUserWallet] = useState<string>('')
    var [tgid_to, setTgid_to] = useState<string>('')
    var [message_text, setMessageText] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var name = queryParams.get('codename')
        setUserName(name!)
        var message = queryParams.get('text')
        setMessageText(message!)
    }, [])

    // async function getWalletByUsername(event: React.FormEvent) {
    //     event.preventDefault()
    //     if (!window.ethereum) return
    //     const provider = new ethers.providers.Web3Provider(window.ethereum)
    //     const signer = provider.getSigner()
    //     const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)
    //     Legion.GetWalletByNickName(user_name).then((result: string) => {
    //         console.log(result)
    //         setUserWallet(result)
    //     })
    // }

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
        if (!user_wallet) return
        await getPublicKey(user_wallet)
    }

    async function getRemoteAddress(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)
        await Legion.GetWalletByNickName(user_name).then((result: string) => {
            console.log('result: ', result)
            setUserWallet(result)
        })
    }

    async function getRemoteTgId(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)

        await Legion.GetTgIdByAddress(user_wallet).then((result: BigInteger) => {
            console.log('result: ', result)
            const str = result.toString()
            setTgid_to(str)
        })

        /*
     await Legion.GetUserByNickName(user_wallet)
     .then((result:string) => {
        console.log("result: ", result);
        setTgid_to(result)
     });
     */
    }

    async function sendMessage(event: React.FormEvent) {
        event.preventDefault()
        await handleSendMessage(event)
    }

    async function handleSendMessage(event: React.FormEvent) {
        //var url1 = 'https://api.telegram.org/bot'
        var chatid = parseInt(tgid_to)
        var message = message_text
        const url = `http://93.115.18.139:8080?chat_id=${chatid}&text=${message}`
        //const url = `http://localhost:8080?chat_id=${chatid}&text=${message}`;
        // replace <yourbottoken> with your actual bot token

        try {
            const response = await fetch(url)
            console.log(response)

            // const data = await response.json();
            // console.log(data);
        } catch (error) {
            console.error(error)
        }
        //setMessage("");
    }

    /*
     * TODO:
     * 1. separate buttons for get sender address, get sender public key
     * 2. those buttons should be disabled when those data getted
     * 3.
     */
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
                    value={user_name}
                    my={3}
                />
                <Button isDisabled={!currentAccount} onClick={getRemoteAddress}>
                    Get Sender Address
                </Button>
                <Text>{user_wallet}</Text>
                <Button
                    isDisabled={!currentAccount || user_wallet == ''}
                    onClick={getRemotePublicKey}
                >
                    Get Sender Public Key
                </Button>
                <Text>{public_key}</Text>
                <Button isDisabled={!currentAccount || public_key == ''} onClick={getRemoteTgId}>
                    Get chat_id
                </Button>
                <Text>{tgid_to}</Text>
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
                <Button
                    isDisabled={
                        !currentAccount || public_key == '' || tgid_to == '' || user_wallet == ''
                    }
                    onClick={sendMessage}
                >
                    SendMessage
                </Button>
            </FormControl>
        </form>
    )
}
