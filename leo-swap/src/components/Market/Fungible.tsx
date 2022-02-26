import {Side, Token, useSwapper} from '../../hooks/useSwapper';
import {FC} from 'react';

type FungibleProps = ReturnType<typeof useSwapper>

export const Fungible: FC<FungibleProps> = ({availableBalance, inputs, onInputChange, isSwapDisabled, swap, onSwap, tokens, onSelectChange }) => {
  const renderSelect = (side: Side) => {
    const getTokens = tokens.filter(tok => tok !== inputs.give.token)
    return (
      <select
        name={side}
        value={inputs[side].token}
        className={inputs[side].token}
        onChange={({target: {value}}) => onSelectChange(side, value as Token)}
      >
        {(side === 'give' ? tokens : getTokens).map(tokenName => (
          <option key={tokenName} value={tokenName}>{tokenName}</option>
        ))}
      </select>
    )
  }
  
  return (
    <div className="market__inner-container">
      <div className="market__item-container">
        <span className="market__input-label">
          <span>Available balance: <b>{availableBalance.signer[inputs.give.token]}</b></span>
        </span>
        <div className="market__input-container">
          <label>give</label>
          {renderSelect('give')}
          <input
            type="number"
            value={inputs.give.value}
            className="market__input"
            onChange={({target: {value}}) => {
              onInputChange(value)
            }}
          />
        </div>
      </div>
      <button className="market__button" disabled={isSwapDisabled || swap.isLoading} onClick={onSwap}>
        {swap.isLoading ? '...' : 'swap'}
      </button>
      <div className="market__item-container">
        <span className="market__input-label">
          <span>Available market balance: <b>{availableBalance.market[inputs.get.token]}</b></span>
        </span>
        <div className="market__input-container">
          <label>get</label>
          {renderSelect('get')}
          <input type="text" disabled value={inputs.get.value} className="market__input"/>
        </div>
      </div>
    </div>
  )
}
