import React, { useState, useEffect } from 'react'
import { Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import '@ethereumjs/util'
import '@metamask/eth-sig-util'
import { useAppContext } from './../AppContext'
import { SimpleInput } from './../SimpleInput'
import css from './Decrypt.module.scss'
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
            .then((result: string) => {
                setMessageText(result);
                console.log('The decrypted message is:', result);
            })
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
        <div className={css.decryptContainer}>
     <h4>Decrypt your message</h4>
               
     <SimpleInput
                    id="text to send"
                    placeholder="Input text to decrypt"
                    setValue={setMessageText}
                    value={message_text}
                />
                 <div className={css.buttonLast}>
                <button onClick={decryptMessage} className={css.buttonLast}> 
                   <span> Decrypt message!</span>
                </button>
                </div>
                <div>
                <h3>Decrypted text:</h3> 
                </div>
                <div className={css.Wrap}>
                    {message_text}
                </div>
         </div>
      
    )
}
