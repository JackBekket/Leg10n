import React, { useState, useEffect } from 'react'
import {Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {abi} from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"


interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;


export default function RequestJoin(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  var [user_id, setUserId] = useState<string>("")
  var [user_name, setUserName] = useState<string>("")
  var [parent_name, setParentName] = useState<string>("")
  var [public_key, setPublicKey] = useState<string>("")

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

  var id = queryParams.get('id');   // get id as string from query                // similar to parseInt()
  var name = queryParams.get('codename');
  var p_name  = queryParams.get('parent');  // TODO: set it
  /*
  if (p_name != "") {
    setParentName(p_name);
  }
  */
setUserId(id!);
setParentName(p_name!);
setUserName(name!);

console.log("id")
console.log(id)
  //let name_get : string = name;


  
  
  //setUserName(name);      // @TODO: fix it  
  
  }, []);
  

  async function sendJoinRequest(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const Legion:Contract = new ethers.Contract(addressContract, abi, signer)

    Legion.RequestJoin(user_id,user_name,parent_name, public_key,{value:ethers.utils.formatUnits(2000000000000000,"wei")})
     .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then((receipt:TransactionReceipt) => {console.log("join request receipt", receipt)})
        })
         .catch((e:Error) => console.log(e))
     }


  
  //const handleChange = (value:string) => setUserId(value)
  //http://localhost:3000?user_tg_id=1337&user_tg_name=Alice
  return (
    <form onSubmit={sendJoinRequest}>
    <FormControl>
      <FormLabel htmlFor='TGID'> Join Request Form </FormLabel>
      <Input id="tgid" type="text" required placeholder='Your ID'  onChange={(e) => setUserId(e.target.value)} value={user_id} my={3}/>
      <Input id="tg_name" type="text" required placeholder='Your codename' onChange={(e) => setUserName(e.target.value)} value={user_name} my={3}/>
      <Input id="parent_name" type="text" required placeholder="Codename of user who invited you" onChange={(e) => setParentName(e.target.value)} value={parent_name} my={3}/>
      <Input id="public_key" type="text" required placeholder='Paste your public key here' onChange={(e) => setPublicKey(e.target.value)} value={public_key} my={3}/>
      <Button type="submit" isDisabled={!currentAccount}>Apply for Join</Button>
    </FormControl>
    </form>
  )
}