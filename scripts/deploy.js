// 0x5FbDB2315678afecb367f032d93F642f64180aa3
const hre = require("hardhat");


const main = async () => {

  const Transaction = await hre.ethers.getContractFactory("CampaignFactory");
  const transaction = await Transaction.deploy();
  await transaction.deployed();
  console.log(`Transaction deployed to  :  ${transaction.address}`);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  }
  catch (err) {
    console.error(err)
    process.exit(0);
  }
}

runMain();

