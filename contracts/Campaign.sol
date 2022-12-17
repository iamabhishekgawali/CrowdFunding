// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(
        uint minimum,
        string memory name,
        string memory description,
        string memory image,
        uint target,
        uint _datecreated,
        string memory _Link,
        address Sender,
        uint deadline
    ) public {
        address newCampaign = address(
            new Campaign(
                minimum,
                Sender,
                name,
                description,
                image,
                target,
                _datecreated,
                _Link,
                deadline
            )
        );
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        uint index;
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public Owner;
    uint public minimunContribution;
    string public CampaignName;
    string public SubTitle;
    string public CampaignDescription;
    string public imageUrl;
    uint public targetToAchieve;
    address[] public contributers;
    uint[] public amoundContributed;
    uint public DateCreated;
    string public WebLink;
    bool public Complete_status;
    uint public Deadline;
    mapping(address => bool) public approvers;
    uint public approversCount;
    mapping(address => bool) public refunded;

    constructor(
        uint minimun,
        address creator,
        string memory name,
        string memory description,
        string memory image,
        uint target,
        uint _datecreated,
        string memory _Link,
        uint _Deadline
    ) {
        Owner = creator;
        minimunContribution = minimun;
        CampaignName = name;
        CampaignDescription = description;
        imageUrl = image;
        targetToAchieve = target;
        DateCreated = _datecreated;
        WebLink = _Link;
        Deadline = _Deadline;
        Complete_status = false;
    }

    function contribute() public payable {
        
        contributers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
        amoundContributed.push(msg.value);
        refunded[msg.sender] = false;
        if (address(this).balance >= targetToAchieve) {
            Complete_status = true;
        }
    }

    function getDeadline() public view returns (uint) {
        return Deadline;
    }

    uint public numRequests;
    mapping(uint => Request) public requests;

    function createRequest(
        string memory _description,
        uint _value,
        address _recipient
    ) public {
        Request storage r = requests[numRequests++];
        r.index = numRequests - 1;
        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function Refunds(uint index) public payable {
        refunded[contributers[index]] = true;
        payable(contributers[index]).transfer(amoundContributed[index]);
    }

    function getContibuter() public view returns (address[] memory) {
        return contributers;
    }

    function getAmountContributed() public view returns (uint[] memory) {
        return amoundContributed;
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function checkifApproved(
        uint index,
        address reciepient
    ) public view returns (bool) {
        return requests[index].approvals[reciepient];
    }

    function finalizeRequest(uint index) public payable {
        require(requests[index].approvalCount > (approversCount / 2));
        require(!requests[index].complete);
        payable(requests[index].recipient).transfer(requests[index].value);
        requests[index].complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint,
            uint,
            uint,
            uint,
            address,
            string memory,
            string memory,
            string memory,
            uint,
            address,
            uint,
            bool
        )
    {
        return (
            minimunContribution,
            address(this).balance,
            numRequests,
            approversCount,
            Owner,
            CampaignName,
            CampaignDescription,
            imageUrl,
            targetToAchieve,
            address(this),
            Deadline,
            Complete_status
        );
    }
}
