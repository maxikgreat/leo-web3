import {Dispatch, SetStateAction, VFC} from 'react';
import './Connect.css'
import {providers} from 'ethers';
import {SignerState} from '../../App';
import {Loader} from '../../components/Loader';

declare global {
  class WalletConnectProvider {}
}

interface ConnectProps {
  setSigner: Dispatch<SetStateAction<SignerState>>
  isLoading: boolean
}

export const Connect: VFC<ConnectProps> = ({setSigner, isLoading}) => {
  const setSignerHandler = async (_provider: any, requestAccounts = true) => {
    const provider = new providers.Web3Provider(_provider)
  
    
    if (requestAccounts) {
      await provider.send("eth_requestAccounts", []);
    }
    
  
    setSigner({
      account: provider.getSigner(),
      isLoading: false,
    })
  }
  
  const onMetamaskConnect = async () => {
    setSigner({isLoading: true})
    try {
      if (window.ethereum) {
        await setSignerHandler(window.ethereum)
      } else {
        alert('You have no metamask installed')
      }
    } catch (error) {
      setSigner({
        isLoading: false,
        error: (error as {message: string})?.message ?? 'Unexpected error',
      })
    }
  }
  
  const onWalletConnect = async () => {
    setSigner({isLoading: true})
    try {
      // @ts-expect-error err
      const walletProvider = new WalletConnectProvider.default({
        infuraId: 'ce14f5c2682147d58bcbbc567cba97a6',
        rpc: {
          31337: "http://localhost:8545",
        },
      });
      
      await walletProvider.enable();
  
      await setSignerHandler(walletProvider,false)
    } catch (error) {
      setSigner({
        isLoading: false,
        error: (error as {message: string})?.message ?? 'Unexpected error',
      })
    }
  }
  
  return  (
    <div className="connector">
      <h2>Welcome!</h2>
      {isLoading ? (
        <div className="connector__loader">
          <Loader />
          <p>(finish connecting wallet in opened window)</p>
        </div>
      ) : (
        <>
          Connect via:
          <div className="connector__option" onClick={onMetamaskConnect}>
            Metamask
          </div>
          <div className="connector__option" onClick={onWalletConnect}>
            Wallet connect
          </div>
        </>
      )}
    </div>
  )
}
