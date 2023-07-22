interface IMCR{
    function getMCR() view external returns (uint);
    function updateMCRInternal() external;
}