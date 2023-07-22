

pragma solidity >= 0.8.18;
import "../interfaces/IMCR.sol";
import "../interfaces/ICover.sol";
import "../libraries/Math.sol";
import "../Master.sol";

uint constant BASIS_PRECISION = 10000;
contract MCR is IMCR {
  Master master;
  uint112 public mcrFloor = 10000; // in basis point
  uint112 public mcr;
  uint112 public desiredMCR;
  uint24 public gearingFactor = 48000; // in basis point
  constructor (address masterAddress){
    master = Master(masterAddress);
  }
  event MCRUpdated(
    uint mcr,
    uint desiredMCR,
    uint mcrFloor,
    uint mcrETHWithGear,
    uint totalSumAssured
  );
  function updateMCRInternal() public {
    _updateMCR();
  }

  function _updateMCR() internal {

    // the desiredMCR cannot fall below the mcrFloor but may have a higher or lower target value based
    // on the changes in the totalSumAssured in the system.
    uint totalSumAssured = getAllSumAssurance();
    uint gearedMCR = totalSumAssured * BASIS_PRECISION / gearingFactor;
    uint112 newDesiredMCR = uint112(Math.max(gearedMCR, mcrFloor));

    desiredMCR = uint112(Math.max(gearedMCR, mcrFloor));
    
      
    emit MCRUpdated(mcr, desiredMCR, mcrFloor, gearedMCR, totalSumAssured);
  }

  
  function getAllSumAssurance() public view returns (uint) {

    ICover _cover = ICover(master.CoverAddress());

    uint totalActiveCoverAmountInEth = _cover.totalActiveCoverInETH();
    return totalActiveCoverAmountInEth;
  }


  /**
   * @dev Calculates the current virtual MCR value. The virtual MCR value moves towards the desiredMCR value away
   * from the stored mcr value at constant velocity based on how much time passed from the lastUpdateTime.
   * The total change in virtual MCR cannot exceed 1% of stored mcr.
   *
   * This approach allows for the MCR to change smoothly across time without sudden jumps between values, while
   * always progressing towards the desiredMCR goal. The desiredMCR can change subject to the call of _updateMCR
   * so the virtual MCR value may change direction and start decreasing instead of increasing or vice-versa.
   *
   * @return mcr
   */
  function getMCR() public view returns (uint) {
    
    // uint basisPointsAdjustment = _maxMCRIncrement * (block.timestamp - _lastUpdateTime) / 1 days;
    // basisPointsAdjustment = Math.min(basisPointsAdjustment, MAX_MCR_ADJUSTMENT);

    return desiredMCR;
  }

}