import {useState, VFC} from 'react';
import './Market.css'
import {Signer} from 'ethers';
import {LeoNft, LeoToken, Market as MarketType, UsdtToken} from '../../contracts/types';
import {Token, useSwapper} from '../../hooks/useSwapper';
import {Error} from '../../components/Error';
import {Fungible} from '../../components/Market/Fungible';
import {NonFungible} from '../../components/Market/NonFungible';
import {useNft} from '../../hooks/useNft';

interface MarketProps {
  signer: Signer,
  market: MarketType
  leoToken: LeoToken,
  usdtToken: UsdtToken
  leoNft: LeoNft
}

export const Market: VFC<MarketProps> = ({signer, market, leoToken, usdtToken, leoNft}) => {
  const [tab, setTab] = useState<'fungible' | 'nonFungible'>('fungible')
  const {swap, clearSwapError, ...rest} = useSwapper({signer, market, leoToken, usdtToken})
  const {nftBalance, onActionNft, nftAction, clearNftError} = useNft({signer, leoNft, market, leoToken, usdtToken})
  
  const clearError = () => {
    clearSwapError()
    clearNftError()
  }
  
  const onActionNftHandler = async (id: string, action: 'buy'| 'sell', tokenType: Token) => {
    onActionNft(id, action, tokenType).then(() => rest.getBalance())
  }
  
  return (
    <>
      {(swap.error || nftAction.error) && (
        <Error onClear={clearError}>{swap.error || nftAction.error}</Error>
      )}
      <div className="market__outer-container">
        <div className="market__tab">
          <div className={`market__tab--item ${tab === 'fungible' ? 'active' : ''}`} onClick={() => setTab('fungible')}>Fungible</div>
          <div className={`market__tab--item ${tab === 'nonFungible' ? 'active' : ''}`} onClick={() => setTab('nonFungible')}>Non-fungible</div>
        </div>
        <div className="market__container">
          {tab === 'fungible' && (
            <Fungible
              swap={swap}
              clearSwapError={clearSwapError}
              {...rest}
            />
          )}
          {tab === 'nonFungible' && (
            <NonFungible nftBalance={nftBalance} onActionNft={onActionNftHandler} nftAction={nftAction} />
          )}
        </div>
      </div>
    </>
  )
}
