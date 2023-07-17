import type { NextPage } from 'next'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo, WalletNumber, Form, SimpleInput } from '@/components'
import { FormEvent } from 'react'
import { ethers } from 'ethers'
//import type { GetServerSideProps } from "next";

declare let window: any

const Home: NextPage = () => {
    const {
        currentAccount,
        public_key,
        userWallet,
        tgid_to,
        getRemoteAddress,
        getRemotePublicKey,
        getRemoteTgId,
        recieverName,
        setRecieverName,
        setMessageText,
        messageText
    } = useAppContext()
    const ethUtil = require('ethereumjs-util')
    const sigUtil = require('@metamask/eth-sig-util')
    async function recieverInfo(e: FormEvent) {
        // await Promise.all([getRemoteAddress(e), getRemotePublicKey(e), getRemoteTgId(e)]) - это если параллельно надо их выполнять

        try {
            getRemoteAddress(e)
        } catch (error) {
            console.log("couldn't get the reciever's address!")
            console.error(error)
        }

        try {
            getRemotePublicKey(e)
        } catch (error) {
            console.log("couldn't get the reciever's public key!")
            console.error(error)
        }

        try {
            getRemoteTgId(e)
        } catch (error) {
            console.log("couldn't get the reciever's telegram ID!")
            console.error(error)
        }
//work in progress by daseinsucks 17.07.22
        const encrypted = () => {}
        console.log('Готово, вы восхитительны!')
    }



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
        return encryptedMessage
    }

    async function encryptMessage(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        if (!public_key) return

        var encrypted_text = await encryptText(messageText, public_key)
        setMessageText(encrypted_text)
    }

    async function sendMessage(event: React.FormEvent) {
        event.preventDefault()
        await handleSendMessage(event)
    }

    async function handleSendMessage(event: React.FormEvent) {
        //var url1 = 'https://api.telegram.org/bot'
        var chatid = parseInt(tgid_to)
        var message = messageText
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


    return (
        <div className="page">
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
                    id="tg_name"
                    placeholder="Text for encryption"
                    setValue={setMessageText}
                    value={messageText}
                />
            </Form>
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
