import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import { abi } from '../../../artifacts/contracts/Leg10n.sol/Leg10n.json'

type AppContext = {
    legionAddress: string
    balance: string | null
    setBalance: (s: string) => void
    currentAccount: string | null
    setCurrentAccount: (s: string) => void
    chainId: number | null
    setChainId: (s: number) => void
    chainName: string | null
    setChainName: (s: string) => void
    onClickConnect: () => void
    onClickDisconnect: () => void
    addPolygonNetwork: () => void
    public_key: string
    setPublicKey: (s: string) => void
    getPublicKeyClient: (e: React.FormEvent) => void
    getPublicKey: (s: string) => Promise<string | null>
}

declare let window: any // WTF? Why should I do that?

const appContext = createContext<AppContext>({} as AppContext)

export const useAppContext = () => useContext(appContext)

export function AppContextProvider({ children = null as React.ReactNode }) {
    const legionAddress = '0xf86C79Da432c84ce57f323DC2f6e852eCE48F1C1'

    //------------------------ ACCOUNT INFO ------------------------//

    const [balance, setBalance] = useState<string | null>('')
    const [currentAccount, setCurrentAccount] = useState<string | null>('')
    const [chainId, setChainId] = useState<number | null>(0)
    const [chainName, setChainName] = useState<string | null>('')

    useEffect(() => {
        if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return

        //client side code
        if (!window.ethereum) return

        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

        provider.on('network', (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
                window.location.reload()
            }
        })

        provider.getBalance(currentAccount).then(result => {
            setBalance(ethers.utils.formatEther(result))
        })

        provider.getNetwork().then(result => {
            if (result.chainId != 137) {
                addPolygonNetwork()
            } else {
                setChainId(result.chainId)
                setChainName(result.name)
            }
        })
    }, [currentAccount])

    const onClickConnect = () => {
        //client side code
        if (!window.ethereum) {
            console.log('please install MetaMask')
            return
        }

        // change from window.ethereum.enable() which is deprecated
        // see docs: https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods

        // window.ethereum.request({ method: 'eth_requestAccounts' })
        // .then((accounts:any) => {
        //     if (accounts.length > 0) setCurrentAccount(accounts[0])
        // }).catch('error',console.error)

        //we can do it using ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // MetaMask requires requesting permission to connect users accounts
        provider
            .send('eth_requestAccounts', [])
            .then(accounts => {
                if (accounts.length > 0) setCurrentAccount(accounts[0])
            })
            .catch(e => console.log(e))
    }

    const onClickDisconnect = () => {
        console.log('onClickDisConnect')
        setBalance(null)
        setCurrentAccount(null)
    }

    const addPolygonNetwork = () => {
        window.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x89',
                    rpcUrls: ['https://polygon-rpc.com/'],
                    chainName: 'Matic Mainnet',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://explorer.matic.network']
                }
            ]
        })
    }

    //------------------------ GETTING PUBLIC KEY ------------------------//

    const [public_key, setPublicKey] = useState<string>('')

    async function getPublicKeyClient(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum) return

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // const signer = provider.getSigner()

        await window.ethereum.enable()

        const accounts = await provider.listAccounts()
        const pubkey = await provider.send('eth_getEncryptionPublicKey', [accounts[0]])

        // console.log(pubkey)
        setPublicKey(pubkey)
    }

    async function getPublicKey(user_address: string) {
        if (!window.ethereum) return null
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)
        Legion.GetPublicKeyByAddress(user_address).then((result: string) => {
            console.log('public key assosiated with address: ', result)
            setPublicKey(result)
            console.log(result)
            // return result;
        })
        return public_key
    }

    return (
        <appContext.Provider
            value={{
                legionAddress,
                balance,
                setBalance,
                currentAccount,
                setCurrentAccount,
                chainId,
                setChainId,
                chainName,
                setChainName,
                onClickConnect,
                onClickDisconnect,
                addPolygonNetwork,
                public_key,
                setPublicKey,
                getPublicKeyClient,
                getPublicKey
            }}
        >
            {children}
        </appContext.Provider>
    )
}
