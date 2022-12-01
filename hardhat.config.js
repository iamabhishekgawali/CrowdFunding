require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks : {
    goerli: {
      url: "https://goerli.infura.io/v3/500466d43ca84e7eb1e5f11e8fe9b171",
      accounts: ['88e806afc444d9519cf898cc9e773621c021fc3cb912a17dcb91db0103ec4a6e'],
    }
  }
};
