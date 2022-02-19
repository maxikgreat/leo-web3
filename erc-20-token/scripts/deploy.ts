import { artifacts, ethers } from "hardhat";
import { Contract } from "ethers";
import fs from "fs";
import path from "path";

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

async function deployContract(name: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  
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
  const contractNames = files.map(file => file.split('.')?.[0])
  
  const deployedContracts = await Promise.all(contractNames.map((name) => deployContract(name)))
  
  saveFrontendFiles(deployedContracts)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
