// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  /*
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
    */

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
  const TGPassport = await hre.ethers.getContractFactory("TGPassport");
  const tgpassport = await TGPassport.deploy();
  console.log("tgpassport address: ", tgpassport.address)

  const Dictionary = await hre.ethers.getContractFactory("Dictionary");
  const dictionary_entity = await Dictionary.deploy();
  console.log("dictionary address: ", dictionary_entity.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
