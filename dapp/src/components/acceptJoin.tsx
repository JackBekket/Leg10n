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


export default function AcceptJoin(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  var [user_id, setUserId] = useState<string>("")
  var [user_name, setUserName] = useState<string>("")

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

  var id = queryParams.get('id');   // get id as string from query
  var name = queryParams.get('parent');
  //let name_get : string = name;
  

  
  
  setUserName(name!);
  setUserId(id!);
  
  }, []);
  

  // @dev this function call acceptJoin function in solidity, it should accept tgid(of user who want to join) and parant_name(user_name of user who accepting join)
  async function acceptJoinRequest(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const Legion:Contract = new ethers.Contract(addressContract, abi, signer)
    Legion.AcceptJoin(user_id,user_name)
     .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then((receipt:TransactionReceipt) => {console.log("join request receipt", receipt)})
        })
         .catch((e:Error) => console.log(e))
     }


  return (
    <form onSubmit={acceptJoinRequest}>
    <FormControl>
      <FormLabel htmlFor='TGID'>Accept Joining </FormLabel>
      <Input id="tgid" type="text" required placeholder='input tgid number of one who you want to accept invite' onChange={(e) => setUserId(e.target.value)} value={user_id} my={3}/>
     
      <Input id="tg_name" type="text" required placeholder='Input your codename' onChange={(e) => setUserName(e.target.value)} value={user_name} my={3}/>
      <Button type="submit" isDisabled={!currentAccount}>Accept Join Request</Button>
    </FormControl>
    </form>
  )
}