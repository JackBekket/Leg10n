import React, { useState, useEffect } from 'react'
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

import { useAppContext } from './AppContext'
import { Form } from './Form'
import { SimpleInput } from './SimpleInput'

declare let window: any

export default function AcceptJoin() {
    const { currentAccount, legionAddress, userId, userName, setUserId, setUserName } =
        useAppContext()

    // @dev this function call acceptJoin function in solidity, it should accept tgid(of user who want to join) and parant_name(user_name of user who accepting join)

    async function acceptJoinRequest(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)
        Legion.AcceptJoin(userId, userName)
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt: TransactionReceipt) => {
                    console.log('join request receipt', receipt)
                })
            })
            .catch((e: Error) => console.log(e))
    }

    return (
        <Form title="Accept Join" asyncHandler={acceptJoinRequest} buttonText="ACCEPT REQUEST">
            <SimpleInput
                id="tgid"
                placeholder="TG-ID of the person you want to accept "
                setValue={setUserId}
                value={userId!}
            />
            <SimpleInput
                id="tg_name"
                placeholder="Your codename"
                setValue={setUserName}
                value={userName!}
            />
        </Form>
    )
}

{
    /* <form onSubmit={acceptJoinRequest}>
            <FormControl>
                <FormLabel htmlFor="TGID">Accept Joining </FormLabel>
                <Input
                    id="tgid"
                    type="text"
                    required
                    placeholder="input tgid number of one who you want to accept invite"
                    onChange={e => setUserId(e.target.value)}
                    value={userId}
                    my={3}
                />

                <Input
                    id="tg_name"
                    type="text"
                    required
                    placeholder="Input your codename"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    my={3}
                />
                <Button type="submit" isDisabled={!currentAccount}>
                    Accept Join Request
                </Button>
            </FormControl>
        </form> */
}
