import { artifacts, ethers } from "hardhat";
import { Contract } from "ethers";
import fs from "fs";
import path from "path";
import { LeoToken } from "../typechain/LeoToken";

interface ContractToGenerate {
  contract: Contract
  name: string
}

function saveFrontendFiles(contracts: ContractToGenerate[]) {
  const contractDir = path.join(__dirname, '..', '..', 'leo-swap', 'src', 'contracts');
  const contractAbisDir = path.join(__dirname, '..', '..', 'leo-swap', 'src', 'contracts', 'abis');
  
  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }
  
  const addresses = JSON.stringify(contracts.reduce((acc, { contract, name }) =>
    ({...acc, [name]: contract.address}),
    {}), undefined, 2)
  
  fs.writeFileSync(
    path.join(contractDir, 'addresses.json'),
    addresses
  )
  
  if (!fs.existsSync(contractAbisDir)) {
    fs.mkdirSync(contractAbisDir)
  }
  
  contracts.forEach(({name}) => {
    fs.writeFileSync(
      path.join(contractAbisDir, `${name}.json`),
      JSON.stringify(artifacts.readArtifactSync(name), null, 2)
    )
  })
}

async function deployToken(name: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  
  await contract.deployed();
  
  console.log(`Contract ${name} deployed to:`, contract.address);
  
  return {contract, name}
}

async function deployMarket(name: string, leoAddress: string, usdtAddress: string, nftAddress: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy(leoAddress, usdtAddress, nftAddress);
  
  await contract.deployed();
  
  console.log(`Contract ${name} deployed to:`, contract.address);
  
  return {contract, name}
}

async function main() {
  const contractsDir = path.join(__dirname, '..', 'contracts')
  
  const files = fs.readdirSync(contractsDir)
  
  if (!files) {
    return Promise.reject('No files present in contracts directory')
  }
  const tokenNames = ['LeoToken', 'UsdtToken', 'LeoNft']
  
  const [leoToken, usdtToken, nftToken] = await Promise.all(tokenNames.map((name) => deployToken(name)))
  
  const market = await deployMarket('Market', leoToken.contract.address, usdtToken.contract.address, nftToken.contract.address)
  
  await (leoToken.contract as LeoToken).chargeMarket(market.contract.address)
  
  saveFrontendFiles([leoToken, usdtToken, nftToken, market])
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
