// const { expect } = require("chai");
// const { ethers, waffle} = require("hardhat");

// describe("Crowd Funding Project : Crowdy", function () {
//     let CrowdFunding;   // contract name
//     let Crowdy;         // instance name
//     let owner;
//     let addr1;
//     let addr2;
//     let addrs;
//     let provider;

//     beforeEach(async function () {
//         CrowdFunding = await ethers.getContractFactory("CrowdFunding");
//         [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//         provider = waffle.provider;
        
//         Crowdy = await CrowdFunding.deploy();
//     });
    
//     describe("Check for initial values", function () {
//         it("Total Funding Application list Should be zero at initial stage", async function () {
//             const total = await Crowdy.getFundingData();
//             expect(total.length).to.equal(0);
           
//         });

//         it("Total Funding Amount Should be zero at initial stage", async function () {
//             const total = await Crowdy.getTotalFundRaised();
//             expect(total).to.equal(0);
//         });
//     })

//     describe("Check for data insertion", function () {
//         it("Should add new Application for Fundrising", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const data = await Crowdy.getFundingItem(0);
    
//             expect(data.title).to.equal("Cancer");
//         });
    
//         it("Total Funding Application list should be updated after adding Applications", async function () {
//             const newFunding1 = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const newFunding2 = await Crowdy.addForFunding("H1N1", "need 2000 wei", "random.com", addr2.address, 2000);
//             const newFunding3 = await Crowdy.addForFunding("Ebola", "need 5000 wei", "random.com", addr2.address, 5000);
//             const data = await Crowdy.getFundingData();

//             expect(data.length).to.equal(3);
//         });
    
        
//     })

//     describe("Check for data retrieval", function () {
//         it("Should return correct Title after adding new Application for Fundrising", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const data = await Crowdy.getFundingItem(0);
    
//             expect(data.title).to.equal("Cancer");
//         });
    
//         it("Should return correct Description after adding new Application for Fundrising", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const data = await Crowdy.getFundingItem(0);
    
//             expect(data.description).to.equal("need 1000 wei");
//         });
    
//         it("Should return correct Image Id after adding new Application for Fundrising", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const data = await Crowdy.getFundingItem(0);
    
//             expect(data.imageId).to.equal("random.com");
//         });
    
//         it("Should return correct Receiver's address after adding new Application for Fundrising", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const data = await Crowdy.getFundingItem(0);
    
//             expect(data.receiver).to.equal(addr2.address);
//         });
    
//         it("Should return correct Target Amount after adding new Application for Fundrising", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             const data = await Crowdy.getFundingItem(0);
    
//             expect(data.target).to.equal(1000);
//         });
//     })

//     describe("check for funding the cause", function () {
//         it("Should retrun correct collection after funding the cause", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             await Crowdy.connect(addr1).contribute(0, {value: 500});
//             const data = await Crowdy.getFundingItem(0);
            
//             expect(data.collection).to.equal(500);
//         });

//         it("Revert if funding amount value exceeds target fund", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
           
//             await expect(Crowdy.connect(addr1).contribute(0, {value: 5000})).to.be.revertedWith("Funding amount exceeds targeted amount !!");
//         });

//         it("Should not allow receiver to fund own cause", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
            
//             await expect(Crowdy.connect(addr2).contribute(0, {value: 1000})).to.be.revertedWith("You can't fund your own cause !!");
//         });

//         it("Should close the Application if fund transfer is done", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             await Crowdy.connect(addr1).contribute(0, {value: 1000});
//             const data = await Crowdy.getFundingItem(0);
            
//             expect(data.isOpen).to.equal(false);
//         });

//         it("Should transfer the fund to correct receiver if collection is complete", async function () {
//             let fund = 1000
//             const balance1 = await provider.getBalance(addr2.address);
//             const bal1 = Number(balance1.toString())

//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             await Crowdy.connect(addr1).contribute(0, {value: fund});
//             const data = await Crowdy.getFundingItem(0);
            
//             const balance = await provider.getBalance(addr2.address);
//             const bal2 = Number(balance.toString())
//             expect(bal2).to.equal(bal1 + fund);
//         });

//         it("Should not allow fund transfer if funding is done", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             await Crowdy.connect(addr1).contribute(0, {value: 1000});
//             await expect(Crowdy.connect(addr1).contribute(0, {value: 5000})).to.be.revertedWith("Already Closed !!");

//         });
//     })

//     describe("check for changing validity", function () {
//         it("Should allow owner to change application validity", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
//             // await Crowdy.connect(addr1).contribute(0, {value: 1000});
//             await Crowdy.changeFundingValidity(0);
//             const data = await Crowdy.getFundingItem(0);

//             expect(data.isValid).to.equal(false);
//         });

//         it("Revert if someone tries to change validity except owner", async function () {
//             const newFunding = await Crowdy.addForFunding("Cancer", "need 1000 wei", "random.com", addr2.address, 1000);
            
//             await expect(Crowdy.connect(addr1).changeFundingValidity(0)).to.be.revertedWith("Not an authorized person !!");
//         });
//     })
// });