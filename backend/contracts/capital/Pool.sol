

pragma solidity ^0.8.18;

import "../interfaces/IPool.sol";
import "../interfaces/IMCR.sol";
import "../libraries/Math.sol";
import "../Master.sol";

import "../token/HEDHToken.sol";

contract Pool is IPool {


    uint public constant MCR_RATIO_DECIMALS = 4;
    uint public constant MAX_MCR_RATIO = 40000; // 400%
    uint public constant MAX_BUY_SELL_MCR_ETH_FRACTION = 500; // 5%. 4 decimal points

    uint internal constant CONSTANT_C = 5800000;
    uint internal constant CONSTANT_A = 1028 * 1e13;
    uint internal constant TOKEN_EXPONENT = 4;

    uint16 constant MAX_SLIPPAGE_DENOMINATOR = 10000;

    uint minTokensOut = 1; // in unit of basis point
    event Payout(address indexed to, uint amount);
    event HEDHSold (address indexed member, uint nxmIn, uint ethOut);
    event HEDHBought (address indexed member, uint ethIn, uint nxmOut);
    HEDHToken hedhToken;
    Master master;

    constructor ( address _HEDHTokenAddress, address _master) {
        hedhToken = HEDHToken(_HEDHTokenAddress);
        master = Master(_master);
    }
    // remember to add a modifier
    function sendPayout(
        address payable payoutAddress,
        uint amount
    ) external {
        (bool transferSucceeded, /* data */) = payoutAddress.call{value : amount}("");
        require(transferSucceeded, "Pool: ETH transfer failed");
        emit Payout(payoutAddress,amount);
        uint totalAssetValue = address(this).balance ;

        mcr().updateMCRInternal();

    }
    function mcr() internal view returns (IMCR) {
        return IMCR(master.MCRAddress());
    }

    function sellHEDHTokens(
        uint amount
    ) public  returns (bool success) {
        sellHEDH(amount, 0);
        return true;
    }

    /// Buys NXM tokens with ETH.
    ///
    /// @param minTokensOut  Minimum amount of tokens to be bought. Revert if boughtTokens falls below
    /// this number.
    ///
    function buyHEDH(uint minTokensOut) public override payable  {
        uint ethIn = msg.value;
        require(ethIn > 0, "Pool: ethIn > 0");

        uint totalAssetValue = address(this).balance - ethIn;
        IMCR _mcr = mcr();
        uint mcrEth = _mcr.getMCR();
        // uint mcrRatio = calculateMCRRatio(totalAssetValue, mcrEth);

        // require(mcrRatio <= MAX_MCR_RATIO, "Pool: Cannot purchase if MCR% > 400%");
        uint tokensOut = calculateHEDHForEth(ethIn, totalAssetValue, mcrEth);
        require(tokensOut >= minTokensOut, "Pool: tokensOut is less than minTokensOut");

        hedhToken.mint(msg.sender, tokensOut);
        // evaluate the new MCR for the current asset value including the ETH paid in
        _mcr.updateMCRInternal();
        emit HEDHBought(msg.sender, ethIn, tokensOut);
    }

    /// Sell NXM tokens and receive ETH.
    ///
    /// @param tokenAmount  Amount of tokens to sell.
    /// @param minEthOut    Minimum amount of ETH to be received. Revert if ethOut falls below this number.
    ///
    function sellHEDH(
        uint tokenAmount,
        uint minEthOut
    ) public override  {
        require(hedhToken.balanceOf(msg.sender) >= tokenAmount, "Pool: Not enough balance");

        IMCR _mcr = mcr();
        uint currentTotalAssetValue = address(this).balance ;
        uint mcrEth = _mcr.getMCR();
        uint ethOut = calculateEthForHEDH(tokenAmount, currentTotalAssetValue, mcrEth);
        require(currentTotalAssetValue - ethOut >= mcrEth, "Pool: MCR% cannot fall below 100%");
        require(ethOut >= minEthOut, "Pool: ethOut < minEthOut");

        hedhToken.burnFrom(msg.sender, tokenAmount);
        (bool ok, /* data */) = (msg.sender).call{value: ethOut}("");
        require(ok, "Pool: Sell transfer failed");

        // evaluate the new MCR for the current asset value excluding the paid out ETH
        _mcr.updateMCRInternal();
        emit HEDHSold(msg.sender, tokenAmount, ethOut);
    }
    
    /* ========== TOKEN RELATED VIEW FUNCTIONS ========== */

    /// Get value in tokens for an ethAmount purchase.
    ///
    /// @param ethAmount    Amount of ETH used for buying.
    /// @return tokenValue  Tokens obtained by buying worth of ethAmount
    ///
    function getHEDHForEth(
        uint ethAmount
    ) public view  returns (uint) {
        uint totalAssetValue = address(this).balance;
        uint mcrEth = mcr().getMCR();
        return calculateHEDHForEth(ethAmount, totalAssetValue, mcrEth);
    }

    function calculateHEDHForEth(
        uint ethAmount,
        uint currentTotalAssetValue,
        uint mcrEth
    ) public pure returns (uint) {

        // require(
        // ethAmount <= mcrEth * MAX_BUY_SELL_MCR_ETH_FRACTION / (10 ** MCR_RATIO_DECIMALS),
        // "Pool: Purchases worth higher than 5% of MCReth are not allowed"
        // );

        /*
        The price formula is:
        P(V) = A + MCReth / C *  MCR% ^ 4
        where MCR% = V / MCReth
        P(V) = A + 1 / (C * MCReth ^ 3) *  V ^ 4

        To compute the number of tokens issued we can integrate with respect to V the following:
            ΔT = ΔV / P(V)
            which assumes that for an infinitesimally small change in locked value V price is constant and we
            get an infinitesimally change in token supply ΔT.
        This is not computable on-chain, below we use an approximation that works well assuming
        * MCR% stays within [100%, 400%]
        * ethAmount <= 5% * MCReth

        Use a simplified formula excluding the constant A price offset to compute the amount of tokens to be minted.
        AdjustedP(V) = 1 / (C * MCReth ^ 3) *  V ^ 4
        AdjustedP(V) = 1 / (C * MCReth ^ 3) *  V ^ 4

        For a very small variation in tokens ΔT, we have,  ΔT = ΔV / P(V), to get total T we integrate with respect to V.
        adjustedTokenAmount = ∫ (dV / AdjustedP(V)) from V0 (currentTotalAssetValue) to V1 (nextTotalAssetValue)
        adjustedTokenAmount = ∫ ((C * MCReth ^ 3) / V ^ 4 * dV) from V0 to V1
        Evaluating the above using the antiderivative of the function we get:
        adjustedTokenAmount = - MCReth ^ 3 * C / (3 * V1 ^3) + MCReth * C /(3 * V0 ^ 3)
        */

        if (currentTotalAssetValue == 0 || mcrEth / currentTotalAssetValue > 1e12) {
        /*
        If the currentTotalAssetValue = 0, adjustedTokenPrice approaches 0. Therefore we can assume the price is A.
        If currentTotalAssetValue is far smaller than mcrEth, MCR% approaches 0, let the price be A (baseline price).
        This avoids overflow in the calculateIntegralAtPoint computation.
        This approximation is safe from arbitrage since at MCR% < 100% no sells are possible.
        */
        return ethAmount * 1e18 / CONSTANT_A;
        }

        // MCReth * C /(3 * V0 ^ 3)
        uint point0 = calculateIntegralAtPoint(currentTotalAssetValue, mcrEth);
        // MCReth * C / (3 * V1 ^3)
        uint nextTotalAssetValue = currentTotalAssetValue + ethAmount;
        uint point1 = calculateIntegralAtPoint(nextTotalAssetValue, mcrEth);
        uint adjustedTokenAmount = point0 - point1;
        /*
        Compute a preliminary adjustedTokenPrice for the minted tokens based on the adjustedTokenAmount above,
        and to that add the A constant (the price offset previously removed in the adjusted Price formula)
        to obtain the finalPrice and ultimately the tokenValue based on the finalPrice.

        adjustedPrice = ethAmount / adjustedTokenAmount
        finalPrice = adjustedPrice + A
        tokenValue = ethAmount  / finalPrice
        */
        // ethAmount is multiplied by 1e18 to cancel out the multiplication factor of 1e18 of the adjustedTokenAmount
        uint adjustedTokenPrice = ethAmount * 1e18 / adjustedTokenAmount;
        uint tokenPrice = adjustedTokenPrice + CONSTANT_A;

        return ethAmount * 1e18 / tokenPrice;
    }

    /**
    * @dev integral(V) =  MCReth ^ 3 * C / (3 * V ^ 3) * 1e18
    * computation result is multiplied by 1e18 to allow for a precision of 18 decimals.
    * NOTE: omits the minus sign of the correct integral to use a uint result type for simplicity
    * WARNING: this low-level function should be called from a contract which checks that
    * mcrEth / assetValue < 1e17 (no overflow) and assetValue != 0
    */
    function calculateIntegralAtPoint(
        uint assetValue,
        uint mcrEth
    ) internal pure returns (uint) {
        return CONSTANT_C * 1e18 / 3 * mcrEth / assetValue * mcrEth / assetValue * mcrEth / assetValue;
    }

    function getEthForHEDH(uint hedhAmount) public view  returns (uint ethAmount) {
        uint currentTotalAssetValue = address(this).balance;
        uint mcrEth = mcr().getMCR();
        return calculateEthForHEDH(hedhAmount, currentTotalAssetValue, mcrEth);
    }

    /**
    * @dev Computes token sell value for a tokenAmount in ETH with a sell spread of 2.5%.
    * for values in ETH of the sale <= 1% * MCReth the sell spread is very close to the exact value of 2.5%.
    * for values higher than that sell spread may exceed 2.5%
    * (The higher amount being sold at any given time the higher the spread)
    */
    function calculateEthForHEDH(
        uint nxmAmount,
        uint currentTotalAssetValue,
        uint mcrEth
    ) public  pure returns (uint) {

        // Step 1. Calculate spot price at current values and amount of ETH if tokens are sold at that price
        uint spotPrice0 = calculateTokenSpotPrice(currentTotalAssetValue, mcrEth);
        uint spotEthAmount = nxmAmount * spotPrice0 / 1e18;

        //  Step 2. Calculate spot price using V = currentTotalAssetValue - spotEthAmount from step 1
        uint totalValuePostSpotPriceSell = currentTotalAssetValue - spotEthAmount;
        uint spotPrice1 = calculateTokenSpotPrice(totalValuePostSpotPriceSell, mcrEth);

        // Step 3. Min [average[Price(0), Price(1)] x ( 1 - Sell Spread), Price(1) ]
        // Sell Spread = 2.5%
        uint averagePriceWithSpread = (spotPrice0 + spotPrice1) / 2 * 975 / 1000;
        uint finalPrice = Math.min(averagePriceWithSpread, spotPrice1);
        uint ethAmount = finalPrice * nxmAmount / 1e18;

        // require(
        // ethAmount <= mcrEth * MAX_BUY_SELL_MCR_ETH_FRACTION / (10 ** MCR_RATIO_DECIMALS),
        // "Pool: Sales worth more than 5% of MCReth are not allowed"
        // );

        return ethAmount;
    }

    function calculateMCRRatio(
        uint totalAssetValue,
        uint mcrEth
    ) public  pure returns (uint) {
        return totalAssetValue * (10 ** MCR_RATIO_DECIMALS) / mcrEth;
    }

    /// Calculates token price in ETH of 1 NXM token. TokenPrice = A + (MCReth / C) * MCR%^4
    ///
    function calculateTokenSpotPrice(
        uint totalAssetValue,
        uint mcrEth // here
    ) public  pure returns (uint tokenPrice) {

        uint mcrRatio = calculateMCRRatio(totalAssetValue, mcrEth);
        uint precisionDecimals = 10 ** (TOKEN_EXPONENT * MCR_RATIO_DECIMALS);

        return mcrEth * (mcrRatio ** TOKEN_EXPONENT) / CONSTANT_C / precisionDecimals + CONSTANT_A;
    }


    fallback() external payable {}

    receive() external payable {}

}