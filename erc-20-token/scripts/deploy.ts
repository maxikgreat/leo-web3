// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { artifacts, ethers } from "hardhat";
import { Contract } from "ethers";
import fs from "fs";
import path from "path";

function saveFrontendFiles(token: Contract) {
  const contractDir = path.join(__dirname, '..', '..', 'leo-swap', 'src', 'contract');
  
  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }
  
  fs.writeFileSync(
    path.join(contractDir, 'addresses.json'),
    JSON.stringify({Token: token.address}, undefined, 2)
  )
  
  fs.writeFileSync(
    path.join(contractDir, 'Token.json'),
    JSON.stringify(artifacts.readArtifactSync('Token'), null, 2)
  )
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  
  await token.deployed();
 
  console.log("Token deployed to:", token.address);
  
  saveFrontendFiles(token)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
