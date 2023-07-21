
import "./ICover.sol";


interface IAssessment {

    // use oracle 
     function calculateCover(CoverData calldata cd) external returns (uint claimValue );
     // individual claims 
}