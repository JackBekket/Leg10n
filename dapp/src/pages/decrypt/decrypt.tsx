import type { NextPage } from 'next'
import Head from 'next/head'
//import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
//import GetPublicKey from '../components/getPuclicKey'
import DecryptMessage from '../../components/Decrypt/decrypt'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo, WalletNumber } from '@/components'
import css from './Decrypt.module.scss'
declare let window: any

const Home: NextPage = () => {
    const { currentAccount, legionAddress } = useAppContext()

    return (

        <div className='page'>
<div className={css.decryptContainer}>
        <>
                <WalletNumber />
                <AccountInfo />
                <DecryptMessage />
        </>
        </div>
        </div>
    )
}

export default Home
