import React from 'react'
import { ethers } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

import { useAppContext } from '../pages/AppContext'
import { Form, SimpleInput } from '@/components'

declare let window: any

export default function RequestJoin() {
    const {
        public_key,
        setPublicKey,
        userId,
        setUserId,
        plainId,
        setPlain,
        userName,
        setUserName,
        parentName,
        setParentName,
        legionAddress
    } = useAppContext()

    async function sendJoinRequest(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)

        Legion.RequestJoin(userId, userName, parentName, public_key, plainId, {
            value: ethers.utils.formatUnits(2000000000000000, 'wei')
        })
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt: TransactionReceipt) => {
                    console.log('join request receipt', receipt)
                })
            })
            .catch((e: Error) => console.log(e))
    }

    //const handleChange = (value:string) => setUserId(value)
    //http://localhost:3000?user_tg_id=1337&user_tg_name=Alice

    return (
        <Form title="Join Request" asyncHandler={sendJoinRequest} buttonText="APPLY FOR JOIN">
            <SimpleInput
                id="tgid"
                placeholder="Your encrypted Telegram ID"
                setValue={setUserId}
                value={userId}
            />
            <SimpleInput
                id="tgid"
                placeholder="Your telegram ID"
                setValue={setPlain}
                value={plainId}
            />
            <SimpleInput
                id="tg_name"
                placeholder="Your codename"
                setValue={setUserName}
                value={userName}
            />
            <SimpleInput
                id="parent_name"
                placeholder="Inviter's codename"
                setValue={setParentName}
                value={parentName}
            />
            <SimpleInput
                id="public_key"
                placeholder="Your public key"
                setValue={setPublicKey}
                value={public_key}
            />
        </Form>
    )
}
