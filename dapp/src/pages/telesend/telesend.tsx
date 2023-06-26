import type { NextPage } from 'next'
import { ethers, Contract } from 'ethers'
import { abi } from '../../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo, WalletNumber, Form, SimpleInput } from '@/components'

//import type { GetServerSideProps } from "next";

declare let window: any

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

const Home: NextPage = () => {
    const { userName, setUserName, recieverName, setRecieverName } = useAppContext()

    async function recieverInfo() {
        console.log('УСЁ УСПЕШНЯ')
    }

    return (
        <div className="page">
            <WalletNumber />
            <AccountInfo />
            <Form
                title="Encrypt message"
                asyncHandler={recieverInfo}
                buttonText="GET RECIEVER'S ADDRESS"
                className="lol"
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
                    setValue={setUserName}
                    value={userName}
                />
            </Form>
        </div>
    )
}

export default Home
