
pragma solidity ^0.8.*;
import "../interfaces/ICover.sol";
import "../interfaces/IAssessment.sol";

contract Assessment is IAssessment {

    // use oracle 
     function calculateCover(CoverData calldata cd) external returns (uint claimValue ){
            claimValue = 10000000;
     }
     // individual claims 
}