const { ethers } = require("hardhat");
const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");

describe("Legion unit test", async () => {
  let legionMock;
  let owner, admin, turing, user;
  const codeName = "code name";
  const parentName = "parent name";
  const constructortTgId = 100;
  const publicKey = "0x0000000000000000000000000000000000000666";
  const pasportFee = parseEther("0.002");

  before(async () => {
    [owner, admin, turing, user] = await ethers.getSigners();
    const LegionMockFactory = await ethers.getContractFactory("Leg10nMock");
    legionMock = await LegionMockFactory.deploy(
      turing.address,
      admin.address,
      constructortTgId,
      publicKey
    ).then((f) => f.deployed());
  });

  it("should not RequestJoin because of pasportFee less then required", async () => {
    const fValue = parseEther("0.00000000001");

    await expect(
      legionMock
        .connect(user)
        .RequestJoin(constructortTgId, codeName, parentName, publicKey, {
          value: fValue,
        })
    ).to.be.revertedWith("Request fee is not paid");
  });

  it("should RequestJoin", async () => {
    const requestJoin = await legionMock
      .connect(user)
      .RequestJoin(constructortTgId, codeName, parentName, publicKey, {
        value: pasportFee,
      });

    await expect(requestJoin)
      .to.emit(legionMock, "joinRequested")
      .withArgs(
        constructortTgId,
        user.address,
        await legionMock.GetWalletByNickName(parentName)
      );

    await expect(requestJoin)
      .to.emit(legionMock, "joinRequestedIndexedTG")
      .withArgs(
        constructortTgId,
        user.address,
        await legionMock.GetWalletByNickName(parentName)
      );
  });

  it("should NOT accept join because only parent_name can accept it", async () => {
    await expect(
      legionMock.connect(user).AcceptJoin(constructortTgId, codeName)
    ).to.be.revertedWith("only parent_name can accept it");
  });

  it("should get moderator identifier", async () => {
    expect(await legionMock.connect(user).getModeratorIdentifier()).to.equal(
      await legionMock.moderator()
    );
  });

  it("should get owner", async () => {
    expect(await legionMock.connect(user).GetOwner()).to.equal(owner.address);
  });

  it("should get user by tg id", async () => {
    const userByTgId = await legionMock
      .connect(user)
      .GetUserByTgId(constructortTgId);
    expect(userByTgId.userAddress).to.equal(admin.address);
    expect(userByTgId.tgId).to.equal(constructortTgId);
    expect(userByTgId.valid).to.equal(true);
    expect(userByTgId.validatorAddress).to.equal(owner.address);
    expect(userByTgId.codeName).to.equal("Adam");
    expect(userByTgId.public_key).to.equal(publicKey);
  });

  it("should get public key by address", async () => {
    const getPublicKey = await legionMock
      .connect(user)
      .GetPublicKeyByAddress(admin.address);
    expect(getPublicKey).to.equal(publicKey);
  });

  it("should get user by nickname", async () => {
    const getUserByNickname = await legionMock
      .connect(user)
      .GetUserByNickName("Adam");
    expect(getUserByNickname.userAddress).to.equal(admin.address);
    expect(getUserByNickname.tgId).to.equal(constructortTgId);
    expect(getUserByNickname.valid).to.equal(true);
    expect(getUserByNickname.validatorAddress).to.equal(owner.address);
    expect(getUserByNickname.codeName).to.equal("Adam");
    expect(getUserByNickname.public_key).to.equal(publicKey);
  });

  it("should get wallet by nickname", async () => {
    const getWallet = await legionMock
      .connect(user)
      .GetWalletByNickName("Adam");
    expect(getWallet).to.equal(admin.address);
  });

  it("should get user by address", async () => {
    const getUser = await legionMock
      .connect(user)
      .GetUserByAddress(admin.address);
    expect(getUser.userAddress).to.equal(admin.address);
    expect(getUser.tgId).to.equal(constructortTgId);
    expect(getUser.valid).to.equal(true);
    expect(getUser.validatorAddress).to.equal(owner.address);
    expect(getUser.codeName).to.equal("Adam");
    expect(getUser.public_key).to.equal(publicKey);
  });

  it("should get tg id by address", async () => {
    const tgIdByAddress = await legionMock
      .connect(user)
      .GetTgIdByAddress(admin.address);
    expect(tgIdByAddress).to.equal(constructortTgId);
  });

  it("should get user wallet by tg id", async () => {
    const tgIdByAddress = await legionMock
      .connect(user)
      .GetUserWalletByID(constructortTgId);
    expect(tgIdByAddress).to.equal(admin.address);
  });

  it("should get passport fee", async () => {
    const getPasportFee = await legionMock.connect(user).GetPassportFee();
    expect(getPasportFee).to.equal(pasportFee);
  });

  it("should NOT set passport fee uder default user", async () => {
    await expect(
      legionMock.connect(user).SetPassportFee(parseEther("0.0001"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should set passport fee under admin", async () => {
    const newFee = parseEther("0.0001");
    await legionMock.connect(owner).SetPassportFee(parseInt(newFee));
    const getPasportFee = await legionMock.connect(user).GetPassportFee();
    expect(getPasportFee).to.equal(parseInt(newFee));
  });

  //   it("should RequestJoin", async () => {
  //     console.log(typeof(codeName));
  //     console.log(typeof(parentName));

  //     const pasportFeeNum = parseInt(pasportFee);
  //     try {
  //       await legionMock
  //         .connect(user)
  //         .updateAddress(userTgId, user.address, codeName, parentName);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   });
});
