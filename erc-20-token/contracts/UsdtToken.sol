//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract UsdtToken is ERC20 {
  constructor() ERC20('Stable dollar', 'USDT') {}

  function decimals() public view override returns (uint8) {
    return 6;
  }

  function mint(uint256 _value) external returns (uint256) {
    _mint(msg.sender, _value);
    return _value;
  }
}
