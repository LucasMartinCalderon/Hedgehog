interface IPool {
    function buyHEDH(uint minTokensOut) external payable;
    function sellHEDH(uint tokenAmount, uint minEthOut) external;
    function sendPayout(address payable payoutAddress, uint amount) external;
}