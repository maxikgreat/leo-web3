import { expect } from "chai";
import { ethers } from "hardhat";
import { LeoNft } from "../typechain/LeoNft";
import { BigNumber } from "ethers";

describe('Leo NFT', () => {
  let leoNft: LeoNft
  
  beforeEach(async () => {
    const LeoNft = await ethers.getContractFactory('LeoNft');
    leoNft = await LeoNft.deploy()
    await leoNft.deployed();
  })
  
  it('should mint 3 tokens for signer', async () => {
    const [signer] = await ethers.getSigners()
    const [first, second, third] = await leoNft.getTokens();
    expect(first.eq(BigNumber.from(1))).to.equal(true)
    expect(second.eq(BigNumber.from(2))).to.equal(true)
    expect(third.eq(BigNumber.from(3))).to.equal(true)
    expect(await leoNft.balanceOf(signer.address, '1')).to.equal('1')
    expect(await leoNft.balanceOf(signer.address, '2')).to.equal('1')
    expect(await leoNft.balanceOf(signer.address, '3')).to.equal('1')
  })
});
