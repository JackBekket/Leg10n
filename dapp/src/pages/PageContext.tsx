import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

type PageContext = {
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
}

declare let window: any // WTF? Why should I do that?

const pageContext = createContext<PageContext>({} as PageContext)

export const usePageContext = () => useContext(pageContext)

export function PageContextProvider({ children = null as React.ReactNode }) {
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

    return (
        <pageContext.Provider
            value={{
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
                addPolygonNetwork
            }}
        >
            {children}
        </pageContext.Provider>
    )
}
