import React, { useState, useEffect } from 'react'
import {Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel, Text } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {abi} from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from "ethers"
import '@ethereumjs/util'
import '@metamask/eth-sig-util'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;


export default function Delete(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const ethUtil = require('ethereumjs-util');
  const sigUtil = require('@metamask/eth-sig-util');
  var [parent, setParent] = useState<string>("")
  var [child, setChild] = useState<string>("")
  

  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  var parent = queryParams.get('parent');
  var child = queryParams.get('child');
  
  
  //setUserName(name);
  
  }, []);
  



 

   
   async function deleteYourself(event:React.FormEvent) {
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const Legion:Contract = new ethers.Contract(addressContract, abi, signer)
    Legion.ClearParent(parent,child)
    .then((tr: TransactionResponse) => {
       console.log(`TransactionResponse TX hash: ${tr.hash}`)
       tr.wait().then((receipt:TransactionReceipt) => {console.log("Clear parent receipt", receipt)})
       })
        .catch((e:Error) => console.log(e))
        
        Legion.deleteYourSelf()
        .then((tr: TransactionResponse) => {
           console.log(`TransactionResponse TX hash: ${tr.hash}`)
           tr.wait().then((receipt:TransactionReceipt) => {console.log("Delete yourself receipt", receipt)})
           })
            .catch((e:Error) => console.log(e))
    
    
      }
  
     
   


  return (
    <form onSubmit={deleteYourself}>
    <FormControl>
      <FormLabel htmlFor='TGID'>Delete yourself</FormLabel>
      <Input id="parentname" type="text" required placeholder='Enter parent codename'  onChange={(e) => setParent(e.target.value)} value={parent} my={3}/>
      <Input id="childname" type="text" required placeholder='Enter your codename' onChange={(e) => setChild(e.target.value)} value={child} my={3} />
      <Button type="submit" isDisabled={!currentAccount}>Enter</Button>
    </FormControl>
    </form>


  )
  }
  