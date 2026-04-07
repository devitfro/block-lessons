// homework 9
const hre = require("hardhat");

async function main() {
  const ProductManager = await hre.ethers.getContractFactory("ProductManager");
  const contract = await ProductManager.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// homework 10
const main = async () => {
  const Contract = await ethers.getContractFactory("PostStorage");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log("ADDRESS:", await contract.getAddress());
};

main();

// homework 11
const main = async () => {
  const Contract = await ethers.getContractFactory("MediaStore");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log("ADDRESS:", await contract.getAddress());
};

main();