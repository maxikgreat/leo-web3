import {useCallback, useMemo, VFC} from 'react';
import './Profile.css';
import {useBalance} from '../../hooks/useBalance';
import {Signer} from 'ethers';
import {LeoToken, UsdtToken} from '../../contracts/types';
import {Loader} from '../../components/Loader';
import {Error} from '../../components/Error';
import {useOwner} from '../../hooks/useOwner';

interface ProfileProps {
  signer: Signer,
  leoToken: LeoToken
  usdtToken: UsdtToken
}

export const Profile: VFC<ProfileProps> = (props) => {
  const {balance, clearError, isUsdtMinting, error, onMint} = useBalance(props)
  
  const {isOwner, isLoading: isWithdrawToOwner, onWithdraw, error: ownerError, clearError: clearOwnerError} = useOwner({
    leoToken: props.leoToken,
    signer: props.signer
  })
  
  const globalError = useMemo(() => error || ownerError, [error, ownerError])
  
  const onClearError = useCallback(() => {
    clearError()
    clearOwnerError()
  }, [clearError, clearOwnerError])
  
  if (balance.isLoading) {
    return <Loader fullScreen/>
  }
  
  return (
    <div className={'profile__container'}>
      {globalError && (
        <Error onClear={onClearError}>{globalError}</Error>
      )}
      <div className={'balance__container'}>
        <div className={'card card--eth'}>
          <div className={'card__header'}>
            <h3 className={'card__symbol'}>ETH</h3><img className={'card__icon'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png" alt="eth"/>
          </div>
          <p className={'card__balance'}>{balance.eth}</p>
        </div>
        <div className={'card card--leo'}>
          <div className={'card__header'}>
            <h3 className={'card__symbol'}>LEO</h3><img className={'card__icon'} src="https://i.postimg.cc/NFXnB4Xc/leo-cutout.png" alt="leo"/>
          </div>
          <p className={'card__balance'}>{balance.leo.summary}</p>
        </div>
        <div className={'card card--usdt'}>
          <div className="card__header">
            <h3 className={'card__symbol'}>USDT
              {isUsdtMinting ? <Loader size={'small'} /> : <span className={'usdt--mint'} onClick={onMint}>mint</span>}
            </h3>
            <img className={'card__icon'} src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="usdt"/>
          </div>
          <p className={'card__balance'}>{balance.usdt}</p>
        </div>
        <div className={'card card--nft'}>
          <div className="card__header">
            <h3 className={'card__symbol'}>NFT</h3>
          </div>
        </div>
      </div>
      {isOwner && (
        <div className="owner">
          You are owner.&nbsp;
          <span className="owner--withdraw" onClick={onWithdraw}>{isWithdrawToOwner ? 'Loading...' : 'Withdraw funds'}</span>
        </div>
      )}
    </div>
  )
}
