//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract LeoToken {
  struct Vesting {
    uint256 unblockTime;
    uint256 tokens;
  }

  string public name = 'Leocode Token';
  string public symbol = 'LEO';
  uint8 public decimals = 18;
  uint256 public totalSupply = 100000000000000000000000;

  address public owner;
  uint8 public constant ethRate = 100;
  uint32 public constant vestingPeriod = 7 days;

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;
  mapping(address => Vesting) public vesting;

  modifier nonZeroAddress(address _address) {
    require(_address != address(0), 'Address 0x0 is not allowed');
    _;
  }

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  constructor() {
    owner = msg.sender;
    balanceOf[address(this)] = totalSupply;
  }

  function adjustSenderBalance(address _sender, uint256 _value) private {
    uint256 freeTokens = balanceOf[_sender];

    if (vesting[_sender].unblockTime > block.timestamp) {
      freeTokens -= vesting[_sender].tokens;
    } else {
      vesting[msg.sender] = Vesting(0, 0);
    }

    require(freeTokens >= _value, 'Not enough tokens to transfer');
  }

  function withdrawToOwner() external {
    require(msg.sender == owner, 'You have no rights to do this operation');
    (bool success,) = owner.call{value: address(this).balance}('');
    require(success, 'Failed to send ether');
  }

  function approve(address _spender, uint256 _value) public nonZeroAddress(_spender) returns (bool) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function buy() external payable returns (uint256) {
    require(vesting[msg.sender].unblockTime <= block.timestamp, 'You\'ve already bought tokens on this week');
    require(msg.value > 0, 'Min eth value to buy tokens is 1 wei');
    uint256 tokens = msg.value * ethRate;
    require(tokens <= totalSupply, 'Not enough tokens to buy');
    balanceOf[msg.sender] += tokens;
    balanceOf[address(this)] -= tokens;
    vesting[msg.sender] = Vesting(block.timestamp + vestingPeriod, tokens);
    return tokens;
  }

  function transfer(address _to, uint256 _value) public
  nonZeroAddress(_to)
  returns (bool) {
    adjustSenderBalance(msg.sender, _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public
  nonZeroAddress(_to)
  returns (bool) {
    adjustSenderBalance(_from, _value);
    require(allowance[_from][_to] >= _value, 'Address not allowed to transfer');
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][_to] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}
