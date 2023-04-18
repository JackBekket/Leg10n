// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const web3 = require("web3");
//const { ethers } = require('ethers');

async function main() {

  const b_id = process.env.B_ID;
  console.log("b_id is: ", b_id);


  const b_id_s2 = b_id.toString();
  console.log("b_id_s2: ", b_id_s2);

  const b_aes_id = process.env.B_AES_ID;
  const b_public = process.env.B_PUBLIC_KEY;
  console.log("b_id_aes is: ", b_aes_id);
  console.log("b_public is: ", b_public);


  console.log(hre.network.name);
  const null_address = await hre.ethers.utils.getAddress("0x0000000000000000000000000000000000000000");
  let account_owner = await hre.ethers.getSigner();
  const balance = await hre.ethers.provider.getBalance(account_owner.address);

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
  const legion_entity = await Legion.deploy(dictionary_entity.address,null_address,"0",b_public,"0");
  console.log("legion address: ", legion_entity.address);




  // retriving passport fee:
  
  const passportFee = await legion_entity.connect(owner)
  .GetPassportFee();
  //console.log("passport fee:", passportFee);
  

  const A_address_test = await legion_entity.connect(owner)
  .GetWalletByNickName("Adam");
  console.log("Adam address: ", A_address_test);

  
  const B_request = await legion_entity.connect(owner)
  .RequestJoin(b_aes_id,"Bot","Adam",b_public,b_id_s2,{value:passportFee});
  console.log("B_request: ", B_request);

  const B_accept = await legion_entity.connect(owner)
  .AcceptJoin(b_aes_id,"Adam");
  console.log("B_accept: ", B_accept);

  const B_test = await legion_entity.connect(owner)
  .GetWalletByNickName("Bot");
  console.log("B address: ", B_test);
  
  const hash_test_1 = await legion_entity.connect(owner)
  .GetKeccakHash(b_id_s2);
  console.log("hash test 1: ", hash_test_1);

  const hash_test_2 = hre.ethers.utils.hexlify(hash_test_1)
  console.log("hash test 2: ", hash_test_2)



  const get_test = await legion_entity.connect(owner)
  .GetIdByHash(hash_test_1);
  console.log("get id test: ", get_test);



  
  //const hash_test_4 = hre.ethers.utils.keccak256(b_id)

  //const hash_test_4 = hre.ethers.utils.solidityKeccak256(b_id)
  //console.log("hash test 4: ", hash_test_4);
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
