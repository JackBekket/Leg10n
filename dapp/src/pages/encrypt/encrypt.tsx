import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box } from '@chakra-ui/layout'
import EncryptMessage from '../../components/Encrypt/encrypt'
import { AccountInfo } from '../../components/AccountInfo'
import { WalletNumber } from '@/components'

import css from './Encrypt.module.scss'

const Home: NextPage = () => {
    return (
        <>
<div className='page'>
<div className={css.encryptContainer}>
            <VStack>
                <WalletNumber />
                <AccountInfo />
                <EncryptMessage />
               
                ...
            </VStack>
            </div>
            </div>
        </>
    )
}

export default Home
