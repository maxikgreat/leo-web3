import {useCallback, useEffect, useMemo, useState} from 'react';
import {Signer, utils} from 'ethers';
import {LeoToken, UsdtToken} from '../contracts/types';
import {getNormalizedError} from '../errorHandler';

interface Balance {
  eth: string
  leo: {
    summary: string
    ethRate: number
    free?: string
    blocked?: {
      until: string
      value: string
    }
  },
  usdt: string
  isLoading: boolean
  error?: string
}

interface UsdtMinting {
  isLoading: boolean,
  decimals: number
  error?: string
}

interface LeoPurchase {
  isLoading: boolean
  error?: string
}

interface UseBalanceProps {
  signer: Signer,
  leoToken: LeoToken
  usdtToken: UsdtToken
}

const defaultMintValue = 10
const defaultEthBuyValue = '1'

export const useBalance = ({
  signer, leoToken, usdtToken
}: UseBalanceProps) => {
  const [balance, setBalance] = useState<Balance>({
    eth: '0.0',
    leo: {
      summary: '0.0',
      ethRate: 0,
    },
    usdt: '0.0',
    isLoading: true,
  })
  
  const [usdtMinting, setUsdtMinting] = useState<UsdtMinting>({
    isLoading: false,
    decimals: 0,
  })
  
  const [leoPurchase, setLeoPurchase] = useState<LeoPurchase>({
    isLoading: false,
  })
  
  const onLeoBuy = useCallback(async () => {
    setLeoPurchase({
      isLoading: true,
    })
    
    try {
      const ethValue = utils.parseEther(defaultEthBuyValue)
      const tx = await leoToken.buy({value: ethValue})
      await tx.wait()
      const signerAddress = await signer.getAddress()
      const eth = await signer.getBalance()
      const leo = await leoToken.balanceOf(signerAddress)
      setLeoPurchase({
        isLoading: false,
      })
      setBalance(prevState => ({
        ...prevState,
        eth: utils.formatEther(eth),
        leo: {
          ...prevState.leo,
          summary: utils.formatEther(leo),
        }
      }))
    } catch (err) {
      setLeoPurchase({
        isLoading: false,
        error: getNormalizedError(err)
      })
    }
    
  }, [leoToken, balance, signer])
  
  const onUsdtMint = useCallback(async () => {
    if (usdtMinting.decimals === 0) {
      return
    }
    
    setUsdtMinting(prevState => ({
      ...prevState,
      isLoading: true
    }))
    
    try {
      const tokensToMint = defaultMintValue * (10 ** usdtMinting.decimals)
      const tx = await usdtToken.mint(tokensToMint)
      await tx.wait()
      const signerAddress = await signer.getAddress()
      const eth = await signer.getBalance()
      const usdt = await usdtToken.balanceOf(signerAddress)
      
      setUsdtMinting(prevState => ({
        ...prevState,
        isLoading: false
      }))
      
      setBalance(prevState => ({
        ...prevState,
        eth: utils.formatEther(eth),
        usdt: utils.formatUnits(usdt, usdtMinting.decimals)
      }))
      
    } catch (err) {
      setUsdtMinting(prevState => ({
        ...prevState,
        isLoading: false,
        error: getNormalizedError(err)
      }))
    }
    
  }, [usdtMinting.decimals, usdtToken, setBalance])
  
  const getUsdtDecimals = useCallback(async () => {
    const decimals = await usdtToken.decimals()
    setUsdtMinting(prevState => ({
      ...prevState,
      decimals,
    }))
  }, [usdtToken])
  
  
  const fetchBalance = useCallback(async () => {
    try {
      const signerAddress = await signer.getAddress()
      const eth = await signer.getBalance()
      const leo = await leoToken.balanceOf(signerAddress)
      const ethRate = await leoToken.ethRate()
      const usdt = await usdtToken.balanceOf(signerAddress)
      const [unblockTime, tokens] = await leoToken.vesting(signerAddress)
  
      const vesting = unblockTime.isZero() || tokens.isZero() ? undefined : {
        free: utils.formatEther(leo.sub(tokens)),
        blocked: {
          until: new Date(unblockTime.toNumber() * 1000).toLocaleDateString('en-US'),
          value: utils.formatEther(tokens)
        }
      }
      
      setBalance({
        eth: utils.formatEther(eth),
        leo: {
          ethRate,
          summary: utils.formatEther(leo),
          ...(vesting ?? {}),
        },
        usdt: utils.formatUnits(usdt, usdtMinting.decimals),
        isLoading: false,
      })
    } catch (error) {
      setBalance(prevState => ({...prevState, error: getNormalizedError(error), isLoading: false}))
    }
  }, [signer, leoToken, usdtToken, usdtMinting.decimals])
  
  const clearError = useCallback(() => {
    setBalance(prevState => ({...prevState, error: undefined}))
    setUsdtMinting(prevState => ({...prevState, error: undefined}))
    setLeoPurchase(prevState => ({...prevState, error: undefined}))
  }, [setBalance])
  
  const error = useMemo(() => balance.error ?? usdtMinting.error ?? leoPurchase.error, [balance.error, usdtMinting.error, leoPurchase.error])
  
  useEffect(() => {
    getUsdtDecimals()
  }, [getUsdtDecimals])
  
  useEffect(() => {
    if (usdtMinting.decimals === 0) {
      return
    }
    
    fetchBalance()
  }, [usdtMinting.decimals])
  
  
  return {balance, clearError, isUsdtMinting: usdtMinting.isLoading, error, onUsdtMint, onLeoBuy, isLeoPurchase: leoPurchase.isLoading}
}
