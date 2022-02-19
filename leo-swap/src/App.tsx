import React, {useEffect, useState} from 'react';
import {Contract, Signer} from 'ethers'
import {
  Routes,
  Route,
  Navigate, NavLink,
} from "react-router-dom";
import {Connect} from './components/Connect';
import {Swapper} from './components/Swapper';
import {Profile} from './components/Profile';
import './App.css';
import Addresses from './contracts/addresses.json';
import LeoTokenSource from './contracts/abis/LeoToken.json'
import UsdtTokenSource from './contracts/abis/UsdtToken.json'
import {LeoToken, UsdtToken} from './contracts/types';

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

interface TokensState {
  leoToken: LeoToken,
  usdtToken: UsdtToken
}

const App = () => {
  const [signer, setSigner] = useState<SignerState>({
    isLoading: false,
  })
  const [tokens, setTokens] = useState<TokensState | undefined>()
  
  useEffect(() => {
    if (!signer.account) {
      return
    }
    
    setTokens({
      leoToken: new Contract(Addresses.LeoToken, LeoTokenSource.abi, signer.account) as LeoToken,
      usdtToken: new Contract(Addresses.UsdtToken, UsdtTokenSource.abi, signer.account) as UsdtToken,
    })
  }, [signer])
  
  return (
    <>
      <header>
        leo swap
        {signer.account && (
          <nav>
            <NavLink to={'/profile'}>Profile</NavLink>
            <NavLink to={'/market'}>Market</NavLink>
          </nav>
        )}
      </header>
      <main>
        <Routes>
          {signer.account && tokens ? (
            <>
              <Route path={'/profile'} element={<Profile signer={signer.account} {...tokens} />} />
              <Route path={'/market'} element={<Swapper signer={signer.account} {...tokens}  />} />
              <Route path={'*'} element={<Navigate to={'/profile'} />} />
            </>
          ) : (
            <>
              <Route path={'/'} element={<Connect isLoading={signer.isLoading} setSigner={setSigner} />} />
              <Route path={'*'} element={<Navigate to={'/'} />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
