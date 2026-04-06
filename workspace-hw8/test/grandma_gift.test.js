const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GrandmaGift", function () {
  let contract;
  let grandma, grandchild1, grandchild2, stranger;

  beforeEach(async function () {
    [grandma, grandchild1, grandchild2, stranger] = await ethers.getSigners();

    const GrandmaGift = await ethers.getContractFactory("GrandmaGift");

    const now = (await ethers.provider.getBlock("latest")).timestamp;

    const grandchildren = [grandchild1.address, grandchild2.address];
    const birthdays = [
      now - 100,
      now + 1000 
    ];

    contract = await GrandmaGift.connect(grandma).deploy(
      grandchildren,
      birthdays,
      { value: ethers.parseEther("2") }
    );

    await contract.waitForDeployment();
  });

  it("1. Grandma can deploy and fund contract", async function () {
    const giftAmount = await contract.giftAmount();
    expect(giftAmount).to.be.gt(0);
  });

  it("2. ETH is correctly split", async function () {
    const giftAmount = await contract.giftAmount();
    const expected = ethers.parseEther("1");
    expect(giftAmount).to.equal(expected);
  });

  it("3. Successful withdrawal on birthday", async function () {
    await expect(contract.connect(grandchild1).withdraw())
      .to.changeEtherBalances(
        [contract, grandchild1],
        [ - (await contract.giftAmount()), await contract.giftAmount() ]
      );
  });

  it("4. Successful withdrawal after birthday", async function () {
    await ethers.provider.send("evm_increaseTime", [2000]);
    await ethers.provider.send("evm_mine");

    await expect(contract.connect(grandchild2).withdraw()).to.not.be.reverted;
  });

  it("5. Cannot withdraw before birthday", async function () {
    await expect(
      contract.connect(grandchild2).withdraw()
    ).to.be.revertedWith("Too early");
  });

  it("6. Cannot withdraw twice", async function () {
    await contract.connect(grandchild1).withdraw();

    await expect(
      contract.connect(grandchild1).withdraw()
    ).to.be.revertedWith("Already received");
  });

  it("7. Stranger cannot withdraw", async function () {
    await expect(
      contract.connect(stranger).withdraw()
    ).to.be.revertedWith("Not a grandchild");
  });

  it("8. Emits event on withdrawal", async function () {
    const giftAmount = await contract.giftAmount();

    await expect(contract.connect(grandchild1).withdraw())
      .to.changeEtherBalances(
        [contract, grandchild1],
        [-giftAmount, giftAmount]
      );
  });
});