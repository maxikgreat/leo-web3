import {ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState, VFC} from 'react';
import {Contract, utils} from 'ethers';
import TokenSource from '../../contract/Token.json';
import Addresses from '../../contract/addresses.json';
import {Signer} from 'ethers';
import {Token} from '../../contract/types';
import {Loader} from '../../components/Loader';
import './Swapper.css';

interface SwapperProps {
  signer: Signer
}

interface BalancesState {
  eth?: string
  leo?: {
    summary: string
    free?: string
    blocked?: {
      until: string
      value: string
    }
  }
  rate?: number
  isLoading: boolean
}

interface InputsState {
  eth: number | undefined | string,
  leo: number | undefined | string
}

interface PurchaseState {
  error?: string
  isLoading: boolean
}

export const Swapper: VFC<SwapperProps> = ({signer}) => {
  const [token, setToken] = useState<Token | undefined>()
  const [balances, setBalances] = useState<BalancesState>({
    isLoading: true,
  })
  const [purchase, setPurchase] = useState<PurchaseState>({
    isLoading: false,
  })
  const [inputs, setInputs] = useState<InputsState>({
    eth: '',
    leo: '',
  })
  
  useEffect(() => {
    setToken(new Contract(Addresses.Token, TokenSource.abi, signer) as Token)
  }, [signer])
  
  const onEthValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(({target: {value}}) => {
    if (!balances.eth || !balances.rate) {
      return
    }
    
    if (value === '' || typeof value === 'undefined' || Number.isNaN(Number(value)) || Number(value) < 0) {
      setInputs({
        eth: '',
        leo: '',
      })
      return
    }
    
    if (Number(value) > parseFloat(balances.eth)) {
      return
    }
    
    setInputs({
      eth: Number(value),
      leo: Number(value) * balances.rate
    })
  }, [balances.eth, balances.rate])
  
  const getBalances = useCallback(async () => {
    if (!token) {
      return Promise.reject()
    }
    
    const signerAddress = await signer.getAddress()
    const eth = await signer.getBalance()
    const leo = await token.balanceOf(signerAddress)
    const [unblockTime, tokens] = await token.vesting(signerAddress)
    const rate = await token.ethRate()
    
    const vesting = unblockTime.isZero() || tokens.isZero() ? undefined : {
      free: utils.formatEther(leo.sub(tokens)),
      blocked: {
        until: new Date(unblockTime.toNumber() * 1000).toLocaleDateString('en-US'),
        value: utils.formatEther(tokens)
      }
    }
    
    setBalances({
      eth: utils.formatEther(eth),
      leo: {
        summary: utils.formatEther(leo),
        ...(vesting ?? {}),
      },
      rate,
      isLoading: false
    })
  },[signer, token])
  
  const onBuyLeo = useCallback(async () => {
    if (!token || !inputs.eth) {
      return;
    }
    
    setPurchase({
      isLoading: true
    })
    
    const value = utils.parseEther(inputs.eth.toString())
    
    try {
      await token.buy({value})
      await getBalances()
      setPurchase({
        isLoading: false
      })
      setInputs({
        eth: '',
        leo: '',
      })
    } catch (err) {
      let error = 'Unknown error'
      
      const message = (err as {message: string})?.message ?? ''
      
      if (message) {
        error = message
      }
      
      const nestedMessage = (err as {data: any})?.data?.message ?? ''
      
      if (nestedMessage?.includes('reverted with reason')) {
        const extractedMessage = nestedMessage.split("'")
        
        const [, ...rest] = extractedMessage
        
        if (Array.isArray(rest)) {
          error = rest.filter(string => string !== '').join("'")
        }
      }
      
      setPurchase({
        error,
        isLoading: false,
      })
    }
  }, [getBalances, inputs.eth, token])
  
  const onClearError = useCallback(() => {
    setPurchase(prevState => ({...prevState, error: undefined}))
  }, [setPurchase])
  
  
  useEffect(() => {
    if (!token) {
      return;
    }
  
    getBalances()
  }, [getBalances, token])
  
  const isBuyDisabled = useMemo(() =>
    purchase.isLoading || !Boolean(balances.eth && inputs.eth && inputs.eth > 0 && inputs.eth <= parseFloat(balances.eth)),
    [balances.eth, inputs.eth, purchase.isLoading]
  )
  
  return (
    <div className="swapper__container">
      {purchase.error && (
        <div className="swapper__error">
          {purchase.error}
          <span className="swapper__error-close" onClick={onClearError}>&times;</span>
        </div>
      )}
      {balances.isLoading
        ? <Loader />
        : (
          <>
            <div className="swapper__item-container">
              {balances.eth && (
                <span className="swapper__input-label">
                  <span className="eth-text">ETH balance:</span> {balances.eth}
                </span>
              )}
              <div className="swapper__input-container">
                <label>give</label>
                <input type="number" max={balances.eth ? parseFloat(balances.eth) : undefined} value={inputs.eth} onChange={onEthValueChange} className="swapper__input"/>
              </div>
            </div>
            <button className="swapper__button" disabled={isBuyDisabled} onClick={onBuyLeo}>
              {purchase.isLoading ? 'wait...' : 'swap'}
            </button>
            <div className="swapper__item-container">
              {balances.leo?.summary && (
                <span className="swapper__input-label">
                  <span className="leo-text">LEO balance:</span> {balances.leo.summary}
                </span>
              )}
              {balances.leo?.free && (
                <span className="free-tokens-text">Free: {balances.leo.free}</span>
              )}
              {balances.leo?.blocked && (
                <span className="blocked-tokens-text">Blocked: {balances.leo.blocked.value} (until {balances.leo.blocked.until})</span>
              )}
              <div className="swapper__input-container">
                <label>get</label>
                <input type="text" disabled value={inputs.leo} className="swapper__input"/>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
