//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Token {
  string public name = 'Leocode Token';
  string public symbol = 'LEO';
  uint8 public decimals = 18;
  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  modifier nonZeroAddress(address _address) {
    require(_address != address(0), 'Address 0x0 is not allowed');
    _;
  }

  modifier sufficientSenderBalance(address _sender, uint _value) {
    require(balanceOf[_sender] >= _value, 'Not enough tokens to transfer');
    _;
  }

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  constructor() {
    balanceOf[msg.sender] = totalSupply();
  }

  function totalSupply() public view returns (uint256) {
    return 100000 * (10 ** decimals);
  }

  function approve(address _spender, uint256 _value) public nonZeroAddress(_spender) returns (bool) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transfer(address _to, uint256 _value) public
  nonZeroAddress(_to)
  sufficientSenderBalance(msg.sender, _value)
  returns (bool) {
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public
  nonZeroAddress(_to)
  sufficientSenderBalance(_from, _value)
  returns (bool) {
    require(allowance[_from][_to] >= _value, 'Address not allowed to transfer');
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][_to] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}
