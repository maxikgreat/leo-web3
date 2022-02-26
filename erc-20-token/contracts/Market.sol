//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import 'hardhat/console.sol';
import './LeoToken.sol';
import './UsdtToken.sol';
import './LeoNft.sol';

contract Market is ERC1155Holder {
  LeoToken private leoToken;
  UsdtToken private usdtToken;
  LeoNft private leoNft;

  struct Rate {
    uint128 numerator;
    uint128 denominator;
  }

  modifier isMyToken(address _token) {
    require(_token == address(leoToken) || _token == address(usdtToken), 'Not my token');
    _;
  }

  mapping(address => mapping(address => Rate)) public rate;

  constructor(address _leoToken, address _usdtToken, address _leoNft) {
    leoToken = LeoToken(_leoToken);
    usdtToken = UsdtToken(_usdtToken);
    leoNft = LeoNft(_leoNft);
    usdtToken.mint(100 * (10 ** usdtToken.decimals()));
    setRate(_leoToken, _usdtToken, _leoNft);
  }

  function setRate(address _leoToken, address _usdtToken, address _leoNft) private {
    rate[_leoToken][_usdtToken] = Rate(3, 100);
    rate[_usdtToken][_leoToken] = Rate(100, 3);
    rate[_leoToken][_leoNft] = Rate(200, 1);
    rate[_usdtToken][_leoNft] = Rate(15, 10);
  }

  function swap(address _fromToken, address _toToken, uint256 _value) external isMyToken(_fromToken) isMyToken(_toToken) {
    Rate memory rate = rate[_fromToken][_toToken];
    uint256 sendValue = _value * rate.numerator / rate.denominator;
    uint256 commonDecimals = 10 ** (leoToken.decimals() - usdtToken.decimals());

    if (_fromToken == address(leoToken)) {
      sendValue /= commonDecimals;
    } else {
      sendValue *= commonDecimals;
    }

    require(ERC20(_toToken).balanceOf(address(this)) >= sendValue, 'Not enough tokens to swap');
    ERC20(_fromToken).transferFrom(msg.sender, address(this), _value);
    ERC20(_toToken).transfer(msg.sender, sendValue);
  }

  function buyNft(uint256 _tokenId, address _withToken) external isMyToken(_withToken) {
    uint256 value = calculateNftPrice(_withToken);

    ERC20(_withToken).transferFrom(msg.sender, address(this), value);
    IERC1155(address(leoNft)).safeTransferFrom(address(this), msg.sender, _tokenId, 1, '');
  }

  function sellNft(uint256 _tokenId, address _withToken) external isMyToken(_withToken) {
    uint256 value = calculateNftPrice(_withToken);

    IERC1155(address(leoNft)).safeTransferFrom(msg.sender, address(this), _tokenId, 1, '');
    ERC20(_withToken).transfer(msg.sender, value);
  }

  function calculateNftPrice(address _withToken) private returns (uint256) {
    Rate memory rate = rate[_withToken][address(leoNft)];
    uint256 commonDecimals = 10 ** ERC20(_withToken).decimals();
    return rate.numerator * commonDecimals / rate.denominator;
  }

  function getAvailableLeo() external view returns (uint256) {
    return leoToken.balanceOf(address(this));
  }

  function getAvailableUsdt() external view returns (uint256) {
    return usdtToken.balanceOf(address(this));
  }
}
