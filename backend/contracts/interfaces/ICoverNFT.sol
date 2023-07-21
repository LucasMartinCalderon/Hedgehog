
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

interface ICoverNFT is IERC721{
    function isApprovedOrOwner(address spender, uint tokenId) external returns (bool);

    function mint(address to) external returns (uint tokenId); // coverdata is stored in Cover 
    function totalSupply() external view returns (uint);

    error NotOperator();
    error NotMinted();
    error WrongFrom();
    error InvalidRecipient();
    error InvalidNewOperatorAddress();
    error InvalidNewNFTDescriptorAddress();
    error NotAuthorized();
    error UnsafeRecipient();
    error AlreadyMinted();
    // function changeOperator(address newOperator) external;

    // function totalSupply() external view returns (uint);

    // function name() external view returns (string memory);
}