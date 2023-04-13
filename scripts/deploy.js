// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const b_id_s = process.env.B_ID;
  const b_int = parseInt(b_id_s);

  console.log(hre.network.name);
  const null_address = await hre.ethers.utils.getAddress("0x0000000000000000000000000000000000000000");
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

  const A_test_ = await dictionary_entity.connect(owner)
  .GetCapitalFromString("Adam");
  console.log("A test:", A_test_);

  const Legion = await hre.ethers.getContractFactory("Leg10n");
  const legion_entity = await Legion.deploy(dictionary_entity.address,null_address,0,"");
  console.log("legion address: ", legion_entity.address);

  // retriving passport fee:
  
  const passportFee = await legion_entity.connect(owner)
  .GetPassportFee();
  console.log("passport fee:", passportFee);


  const A_test = await dictionary_entity.connect(owner)
  .GetCapitalFromString("Adam");
  console.log("A test:", A_test);

  const A_address_test = await legion_entity.connect(owner)
  .GetWalletByNickName("Adam");
  console.log("Adam address: ", A_address_test);

  
  const B_request = await legion_entity.connect(owner)
  .RequestJoin(b_int,"Bot","Adam","zjXCj9iuse3gHGaAIIgyaiCOsJpQWSCEBBac/zPGrgQ=",{value:passportFee});
  console.log("B_request: ", B_request);

  const B_accept = await legion_entity.connect(owner)
  .AcceptJoin(b_int,"Adam");
  console.log("B_accept: ", B_accept);

  const B_test = await legion_entity.connect(owner)
  .GetWalletByNickName("Bot");
  console.log("B address: ", B_test);
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
