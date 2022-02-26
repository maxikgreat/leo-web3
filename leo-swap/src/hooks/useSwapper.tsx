import {BigNumber, Signer, utils} from 'ethers';
import {LeoNft, LeoToken, Market as MarketType, UsdtToken} from '../contracts/types';
import {useEffect, useMemo, useState} from 'react';
import {getNormalizedError} from '../errorHandler';

interface UseSwapperProps {
  signer: Signer,
  market: MarketType
  leoToken: LeoToken,
  usdtToken: UsdtToken
}

export type Token = 'LEO' | 'USDT'
export type Balance = 'signer' | 'market'

interface Inputs {
  give: {
    token: Token
    value: string | number | undefined
  },
  get: {
    token: Token,
    value: string | number | undefined
  }
}

type ExchangeRate = Record<Token, Record<string, {
  numerator: number,
  denominator: number
}>>

type AvailableBalance = Record<Balance, Record<Token, string>>

export type Side = 'give' | 'get'

interface Swap {
  isLoading: boolean
  error?: string
}

export const useSwapper = ({signer, market, usdtToken, leoToken}: UseSwapperProps) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [inputs, setInputs] = useState<Inputs>({
    give: {
      token: tokens[0],
      value: '',
    },
    get: {
      token: tokens[1],
      value: '',
    }
  })
  
  const [availableBalance, setAvailableBalance] = useState<AvailableBalance>({
    signer: {
      LEO: '0.0',
      USDT: '0.0',
    },
    market: {
      LEO: '0.0',
      USDT: '0.0',
    }
  })
  
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | undefined>()
  
  const [swap, setSwap] = useState<Swap>({
    isLoading: false,
  })
  
  const getRate = async () => {
    const leoToUsdt = await market.rate(leoToken.address, usdtToken.address)
    const usdtToLeo = await market.rate(usdtToken.address, leoToken.address)
    
    setExchangeRate({
      LEO: {
        USDT: {
          numerator: leoToUsdt[0].toNumber(),
          denominator: leoToUsdt[1].toNumber()
        },
      },
      USDT: {
        LEO: {
          numerator: usdtToLeo[0].toNumber(),
          denominator: usdtToLeo[1].toNumber(),
        }
      }
    })
  }
  
  const getBalance = async () => {
    const marketLeo = await  market.getAvailableLeo()
    const marketUsdt = await market.getAvailableUsdt()
    const signerAddress = await signer.getAddress()
    const signerLeo = await leoToken.balanceOf(signerAddress)
    const signerUsdt = await usdtToken.balanceOf(signerAddress)
    const usdtDecimals = await usdtToken.decimals()
    
    setAvailableBalance({
      signer: {
        LEO: utils.formatEther(signerLeo),
        USDT: utils.formatUnits(signerUsdt, usdtDecimals)
      },
      market: {
        LEO: utils.formatEther(marketLeo),
        USDT: utils.formatUnits(marketUsdt, usdtDecimals)
      }
    })
  }
  
  const getTokenSymbols = async () => {
    const leoSymbol = await leoToken.symbol() as Token
    const usdtSymbol = await usdtToken.symbol() as Token
    
    setTokens([leoSymbol, usdtSymbol])
  }
  
  useEffect(() => {
    getBalance()
    getTokenSymbols()
    getRate()
  }, [])
  
  useEffect(() => {
    setInputs({
      give: {
        token: tokens[0],
        value: '',
      },
      get: {
        token: tokens[1],
        value: '',
      }
    })
  }, [tokens])
  
  const onSelectChange = (side: Side, token: Token) => {
    if (side === 'give') {
      setInputs({
        give: {
          token,
          value: '',
        },
        get: {
          token: tokens.find(tok => tok !== token) ?? tokens[0],
          value: '',
        }
      })
      return
    }
    
    setInputs(prevState => ({
      ...prevState,
      give: {
        token: prevState.give.token,
        value: '',
      },
      get: {
        token,
        value: ''
      }
    }))
  }
  
  const onInputChange = (value: string | number | undefined) => {
    if (Number.isNaN(value) || !exchangeRate) {
      return
    }
    
    const {give, get} = inputs
    
    const {numerator, denominator} = exchangeRate[give.token][get.token]
    
    setInputs(prevState => ({
      ...prevState,
      give: {
        ...prevState.give,
        value,
      },
      get: {
        ...prevState.get,
        value: Number(value) * numerator / denominator
      }
    }))
  }
  
  const onSwap = async () => {
    if (!inputs.give.value) {
      return
    }
    
    setSwap({
      isLoading: true,
    })
    
    try {
      let sendValue: BigNumber
      let tx
      if (inputs.give.token === 'LEO') {
        sendValue = utils.parseEther(String(inputs.give.value))
        await leoToken.approve(market.address, sendValue)
        tx = await market.swap(leoToken.address, usdtToken.address, sendValue)
      } else {
        sendValue = utils.parseUnits(String(inputs.give.value), 6)
        await usdtToken.approve(market.address, sendValue)
        tx = await market.swap(usdtToken.address, leoToken.address, sendValue)
      }
      
      await tx.wait()
      
      await getBalance()
      setInputs(prevState => ({
        give: {
          ...prevState.give,
          value: '',
        },
        get: {
          ...prevState.get,
          value: '',
        }
      }))
      
      setSwap({
        isLoading: false,
      })
    } catch (err) {
      setSwap({
        isLoading: false,
        error: getNormalizedError(err)
      })
    }
  }
  
  const clearSwapError = () => setSwap(prevState => ({...prevState, error: undefined}))
  
  const isSwapDisabled = useMemo(() =>
    !inputs.give.value
    || inputs.give.value === ''
    || inputs.give.value === 0
    || !inputs.get.value
    || inputs.get.value === ''
    || inputs.get.value === 0
    || Number(inputs.get.value) > Number(availableBalance.market[inputs.get.token])
    || Number(inputs.give.value) > Number(availableBalance.signer[inputs.give.token]), [inputs, availableBalance])
  
  return {inputs, onSelectChange, availableBalance, onInputChange, isSwapDisabled, tokens, onSwap, swap, clearSwapError, getBalance}
}
