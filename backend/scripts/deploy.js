const { ethers } = require("hardhat");

async function main() {
    const Ben10ItemCollection = await ethers.getContractFactory(
        "CrowdFunding"   // Contract Name
    );

    // Create new instance
    const Crowdy = await Ben10ItemCollection.deploy()

    await Crowdy.deployed();
    console.log("Success, Contract Deployed: ", Crowdy.address);
}

main()
.then(() => {
    process.exit(0)
})
.catch((err) => {
    console.error(err);
    process.exit(1);
})