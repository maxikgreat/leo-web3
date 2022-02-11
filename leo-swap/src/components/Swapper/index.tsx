import {ChangeEventHandler, useCallback, useEffect, useMemo, useState, VFC} from 'react';
import {Contract,  utils} from 'ethers';
import TokenSource from '../../contract/Token.json';
import Addresses from '../../contract/addresses.json';
import {Signer} from 'ethers';
import {Token} from '../../contract/types';
import {Loader} from '../../components/Loader';
import './Swapper.css';
import {getNormalizedError} from '../../errorHandler';

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
  isOwner: boolean
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
  const [credits, setCredits] = useState<BalancesState>({
    isLoading: true,
    isOwner: false,
  })
  const [purchase, setPurchase] = useState<PurchaseState>({
    isLoading: false,
  })
  const [withdraw, setWithdraw] = useState<PurchaseState>({
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
    if (!credits.eth || !credits.rate) {
      return
    }
    
    if (value === '' || typeof value === 'undefined' || Number.isNaN(Number(value)) || Number(value) < 0) {
      setInputs({
        eth: '',
        leo: '',
      })
      return
    }
    
    if (Number(value) > parseFloat(credits.eth)) {
      return
    }
    
    setInputs({
      eth: Number(value),
      leo: Number(value) * credits.rate
    })
  }, [credits.eth, credits.rate])
  
  const getCredits = useCallback(async () => {
    if (!token) {
      return Promise.reject()
    }
    
    const signerAddress = await signer.getAddress()
    const ownerAddress = await token.owner()
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
    
    setCredits({
      eth: utils.formatEther(eth),
      leo: {
        summary: utils.formatEther(leo),
        ...(vesting ?? {}),
      },
      rate,
      isLoading: false,
      isOwner: signerAddress === ownerAddress
    })
  },[signer, token])
  
  const onWithdraw = useCallback(async () => {
    if (!token || withdraw.isLoading) {
      return;
    }
    
    setWithdraw({
      isLoading: true
    })
    
    try {
      await token.withdrawToOwner()
  
      setWithdraw({
        isLoading: false
      })
    } catch (err) {
      setWithdraw({
        error: getNormalizedError(err),
        isLoading: false,
      })
    }
  }, [token, withdraw])
  
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
      await getCredits()
      setPurchase({
        isLoading: false
      })
      setInputs({
        eth: '',
        leo: '',
      })
    } catch (err) {
      setPurchase({
        error: getNormalizedError(err),
        isLoading: false,
      })
    }
  }, [getCredits, inputs.eth, token])
  
  const onClearError = useCallback(() => {
    setPurchase(prevState => ({...prevState, error: undefined}))
    setWithdraw(prevState => ({...prevState, error: undefined}))
  }, [setPurchase, setWithdraw])
  
  
  useEffect(() => {
    if (!token) {
      return;
    }
  
    getCredits()
  }, [getCredits, token])
  
  const isBuyDisabled = useMemo(() =>
    purchase.isLoading || !Boolean(credits.eth && inputs.eth && inputs.eth > 0 && inputs.eth <= parseFloat(credits.eth)),
    [credits.eth, inputs.eth, purchase.isLoading]
  )
  
  return (
    <div className="swapper__container">
      {(purchase.error || withdraw.error) && (
        <div className="swapper__error">
          {purchase.error || withdraw.error}
          <span className="swapper__error-close" onClick={onClearError}>&times;</span>
        </div>
      )}
      {credits.isOwner && (
        <div className="swapper__owner">
          You are owner. <span className="swapper__owner--withdraw" onClick={onWithdraw}>{withdraw.isLoading ? 'Loading...' : 'Withdraw funds'}</span>
        </div>
      )}
      {credits.isLoading
        ? <Loader />
        : (
          <>
            <div className="swapper__item-container">
              {credits.eth && (
                <span className="swapper__input-label">
                  <span className="eth-text">ETH balance:</span> {credits.eth}
                </span>
              )}
              <div className="swapper__input-container">
                <label>give</label>
                <input type="number" max={credits.eth ? parseFloat(credits.eth) : undefined} value={inputs.eth} onChange={onEthValueChange} className="swapper__input"/>
              </div>
            </div>
            <button className="swapper__button" disabled={isBuyDisabled} onClick={onBuyLeo}>
              {purchase.isLoading ? 'wait...' : 'swap'}
            </button>
            <div className="swapper__item-container">
              {credits.leo?.summary && (
                <span className="swapper__input-label">
                  <span className="leo-text">LEO balance:</span> {credits.leo.summary}
                </span>
              )}
              {credits.leo?.free && (
                <span className="free-tokens-text">Free: {credits.leo.free}</span>
              )}
              {credits.leo?.blocked && (
                <span className="blocked-tokens-text">Blocked: {credits.leo.blocked.value} (until {credits.leo.blocked.until})</span>
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
