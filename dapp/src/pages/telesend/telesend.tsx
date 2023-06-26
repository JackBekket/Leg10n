import type { NextPage } from 'next'
import { ethers, Contract } from 'ethers'
import clsx from 'clsx'
import { abi } from '../../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo, WalletNumber, Form, SimpleInput } from '@/components'
import css from './telesend.module.scss'

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
    const { currentAccount, legionAddress, userName, setUserName, userWallet, setUserWallet } =
        useAppContext()

    console.log('USER WALLET:', userWallet)
    console.log('CURRENT ACCOUNT:', currentAccount)

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
                    setValue={setUserName}
                    value={userName}
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

{
    /* <VStack>
                <WalletNumber />
                <AccountInfo />
                <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                    <Heading my={4} fontSize="xl">
                        Encrypt message
                    </Heading>
                    <EncryptMessage />
                </Box>
                ...
            </VStack> */
}
