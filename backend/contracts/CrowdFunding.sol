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
        uint256[] contributors;
        bool isOpen; 
        bool isPaushed;
    }

    Funding[] public fundingArr;
    uint256 internal nextId = 0;
    uint256 internal totalFundingRaised = 0;
    address internal owner;

    constructor () {
        owner = msg.sender;
    }

    function addForFunding (string memory _title,  address payable _receiver, uint256 _target, uint256 _deadline) public {
        fundingArr.push(Funding(nextId, _title, _receiver, _target, 0, _deadline, new uint256[](0), true, false));
        nextId += 1;
    }

    function getFundingItem (uint256 _id) public view returns (Funding memory) {
        return fundingArr[_id];
    }

    function getFundingData () public view returns (Funding[] memory) {
        return fundingArr;
    }

    function getAllFundingData () public view returns (uint256) {
        return fundingArr.length;
    }

    function getTotalFundRaised () public view returns (uint256) {
        return totalFundingRaised;
    }

    function contribute(uint256 _id) public 
        checkIfOpen(_id) 
        checkIfValid(_id) 
        checkIfReceiver(_id) 
        checkFundingAmount(_id) 
        payable {

        fundingArr[_id].collected += msg.value;

        totalFundingRaised += msg.value;

        if (fundingArr[_id].collected == fundingArr[_id].target){
            address payable to = fundingArr[_id].receiver;
            uint256 fund = fundingArr[_id].target;

            to.transfer(fund);
            fundingArr[_id].isOpen = false;
        }
    } 

    modifier checkIfOwner() {
        require(msg.sender == owner, "Not an authorized person !!");

        _;
    }


    modifier checkIfReceiver(uint256 _id) {
        require(fundingArr[_id].receiver != msg.sender, "You can't fund your own cause !!");

        _;
    }

    modifier checkIfOpen(uint256 _id) {
        require(fundingArr[_id].isOpen == true, "Already Closed !!" );

        _;
    }

    modifier checkFundingAmount(uint256 _id) {
        require(msg.value <= (fundingArr[_id].target - fundingArr[_id].collected), "Funding amount exceeds targeted amount !!");

        _;
    }

    modifier checkIfValid(uint256 _id) {
        require(fundingArr[_id].isPaushed == true, "Can't fund for this cause !!");

        _;
    }
}