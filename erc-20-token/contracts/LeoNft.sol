//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract LeoNft is ERC1155 {
  using Counters for Counters.Counter;
  Counters.Counter private tokenId;

  uint256[] public tokenIds;

  constructor() ERC1155('https://nft-storage.herokuapp.com/{id}.json') {
    mint();
    mint();
    mint();
  }

  function getTokens() external view returns (uint256[] memory) {
    return tokenIds;
  }

  function mint() private {
    tokenId.increment();
    uint256 newItemId = tokenId.current();
    tokenIds.push(newItemId);
    _mint(msg.sender, newItemId, 1, '');
  }

  function uri(uint256 _tokenId) override public view returns (string memory) {
    return (
      string(abi.encodePacked(
        'https://nft-storage.herokuapp.com/',
        Strings.toString(_tokenId),
        '.json'
      ))
    );
  }
}
