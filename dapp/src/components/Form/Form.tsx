import React from 'react'

import css from './Form.module.scss'
import { SimpleInput } from '../SimpleInput'

import { useAppContext } from '../../pages/AppContext'

export function Form({
    title,
    children,
    className
}: {
    title: string
    children: React.ReactNode | React.ReactNode[]
    className?: string
}) {
    const { currentAccount, balance, chainId, chainName } = useAppContext()

    return (
        <div className={css.formContainer}>
            <h2>{title}</h2>
            <SimpleInput placeholder="Your encrypter TG ID"></SimpleInput>
        </div>
    )
}

{
    /* <form onSubmit={sendJoinRequest}>
    <FormControl>
      <FormLabel htmlFor='TGID'> Join Request Form </FormLabel>
      <Input id="tgid" type="text" required placeholder='Your encrypted ID'  onChange={(e) => setUserId(e.target.value)} value={user_id} my={3}/>
      <Input id="tgid" type="text" required placeholder='Your ID'  onChange={(e) => setPlain(e.target.value)} value={plain_id} my={3}/>
      <Input id="tg_name" type="text" required placeholder='Your codename' onChange={(e) => setUserName(e.target.value)} value={user_name} my={3}/>
      <Input id="parent_name" type="text" required placeholder="Codename of user who invited you" onChange={(e) => setParentName(e.target.value)} value={parent_name} my={3}/>
      <Input id="public_key" type="text" required placeholder='Paste your public key here' onChange={(e) => setPublicKey(e.target.value)} value={public_key} my={3}/>
      <Button type="submit" isDisabled={!currentAccount}>Apply for Join</Button>
    </FormControl>
    </form> */
}
