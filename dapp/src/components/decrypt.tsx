import React, { useState, useEffect } from 'react'
import {Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel, Text } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {abi} from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'
import { Contract } from "ethers"
import '@ethereumjs/util'
import '@metamask/eth-sig-util'


interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;


export default function DecryptMessage(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const ethUtil = require('ethereumjs-util');
  const sigUtil = require('@metamask/eth-sig-util');
  var [user_name, setUserName] = useState<string>("")
  var [user_wallet, setUserWallet] = useState<string>("")
  var [message_text,setMessageText] = useState<string>("")

  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  var name = queryParams.get('user_tg_name');
  
  
  //setUserName(name);
  
  }, []);
  



   async function getWalletByUsername(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const Legion:Contract = new ethers.Contract(addressContract, abi, signer)
    Legion.GetWalletByNickName(user_name)
     .then((result:string) => {
        console.log(result)
        setUserWallet(result)
     })
   }

   async function decryptText(plain_text:string) {
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    window.ethereum
    .request({
      method: 'eth_decrypt',
      params: [message_text, {currentAccount}],
    })
    .then((result:string) =>
      //console.log("result: ", result)
      setMessageText(result)
     // console.log('The decrypted message is:', decryptedMessage)
      
    )
    .catch((error:TypeError) => console.log(error.message));
     // setMessageText(encryptMessage);
    // return decryptedMessage;
        
   }




   async function decryptMessage(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

   // const wallet = provider
   decryptText(message_text)
   }

  return (
    <form onSubmit={decryptMessage}>
    <FormControl>
      <FormLabel htmlFor='TGID'>Input codename to get its eth address </FormLabel>
      <Input id="text to send" type="text" required placeholder='Input text to decrypt' onChange={(e) => setMessageText(e.target.value)} value={message_text} my={3} />
      <Button type="submit" isDisabled={!currentAccount}>Decrypt message!</Button>
    </FormControl>
    </form>


  )
}