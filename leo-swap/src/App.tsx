import React, {useState} from 'react';
import {Signer} from 'ethers'
import './App.css';
import {Connect} from './components/Connect';
import {Swapper} from './components/Swapper';

declare global {
  interface Window {
    ethereum: any
  }
}

export interface SignerState {
  account?: Signer,
  isLoading: boolean
  error?: string
}

const App = () => {
  const [signer, setSigner] = useState<SignerState>({
    isLoading: false,
  })
  
  return (
    <>
      <header>
        leo swap
      </header>
      <main>
        <div className="container">
          {!signer.account ? (
            <Connect isLoading={signer.isLoading} setSigner={setSigner} />
          ) : (
            <Swapper signer={signer.account} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
