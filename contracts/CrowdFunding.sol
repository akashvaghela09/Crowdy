//SPDX-License-Identifier: Unlicense
// deployed at 0xe092aF935d655C36C165ac86784996656a6a0C8E   test1
// deployed at 0xe857D4ddEc9b7E03CAb76ff631929fD9D79da5d0   test2
// deployed at 0x4A7A7481cd409696e647643C6B1E50BEE4C1AfF7   prod

pragma solidity ^0.8.4;

contract CrowdFunding {

    struct Funding {
        uint256 id;
        string title;
        string description;
        string imageUrl;
        address payable receiver;
        uint256 target;
        uint256 collection;
        bool isOpen; 
        bool isValid;
    }

    Funding[] internal fundingArr;
    uint256 internal nextId = 0;
    uint256 internal totalFundingRaised = 0;
    address internal owner = msg.sender;

    // add application for crowd funding
    function addForFunding (string memory _title, string memory _description, string memory _url, address payable _receiver, uint256 _fund) public {
        fundingArr.push(Funding(nextId, _title, _description, _url, _receiver, _fund, 0, true, true));
        nextId += 1;
    }

    // get data
    function getFundingData (uint256 _id) public view returns (Funding memory) {
        return fundingArr[_id];
    }

    // total number of crowd funding applications
    function totalFundings () public view returns (uint256) {
        return fundingArr.length;
    }

    // show how much amount collectively raised through crowd funding
    function getTotalFundRaised () public view returns (uint256) {
        return totalFundingRaised;
    }

    // contribute to any cause
    function contribute(uint256 _id) public 
        checkIfOpen(_id) 
        checkIfValid(_id) 
        checkIfReceiver(_id) 
        checkFundingAmount(_id) 
        payable {

        // update funding collection amount
        fundingArr[_id].collection += msg.value;

        // update total amount raised
        totalFundingRaised += msg.value;

        // transfer funds if collection is complete
        if (fundingArr[_id].collection == fundingArr[_id].target){
            address payable to = fundingArr[_id].receiver;
            uint256 fund = fundingArr[_id].target;

            to.transfer(fund);
            fundingArr[_id].isOpen = false;
        }
    } 

    function changeFundingValidity (uint256 _id) public checkIfOwner() returns(bool) {
        
        // toggle funding validity
        if(fundingArr[_id].isValid == true){
            fundingArr[_id].isValid = false;
        } else if (fundingArr[_id].isValid == false) {
            fundingArr[_id].isValid = true;
        }

        return fundingArr[_id].isValid;
    }

    // check for owner authorization
    modifier checkIfOwner() {
        require(msg.sender == owner, "Not an authorized person !!");

        _;
    }


    // receiver should not fund their own cause
    modifier checkIfReceiver(uint256 _id) {
        require(fundingArr[_id].receiver != msg.sender, "You can't fund your own cause !!");

        _;
    }

    // check if funding is open or not
    modifier checkIfOpen(uint256 _id) {
        require(fundingArr[_id].isOpen == true, "Already Closed !!" );

        _;
    }

    // should not add more than targted amount
    modifier checkFundingAmount(uint256 _id) {
        require(msg.value <= (fundingArr[_id].target - fundingArr[_id].collection), "Funding amount exceeds targeted amount !!");

        _;
    }

    // check funding validity
    modifier checkIfValid(uint256 _id) {
        require(fundingArr[_id].isValid == true, "Can't fund for this cause !!");

        _;
    }
}