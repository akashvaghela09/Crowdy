// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

/**
 * @title CrowdFunding
 * @dev A smart contract for crowdfunding projects.
 */
contract CrowdFunding {
    /**
     * @dev Variables for the contract.
     */
    uint256 internal nextId;
    uint256 internal totalFundingRaised;
    uint256 public dayCount;
    address internal owner;

    mapping(uint256 => Funding) public fundingRecords;

    /**
     * @dev Structs for the contract.
     */
    struct Funding {
        uint256 id;
        string title;
        address payable receiver;
        uint256 target;
        uint256 collected;
        uint256 deadline;
        bool isOpen;
        bool isPaused;
        Contributor[] contributors;
    }

    struct Contributor {
        address payable refundId;
        uint256 funded;
    }

    /**
     * @dev Events for the contract.
     */
    event newProjectAdded(uint256 id, string title, uint256 target);
    event contributionAdded(uint256 id, string title, uint256 amount);
    event projectClosed(uint256 id, string title);
    event refundTransferred(uint256 id, string title);

    /**
     * @dev Contract constructor.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Modifier to check if the caller is the contract owner.
     */
    modifier checkIfOwner() {
        require(msg.sender == owner, "Not an authorized person!!");
        _;
    }

    /**
     * @dev Modifier to check if the caller is not the receiver of the funding.
     * @param _id The ID of the funding project.
     */
    modifier checkIfReceiver(uint256 _id) {
        require(
            fundingRecords[_id].receiver != msg.sender,
            "You can't fund your own cause!!"
        );
        _;
    }

    /**
     * @dev Modifier to check if the funding project is open.
     * @param _id The ID of the funding project.
     */
    modifier checkIfOpen(uint256 _id) {
        require(fundingRecords[_id].isOpen == true, "Already Funded!!");
        require(fundingRecords[_id].deadline > dayCount, "Funding closed!!");
        _;
    }

    /**
     * @dev Modifier to check if the funding amount is valid.
     * @param _id The ID of the funding project.
     */
    modifier checkFundingAmount(uint256 _id) {
        require(
            msg.value <=
                (fundingRecords[_id].target - fundingRecords[_id].collected),
            "Funding amount exceeds targeted amount!!"
        );
        _;
    }

    /**
     * @dev Modifier to check if the funding project is valid (not paused).
     * @param _id The ID of the funding project.
     */
    modifier checkIfValid(uint256 _id) {
        require(
            fundingRecords[_id].isPaused == false,
            "Can't fund for this cause, funding paused!!"
        );
        _;
    }

    /**
     * @dev Adds a new project for funding.
     * @param _title The title of the project.
     * @param _receiver The address of the project receiver.
     * @param _target The target amount to be raised.
     * @param _deadline The deadline for the project.
     */
    function addForFunding(
        string memory _title,
        address payable _receiver,
        uint256 _target,
        uint256 _deadline
    ) public {
        // create a new project
        Funding storage project = fundingRecords[nextId];
        project.id = nextId;
        project.title = _title;
        project.receiver = payable(_receiver);
        project.target = _target;
        project.deadline = _deadline + dayCount;
        project.isOpen = true;

        emit newProjectAdded(nextId, _title, _target);

        // increment the project ID
        nextId += 1;
    }

    /**
     * @dev Contributes funds to a project.
     * @param _id The ID of the project.
     */
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
        // update the total funding raised and the project's collected amount
        fundingRecords[_id].collected += msg.value;
        totalFundingRaised += msg.value;

        Funding storage project = fundingRecords[_id];
        project.contributors.push(Contributor(payable(msg.sender), msg.value));

        emit contributionAdded(_id, project.title, msg.value);

        // close the project if the target is reached
        if (fundingRecords[_id].collected == fundingRecords[_id].target) {
            fundingRecords[_id].isOpen = false;

            address payable to = fundingRecords[_id].receiver;
            uint256 fund = fundingRecords[_id].target;

            // transfer the funds to the receiver
            to.transfer(fund);

            emit projectClosed(_id, project.title);
        }
    }

    /**
     * @dev Refunds funds to contributors for a specific project.
     * @param _id The ID of the project.
     */
    function refundFunds(uint256 _id) public checkIfOwner {
        require(fundingRecords[_id].isOpen == true, "Already Funded!!");
        
        fundingRecords[_id].isOpen = false;
        Funding storage project = fundingRecords[_id];

        // refund all contributors
        for (uint256 i = 0; i < project.contributors.length; i++) {
            Contributor memory donor = project.contributors[i];
            uint256 amount = donor.funded;

            // refund only if the contributor has funded
            if (amount > 0) {
                totalFundingRaised -= amount;
                donor.refundId.transfer(amount);

                emit refundTransferred(_id, project.title);
            }
        }
    }

    /**
     * @dev Pauses funding for a specific project.
     * @param _id The ID of the project.
     */
    function pauseFunding(uint256 _id) public checkIfOwner {
        fundingRecords[_id].isPaused = true;
    }

    /**
     * @dev Update day count.
     */
    function updateCounter() public checkIfOwner {
        dayCount++;
    }

    /**
     * @dev Retrieves the data of a specific project.
     * @param _id The ID of the project.
     * @return The Funding struct containing the project data.
     */
    function getProjectData(uint256 _id) public view returns (Funding memory) {
        return fundingRecords[_id];
    }

    /**
     * @dev Retrieves the data of all projects.
     * @return An array of Funding structs containing the project data.
     */
    function getAllProjectsData() public view returns (Funding[] memory) {
        Funding[] memory list = new Funding[](nextId);
        return list;
    }

    /**
     * @dev Retrieves the total number of projects.
     * @return The total number of projects.
     */
    function totalProjects() public view returns (uint256) {
        return nextId;
    }

    /**
     * @dev Retrieves the total amount of funding raised.
     * @return The total funding raised.
     */
    function getTotalFundRaised() public view returns (uint256) {
        return totalFundingRaised;
    }
}
