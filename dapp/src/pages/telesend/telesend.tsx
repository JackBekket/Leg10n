import type { NextPage } from 'next'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo, WalletNumber, Form, SimpleInput } from '@/components'
import { FormEvent } from 'react'
//import type { GetServerSideProps } from "next";

declare let window: any

const Home: NextPage = () => {
    const {
        recieverName,
        setRecieverName,
        messageText,
        setMessageText,
        getRemoteAddress,
        getRemotePublicKey,
        getRemoteTgId
    } = useAppContext()

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

        console.log('Готово, вы восхитительны!')
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
