//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Funding {
        uint256 id;
        string title;
        address payable receiver;
        uint256 target;
        uint256 collected;
        uint256 deadline;
        bool isOpen;
        bool isPaushed;
        Contributor[] contributors;
    }

    struct Contributor {
        address payable refundId;
        uint256 funded;
    }

    uint256 internal nextId = 0;
    uint256 internal totalFundingRaised = 0;
    address internal owner;

    mapping(uint256 => Funding) public fundingRecords;

    constructor() {
        owner = msg.sender;
    }

    function addForFunding(
        string memory _title,
        address payable _receiver,
        uint256 _target,
        uint256 _deadline
    ) public {
        Funding storage project = fundingRecords[nextId];
        project.id = nextId;
        project.title = _title;
        project.receiver = payable(_receiver);
        project.target = _target;
        project.deadline = _deadline;
        project.isOpen = true;

        nextId += 1;
    }

    function getProjectData(uint256 _id) public view returns (Funding memory) {
        return fundingRecords[_id];
    }

    function getAllProjectsData() public view returns (Funding[] memory) {
        Funding[] memory list = new Funding[](nextId);
        return list;
    }

    function totalProjects() public view returns (uint256) {
        return nextId;
    }

    function getTotalFundRaised() public view returns (uint256) {
        return totalFundingRaised;
    }

    function contribute(
        uint256 _id
    )
        public
        payable
        checkIfOpen(_id)
        checkIfValid(_id)
        checkIfReceiver(_id)
        checkFundingAmount(_id)
    {
        fundingRecords[_id].collected += msg.value;
        totalFundingRaised += msg.value;

        Funding storage project = fundingRecords[_id];
        project.contributors.push(Contributor(payable(msg.sender), msg.value));

        if (fundingRecords[_id].collected == fundingRecords[_id].target) {
            fundingRecords[_id].isOpen = false;

            address payable to = fundingRecords[_id].receiver;
            uint256 fund = fundingRecords[_id].target;

            to.transfer(fund);
        }
    }

    function refundFunds(uint256 _id) public checkIfOwner checkIfOpen(_id) {
        fundingRecords[_id].isOpen = false;
        Funding storage project = fundingRecords[_id];

        for (uint256 i = 0; i < project.contributors.length; i++) {
            Contributor memory donor = project.contributors[i];
            uint256 amount = donor.funded;

            if (amount > 0) {
                totalFundingRaised -= amount;
                donor.refundId.transfer(amount);
            }
        }
    }

    modifier checkIfOwner() {
        require(msg.sender == owner, "Not an authorized person !!");

        _;
    }

    modifier checkIfReceiver(uint256 _id) {
        require(
            fundingRecords[_id].receiver != msg.sender,
            "You can't fund your own cause !!"
        );

        _;
    }

    modifier checkIfOpen(uint256 _id) {
        require(fundingRecords[_id].isOpen == true, "Already Funded !!");
        require(
            fundingRecords[_id].deadline > block.timestamp,
            "Funding closed !!"
        );

        _;
    }

    modifier checkFundingAmount(uint256 _id) {
        require(
            msg.value <=
                (fundingRecords[_id].target - fundingRecords[_id].collected),
            "Funding amount exceeds targeted amount !!"
        );

        _;
    }

    modifier checkIfValid(uint256 _id) {
        require(
            fundingRecords[_id].isPaushed == false,
            "Can't fund for this cause, funding paushed !!"
        );

        _;
    }
}
