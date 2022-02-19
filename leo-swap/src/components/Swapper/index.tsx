import {ChangeEventHandler, useCallback, useEffect, useMemo, useState, VFC} from 'react';
import {Contract,  utils} from 'ethers';
import LeoTokenSource from '../../contracts/abis/LeoToken.json';
import Addresses from '../../contracts/addresses.json';
import {Signer} from 'ethers';
import {LeoToken, UsdtToken} from '../../contracts/types';
import {Loader} from '../../components/Loader';
import './Swapper.css';
import {getNormalizedError} from '../../errorHandler';

interface SwapperProps {
  signer: Signer
  leoToken: LeoToken,
  usdtToken: UsdtToken,
}

interface InputsState {
  give: number | undefined | string,
  receive: number | undefined | string
}

interface PurchaseState {
  error?: string
  isLoading: boolean
}

export const Swapper: VFC<SwapperProps> = ({signer}) => {
  const [purchase, setPurchase] = useState<PurchaseState>({
    isLoading: false,
  })
  
  const [inputs, setInputs] = useState<InputsState>({
    give: '',
    receive: '',
  })
  
  
  const onEthValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(({target: {value}}) => {
    // if (!credits.eth || !credits.rate) {
    //   return
    // }
    //
    // if (value === '' || typeof value === 'undefined' || Number.isNaN(Number(value)) || Number(value) < 0) {
    //   setInputs({
    //     eth: '',
    //     leo: '',
    //   })
    //   return
    // }
    //
    // if (Number(value) > parseFloat(credits.eth)) {
    //   return
    // }
    //
    // setInputs({
    //   eth: Number(value),
    //   leo: Number(value) * credits.rate
    // })
  }, [])
  
  
  
  const onBuyLeo = useCallback(async () => {
    // if (!token || !inputs.eth) {
    //   return;
    // }
    //
    // setPurchase({
    //   isLoading: true
    // })
    //
    // const value = utils.parseEther(inputs.eth.toString())
    //
    // try {
    //   await token.buy({value})
    //   // await getCredits()
    //   setPurchase({
    //     isLoading: false
    //   })
    //   setInputs({
    //     eth: '',
    //     leo: '',
    //   })
    // } catch (err) {
    //   setPurchase({
    //     error: getNormalizedError(err),
    //     isLoading: false,
    //   })
    // }
  }, [])
  
  
  // const isSwapDisabled = useMemo(() =>
  //   purchase.isLoading || !Boolean(credits.eth && inputs.eth && inputs.eth > 0 && inputs.eth <= parseFloat(credits.eth)),
  //   [credits.eth, inputs.eth, purchase.isLoading]
  // )
  
  return (
    <div className="swapper__container">
      {/*{(purchase.error || withdraw.error) && (*/}
      {/*  <div className="swapper__error">*/}
      {/*    {purchase.error || withdraw.error}*/}
      {/*    <span className="swapper__error-close" onClick={onClearError}>&times;</span>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{credits.isOwner && (*/}
      {/*  <div className="swapper__owner">*/}
      {/*    You are owner. <span className="swapper__owner--withdraw" onClick={onWithdraw}>{withdraw.isLoading ? 'Loading...' : 'Withdraw funds'}</span>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{credits.isLoading*/}
      {/*  ? <Loader />*/}
      {/*  : (*/}
      {/*    <>*/}
      {/*      <div className="swapper__item-container">*/}
      {/*        {credits.eth && (*/}
      {/*          <span className="swapper__input-label">*/}
      {/*            <span className="eth-text">ETH balance:</span> {credits.eth}*/}
      {/*          </span>*/}
      {/*        )}*/}
      {/*        <div className="swapper__input-container">*/}
      {/*          <label>give</label>*/}
      {/*          <input type="number" max={credits.eth ? parseFloat(credits.eth) : undefined} value={inputs.eth} onChange={onEthValueChange} className="swapper__input"/>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <button className="swapper__button" disabled={isBuyDisabled} onClick={onBuyLeo}>*/}
      {/*        {purchase.isLoading ? 'wait...' : 'swap'}*/}
      {/*      </button>*/}
      {/*      <div className="swapper__item-container">*/}
      {/*        {credits.leo?.summary && (*/}
      {/*          <span className="swapper__input-label">*/}
      {/*            <span className="leo-text">LEO balance:</span> {credits.leo.summary}*/}
      {/*          </span>*/}
      {/*        )}*/}
      {/*        {credits.leo?.free && (*/}
      {/*          <span className="free-tokens-text">Free: {credits.leo.free}</span>*/}
      {/*        )}*/}
      {/*        {credits.leo?.blocked && (*/}
      {/*          <span className="blocked-tokens-text">Blocked: {credits.leo.blocked.value} (until {credits.leo.blocked.until})</span>*/}
      {/*        )}*/}
      {/*        <div className="swapper__input-container">*/}
      {/*          <label>get</label>*/}
      {/*          <input type="text" disabled value={inputs.leo} className="swapper__input"/>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </>*/}
      {/*  )*/}
      {/*}*/}
    </div>
  )
}
