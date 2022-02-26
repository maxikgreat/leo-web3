import { expect } from "chai";
import { ethers } from "hardhat";
import { Market } from "../typechain/Market";
import { LeoToken } from "../typechain/LeoToken";
import { UsdtToken } from "../typechain/UsdtToken";
import { LeoNft } from "../typechain/LeoNft";

describe('Market', () => {
  let leoToken: LeoToken
  let usdtToken: UsdtToken
  let leoNft: LeoNft
  let market: Market
  
  beforeEach(async () => {
    const LeoToken = await ethers.getContractFactory('LeoToken');
    const UsdtToken = await ethers.getContractFactory('UsdtToken');
    const LeoNft = await ethers.getContractFactory('LeoNft');
    leoToken = await LeoToken.deploy()
    usdtToken = await UsdtToken.deploy()
    leoNft = await LeoNft.deploy()
    const Market = await ethers.getContractFactory('Market');
    await leoToken.deployed()
    await usdtToken.deployed()
    await leoNft.deployed()
    market = await Market.deploy(leoToken.address, usdtToken.address, leoNft.address);
    await market.deployed();
  })
  
  it('should have correct exchange rate', async () => {
    const [numerator, denominator] = await market.rate(leoToken.address, usdtToken.address)
    expect(numerator.toNumber()).to.equal(3)
    expect(denominator.toNumber()).to.equal(100)
  })
  
  it('should have usdt tokens after deploy', async () => {
    const marketUsdtBalance = await usdtToken.balanceOf(market.address)
    expect(marketUsdtBalance.eq(ethers.utils.parseUnits('100', 6))).to.equal(true)
  })
  
  it('should have leo tokens after charge', async () => {
    await leoToken.chargeMarket(market.address)
    const marketLeoBalance = await leoToken.balanceOf(market.address)
    expect(marketLeoBalance.eq(ethers.utils.parseEther('100'))).to.equal(true)
  })
  
  it('should throw exception due to no approve to transfer tokens', async () => {
    await leoToken.buy({value: ethers.utils.parseEther('100')})
    await expect(market.swap(leoToken.address, usdtToken.address, ethers.utils.parseEther('1'))).to.be.revertedWith('Address not allowed to transfer')
  })
  
  it('should swap 1 LEO to 0.03 USDT', async () => {
    const [signer] = await ethers.getSigners()
    await leoToken.buy({value: ethers.utils.parseEther('1')})
    await leoToken.approve(market.address, ethers.utils.parseEther('1'))
    await market.swap(leoToken.address, usdtToken.address, ethers.utils.parseEther('1'))
    
    const leoBalance = await leoToken.balanceOf(signer.address)
    const usdtBalance = await usdtToken.balanceOf(signer.address)
    
    const marketLeoBalance = await leoToken.balanceOf(market.address)
    const marketUsdtBalance = await usdtToken.balanceOf(market.address)
    
    expect(ethers.utils.formatEther(leoBalance)).to.equal('99.0')
    expect(ethers.utils.formatUnits(usdtBalance, 6)).to.equal('0.03')
    
    expect(ethers.utils.formatEther(marketLeoBalance)).to.equal('1.0');
    expect(ethers.utils.formatUnits(marketUsdtBalance, 6)).to.equal('99.97')
  })
  
  it('should swap 3 USDT to 100 LEO', async () => {
    const [signer] = await ethers.getSigners()
    await leoToken.buy({value: ethers.utils.parseEther('1')})
    await usdtToken.mint(ethers.utils.parseUnits('3', 6))
    await leoToken.chargeMarket(market.address)
    await usdtToken.approve(market.address, ethers.utils.parseUnits('3', 6))
    await market.swap(usdtToken.address, leoToken.address, ethers.utils.parseUnits('3', 6))

    const leoBalance = await leoToken.balanceOf(signer.address)
    const usdtBalance = await usdtToken.balanceOf(signer.address)

    const marketLeoBalance = await leoToken.balanceOf(market.address)
    const marketUsdtBalance = await usdtToken.balanceOf(market.address)

    expect(ethers.utils.formatEther(leoBalance)).to.equal('200.0')
    expect(ethers.utils.formatUnits(usdtBalance, 6)).to.equal('0.0')
    
    expect(ethers.utils.formatEther(marketLeoBalance)).to.equal('0.0');
    expect(ethers.utils.formatUnits(marketUsdtBalance, 6)).to.equal('103.0')
  })
  
  it('should sell and buy nft with LEO', async () => {
    // SELL
    const [signer] = await ethers.getSigners()
    await leoToken.buy({value: ethers.utils.parseEther('2')})
    await leoToken.transfer(market.address, ethers.utils.parseEther('200'))
    
    expect(await leoNft.balanceOf(signer.address, '1')).to.equal('1');
    await leoNft.setApprovalForAll(market.address, true);
    await market.sellNft('1', leoToken.address)
    const leoSignerBalance = await leoToken.balanceOf(signer.address)
    const leoMarketBalance = await leoToken.balanceOf(market.address)
    expect(ethers.utils.formatEther(leoSignerBalance)).to.equal('200.0')
    expect(ethers.utils.formatEther(leoMarketBalance)).to.equal('0.0')
    expect(await leoNft.balanceOf(market.address, '1')).to.equal('1');
    
    // BUY
    await leoToken.approve(market.address, ethers.utils.parseEther('200'))
    await market.buyNft('1', leoToken.address)
    const leoBalance2 = await leoToken.balanceOf(signer.address)
    expect(ethers.utils.formatEther(leoBalance2)).to.equal('0.0')
    expect(await leoNft.balanceOf(signer.address, '1')).to.equal('1');
  })
  
  it('should sell and buy nft with USDT', async () => {
    // SELL
    const [signer] = await ethers.getSigners()
    expect(await leoNft.balanceOf(signer.address, '1')).to.equal('1');
    await leoNft.setApprovalForAll(market.address, true);
    await market.sellNft('1', usdtToken.address)
    const usdtMarketBalance = await usdtToken.balanceOf(market.address)
    const usdtSignerBalance = await usdtToken.balanceOf(signer.address)
    expect(ethers.utils.formatUnits(usdtMarketBalance, 6)).to.equal('98.5')
    expect(ethers.utils.formatUnits(usdtSignerBalance, 6)).to.equal('1.5')
    expect(await leoNft.balanceOf(market.address, '1')).to.equal('1');
    
    // BUY
    await usdtToken.approve(market.address, ethers.utils.parseUnits('1.5', 6))
    await market.buyNft('1', usdtToken.address)
  
    const usdtMarketBalance2 = await usdtToken.balanceOf(market.address)
    const usdtSignerBalance2 = await usdtToken.balanceOf(signer.address)
    expect(ethers.utils.formatUnits(usdtMarketBalance2, 6)).to.equal('100.0')
    expect(ethers.utils.formatUnits(usdtSignerBalance2, 6)).to.equal('0.0')
    expect(await leoNft.balanceOf(signer.address, '1')).to.equal('1');
  })
});
