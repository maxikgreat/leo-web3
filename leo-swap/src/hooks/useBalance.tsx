import {useCallback, useEffect, useMemo, useState} from 'react';
import {BigNumber, Signer, utils} from 'ethers';
import {LeoToken, UsdtToken} from '../contracts/types';

interface Balance {
  eth: string
  leo: {
    summary: string
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

interface UseBalanceProps {
  signer: Signer,
  leoToken: LeoToken
  usdtToken: UsdtToken
}

const defaultMintValue = 10

export const useBalance = ({
  signer, leoToken, usdtToken
}: UseBalanceProps) => {
  const [balance, setBalance] = useState<Balance>({
    eth: '0.0',
    leo: {
      summary: '0.0',
    },
    usdt: '0.0',
    isLoading: true,
  })
  
  const [usdtMinting, setUsdtMinting] = useState<UsdtMinting>({
    isLoading: false,
    decimals: 0,
  })
  
  const onMint = useCallback(async () => {
    if (usdtMinting.decimals === 0) {
      return
    }
    
    setUsdtMinting(prevState => ({
      ...prevState,
      isLoading: true
    }))
    
    try {
      const tokensToMint = defaultMintValue * (10 ** usdtMinting.decimals)
      await usdtToken.mint(tokensToMint)
      setUsdtMinting(prevState => ({
        ...prevState,
        isLoading: false
      }))
      
      
      setBalance(prevState => ({
        ...prevState,
        usdt: utils.formatUnits(
          BigNumber.from(utils.parseUnits(prevState.usdt, usdtMinting.decimals)).add(BigNumber.from(tokensToMint)), usdtMinting.decimals
        )
      }))
      
    } catch (err) {
      setUsdtMinting(prevState => ({
        ...prevState,
        isLoading: false,
        error: (err as {message: string})?.message ?? 'Unexpected error'
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
          summary: utils.formatEther(leo),
          ...(vesting ?? {}),
        },
        usdt: utils.formatUnits(usdt, usdtMinting.decimals),
        isLoading: false,
      })
    } catch (error) {
      setBalance(prevState => ({...prevState, error: (error as {message?: string})?.message ?? 'Unexpected error', isLoading: false}))
    }
  }, [signer, leoToken, usdtToken, usdtMinting.decimals])
  
  const clearError = useCallback(() => {
    setBalance(prevState => ({...prevState, error: undefined}))
    setUsdtMinting(prevState => ({...prevState, error: undefined}))
  }, [setBalance])
  
  const error = useMemo(() => balance.error ?? usdtMinting.error, [balance.error, usdtMinting.error])
  
  useEffect(() => {
    getUsdtDecimals()
  }, [getUsdtDecimals])
  
  useEffect(() => {
    if (usdtMinting.decimals === 0) {
      return
    }
    
    fetchBalance()
  }, [usdtMinting.decimals])
  
  
  return {balance, clearError, isUsdtMinting: usdtMinting.isLoading, error, onMint}
}
