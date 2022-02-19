import { expect } from "chai";
import { ethers } from "hardhat";
import { UsdtToken } from "../typechain/UsdtToken";

describe('Usdt token', () => {
  let token: UsdtToken
  const decimals = 6;
  
  // const exceptions = {
  //   zeroAddress: 'Address 0x0 is not allowed',
  //   insufficientBalance: 'Not enough tokens to transfer',
  //   notAllowedTransfer: 'Address not allowed to transfer',
  //   vestingRestriction: 'You\'ve already bought tokens on this week',
  //   zeroEther: 'Min eth value to buy tokens is 1 wei',
  //   insufficientTotalSupply: 'Not enough tokens to buy',
  //   noPermissions: 'You have no rights to do this operation'
  // }
  //
  beforeEach(async () => {
    const UsdtToken = await ethers.getContractFactory('UsdtToken');
    token = await UsdtToken.deploy();
    await token.deployed();
  })
  
  it('should have proper name, symbol, decimals and totalSupply fields', async () => {
    expect(await token.name()).to.equal('Stable dollar');
    expect(await token.symbol()).to.equal('USDT');
    expect(await token.decimals()).to.equal(decimals);
    const contractTotalSupply = await token.totalSupply();
    expect(contractTotalSupply.toNumber()).to.equal(0);
  })
  
  it('should mint tokens', async () => {
    const [{address: receiverAddress}, nextReceiver] = await ethers.getSigners()
    await token.mint(100)
    expect(await token.balanceOf(receiverAddress)).to.equal(100)
    await token.connect(nextReceiver).mint(15000)
    expect(await token.balanceOf(nextReceiver.address)).to.equal(15000)
  })
});
