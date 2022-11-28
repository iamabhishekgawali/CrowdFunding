// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract CampaignFactory {
    
    address[] public deployedCampaigns;
    // 0 1 2 3
    function createCampaign(
        uint minimum,
        string memory name,
        string memory description,
        string memory image,
        uint target,
        uint _datecreated,
        string memory _Link,
        address Sender
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
                _Link
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
    uint public DateCreated;
    string public WebLink;

    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == Owner);
        _;
    }

    constructor(
        uint minimun,
        address creator,
        string memory name,
        string memory description,
        string memory image,
        uint target,
        uint _datecreated,
        string memory _Link
    ) {
        Owner = creator;
        minimunContribution = minimun;
        CampaignName = name;
        CampaignDescription = description;
        imageUrl = image;
        targetToAchieve = target;
        DateCreated = _datecreated;
        WebLink = _Link;
    }

    function contribute() public payable {
        require(block.timestamp < DateCreated);
        require(msg.value > minimunContribution * 1e18);
        contributers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }

    uint public numRequests;
    mapping(uint => Request) requests;

    function createRequest(
        string memory _description,
        uint _value,
        address _recipient
    ) public {
        Request storage r = requests[numRequests++];
        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
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
            address
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
            address(this)
        );
    }
}
