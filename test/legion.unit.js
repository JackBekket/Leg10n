const { ethers } = require("hardhat");
const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");

describe("Legion unit test", async () => {
  let legionMock;
  let owner, admin, turing, user, newAdmin;
  const codeName = "Thomas";
  const parentName = "Adam";
  const constructortTgId = 100;
  const userTgId = 1;
  const publicKey = "0x0000000000000000000000000000000000000666";
  const pasportFee = parseEther("0.002");

  beforeEach(async () => {
    [owner, admin, turing, user, newAdmin] = await ethers.getSigners();
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
        .RequestJoin(userTgId, codeName, parentName, publicKey, {
          value: fValue,
        })
    ).to.be.revertedWith("Request fee is not paid");
  });

  it("should RequestJoin", async () => {
    const requestJoin = await legionMock
      .connect(user)
      .RequestJoin(userTgId, codeName, parentName, publicKey, {
        value: pasportFee,
      });

    await expect(requestJoin)
      .to.emit(legionMock, "joinRequested")
      .withArgs(
        userTgId,
        user.address,
        await legionMock.GetWalletByNickName(parentName)
      );

    await expect(requestJoin)
      .to.emit(legionMock, "joinRequestedIndexedTG")
      .withArgs(
        userTgId,
        user.address,
        await legionMock.GetWalletByNickName(parentName)
      );
  });

  it("should NOT accept join because only parent_name can accept it", async () => {
    await expect(
      legionMock.connect(user).AcceptJoin(userTgId, codeName)
    ).to.be.revertedWith("only parent_name can accept it");
  });

  it("should NOT AcceptJoin because already registred", async () => {
    await expect(
      legionMock.connect(owner).AcceptJoin(constructortTgId, "0")
    ).to.be.revertedWith("already registred");
  });

  it("should delete user", async () => {
    await legionMock
      .connect(user)
      .RequestJoin(userTgId, codeName, parentName, publicKey, {
        value: pasportFee,
      });

    const deleteUser = await legionMock.deleteUser(user.address);

    await expect(deleteUser)
      .to.emit(legionMock, "requestDenied")
      .withArgs(userTgId, user.address);
  });

  it("should AcceptJoin", async () => {
    await legionMock
      .connect(user)
      .RequestJoin(userTgId, codeName, parentName, publicKey, {
        value: pasportFee,
      });

    const acceptJoin = await legionMock
      .connect(admin)
      .AcceptJoin(userTgId, parentName);

    const receipt = await acceptJoin.wait();
    const highNode = receipt.events[0].args.high_node;
    const lowNode = receipt.events[0].args.low_node;
    const pravda = receipt.events[0].args.pravda;

    await expect(acceptJoin)
      .to.emit(legionMock, "relationChanged")
      .withArgs(highNode, lowNode, pravda);
  });

  it("should NOT DeclineRequest because already approved OR do not exists yet", async () => {
    await legionMock
      .connect(user)
      .RequestJoin(userTgId, codeName, parentName, publicKey, {
        value: pasportFee,
      });

    await legionMock.connect(admin).AcceptJoin(userTgId, parentName);

    await expect(
      legionMock.connect(owner).DeclineRequest(userTgId)
    ).to.be.revertedWith("already approved OR do not exists yet");
  });

  it("should DeclineRequest", async () => {
    await legionMock
      .connect(user)
      .RequestJoin(userTgId, codeName, parentName, publicKey, {
        value: pasportFee,
      });

    const declineRequest = await legionMock
      .connect(user)
      .DeclineRequest(userTgId);
    const receipt = await declineRequest.wait();
    const applyerTg = receipt.events[0].args.applyerTg;
    const wallet = receipt.events[0].args.wallet;

    await expect(declineRequest)
      .to.emit(legionMock, "requestDenied")
      .withArgs(applyerTg, wallet);
  });

  it("should NOT ClearParent because users allowed only to clear themselfs", async () => {
    await expect(
      legionMock.connect(user).ClearParent(parentName, codeName)
    ).to.be.revertedWith("users allowed only to clear themselfs");
  });

  // Doesn't work for me
  // it("should ClearParent", async () => {
  //   await legionMock
  //     .connect(user)
  //     .RequestJoin(userTgId, codeName, parentName, publicKey, {
  //       value: pasportFee,
  //     });

  //   await legionMock.connect(admin).AcceptJoin(userTgId, parentName);
  //   await legionMock.connect(admin).ClearParent(parentName, codeName);
  // });

  it("shoukd NOT devDeleteUser because has no moderator role", async () => {
    await expect(
      legionMock.connect(turing).devDeleteUser(user.address)
    ).to.be.revertedWith(
      `AccessControl: account ${turing.address.toLowerCase()} is missing role 0xcea62fe6ecc79e221c545bf918f804693c542ead2549e37c2bb9baa66ee2e157`
    );
  });

  it("should NOT devDeleteUser because this function work's only for testnet", async () => {
    await expect(
      legionMock.connect(owner).devDeleteUser(user.address)
    ).to.be.revertedWith("this function work's only for testnet");
  });

  it("should devInitAdmin", async () => {
    await expect(
      legionMock
        .connect(newAdmin)
        .devInitAdmin(newAdmin.address, 777, publicKey)
    )
      .to.emit(legionMock, "Initialized")
      .withArgs(newAdmin.address);
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
    expect(userByTgId.codeName).to.equal(parentName);
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
      .GetUserByNickName(parentName);
    expect(getUserByNickname.userAddress).to.equal(admin.address);
    expect(getUserByNickname.tgId).to.equal(constructortTgId);
    expect(getUserByNickname.valid).to.equal(true);
    expect(getUserByNickname.validatorAddress).to.equal(owner.address);
    expect(getUserByNickname.codeName).to.equal(parentName);
    expect(getUserByNickname.public_key).to.equal(publicKey);
  });

  it("should get wallet by nickname", async () => {
    const getWallet = await legionMock
      .connect(user)
      .GetWalletByNickName(parentName);
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
    expect(getUser.codeName).to.equal(parentName);
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
});
