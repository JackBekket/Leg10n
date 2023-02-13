// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  console.log(hre.network.name);
  let murs_account = ethers.utils.getAddress("0x383A9e83E36796106EaC11E8c2Fbe8b92Ff46D3a");
  let bot_account = ethers.utils.getAddress("0x0E5279edeD9Fe8281eB0f7277e51068c6DA2fa31");
  let account_owner = await hre.ethers.getSigner();
  const balance = await ethers.provider.getBalance(account_owner.address);

  console.log(ethers.utils.formatEther(balance), "ETH");


  let owner;
  owner = await hre.ethers.getSigner();
  console.log("owner address:", owner.address);


  // We get the contract to deploy
 

  const Dictionary = await hre.ethers.getContractFactory("Dictionary");
  const dictionary_entity = await Dictionary.deploy();
  console.log("dictionary address: ", dictionary_entity.address);

  const Legion = await hre.ethers.getContractFactory("Leg10n");
  const legion_entity = await Legion.deploy(dictionary_entity.address);
  console.log("legion address: ", legion_entity.address);

  // retriving passport fee:
  const passportFee = await legion_entity.connect(owner)
  .GetPassportFee();
  console.log("passport fee:", passportFee);

  const A_test = await dictionary_entity.connect(owner)
  .GetCapitalFromString("Adam");
  console.log("A test:", A_test);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
