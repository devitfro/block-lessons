// const { ethers } = require("hardhat");

// // (
// //   async () => {
// //     const factory = await ethers.getContractFactory("Counter");
// //     const contract = await factory.deploy();

// //     await contract.waitForDeployment();

// //     console.log(`Contract deployed at address: \u001b[32m${await contract.getAddress()}\u001b[0m`);
// //   }
// // )()

// const hre = require("hardhat");

// async function main() {
//   const ProductManager = await hre.ethers.getContractFactory("ProductManager");
//   const contract = await ProductManager.deploy();

//   await contract.waitForDeployment();

//   console.log("Contract deployed to:", await contract.getAddress());
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

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