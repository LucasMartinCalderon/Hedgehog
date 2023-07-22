pragma solidity ^0.8.*;

import "../interfaces/IAssessment.sol";
import "../interfaces/ICover.sol";
import "../interfaces/IMCR.sol";
import "../interfaces/IPool.sol";
import "../interfaces/ICoverNFT.sol";
import "../interfaces/IIndividualClaims.sol";
import "../Master.sol";
import "../token/HEDHToken.sol";
  
contract IndividualClaims is IIndividualClaims{
    HEDHToken public immutable hedh;
    ICoverNFT public immutable coverNFT;  
    Master public master;
    Claim[] public  claims;
    mapping(uint => ClaimSubmission) public lastClaimSubmissionOnCover;
    
    constructor(address hedhAddress, address coverNFTAddress,address _master) {
        hedh = HEDHToken(hedhAddress);
        coverNFT = ICoverNFT(coverNFTAddress);
        master = Master(_master);
    }
    
    function submitClaim(
        uint32 coverId
    ) external payable  returns (Claim memory claim) {
        ICover cover = cover();
        CoverData memory cd = cover.getCoverData(coverId);
        require(cd.period+cd.start <=  block.timestamp,"Only submit claim after expiry");

        require(
        coverNFT.isApprovedOrOwner(msg.sender, coverId),
        "Only the owner or approved addresses can submit a claim"
        );
        return _submitClaim(coverId, msg.sender);
        
    }
    
    function _submitClaim(uint coverId, address owner ) internal  returns (Claim memory) {
        ClaimSubmission memory previousSubmission = lastClaimSubmissionOnCover[coverId];

        if (previousSubmission.exists) {
            revert("A payout already exist");
        }
        lastClaimSubmissionOnCover[coverId] = ClaimSubmission(uint(claims.length), true);


        Claim memory c = Claim(coverId,owner,false);
        claims.push(c);
        ICover cover = cover();
        cover.decActiveCoverInETH(cover.getCoverData(coverId).totalClaimAmount);
        IMCR mcr = IMCR(master.MCRAddress());
        mcr.updateMCRInternal();
        return c;
    }

    function redeemClaimPayout(uint coverId) external override {
        uint claimId = lastClaimSubmissionOnCover[coverId].claimId;
        Claim memory claim = claims[claimId];
        require(!claim.payoutRedeemed, "Payout has already been redeemed");
        IPool poolContract = pool();
        IAssessment assess = assessment();
        ICover cover = cover();
        poolContract.sendPayout(
            payable (claim.coverOwner),
            assess.calculateCover(cover.getCoverData(claim.coverId))
        );
        claims[claimId].payoutRedeemed = true;
    }
    
    function cover() internal view returns (ICover) {
    return ICover(master.CoverAddress());
    }

    function pool() internal view returns (IPool) {
        return IPool(master.PoolAddress());
    }

    function assessment() internal view returns (IAssessment) {
        return IAssessment(master.AssessmentAddress());
    }

  }