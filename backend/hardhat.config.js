require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('solidity-coverage');
require("dotenv").config();

const {
  MATIC_RPC_URL,
  SEPOLIA_RPC_URL,
  POLYGONSCAN_API_KEY,
  ETHERSCAN_API_KEY,
  PRIVATE_KEY
} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.18",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: MATIC_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: {
        sepolia: ETHERSCAN_API_KEY,
        // mumbai: POLYGONSCAN_API_KEY,
    }
  },
  // paths: {
  //   artifacts: "../client/src/artifacts"
  // },
};