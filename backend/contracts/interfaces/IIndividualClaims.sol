struct Claim {
//   // The index of the assessment, stored in Assessment.sol
//   uint80 assessmentId;
  uint coverId;
  address coverOwner;

  bool payoutRedeemed;
}


struct ClaimSubmission {
  // The index of the claim, stored in Claims.sol
  uint claimId;
  // True when a previous submission exists
  bool exists;
}

interface IIndividualClaims {
    // check if claim is after expiration within 15 days
    function submitClaim(
        uint32 coverId
    ) external payable returns (Claim memory); 
    function redeemClaimPayout(uint id) external; // burn coverNFT

}