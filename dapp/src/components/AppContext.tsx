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
    userId: string
    setUserId: (s: string) => void
    plainId: string
    setPlain: (s: string) => void
    userName: string
    setUserName: (s: string) => void
    parentName: string
    setParentName: (s: string) => void
    userWallet: string
    setUserWallet: (s: string) => void
    tgid_to: string
    recieverName: string
    setRecieverName: (s: string) => void
    setTgid_to: (s: string) => void
    getWalletByUsername: (e: React.FormEvent) => Promise<void>
    getRemoteAddress: (e: React.FormEvent) => Promise<void>
    getRemotePublicKey: (e: React.FormEvent) => Promise<void>
    getRemoteTgId: (e: React.FormEvent) => Promise<void>
    messageText: string
    setMessageText: (s: string) => void
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
        if (!window.ethereum || !user_address || user_address.trim() === '') return null
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)

        try {
            await Legion.GetPublicKeyByAddress(user_address).then((result: string) => {
                console.log('public key assosiated with address: ', result)
                setPublicKey(result)
                console.log(result)
                // return result;
            })
        } catch (error) {}

        return public_key
    }

    //------------------------ USERS INFO ------------------------//

    var [userId, setUserId] = useState<string>('')
    var [plainId, setPlain] = useState<string>('')
    var [userName, setUserName] = useState<string>('')
    var [parentName, setParentName] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var id = queryParams.get('id')
        var plainId = queryParams.get('plain') // get id as string from query                // similar to parseInt()
        var name = queryParams.get('codename')
        var p_name = queryParams.get('parent') // TODO: set it

        // if (p_name != '') {
        //     setParentName(p_name)
        // } шо цэ?

        setUserId(id!)
        setPlain(plainId!)
        setUserName(name!)
        setParentName(p_name!)

        //let name_get : string = name;
        //setUserName(name);      // @TODO: fix it
    }, [])

    //------------------------ TELESEND / USER WALLET ------------------------//

    const [userWallet, setUserWallet] = useState<string>('')
    const [userTGName, setUserTGName] = useState<string>('')

    const [recieverName, setRecieverName] = useState<string>('')
    const [recieverPubKey, setRecieverPubKey] = useState<string>('')
    const [tgid_to, setTgid_to] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const name = queryParams.get('user_tg_name')

        name && setUserTGName(name)

        // вот тут, похоже, нужен стейт отдельный типа nickname, setNickname, чтобы не перемешивать с уже существующим userName, setUserName, т.к. это имя используется при вызове GetWalletByNickName и getWalletByUsername, где имя может быть и отправителя и получателя
        // пока сделала для этого userTGName
    }, [])

    async function getWalletByUsername(event: React.FormEvent) {
        // ФУНКЦИЯ нигде не используется кроме как в компоненте getWalletUser, которая вроде тоже нигде не используется
        event.preventDefault()

        if (!window.ethereum || !userTGName || userTGName.trim() === '') return

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)

        // ВОТ ТУТ в функции GetWalletByNickName уже, похоже, идет перемешивание userName и потенциального recieverUserName

        try {
            await (userTGName &&
                Legion.GetWalletByNickName(userTGName).then((result: string) => {
                    console.log(result)
                    setUserWallet(result)
                }))
        } catch (error) {
            console.error(error)
        }
    }

    async function getRemoteAddress(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum || !userTGName || userTGName.trim() === '') return null
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)

        try {
            await Legion.GetWalletByNickName(userTGName).then((result: string) => {
                console.log('result: ', result)
                setUserWallet(result)
            })
        } catch (error) {
            console.log("Problems with getting reciever's addres")
            console.error(error)
        }
    }

    async function getRemotePublicKey(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum || !userWallet || userWallet.trim() === '') return null

        try {
            await (userWallet && getPublicKey(userWallet))
        } catch (error) {
            console.log("Problems with getting reciever's public key!")
            console.error(error)
        }
    }

    async function getRemoteTgId(event: React.FormEvent) {
        event.preventDefault()
        if (!window.ethereum || !userWallet || userWallet.trim() === '') return null
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const Legion: Contract = new ethers.Contract(legionAddress, abi, signer)

        try {
            await Legion.GetTgIdByAddress(userWallet).then((result: BigInteger) => {
                console.log('result: ', result)
                const str = result.toString()
                setTgid_to(str)
            })
        } catch (error) {
            console.log("Problems with getting reciever's telegram ID!")
            console.error(error)
        }

        /*
     await Legion.GetUserByNickName(user_wallet)
     .then((result:string) => {
        console.log("result: ", result);
        setTgid_to(result)
     });
     */
    }

    const [messageText, setMessageText] = useState<string>('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        var message = queryParams.get('text')
        setMessageText(message!)
    }, [setMessageText])

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
                getPublicKey,
                userId,
                setUserId,
                plainId,
                setPlain,
                userName,
                setUserName,
                parentName,
                setParentName,
                userWallet,
                setUserWallet,
                tgid_to,
                setTgid_to,
                recieverName,
                setRecieverName,
                getWalletByUsername,
                getRemoteAddress,
                getRemotePublicKey,
                getRemoteTgId,
                messageText,
                setMessageText
            }}
        >
            {children}
        </appContext.Provider>
    )
}
