import type { NextPage } from 'next'
import Head from 'next/head'
//import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox } from '@chakra-ui/layout'
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import AcceptJoin from '../../components/acceptJoin'
import { useAppContext } from '../../components/AppContext'
import { AccountInfo } from '../../components/AccountInfo'
import { WalletNumber } from '@/components'

declare let window: any

const Home: NextPage = () => {
    const { currentAccount, legionAddress } = useAppContext()

    return (
        <div className="page">
            <WalletNumber />
            <AccountInfo />
            <AcceptJoin />
        </div>
    )
}

export default Home
