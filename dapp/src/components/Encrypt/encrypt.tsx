import React, { useState, useEffect } from 'react'
import { Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { abi } from '../../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import '@ethereumjs/util'
import '@metamask/eth-sig-util'

import { useAppContext } from './../AppContext'
import { SimpleInput } from './../SimpleInput'

import css from './Encrypt.module.scss'

// TODO: проверить необходимость пропсов
interface Props {
    addressContract: string
    currentAccount: string | null
}

declare let window: any

export default function EncryptMessage() {
    const {
        currentAccount,
        recieverWallet,
        userWallet,
        userName,
        setUserName,
        public_key,
        getRemoteAddress,
        getRemotePublicKey
    } = useAppContext()

    const ethUtil = require('ethereumjs-util')
    const sigUtil = require('@metamask/eth-sig-util')

    var [message_text, setMessageText] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var name = queryParams.get('user_tg_name')

        // setUserName(name);
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
        console.log(encrypted_text)
        setMessageText(encrypted_text)
    }

    // * TODO:
    // * 1. separate buttons for get sender address, get sender public key
    // * 2. those buttons should be disabled when those data getted
    // * 3.

    return (
       
            <div className={css.encryptContainer}>
                <h4>Encrypt your message</h4>
                <SimpleInput
                    id="tg_name"
                    placeholder="Enter reciever's codename"
                    setValue={setUserName}
                    value={userName}
                />
                 <button   disabled={userName === null}
                style={{ cursor: userName === null ? 'not-allowed' : 'pointer' }}
                 onClick={getRemoteAddress}>
                    Get Receiver Address
                </button>
                <Text>{recieverWallet}</Text>
                <button disabled={recieverWallet === ""}
                style={{ cursor: recieverWallet === "" ? 'not-allowed' : 'pointer' }}
                onClick={getRemotePublicKey}>  
                Get Receiver Public Key
                </button> 

                <Text>{public_key}</Text>
                <SimpleInput
                    id="text_to_send"
                    placeholder="Input text to encrypt"
                    setValue={setMessageText}
                    value={message_text}
                
                />
                
             <div className={css.buttonLast}>
                <button onClick={encryptMessage} className={css.buttonLast}
                disabled={public_key === ""}
                style={{ cursor: public_key === "" ? 'not-allowed' : 'pointer' }}
                > 
                   <span> Encrypt message!</span>
                </button>
                
                </div>
                <div>
                <h3>Encrypted text:</h3> 
                </div>
                <div className={css.Wrap}>
                    {message_text}
                </div>
            </div>
  
    )
}
