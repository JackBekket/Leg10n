import React, { useState, useEffect } from 'react'
import {Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel, Text } from '@chakra-ui/react'
import {ethers} from 'ethers'
//import {abi} from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
//import { Contract } from "ethers"
import 'ethereumjs-util'
import '@metamask/eth-sig-util'


interface Props {
    currentAccount: string | undefined
}

declare let window: any;


export default function GetPublicKey(props:Props){
  
  const currentAccount = props.currentAccount
  const ethUtil = require('ethereumjs-util');
  const sigUtil = require('@metamask/eth-sig-util');
  var [public_key, setPublicKey] = useState<string>("")

  useEffect(() => {

  
  
  //setUserName(name);
  
  }, []);
  




   async function getPublicKeyClient(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    await window.ethereum.enable()
    const accounts = await provider.listAccounts();
    const pubkey = await provider.send('eth_getEncryptionPublicKey', [accounts[0]]);
    console.log(pubkey); // zjXCj9iuse3gHGaAIIgyaiCOsJpQWSCEBBac/zPGrgQ=
    setPublicKey(pubkey)
   }



  return (
    <form onSubmit={getPublicKeyClient}>
    <FormControl>
      <FormLabel htmlFor='TGID'>Get your own public key </FormLabel>
    <div>
    <Text><b>Public key of your own wallet</b>: {public_key}</Text>
    </div>
      <Button type="submit" isDisabled={!currentAccount}>Get your own public key</Button>
    </FormControl>
    </form>


  )
}