pragma solidity ^0.8.*;
import "../interfaces/ICover.sol";
import "../Master.sol";
import "../interfaces/IPool.sol";
// Task 1: input spec, display price, pay to mint a CoverNFT and list CoverNFTs 

uint32 constant ETH_ASSET_ID = 0;
uint32 constant commissionRate = 101; // 1%

contract Cover is ICover{

    mapping(uint => CoverData) private _coverData;

    // mapping(uint => CoverSegment[]) private _coverSegments;
    uint256 public activeCoverAmount ;
    Master public master;
    ICoverNFT public  coverNFT;
    constructor(
        ICoverNFT _coverNFT,
        address masterAddress
    ) {
        // in constructor we only initialize immutable fields
        coverNFT = _coverNFT;
        activeCoverAmount = 0;
        master = Master(masterAddress);
    }
    function getCoverData(uint coverid) external view returns  (CoverData memory ) {
        return _coverData[coverid];
    }
    function buyCover(BuyCoverParams calldata params) external payable returns (uint coverId){
        
        
        coverId = coverNFT.mint(msg.sender);
        _coverData[coverId] = CoverData(0, coverAmountInETH(params),// cover amount in cover asset
            block.timestamp, // start
            params.period, // period);
            params.token0,
            params.token1,
            params.token0Qty,
            params.token1Qty,
            params.lowerBoundRatio,
            params.upperBoundRatio,
            params.pairStr
        );
        uint premiumToPay = coverPrice(params);
        retrievePayment(premiumToPay,ETH_ASSET_ID);
        activeCoverAmount += _coverData[coverId].totalClaimAmount;
    }
    function coverDataCount() public view returns (uint ){
        return coverNFT.totalSupply();
    }
    function coverAmountInETH(BuyCoverParams calldata params) public returns (uint amount){
        return 1000000000000;
    }
    function coverPrice(BuyCoverParams calldata params) public returns (uint price){
        return 1000000000000;
    } // oracle is not involved
    function retrievePayment(uint premiumInPaymentAsset, uint paymentAsset) internal returns (bool success){

        IPool _pool = pool();
        if (paymentAsset == ETH_ASSET_ID) {
        uint premiumWithCommission = commissionRate*premiumInPaymentAsset/100;
            if (msg.value < premiumInPaymentAsset) {
                revert InsufficientEthSent();
        }


        uint remainder = msg.value - premiumWithCommission;
      {
        // send premium in eth to the pool
        // solhint-disable-next-line avoid-low-level-calls
        (bool ok, /* data */) = address(_pool).call{value: premiumInPaymentAsset}("");
        if (!ok) {
          revert SendingEthToPoolFailed();
        }
      }

      // send commission
      if (premiumWithCommission - premiumInPaymentAsset > 0) {
        (bool ok, /* data */) = address(master.CommissionDestination()).call{value: premiumWithCommission - premiumInPaymentAsset}("");
        if (!ok) {
          revert SendingEthToCommissionDestinationFailed();
        }
      }

      if (remainder > 0) {
        // solhint-disable-next-line avoid-low-level-calls
        (bool ok, /* data */) = address(msg.sender).call{value: remainder}("");
        if (!ok) {
          revert ReturningEthRemainderToSenderFailed();
        }
      }
    
    } // pay premium to Pool

    }

    function decActiveCoverInETH(uint dec) public {
       activeCoverAmount -= dec;
    }
    function totalActiveCoverInETH() public view returns (uint256){
        return activeCoverAmount;
    }

    function pool() internal view returns (IPool) {
        return IPool(master.PoolAddress());
    }

  
  }
