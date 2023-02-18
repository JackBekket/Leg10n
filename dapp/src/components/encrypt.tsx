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


export default function EncryptMessage(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const ethUtil = require('ethereumjs-util');
  const sigUtil = require('@metamask/eth-sig-util');
  var [user_name, setUserName] = useState<string>("")
  var [user_wallet, setUserWallet] = useState<string>("")
  var [message_text,setMessageText] = useState<string>("")
  var [public_key,setPublicKey] = useState<string>("")

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

   async function encryptText(plain_text:string, public_key:string) {
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const encryptedMessage = ethUtil.bufferToHex(
        Buffer.from(
          JSON.stringify(
            sigUtil.encrypt({
              publicKey: public_key,
              data: plain_text,
              version: 'x25519-xsalsa20-poly1305',
            })
          ),
          'utf8'
        )
      );
     // setMessageText(encryptMessage);
      return encryptedMessage;
        
   }



   async function getPublicKey(user_address:string) {
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const Legion:Contract = new ethers.Contract(addressContract, abi, signer)
    Legion.GetPublicKeyByAddress(user_address)
     .then((result:string) => {
        console.log("public key assosiated with address: ", result);
        setPublicKey(result)
        console.log(result)
       // return result;
     });
     return public_key;
   }

   async function encryptMessage(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

   // const wallet = provider
    const Legion:Contract = new ethers.Contract(addressContract, abi, signer)
    Legion.GetWalletByNickName(user_name)
     .then((result:string) => {
        console.log("result: ", result);
        setUserWallet(result)
        getPublicKey(result)
     }).then((result:string) => {
        console.log("result: ", result);
        
        
     });

     var encrypted_text = await encryptText(message_text,public_key);
     setMessageText(encrypted_text);
     
        /*
        getPublicKey(result)
     }).then((result:string) => {
        console.log("public key: ", result)
       encryptText(message_text,result);
     }).then((result:string) => {
        setMessageText(result)
     })
     */


   }

  return (
    <form onSubmit={encryptMessage}>
    <FormControl>
      <FormLabel htmlFor='TGID'>Message encrypting</FormLabel>
      <Input id="tg_name" type="text" required placeholder='input codename *TO WHOM* you want to encrypt'  onChange={(e) => setUserName(e.target.value)} value={user_name} my={3}/>
      <Input id="text_to_send" type="text" required placeholder='Input text to encrypt' onChange={(e) => setMessageText(e.target.value)} value={message_text} my={3} />
      <Button type="submit" isDisabled={!currentAccount}>Encrypt message!</Button>
    </FormControl>
    </form>


  )
}