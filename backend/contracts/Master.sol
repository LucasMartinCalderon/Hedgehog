pragma solidity ^0.8.0;

contract Master {
    address public  PoolAddress = address(0x0);
    address public  CommissionDestination = address(0x0);
    address public  CoverAddress = address(0x0);
    address public  MCRAddress = address(0x0);
    address public  AssessmentAddress = address(0x0);

    function setPoolAddress (address x) public {
        PoolAddress = x;
    }
    function setCommissionDestination (address x) public{
        CommissionDestination = x;
    }
    function setCoverAddress (address x) public {
        CoverAddress = x;
    }
    function setMCRAddress (address x) public {
        MCRAddress = x;
    }
    function setAssessmentAddress(address x) public {
        AssessmentAddress = x;
    }
}