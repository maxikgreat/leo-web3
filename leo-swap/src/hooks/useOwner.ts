import {useCallback, useEffect, useState} from 'react';
import {getNormalizedError} from '../errorHandler';
import {LeoToken} from '../contracts/types';
import {Signer} from 'ethers';

interface WithdrawOwner {
  isLoading: boolean,
  isOwner: boolean
  error?: string
}

interface UseOwnerProps {
  signer: Signer,
  leoToken: LeoToken,
}

export const useOwner = ({leoToken, signer}: UseOwnerProps) => {
  const [withdraw, setWithdraw] = useState<WithdrawOwner>({
    isLoading: false,
    isOwner: false,
  })
  
  const checkOwner = useCallback(async () => {
    const tokenOwnerAddress = await leoToken.owner()
    const signerAddress = await signer.getAddress()
    
    if (tokenOwnerAddress === signerAddress) {
      setWithdraw({
        isLoading: false,
        isOwner: true
      })
    }
  }, [leoToken, signer])
  
  useEffect(() => {
    checkOwner()
  }, [checkOwner])
  
  const onWithdraw = useCallback(async () => {
    if (withdraw.isLoading) {
      return
    }
    
    setWithdraw(prevState => ({
      ...prevState,
      isLoading: true,
      error: undefined,
    }))
    
    try {
      await leoToken.withdrawToOwner()
  
      setWithdraw(prevState => ({
        ...prevState,
        isLoading: false
      }))
    } catch (err) {
      setWithdraw(prevState => ({
        ...prevState,
        error: getNormalizedError(err),
        isLoading: false,
      }))
    }
  }, [leoToken, withdraw])
  
  const clearError = useCallback(() => {
    setWithdraw(prevState => ({...prevState, error: undefined}))
  }, [setWithdraw])
  
  return {...withdraw, onWithdraw, clearError}
}
