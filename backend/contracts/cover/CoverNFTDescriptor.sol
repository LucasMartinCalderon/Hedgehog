// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "../utils/Base64.sol";
import "../interfaces/ICover.sol";
import "../interfaces/ICoverNFTDescriptor.sol";
import "../Master.sol";


contract CoverNFTDescriptor is ICoverNFTDescriptor {
  Master public master;
  constructor(
    address _master
  ) {
    master = Master(_master);
  }
  

  function tokenURI(uint tokenId) public view returns (string memory) {
    (string memory descriptionString, CoverData memory coverData) = generateDescription(tokenId);
    string memory image = Base64.encode(bytes(generateSVGImage(coverData)));

    return string(
      abi.encodePacked(
        "data:application/json;base64,",
        Base64.encode(
          bytes(
            abi.encodePacked(
              '{"name":"HedgeHog Protocol"',
              '"description":"', descriptionString, '",',
              '"image": "',
              'data:image/svg+xml;base64,',
              image,
              '"}'
            )
          )
        )
      )
    );
  }
    function uint2str(
    uint256 _i
    )
    internal
    pure
    returns (string memory str)
    {
        if (_i == 0)
        {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0)
        {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0)
        {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        str = string(bstr);
    }
  function generateDescription(uint tokenId) public view returns (string memory descriptionString,
    CoverData memory coverData) {
    ICover cover = ICover(master.CoverAddress());

    if (cover.coverDataCount() < tokenId) {
      revert( "this token does not exist");
    }

    // Get cover data
    CoverData memory coverData = cover.getCoverData(tokenId);

    // Check if cover has already expired
    string memory expiryMessage;
    if ((coverData.start + coverData.period) <= block.timestamp) {
      expiryMessage = "This cover NFT has already expired";
    }

    string memory expiry = uint2str(coverData.start+coverData.period);

    // Encode final description
    descriptionString = string(
      abi.encodePacked(
        "This NFT represents a cover purchase made for: ", coverData.pairStr,
        " \\nInitial Token0 Qty: ",uint2str(coverData.token0Qty),
        " \\nInitial Token1 Qty: ", uint2str(coverData.token1Qty),
        " \\nLowerBound: ", uint2str(coverData.lowerBoundRatio),
        " \\nUpperBound: ", uint2str(coverData.upperBoundRatio),
        " \\nExpiry: ", expiryMessage
      )
    );
    return (descriptionString,coverData);
  }



  function generateSVGImage(CoverData memory coverData) public pure returns (bytes memory image) {

    string memory svgData = string(abi.encodePacked(
        '<tspan>', coverData.pairStr ,'</tspan></text>  <text class="cls-9" x="93%" y="40%" text-anchor="end">',
        '<tspan>', uint2str(coverData.token0Qty), " ",uint2str(coverData.token1Qty) , '</tspan></text>',
        '<tspan>', uint2str(coverData.lowerBoundRatio), " ",uint2str(coverData.upperBoundRatio) , '</tspan></text>',
        '<text class="cls-9" x="93%" y="45%" text-anchor="end"><tspan>', uint2str(coverData.period + coverData.start) ,'</tspan></text>'
    ));

    return abi.encodePacked(
      string(
        abi.encodePacked(
          // Image data
          '<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M511.659 308.874a8.625 8.625 0 0 0 -5.009 -5.577c-22.643 -9.292 -41.712 -22.447 -56.675 -39.098 -31.569 -35.132 -37.715 -87.191 -15.295 -129.541a8.622 8.622 0 0 0 -6.343 -12.564c-33.811 -5.073 -57.427 4.408 -70.833 12.719l-5.002 -42.517a8.62 8.62 0 0 0 -3.571 -6.024 8.63 8.63 0 0 0 -6.865 -1.388c-30.25 6.722 -52.361 26.101 -65.071 40.3l-6.834 -39.295a8.625 8.625 0 0 0 -11.998 -6.405c-29.118 12.941 -49.318 39.586 -61.023 59.355l-7.543 -45.259a8.629 8.629 0 0 0 -11.965 -6.484c-29.203 12.775 -48.675 50.092 -58.718 74.603l-12.039 -31.603a8.627 8.627 0 0 0 -14.159 -3.028C68.31 151.474 58.54 177.775 54.63 195.117l-20.672 -22.792a8.626 8.626 0 0 0 -13.887 1.534C2.771 204.306 -2.254 225.345 0.872 254.261c3.685 34.083 18.578 65.022 41.311 88.863 -6.181 22.513 -24.774 37.844 -24.958 37.993a8.623 8.623 0 0 0 4.189 15.257c2.944 0.421 5.864 0.613 8.753 0.613 24.928 0 47.272 -14.383 56.661 -21.374a156.451 156.451 0 0 0 16.879 6.984v23.119c0 14.749 11.302 26.834 25.73 27.513 7.447 0.347 14.55 -2.291 19.948 -7.439a27.149 27.149 0 0 0 8.372 -19.555v-15.081h17.35v14.561c0 14.749 11.302 26.834 25.73 27.513 7.447 0.347 14.55 -2.291 19.948 -7.439a27.149 27.149 0 0 0 8.372 -19.555v-15.081h17.349v14.561c0 14.749 11.302 26.834 25.73 27.513 7.458 0.347 14.55 -2.291 19.948 -7.439a27.149 27.149 0 0 0 8.372 -19.555v-15.081H317.9v14.561c0 14.749 11.302 26.834 25.73 27.513 0.44 0.021 0.88 0.031 1.318 0.031 6.979 0 13.551 -2.625 18.63 -7.469a27.149 27.149 0 0 0 8.372 -19.555V390.5c34.995 -3.043 69.168 -15.992 99.318 -37.706 25.454 -18.331 39.02 -36.36 39.141 -36.531a8.617 8.617 0 0 0 1.25 -7.389zM43.478 378.068c4.507 -5.985 9.126 -13.439 12.553 -22.077a154.306 154.306 0 0 0 14.046 10.226c-6.682 4.262 -16.122 9.293 -26.599 11.851zm35.962 -26.352c-33.968 -21.953 -56.955 -58.044 -61.416 -99.313 -2.352 -21.732 0.545 -37.885 11.361 -59.442l24.873 27.424a8.619 8.619 0 0 0 9.467 2.248 8.642 8.642 0 0 0 5.546 -8.014c0.002 -0.361 0.55 -33.085 26.504 -65.203l15.335 40.255c1.321 3.468 4.718 5.718 8.422 5.546a8.625 8.625 0 0 0 7.927 -6.235c0.052 -0.177 5.194 -17.903 15.108 -37.631 9.832 -19.564 20.769 -34.031 32.075 -42.559l9.811 58.869a8.624 8.624 0 0 0 7.607 7.156 8.624 8.624 0 0 0 8.93 -5.423c0.2 -0.507 18.758 -46.818 54.212 -68.849l8.143 46.82a8.624 8.624 0 0 0 15.827 3.067c0.225 -0.363 21.25 -33.699 57.378 -46.099l5.606 47.652a8.623 8.623 0 0 0 14.948 4.793c0.204 -0.224 18.974 -20.367 56.961 -18.763 -9.908 24.004 -12.357 50.025 -7.78 74.732 -24.229 -6.098 -43.382 -0.204 -54.796 5.475 -5.628 -14.738 -19.912 -25.233 -36.603 -25.233 -21.592 0 -39.16 17.567 -39.16 39.16a38.94 38.94 0 0 0 6.236 21.183c-20.961 0.287 -49.412 1.972 -78.537 7.623 -70.574 13.696 -113.099 44.952 -123.985 90.761zm132.465 54.52a9.692 9.692 0 0 1 -3.03 7.075 9.68 9.68 0 0 1 -7.229 2.689c-5.123 -0.242 -9.291 -4.854 -9.291 -10.283v-14.561h19.55v15.08zm142.796 -0.001c0 2.7 -1.076 5.212 -3.03 7.076a9.709 9.709 0 0 1 -7.229 2.689c-5.123 -0.242 -9.291 -4.854 -9.291 -10.283v-14.588l19.55 -0.06v15.166zm8.381 -32.44 -71.154 0.11a8.625 8.625 0 0 0 -8.625 8.625v23.706a9.692 9.692 0 0 1 -3.03 7.075 9.702 9.702 0 0 1 -7.229 2.689c-5.123 -0.242 -9.291 -4.854 -9.291 -10.283V382.53a8.625 8.625 0 0 0 -8.625 -8.625H154.615c-1.559 0 -3.25 -0.034 -5.165 -0.105a8.624 8.624 0 0 0 -8.943 8.618v23.816a9.692 9.692 0 0 1 -3.03 7.075 9.67 9.67 0 0 1 -7.229 2.689c-5.123 -0.241 -9.291 -4.854 -9.291 -10.283v-29.394a8.625 8.625 0 0 0 -6.143 -8.26 139.34 139.34 0 0 1 -19.583 -7.538c16.784 -95.274 188.169 -90.775 215.39 -89.442 1.402 0.153 2.824 0.231 4.266 0.231a8.625 8.625 0 0 0 0.646 -17.226c-0.307 -0.023 -1.557 -0.114 -3.629 -0.227 -10.675 -1.46 -18.928 -10.638 -18.928 -21.708 0 -12.082 9.829 -21.911 21.911 -21.911s21.912 9.829 21.912 21.911c0 3.352 1.962 6.382 4.999 7.799 3.039 1.417 6.641 0.928 9.209 -1.225 1.02 -0.856 24.72 -20.212 60.548 -6.2 5.537 15.695 14.102 30.418 25.589 43.201 14.241 15.848 31.728 28.825 52.099 38.681 -16.439 17.423 -60.454 56.569 -126.161 59.388z"/></g></g><g><g><path cx="390.626" cy="279.734" r="8.625" d="M399.251 279.734A8.625 8.625 0 0 1 390.626 288.359A8.625 8.625 0 0 1 382.001 279.734A8.625 8.625 0 0 1 399.251 279.734z"/></g></g></svg>',
            svgData
        )
      )
    );
  }
}
