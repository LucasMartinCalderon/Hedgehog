pragma solidity >=0.5.0;
import "./ICoverNFT.sol";

struct BuyCoverParams {
    address token0; // eth address
    address token1; // pool address
    uint token1Qty;
    uint token0Qty;
    uint lowerBoundRatio;
    uint upperBoundRatio;
    uint period;
    string pairStr;
    uint initialPoolPrice;
}

struct CoverData {
  uint256 amountPaidOut;
  uint256 totalClaimAmount;
  uint256 start;
  uint256 period; // seconds
 
    address token0;
    address token1;
    uint256 token0Qty;
    uint256 token1Qty;

    uint256 lowerBoundRatio;
    uint256 upperBoundRatio;
    string pairStr;
    uint initialPoolPrice;
}



interface ICover {
    //mapping(uint => CoverData) private _coverData; _coverData[coverId]
    function buyCover(BuyCoverParams calldata params) external payable returns (uint coverId); 
    function coverPrice(BuyCoverParams calldata params) external returns (uint price); // oracle is not involved
    // function retrievePayment(uint premiumInPaymentAsset, uint paymentAsset) external returns (bool success); // pay premium to Pool
    function coverDataCount() external view returns (uint count);

    function getCoverData(uint coverId) external view returns (CoverData memory coverData);
    function totalActiveCoverInETH()external view returns (uint);
    function decActiveCoverInETH(uint ) external;
    // ETH transfers
    error InsufficientEthSent();
    error SendingEthToPoolFailed();
    error SendingEthToCommissionDestinationFailed();
    error ReturningEthRemainderToSenderFailed();
}