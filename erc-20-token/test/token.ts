import { expect } from "chai";
import { Token } from "../typechain/Token";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe('Token', () => {
  let token: Token
  const decimals = 18;
  const tokensQuantity = 100000
  // trying to calculate with numbers throws and overflow exception
  const totalSupply = BigNumber.from(String(tokensQuantity) + new Array(decimals).fill('0').join(''))
  let vestingPeriod: number = 0;
  const zeroAddress = '0x0000000000000000000000000000000000000000'
  
  const exceptions = {
    zeroAddress: 'Address 0x0 is not allowed',
    insufficientBalance: 'Not enough tokens to transfer',
    notAllowedTransfer: 'Address not allowed to transfer',
    vestingRestriction: 'You\'ve already bought tokens on this week',
    zeroEther: 'Min eth value to buy tokens is 1 wei',
    insufficientTotalSupply: 'Not enough tokens to buy',
    noPermissions: 'You have no rights to do this operation'
  }
  
  const buyTokensAndWait = async () => {
    await token.buy({value: ethers.utils.parseEther('1000')})
    await ethers.provider.send('evm_increaseTime', [vestingPeriod]);
  }
  
  beforeEach(async () => {
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    await token.deployed();
    vestingPeriod = await token.vestingPeriod();
  })
  
  it('should have proper name, symbol, decimals and totalSupply fields', async () => {
    expect(await token.name()).to.equal('Leocode Token');
    expect(await token.symbol()).to.equal('LEO');
    expect(await token.decimals()).to.equal(decimals);
    const contractTotalSupply = await token.totalSupply()
    expect(contractTotalSupply.eq(totalSupply)).to.equal(true)
  })
  
  it('should transfer all tokens to contract address immediately', async () => {
    const contractBalance = await token.balanceOf(token.address)
    expect(contractBalance.eq(totalSupply)).to.equal(true)
  })
  
  it('should sell tokens and put vesting restrictions', async () => {
    const [{ address: buyerAddress }, anotherBuyer] = await ethers.getSigners();
    const ethRate = await token.ethRate();
    
    await token.buy({value: 100})
    expect(await token.balanceOf(buyerAddress)).to.equal(100 * ethRate)
    expect(await ethers.provider.getBalance(token.address)).to.equal(100)
  
    let contractBalance = await token.balanceOf(token.address)
    expect(contractBalance.eq(totalSupply.sub(100 * ethRate))).to.equal(true)
  
    await token.connect(anotherBuyer).buy({value: 200})
    expect(await ethers.provider.getBalance(token.address)).to.equal(300)
  
    expect(await token.balanceOf(anotherBuyer.address)).to.equal(200 * ethRate)
  
    contractBalance = await token.balanceOf(token.address)
  
    expect(contractBalance.eq(totalSupply.sub(300 * ethRate))).to.equal(true)
    
    await expect(token.transfer(anotherBuyer.address, 20)).to.be.revertedWith(exceptions.insufficientBalance)
    
    await expect(token.buy({value: 100})).to.be.revertedWith(exceptions.vestingRestriction)
    
    await ethers.provider.send('evm_increaseTime', [vestingPeriod]);
  
    await token.buy({value: 100})
    expect(await ethers.provider.getBalance(token.address)).to.equal(400)
  
    await expect(token.transfer(anotherBuyer.address, 10001)).to.be.revertedWith(exceptions.insufficientBalance)
    
    await token.transfer(anotherBuyer.address, 10000)
    
    expect(await token.balanceOf(anotherBuyer.address)).to.equal(30000)
  })
  
  it('should throw exception due to zero ether sent', async () => {
    await expect(token.buy({value: 0})).to.be.revertedWith(exceptions.zeroEther)
    expect(await ethers.provider.getBalance(token.address)).to.equal(0)
  })
  
  it('should throw exception due to converted ethers amount is more than total supply', async () => {
    const [{ address: buyerAddress }, anotherBuyer] = await ethers.getSigners();
    await anotherBuyer.sendTransaction({
      to: buyerAddress,
      value: ethers.utils.parseEther('9999')
    })
    await expect(token.buy({value: ethers.utils.parseEther('19998')})).to.be.revertedWith(exceptions.insufficientTotalSupply)
    await expect(await ethers.provider.getBalance(token.address)).to.equal(0)
  })

  it('should transfer tokens via transfer() method and emit Transfer event', async () => {
    await buyTokensAndWait()
    const [{address: senderAddress}, {address: receiverAddress}] = await ethers.getSigners();
    expect(await token.transfer(receiverAddress, 100))
      .to
      .emit(token, 'Transfer')
      .withArgs(senderAddress, receiverAddress, 100)
    const senderBalance = await token.balanceOf(senderAddress)

    expect(senderBalance.eq(totalSupply.sub(100))).to.equal(true)
    expect(await token.balanceOf(receiverAddress)).to.equal('100')
  })
  
  it('should throw exception due to zero-address and sender balance must stay the same', async () => {
    await buyTokensAndWait()
    await expect(token.transfer(zeroAddress, 100))
      .to.be.revertedWith(exceptions.zeroAddress)

    const [{address: senderAddress}] = await ethers.getSigners();
    const senderBalance = await token.balanceOf(senderAddress)
    expect(senderBalance.eq(totalSupply)).to.equal(true)
  })
  
  it('should throw exception due to insufficient sender balance', async () => {
    await buyTokensAndWait()
    const [_, zeroBalanceSender, {address: receiverAddress}] = await ethers.getSigners()

    await expect(token.connect(zeroBalanceSender).transfer(receiverAddress, 100))
      .to.be.revertedWith(exceptions.insufficientBalance)

    expect(await token.balanceOf(receiverAddress)).to.equal('0')
  })

  it('should throw exception due to unapproved address', async () => {
    await buyTokensAndWait()
    const [_, {address: senderAddress}, {address: receiverAddress}] = await ethers.getSigners()
    await token.transfer(senderAddress, 100)
    await expect(token.transferFrom(senderAddress, receiverAddress, 100)).to.be.revertedWith(exceptions.notAllowedTransfer)
  })
  
  it('should approve third-party-sender address to transfer tokens and emit Approval event', async () => {
    await buyTokensAndWait()
    const [_, sender, {address: receiverAddress}] = await ethers.getSigners()
    expect(await token.allowance(sender.address, receiverAddress)).to.equal(0)
    await expect(token.connect(sender).approve(receiverAddress, 100))
      .to
      .emit(token, 'Approval')
      .withArgs(sender.address, receiverAddress, 100)
    expect(await token.allowance(sender.address, receiverAddress)).to.equal(100)
  })

  it('should throw exception during approving due to zero address', async () => {
    await buyTokensAndWait()
    await expect(token.approve(zeroAddress, 100)).to.be.revertedWith(exceptions.zeroAddress)
  })
  
  it('should throw exception due to insufficient quantity of allowed tokens to transfer', async () => {
    await buyTokensAndWait()
    const [, sender, {address: receiverAddress}] = await ethers.getSigners()

    await token.transfer(sender.address, 100)
    expect(await token.balanceOf(sender.address)).to.equal(100)
    await token.connect(sender).approve(receiverAddress, 50)

    await expect(token.transferFrom(sender.address, receiverAddress, 70)).to.be.revertedWith(exceptions.notAllowedTransfer)
  })

  it('should transfer via transferFrom to allowed address and allowed tokens to transfer with Transfer and Approve events', async () => {
    await buyTokensAndWait()
    const [_, sender, {address: receiverAddress}] = await ethers.getSigners()
    await token.transfer(sender.address, 100)

    expect(await token.balanceOf(sender.address)).to.equal(100)
    expect(await token.balanceOf(receiverAddress)).to.equal(0)

    await expect(token.connect(sender).approve(receiverAddress, 100))
      .to
      .emit(token, 'Approval')
      .withArgs(sender.address, receiverAddress, 100)

    expect(await token.allowance(sender.address, receiverAddress)).to.equal(100)

    await expect(token.transferFrom(sender.address, receiverAddress, 100))
      .to
      .emit(token, 'Transfer')
      .withArgs(sender.address, receiverAddress, 100)

    expect(await token.balanceOf(sender.address)).to.equal(0)
    expect(await token.balanceOf(receiverAddress)).to.equal(100)
  })
  
  it('should send ether to owner\'s address', async () => {
    await token.buy({value: '100'})
    expect(await ethers.provider.getBalance(token.address)).to.equal(100)
    await token.withdrawToOwner()
    expect(await ethers.provider.getBalance(token.address)).to.equal(0)
  })
  
  it('should throw error due to non-owner address calling withdrawToOwner', async () => {
    const [, notOwner] = await ethers.getSigners()
    await token.connect(notOwner).buy({value: '100'})
    await expect(token.connect(notOwner).withdrawToOwner()).to.be.revertedWith(exceptions.noPermissions)
  })
});
