import {LeoNft, LeoToken, Market, UsdtToken} from '../contracts/types';
import {Signer} from 'ethers';
import {Nft} from '../hooks/useBalance';
import {useCallback, useEffect, useState} from 'react';
import {Token} from '../hooks/useSwapper';
import {utils} from 'ethers'
import {getNormalizedError} from '../errorHandler';

interface UseNftProps {
  signer: Signer,
  market: Market
  leoNft: LeoNft
  usdtToken: UsdtToken,
  leoToken: LeoToken
}

interface NftBalance {
  signer: {
    nft: Nft[],
    LEO: string,
    USDT: string
  },
  market: {
    nft: Nft[],
    LEO: string
    USDT: string
  }
}

interface NftAction {
  isLoading: boolean
  error?: string
}

export const useNft = ({signer, leoNft, market, usdtToken, leoToken}: UseNftProps) => {
  
  const [nftBalance, setNftBalance] = useState<NftBalance>({
    signer: {
      nft: [],
      LEO: '0.0',
      USDT: '0.0'
    },
    market: {
      nft: [],
      LEO: '0.0',
      USDT: '0.0'
    }
  });
  
  const [nftAction, setNftAction] = useState<NftAction>({
    isLoading: false
  })
  
  const filterNfts = async (nfts: Nft[], address: string) => {
    return (await Promise.all(nfts.map(nft => {
      return leoNft.balanceOf(address, nft.id)
    })))
      .map((balance, index) => balance.isZero() ? null : ({...nfts[index], id: nfts[index].id.toString()}))
      .filter(Boolean) as Nft[]
  }
  
  const getBalance = useCallback(async () => {
    const signerAddress = await signer.getAddress()
    
    const nftIds = await leoNft.getTokens()
    const nfts: Nft[] = await Promise.all(nftIds.map(id =>  leoNft.uri(id).then(url => fetch(url)).then(response => response.json())))
    
    const signerNtfs = await filterNfts(nfts, signerAddress)
    const marketNfts = await filterNfts(nfts, market.address)
  
    const marketLeo = await  market.getAvailableLeo()
    const marketUsdt = await market.getAvailableUsdt()
    const signerLeo = await leoToken.balanceOf(signerAddress)
    const signerUsdt = await usdtToken.balanceOf(signerAddress)
    const usdtDecimals = await usdtToken.decimals()
    
    setNftBalance({
      signer: {
        nft: signerNtfs,
        LEO: utils.formatEther(signerLeo),
        USDT: utils.formatUnits(signerUsdt, usdtDecimals)
      },
      market: {
        nft: marketNfts,
        LEO: utils.formatEther(marketLeo),
        USDT: utils.formatUnits(marketUsdt, usdtDecimals)
      }
    })
    
  }, [leoNft, signer, leoToken, usdtToken])
  
  const onActionNft = async (id: string, action: 'buy'| 'sell', tokenType: Token) => {
    try {
      setNftAction({
        isLoading: true,
      })
      
      let tx;
      const token = tokenType === 'LEO' ? leoToken : usdtToken
      const decimals = tokenType === 'LEO' ? await leoToken.decimals() : await usdtToken.decimals()
      
      if (action === 'sell') {
        await leoNft.setApprovalForAll(market.address, true);
        tx = await market.sellNft('1', token.address)
      } else {
        const [numerator, denominator] = await market.rate(token.address, leoNft.address)
        const value = numerator.sub(denominator).toString()
        await token.approve(market.address, utils.parseUnits(value, decimals))
        tx = await market.buyNft('1', token.address)
      }
      
      await tx.wait()
      
      await getBalance()
  
      setNftAction({
        isLoading: false,
      })
    } catch (err) {
      setNftAction({
        isLoading: false,
        error: getNormalizedError(err)
      })
    }
  }
  
  const clearNftError = () => setNftAction(prevState => ({...prevState, error: undefined}))
  
  useEffect(() => {
    getBalance()
  }, [])
  
  return {nftBalance, onActionNft, nftAction, clearNftError}
}
