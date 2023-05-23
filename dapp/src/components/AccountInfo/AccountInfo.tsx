import React from 'react'
// import cls from 'classnames'
import { Heading, Box } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import { useAppContext } from '../../pages/AppContext'

export function AccountInfo() {
    const { currentAccount, balance, chainId, chainName } = useAppContext()

    return currentAccount ? (
        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
                Account info
            </Heading>
            <Text>ETH Balance of current account: {balance}</Text>
            <Text>
                Chain Info: ChainId {chainId} name {chainName}
            </Text>
            <Text>Chain must be matic!</Text>
        </Box>
    ) : (
        <></>
    )
}
