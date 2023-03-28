const { ethers } = require("hardhat");
const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");

describe("Factory unit test", async () => {
  let factory;
  let admin, dictionary;

  const constructortTgId = 100;
  const publicKey = "0x0000000000000000000000000000000000000666";

  beforeEach(async () => {
    [, admin, dictionary] = await ethers.getSigners();
    const fFactory = await ethers.getContractFactory("Factory");
    factory = await fFactory.deploy(dictionary.address).then((f) => f.deployed());
  });

  it("should deploy legion", async () => {
    await factory.connect(admin).DeployLegion(admin.address, constructortTgId, publicKey);
  });
});
