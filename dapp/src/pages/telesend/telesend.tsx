import type { NextPage } from 'next'
import { ethers } from 'ethers'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo, WalletNumber, Form, SimpleInput } from '@/components'
import { FormEvent, useEffect } from 'react'
import * as ethUtil from 'ethereumjs-util'
import * as sigUtil from '@metamask/eth-sig-util'
import clsx from 'clsx'
//import type { GetServerSideProps } from "next";

import globalCss from '../../styles/global.module.scss'
import css from './telesend.module.scss'

declare let window: any

const Home: NextPage = () => {
    const {
        recieverName,
        setRecieverName,
        recieverPubKey,
        outgoingMessage,
        setOutgoingMessage,
        getRemoteAddress,
        getRemotePublicKey,
        getRemoteTgId,
        public_key,
        recieverTgId,
        currentAccount,
        userWallet,
        recieverWallet
    } = useAppContext()

    async function recieverInfo(e: FormEvent) {
        // await Promise.all([getRemoteAddress(e), getRemotePublicKey(e), getRemoteTgId(e)]) - это если параллельно надо их выполнять

        try {
            getRemoteAddress(e)

            recieverWallet && console.log('recieverWallet inside recieverInfo fn ' + recieverWallet)
        } catch (error) {
            console.log("couldn't get the reciever's address!")
            console.error(error)
        }

        try {
            getRemotePublicKey(e)
            recieverPubKey && console.log('recieverPubKey inside recieverInfo fn ' + recieverPubKey)
        } catch (error) {
            console.log("couldn't get the reciever's public key!")
            console.error(error)
        }

        try {
            getRemoteTgId(e)
            recieverTgId && console.log('recieverTgId inside recieverInfo fn ' + recieverTgId)
        } catch (error) {
            console.log("couldn't get the reciever's telegram ID!")
            console.error(error)
        }

        recieverWallet && recieverPubKey && recieverTgId && console.log('Готово, вы восхитительны!')
    }

    async function encryptText(plain_text: string, recieverPubliKey: string) {
        if (!window.ethereum) return

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const encryptedMessage = ethUtil.bufferToHex(
            Buffer.from(
                JSON.stringify(
                    sigUtil.encrypt({
                        publicKey: recieverPubliKey,
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

        const encrypted_text = await encryptText(outgoingMessage, public_key)
        console.log("encrypt", encrypted_text)
        encrypted_text && setOutgoingMessage(encrypted_text)
    }

    async function sendMessage(event: React.FormEvent) {
        event.preventDefault()
        await handleSendMessage(event)
    }

    async function handleSendMessage(event: React.FormEvent) {
        //var url1 = 'https://api.telegram.org/bot'
        var chatid = parseInt(recieverTgId)
        var message = outgoingMessage
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

    // const isDisabledForSend =
    //     !currentAccount || public_key === '' || recieverTgId === '' || userWallet === ''
    const isDisabledForSend = !currentAccount || !public_key || !recieverTgId || !userWallet

    return (
        <div className={`page ${css.telesend}`}>
            <WalletNumber />
            <AccountInfo />
            <Form
                title="Encrypt message"
                asyncHandler={recieverInfo}
                buttonText="GET RECIEVER'S ADDRESS"
            >
                <SimpleInput
                    id="tg_name"
                    placeholder="Reciever's codename"
                    setValue={setRecieverName}
                    value={recieverName}
                />
                <SimpleInput
                    id="text_to_send"
                    placeholder="Text for encryption"
                    setValue={setOutgoingMessage}
                    value={outgoingMessage}
                />
            </Form>
            <div className={css.buttonsContainer}>
                <button
                    className={clsx(css.encrypt, !currentAccount && 'disabled')}
                    onClick={encryptMessage}
                >
                    <span className={css.buttonText}>ENCRYPT</span>
                </button>
                <button
                    className={clsx(css.send, isDisabledForSend && 'disabled')}
                    onClick={sendMessage}
                >
                    <span className={css.buttonText}>SEND</span>
                </button>
            </div>
        </div>
    )
}

export default Home

/*
export const getServerSideProps: GetServerSideProps = async () => {
    const fileExists = fs.existsSync("/some-file"); 
  
    return {
      props: {
        doesFileExist: fileExists,
      },
    };
  };
*/
