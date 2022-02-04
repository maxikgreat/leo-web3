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
  const zeroAddress = '0x0000000000000000000000000000000000000000'
  
  const exceptions = {
    zeroAddress: 'Address 0x0 is not allowed',
    insufficientBalance: 'Not enough tokens to transfer',
    notAllowedTransfer: 'Address not allowed to transfer'
  }
  
  beforeEach(async () => {
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    await token.deployed();
  })
  
  it('should have proper name, symbol, decimals and totalSupply fields', async () => {
    expect(await token.name()).to.equal('Leocode Token');
    expect(await token.symbol()).to.equal('LEO');
    expect(await token.decimals()).to.equal(decimals);
    const contractTotalSupply = await token.totalSupply()
    expect(contractTotalSupply.eq(totalSupply)).to.equal(true)
  })
  
  it('should transfer all tokens to deployer immediately', async () => {
    const [{ address }] = await ethers.getSigners();

    const ownerBalance = await token.balanceOf(address)
    expect(ownerBalance.eq(totalSupply)).to.equal(true)
  })

  it('should transfer tokens via transfer() method and emit Transfer event', async () => {
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
    await expect(token.transfer(zeroAddress, 100))
      .to.be.revertedWith(exceptions.zeroAddress)

    const [{address: senderAddress}] = await ethers.getSigners();
    const senderBalance = await token.balanceOf(senderAddress)
    expect(senderBalance.eq(totalSupply)).to.equal(true)
  })

  it('should throw exception due to insufficient sender balance', async () => {
    const [_, zeroBalanceSender, {address: receiverAddress}] = await ethers.getSigners()

    await expect(token.connect(zeroBalanceSender).transfer(receiverAddress, 100))
      .to.be.revertedWith(exceptions.insufficientBalance)

    expect(await token.balanceOf(receiverAddress)).to.equal('0')
  })

  it('should throw exception due to unapproved address', async () => {
    const [_, {address: senderAddress}, {address: receiverAddress}] = await ethers.getSigners()
    await token.transfer(senderAddress, 100)
    await expect(token.transferFrom(senderAddress, receiverAddress, 100)).to.be.revertedWith(exceptions.notAllowedTransfer)
  })

  it('should approve third-party-sender address to transfer tokens and emit Approval event', async () => {
    const [_, sender, {address: receiverAddress}] = await ethers.getSigners()
    expect(await token.allowance(sender.address, receiverAddress)).to.equal(0)
    await expect(token.connect(sender).approve(receiverAddress, 100))
      .to
      .emit(token, 'Approval')
      .withArgs(sender.address, receiverAddress, 100)
    expect(await token.allowance(sender.address, receiverAddress)).to.equal(100)
  })

  it('should throw exception during approving due to zero address', async () => {
    await expect(token.approve(zeroAddress, 100)).to.be.revertedWith(exceptions.zeroAddress)
  })

  it('should throw exception due to insufficient quantity of allowed tokens to transfer', async () => {
    const [_, sender, {address: receiverAddress}] = await ethers.getSigners()

    await token.transfer(sender.address, 100)
    expect(await token.balanceOf(sender.address)).to.equal(100)
    await token.connect(sender).approve(receiverAddress, 50)

    await expect(token.transferFrom(sender.address, receiverAddress, 70)).to.be.revertedWith(exceptions.notAllowedTransfer)
  })

  it('should transfer via transferFrom to allowed address and allowed tokens to transfer with Transfer and Approve events', async () => {
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
});
