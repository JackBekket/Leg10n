import React, { useEffect } from 'react'
import { Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'
import { useAppContext } from '../pages/AppContext'

export default function GetWalletByTelegramNickNameTG() {
    const { currentAccount, userName, setUserName, userWallet, getWalletByUsername } =
        useAppContext()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var name = queryParams.get('user_tg_name')

        //setUserName(name);
    }, [])

    return (
        <form onSubmit={getWalletByUsername}>
            <FormControl>
                <FormLabel htmlFor="TGID">Input codename to get its eth address </FormLabel>
                <Input
                    id="tg_name"
                    type="text"
                    required
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    my={3}
                />
                <Button type="submit" isDisabled={!currentAccount}>
                    Get wallet address
                </Button>
            </FormControl>
            <div>
                <Text>
                    <b>Ethereum address associated with this codename</b>: {userWallet}
                </Text>
            </div>
        </form>
    )
}
