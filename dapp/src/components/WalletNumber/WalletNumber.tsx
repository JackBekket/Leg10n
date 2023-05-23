import React from 'react'
// import cls from 'classnames'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useAppContext } from '../../pages/AppContext'

export function WalletNumber() {
    const { currentAccount, onClickConnect, onClickDisconnect } = useAppContext()

    return (
        <Box w="100%" my={4}>
            {currentAccount ? (
                <Button type="button" w="100%" onClick={onClickDisconnect}>
                    Account:{currentAccount}
                </Button>
            ) : (
                <Button type="button" w="100%" onClick={onClickConnect}>
                    Connect MetaMask
                </Button>
            )}
        </Box>
    )
}
