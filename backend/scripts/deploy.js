const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("\nDeploying contracts with the account:", deployer.address);

    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();
    await crowdFunding.deployed();
    console.log("\nSuccess! \nCrowdFunding deployed to:", crowdFunding.address);
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })