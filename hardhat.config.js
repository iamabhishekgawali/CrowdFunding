require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks : {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/mTeFZjt-T1kZ4eknETKY0v_BzebGxPaV",
      accounts: ['88e806afc444d9519cf898cc9e773621c021fc3cb912a17dcb91db0103ec4a6e']
    }
  }
};
