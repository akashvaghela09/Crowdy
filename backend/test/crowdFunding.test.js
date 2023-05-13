const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Crowd Funding Project : Crowdy \n", function () {
  let CrowdFunding;   // contract name
  let Crowdy;         // instance name
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let provider;

  beforeEach(async function () {
    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    provider = waffle.provider;

    Crowdy = await CrowdFunding.deploy();
  });

  describe("Check for initial values", function () {
    it("Total Project Funding list Should be zero at initial stage", async function () {
      const total = await Crowdy.getAllProjectsData();
      expect(total.length).to.equal(0);

    });

    it("Total Funding Amount Should be zero at initial stage", async function () {
      const total = await Crowdy.getTotalFundRaised();
      expect(total).to.equal(0);
    });

    it("Project Index list Should be zero at initial stage", async function () {
      const total = await Crowdy.getAllProjectsData();
      expect(total.length).to.equal(0);
    });
  })

  describe("Check for data insertion", function () {
    it("Should add new Application for Fundrising", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      const data = await Crowdy.getProjectData(0);

      expect(data.title).to.equal("Cancer Treatment");
    });

    it("Total Funding Application list should be updated after adding Applications", async function () {
      const newFunding1 = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      const newFunding2 = await Crowdy.addForFunding("H1N1", addr2.address, 2000, 2);
      const newFunding3 = await Crowdy.addForFunding("Ebola", addr2.address, 5000, 2);
      const data = await Crowdy.getAllProjectsData();

      expect(data.length).to.equal(3);
    });
  })

  describe("Check for data retrieval", function () {
    it("Should return correct Title after adding new Application for Fundrising", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      const data = await Crowdy.getProjectData(0);

      expect(data.title).to.equal("Cancer Treatment");
    });

    it("Should return correct Receiver's address after adding new Application for Fundrising", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      const data = await Crowdy.getProjectData(0);

      expect(data.receiver).to.equal(addr2.address);
    });

    it("Should return correct Target Amount after adding new Application for Fundrising", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      const data = await Crowdy.getProjectData(0);

      expect(data.target).to.equal(1000);
    });
  })

  describe("check for funding the cause", function () {
    it("Should retrun correct collection after funding the cause", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      await Crowdy.connect(addr1).contribute(0, { value: 500 });
      const data = await Crowdy.getProjectData(0);

      expect(data.collected).to.equal(500);
    });

    it("Revert if funding amount value exceeds target fund", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);

      await expect(Crowdy.connect(addr1).contribute(0, { value: 5000 })).to.be.revertedWith("Funding amount exceeds targeted amount!!");
    });

    it("Should not allow receiver to fund own cause", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);

      await expect(Crowdy.connect(addr2).contribute(0, { value: 1000 })).to.be.revertedWith("You can't fund your own cause!!");
    });

    it("Should close the Application if fund transfer is done", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      await Crowdy.connect(addr1).contribute(0, { value: 1000 });
      const data = await Crowdy.getProjectData(0);

      expect(data.isOpen).to.equal(false);
    });

    it("Should transfer the fund to correct receiver if collection is complete", async function () {
      let fund = 1000
      const balance1 = await provider.getBalance(addr2.address);
      const bal1 = Number(balance1.toString())

      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      await Crowdy.connect(addr1).contribute(0, { value: fund });

      const balance = await provider.getBalance(addr2.address);
      const bal2 = Number(balance.toString())
      expect(bal2).to.equal(bal1 + fund);
    });

    it("Should not allow fund transfer if funding is done", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      await Crowdy.connect(addr1).contribute(0, { value: 1000 });
      await expect(Crowdy.connect(addr1).contribute(0, { value: 5000 })).to.be.revertedWith("Already Funded!!");
    });
  })

  describe("check for returning funds", function () {

    it("Should stop funding after deadline is passed", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      await Crowdy.connect(owner).updateCounter();
      await Crowdy.connect(owner).updateCounter();
      await Crowdy.connect(owner).updateCounter();

      await expect(Crowdy.connect(addr1).contribute(0, { value: 100 })).to.be.revertedWith("Funding closed!!");
    });

    it("Should clear funds from contract if deadline is passed", async function () {

      let balanceBeforeRefund = await provider.getBalance(Crowdy.address);

      await Crowdy.addForFunding("Cancer Treatment", addr2.address, 100000, 2);
      await Crowdy.connect(addr1).contribute(0, { value: 50000 });
      await Crowdy.connect(owner).updateCounter();
      await Crowdy.connect(owner).updateCounter();
      await Crowdy.connect(owner).updateCounter();
      await Crowdy.connect(owner).refundFunds(0);

      let balanceAfterRefund = await provider.getBalance(Crowdy.address);

      expect(balanceBeforeRefund).to.equal(balanceAfterRefund);
    });
  })

  describe("check for changing validity", function () {
    it("Should allow owner to change application validity", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);
      await Crowdy.pauseFunding(0);
      const data = await Crowdy.getProjectData(0);

      expect(data.isPaused).to.equal(true);
    });

    it("Revert if someone tries to change validity except owner", async function () {
      const newFunding = await Crowdy.addForFunding("Cancer Treatment", addr2.address, 1000, 2);

      await expect(Crowdy.connect(addr1).pauseFunding(0)).to.be.revertedWith("Not an authorized person!!");
    });
  })
});