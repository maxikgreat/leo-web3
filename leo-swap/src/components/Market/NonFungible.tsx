import {useNft} from '../../hooks/useNft';
import {VFC} from 'react';
import {Nft} from '../../hooks/useBalance';
import {Loader} from '../../components/Loader';

type NonFungibleProps = Omit<ReturnType<typeof useNft>, 'clearNftError'>

export const NonFungible: VFC<NonFungibleProps> = ({nftBalance, onActionNft, nftAction}) => {
  const renderNfts = (nfts: Nft[], action: 'buy' | 'sell') => nfts.length === 0 ? (
    <span className="market__no-nft">No nfts</span>
  ) : nfts.map(nft => (
    <div className="market__nft" key={nft.id}>
      <div className="market__nft--action">
        {action} with:
        <span className="market__nft--action--leo" onClick={() => onActionNft(nft.id, action, 'LEO')}>LEO</span>
        <span className="market__nft--action--usdt" onClick={() => onActionNft(nft.id, action, 'USDT')}>USDT</span>
      </div>
      <span className="market__nft--name">{nft.name}</span>
      <img src={nft.image} alt={nft.name}/>
    </div>
  ))
  
  return (
    <>
      {nftAction.isLoading && (
        <div className="market__nft--loader">
          <Loader />
        </div>
      )}
      <div className="market__inner-container">
        <div className="market__item-container">
           <span className="market__input-label leo-text">
            Available LEO: {nftBalance.signer.LEO}
          </span>
          <span className="market__input-label usdt-text">
            Available USDT: {nftBalance.signer.USDT}
          </span>
          <span className="market__input-label">
            Available nfts:
          </span>
          <div className="market__nfts">
            {renderNfts(nftBalance.signer.nft, 'sell')}
          </div>
        </div>
        <div className="market__item-container">
          <span className="market__input-label leo-text">
            Available market LEO: {nftBalance.market.LEO}
          </span>
          <span className="market__input-label usdt-text">
            Available market USDT: {nftBalance.market.USDT}
          </span>
          <span className="market__input-label">
            Available market nfts:
          </span>
          <div className="market__nfts">
            {renderNfts(nftBalance.market.nft, 'buy')}
          </div>
        </div>
      </div>
    </>
  )
}
