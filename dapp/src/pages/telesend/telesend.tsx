import type { NextPage } from 'next'
import { useAppContext } from '../AppContext'
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
    const { currentAccount, legionAddress } = useAppContext()

    return (
        <div className="page">
            <WalletNumber />
            <AccountInfo />
            <Form
                title="Encrypt message"
                asyncHandler={sendJoinRequest}
                buttonText="GET RECIEVER'S ADDRESS"
            >
                <SimpleInput
                    id="parent_name"
                    placeholder="Inviter's codename"
                    setValue={setPlain}
                    value={plainId}
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
