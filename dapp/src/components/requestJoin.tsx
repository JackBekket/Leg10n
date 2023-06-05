import React from 'react'
import { ethers } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from 'ethers'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

import { useAppContext } from '../pages/AppContext'
import { SimpleInput } from './SimpleInput'
import { Form } from './Form'

declare let window: any

export default function RequestJoin() {
    const {
        public_key,
        userId,
        setUserId,
        plainId,
        setPlain,
        userName,
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
            <SimpleInput placeholder="Your telegram ID" setValue={setPlain} value={plainId} />
            <SimpleInput
                id="parent_name"
                placeholder="Inviter's codename"
                setValue={setPlain}
                value={plainId}
            />
            <SimpleInput
                placeholder="Inviter's codename"
                setValue={setParentName}
                value={parentName}
            />
            <SimpleInput
                placeholder="Your public key"
                setValue={setParentName}
                value={parentName}
            />
            {/* <button onClick={sendJoinRequest}></button> */}
        </Form>
    )
}

{
    /* <form onSubmit={sendJoinRequest}>
            <FormControl>
                <FormLabel htmlFor="TGID"> Join Request Form </FormLabel>
                <Input
                    id="tgid"
                    type="text"
                    required
                    placeholder="Your encrypted ID"
                    onChange={e => setUserId(e.target.value)}
                    value={user_id}
                    my={3}
                />
                <Input
                    id="tgid"
                    type="text"
                    required
                    placeholder="Your ID"
                    onChange={e => setPlain(e.target.value)}
                    value={plain_id}
                    my={3}
                />
                <Input
                    id="tg_name"
                    type="text"
                    required
                    placeholder="Your codename"
                    onChange={e => setUserName(e.target.value)}
                    value={user_name}
                    my={3}
                />
                <Input
                    id="parent_name"
                    type="text"
                    required
                    placeholder="Codename of user who invited you"
                    onChange={e => setParentName(e.target.value)}
                    value={parent_name}
                    my={3}
                />
                <Input
                    id="public_key"
                    type="text"
                    required
                    placeholder="Paste your public key here"
                    onChange={e => setPublicKey(e.target.value)}
                    value={public_key}
                    my={3}
                />
                <Button type="submit" isDisabled={!currentAccount}>
                    Apply for Join
                </Button>
            </FormControl>
        </form> */
}
