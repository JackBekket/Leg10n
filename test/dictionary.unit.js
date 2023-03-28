const { ethers } = require("hardhat");
const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");

describe("Dictionary unit test", async () => {
  let dictionary;
  let admin, turing, user;

  beforeEach(async () => {
    [, admin, turing, user] = await ethers.getSigners();
    const DictionaryMockFactory = await ethers.getContractFactory("Dictionary");
    dictionary = await DictionaryMockFactory.deploy().then((f) => f.deployed());
  });

  it("Should get cursor by capital", async () => {
    const getCursorByCapital = await dictionary
      .connect(admin)
      .GetCursorByCapital("P");
    expect(getCursorByCapital).to.equal(16);
  });

  it("Should get capital by cursor", async () => {
    const getCursorByCapital = await dictionary
      .connect(admin)
      .GetCapitalByCursor(16);
    expect(getCursorByCapital).to.equal("P");
  });

  it("Should get substring", async () => {
    const substring = await dictionary.connect(admin).Substring("Pushin", 0, 1);
    expect(substring).to.equal("P");
  });

  it("Should get capital from string", async () => {
    const getCapitalFromString = await dictionary
      .connect(admin)
      .GetCapitalFromString("Pushin");
    expect(getCapitalFromString).to.equal("P");
  });

  it("Should NOT check dictionary tree because children_name != parent_name+1", async () => {
    await expect(
      dictionary.connect(admin).checkDictionaryTree("Pushin", "Pushin")
    ).to.revertedWith(
      "Children_name != parent_name+1, replace capital of your codename +1"
    );
  });

  it("Should check dictionary tree", async () => {
    const checkTree = await dictionary
      .connect(admin)
      .checkDictionaryTree("Pushin", "Oushin");
    expect(checkTree).to.equal(true);
  });
});
