/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LeoNft, LeoNftInterface } from "../LeoNft";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060600160405280602b815260200162003787602b91396200003d816200007460201b60201c565b506200004e6200009060201b60201c565b6200005e6200009060201b60201c565b6200006e6200009060201b60201c565b62000d4c565b80600290805190602001906200008c92919062000601565b5050565b620000a760036200011260201b620008291760201c565b6000620000c060036200012860201b6200083f1760201c565b905060048190806001815401808255809150506001900390600052602060002001600090919091909150556200010f33826001604051806020016040528060008152506200013660201b60201c565b50565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415620001a9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001a090620008d9565b60405180910390fd5b6000620001bb620002fb60201b60201c565b9050620001f481600087620001d6886200030360201b60201c565b620001e7886200030360201b60201c565b87620003cc60201b60201c565b8260008086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200025591906200096a565b925050819055508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628787604051620002d5929190620008fb565b60405180910390a4620002f481600087878787620003d460201b60201c565b5050505050565b600033905090565b60606000600167ffffffffffffffff81111562000349577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015620003785781602001602082028036833780820191505090505b5090508281600081518110620003b7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080915050919050565b505050505050565b620004008473ffffffffffffffffffffffffffffffffffffffff16620005de60201b6200084d1760201c565b15620005d6578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401620004499594939291906200080d565b602060405180830381600087803b1580156200046457600080fd5b505af19250505080156200049857506040513d601f19601f82011682018060405250810190620004959190620006c8565b60015b6200054a57620004a762000b60565b806308c379a014156200050b5750620004bf62000c90565b80620004cc57506200050d565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000502919062000871565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620005419062000895565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614620005d4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620005cb90620008b7565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b8280546200060f9062000a67565b90600052602060002090601f0160209004810192826200063357600085556200067f565b82601f106200064e57805160ff19168380011785556200067f565b828001600101855582156200067f579182015b828111156200067e57825182559160200191906001019062000661565b5b5090506200068e919062000692565b5090565b5b80821115620006ad57600081600090555060010162000693565b5090565b600081519050620006c28162000d32565b92915050565b600060208284031215620006db57600080fd5b6000620006eb84828501620006b1565b91505092915050565b620006ff81620009c7565b82525050565b6000620007128262000932565b6200071e818562000948565b93506200073081856020860162000a31565b6200073b8162000b85565b840191505092915050565b600062000753826200093d565b6200075f818562000959565b93506200077181856020860162000a31565b6200077c8162000b85565b840191505092915050565b60006200079660348362000959565b9150620007a38262000ba3565b604082019050919050565b6000620007bd60288362000959565b9150620007ca8262000bf2565b604082019050919050565b6000620007e460218362000959565b9150620007f18262000c41565b604082019050919050565b620008078162000a27565b82525050565b600060a082019050620008246000830188620006f4565b620008336020830187620006f4565b620008426040830186620007fc565b620008516060830185620007fc565b818103608083015262000865818462000705565b90509695505050505050565b600060208201905081810360008301526200088d818462000746565b905092915050565b60006020820190508181036000830152620008b08162000787565b9050919050565b60006020820190508181036000830152620008d281620007ae565b9050919050565b60006020820190508181036000830152620008f481620007d5565b9050919050565b6000604082019050620009126000830185620007fc565b620009216020830184620007fc565b9392505050565b6000604051905090565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000620009778262000a27565b9150620009848362000a27565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620009bc57620009bb62000ad3565b5b828201905092915050565b6000620009d48262000a07565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000a5157808201518184015260208101905062000a34565b8381111562000a61576000848401525b50505050565b6000600282049050600182168062000a8057607f821691505b6020821081141562000a975762000a9662000b02565b5b50919050565b62000aa88262000b85565b810181811067ffffffffffffffff8211171562000aca5762000ac962000b31565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d111562000b825760046000803e62000b7f60005162000b96565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600060443d101562000ca25762000d2f565b62000cac62000928565b60043d036004823e80513d602482011167ffffffffffffffff8211171562000cd657505062000d2f565b808201805167ffffffffffffffff81111562000cf6575050505062000d2f565b80602083010160043d03850181111562000d1557505050505062000d2f565b62000d268260200185018662000a9d565b82955050505050505b90565b62000d3d81620009db565b811462000d4957600080fd5b50565b612a2b8062000d5c6000396000f3fe608060405234801561001057600080fd5b506004361061009d5760003560e01c8063a22cb46511610066578063a22cb4651461017e578063aa6ca8081461019a578063d58778d6146101b8578063e985e9c5146101e8578063f242432a146102185761009d565b8062fdd58e146100a257806301ffc9a7146100d25780630e89341c146101025780632eb2c2d6146101325780634e1273f41461014e575b600080fd5b6100bc60048036038101906100b79190611a3d565b610234565b6040516100c9919061211e565b60405180910390f35b6100ec60048036038101906100e79190611ae5565b6102fd565b6040516100f99190611fa1565b60405180910390f35b61011c60048036038101906101179190611b37565b6103df565b6040516101299190611fbc565b60405180910390f35b61014c600480360381019061014791906118b3565b610410565b005b61016860048036038101906101639190611a79565b6104b1565b6040516101759190611f48565b60405180910390f35b61019860048036038101906101939190611a01565b610662565b005b6101a2610678565b6040516101af9190611f48565b60405180910390f35b6101d260048036038101906101cd9190611b37565b6106d0565b6040516101df919061211e565b60405180910390f35b61020260048036038101906101fd9190611877565b6106f4565b60405161020f9190611fa1565b60405180910390f35b610232600480360381019061022d9190611972565b610788565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156102a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029c9061201e565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103c857507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103d857506103d782610870565b5b9050919050565b60606103ea826108da565b6040516020016103fa9190611e59565b6040516020818303038152906040529050919050565b610418610a87565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045e575061045d85610458610a87565b6106f4565b5b61049d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104949061207e565b60405180910390fd5b6104aa8585858585610a8f565b5050505050565b606081518351146104f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ee906120de565b60405180910390fd5b6000835167ffffffffffffffff81111561053a577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156105685781602001602082028036833780820191505090505b50905060005b8451811015610657576106018582815181106105b3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101518583815181106105f4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151610234565b82828151811061063a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018181525050806106509061242e565b905061056e565b508091505092915050565b61067461066d610a87565b8383610def565b5050565b606060048054806020026020016040519081016040528092919081815260200182805480156106c657602002820191906000526020600020905b8154815260200190600101908083116106b2575b5050505050905090565b600481815481106106e057600080fd5b906000526020600020016000915090505481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610790610a87565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806107d657506107d5856107d0610a87565b6106f4565b5b610815576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080c9061203e565b60405180910390fd5b6108228585858585610f5c565b5050505050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60606000821415610922576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050610a82565b600082905060005b6000821461095457808061093d9061242e565b915050600a8261094d91906122e2565b915061092a565b60008167ffffffffffffffff811115610996577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156109c85781602001600182028036833780820191505090505b5090505b60008514610a7b576001826109e19190612313565b9150600a856109f09190612477565b60306109fc919061228c565b60f81b818381518110610a38577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85610a7491906122e2565b94506109cc565b8093505050505b919050565b600033905090565b8151835114610ad3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aca906120fe565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610b43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3a9061205e565b60405180910390fd5b6000610b4d610a87565b9050610b5d8187878787876111de565b60005b8451811015610d5a576000858281518110610ba4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190506000858381518110610be9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c8a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c819061209e565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d3f919061228c565b9250508190555050505080610d539061242e565b9050610b60565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610dd1929190611f6a565b60405180910390a4610de78187878787876111e6565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610e5e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e55906120be565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610f4f9190611fa1565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610fcc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc39061205e565b60405180910390fd5b6000610fd6610a87565b9050610ff6818787610fe7886113cd565b610ff0886113cd565b876111de565b600080600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508381101561108d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110849061209e565b60405180910390fd5b83810360008087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360008087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611142919061228c565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6288886040516111bf929190612139565b60405180910390a46111d5828888888888611493565b50505050505050565b505050505050565b6112058473ffffffffffffffffffffffffffffffffffffffff1661084d565b156113c5578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161124b959493929190611e86565b602060405180830381600087803b15801561126557600080fd5b505af192505050801561129657506040513d601f19601f820116820180604052508101906112939190611b0e565b60015b61133c576112a2612535565b806308c379a014156112ff57506112b7612903565b806112c25750611301565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112f69190611fbc565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161133390611fde565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146113c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113ba90611ffe565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff811115611412577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156114405781602001602082028036833780820191505090505b509050828160008151811061147e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080915050919050565b6114b28473ffffffffffffffffffffffffffffffffffffffff1661084d565b15611672578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016114f8959493929190611eee565b602060405180830381600087803b15801561151257600080fd5b505af192505050801561154357506040513d601f19601f820116820180604052508101906115409190611b0e565b60015b6115e95761154f612535565b806308c379a014156115ac5750611564612903565b8061156f57506115ae565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115a39190611fbc565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115e090611fde565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611670576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161166790611ffe565b60405180910390fd5b505b505050505050565b600061168d61168884612187565b612162565b905080838252602082019050828560208602820111156116ac57600080fd5b60005b858110156116dc57816116c28882611790565b8452602084019350602083019250506001810190506116af565b5050509392505050565b60006116f96116f4846121b3565b612162565b9050808382526020820190508285602086028201111561171857600080fd5b60005b85811015611748578161172e8882611862565b84526020840193506020830192505060018101905061171b565b5050509392505050565b6000611765611760846121df565b612162565b90508281526020810184848401111561177d57600080fd5b6117888482856123bb565b509392505050565b60008135905061179f81612999565b92915050565b600082601f8301126117b657600080fd5b81356117c684826020860161167a565b91505092915050565b600082601f8301126117e057600080fd5b81356117f08482602086016116e6565b91505092915050565b600081359050611808816129b0565b92915050565b60008135905061181d816129c7565b92915050565b600081519050611832816129c7565b92915050565b600082601f83011261184957600080fd5b8135611859848260208601611752565b91505092915050565b600081359050611871816129de565b92915050565b6000806040838503121561188a57600080fd5b600061189885828601611790565b92505060206118a985828601611790565b9150509250929050565b600080600080600060a086880312156118cb57600080fd5b60006118d988828901611790565b95505060206118ea88828901611790565b945050604086013567ffffffffffffffff81111561190757600080fd5b611913888289016117cf565b935050606086013567ffffffffffffffff81111561193057600080fd5b61193c888289016117cf565b925050608086013567ffffffffffffffff81111561195957600080fd5b61196588828901611838565b9150509295509295909350565b600080600080600060a0868803121561198a57600080fd5b600061199888828901611790565b95505060206119a988828901611790565b94505060406119ba88828901611862565b93505060606119cb88828901611862565b925050608086013567ffffffffffffffff8111156119e857600080fd5b6119f488828901611838565b9150509295509295909350565b60008060408385031215611a1457600080fd5b6000611a2285828601611790565b9250506020611a33858286016117f9565b9150509250929050565b60008060408385031215611a5057600080fd5b6000611a5e85828601611790565b9250506020611a6f85828601611862565b9150509250929050565b60008060408385031215611a8c57600080fd5b600083013567ffffffffffffffff811115611aa657600080fd5b611ab2858286016117a5565b925050602083013567ffffffffffffffff811115611acf57600080fd5b611adb858286016117cf565b9150509250929050565b600060208284031215611af757600080fd5b6000611b058482850161180e565b91505092915050565b600060208284031215611b2057600080fd5b6000611b2e84828501611823565b91505092915050565b600060208284031215611b4957600080fd5b6000611b5784828501611862565b91505092915050565b6000611b6c8383611e3b565b60208301905092915050565b611b8181612347565b82525050565b6000611b9282612220565b611b9c818561224e565b9350611ba783612210565b8060005b83811015611bd8578151611bbf8882611b60565b9750611bca83612241565b925050600181019050611bab565b5085935050505092915050565b611bee81612359565b82525050565b6000611bff8261222b565b611c09818561225f565b9350611c198185602086016123ca565b611c2281612557565b840191505092915050565b6000611c3882612236565b611c428185612270565b9350611c528185602086016123ca565b611c5b81612557565b840191505092915050565b6000611c7182612236565b611c7b8185612281565b9350611c8b8185602086016123ca565b80840191505092915050565b6000611ca4603483612270565b9150611caf82612575565b604082019050919050565b6000611cc7602883612270565b9150611cd2826125c4565b604082019050919050565b6000611cea602b83612270565b9150611cf582612613565b604082019050919050565b6000611d0d602983612270565b9150611d1882612662565b604082019050919050565b6000611d30602583612270565b9150611d3b826126b1565b604082019050919050565b6000611d53603283612270565b9150611d5e82612700565b604082019050919050565b6000611d76602a83612270565b9150611d818261274f565b604082019050919050565b6000611d99600583612281565b9150611da48261279e565b600582019050919050565b6000611dbc602283612281565b9150611dc7826127c7565b602282019050919050565b6000611ddf602983612270565b9150611dea82612816565b604082019050919050565b6000611e02602983612270565b9150611e0d82612865565b604082019050919050565b6000611e25602883612270565b9150611e30826128b4565b604082019050919050565b611e44816123b1565b82525050565b611e53816123b1565b82525050565b6000611e6482611daf565b9150611e708284611c66565b9150611e7b82611d8c565b915081905092915050565b600060a082019050611e9b6000830188611b78565b611ea86020830187611b78565b8181036040830152611eba8186611b87565b90508181036060830152611ece8185611b87565b90508181036080830152611ee28184611bf4565b90509695505050505050565b600060a082019050611f036000830188611b78565b611f106020830187611b78565b611f1d6040830186611e4a565b611f2a6060830185611e4a565b8181036080830152611f3c8184611bf4565b90509695505050505050565b60006020820190508181036000830152611f628184611b87565b905092915050565b60006040820190508181036000830152611f848185611b87565b90508181036020830152611f988184611b87565b90509392505050565b6000602082019050611fb66000830184611be5565b92915050565b60006020820190508181036000830152611fd68184611c2d565b905092915050565b60006020820190508181036000830152611ff781611c97565b9050919050565b6000602082019050818103600083015261201781611cba565b9050919050565b6000602082019050818103600083015261203781611cdd565b9050919050565b6000602082019050818103600083015261205781611d00565b9050919050565b6000602082019050818103600083015261207781611d23565b9050919050565b6000602082019050818103600083015261209781611d46565b9050919050565b600060208201905081810360008301526120b781611d69565b9050919050565b600060208201905081810360008301526120d781611dd2565b9050919050565b600060208201905081810360008301526120f781611df5565b9050919050565b6000602082019050818103600083015261211781611e18565b9050919050565b60006020820190506121336000830184611e4a565b92915050565b600060408201905061214e6000830185611e4a565b61215b6020830184611e4a565b9392505050565b600061216c61217d565b905061217882826123fd565b919050565b6000604051905090565b600067ffffffffffffffff8211156121a2576121a1612506565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156121ce576121cd612506565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156121fa576121f9612506565b5b61220382612557565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000612297826123b1565b91506122a2836123b1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156122d7576122d66124a8565b5b828201905092915050565b60006122ed826123b1565b91506122f8836123b1565b925082612308576123076124d7565b5b828204905092915050565b600061231e826123b1565b9150612329836123b1565b92508282101561233c5761233b6124a8565b5b828203905092915050565b600061235282612391565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156123e85780820151818401526020810190506123cd565b838111156123f7576000848401525b50505050565b61240682612557565b810181811067ffffffffffffffff8211171561242557612424612506565b5b80604052505050565b6000612439826123b1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561246c5761246b6124a8565b5b600182019050919050565b6000612482826123b1565b915061248d836123b1565b92508261249d5761249c6124d7565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d11156125545760046000803e612551600051612568565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000600082015250565b7f68747470733a2f2f6e66742d73746f726167652e6865726f6b756170702e636f60008201527f6d2f000000000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b600060443d101561291357612996565b61291b61217d565b60043d036004823e80513d602482011167ffffffffffffffff82111715612943575050612996565b808201805167ffffffffffffffff8111156129615750505050612996565b80602083010160043d03850181111561297e575050505050612996565b61298d826020018501866123fd565b82955050505050505b90565b6129a281612347565b81146129ad57600080fd5b50565b6129b981612359565b81146129c457600080fd5b50565b6129d081612365565b81146129db57600080fd5b50565b6129e7816123b1565b81146129f257600080fd5b5056fea2646970667358221220e4a83c189b1b86c979e671b398d8f3269c4eaa46cdc52e498535cc59422d438964736f6c6343000804003368747470733a2f2f6e66742d73746f726167652e6865726f6b756170702e636f6d2f7b69647d2e6a736f6e";

type LeoNftConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LeoNftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LeoNft__factory extends ContractFactory {
  constructor(...args: LeoNftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "LeoNft";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LeoNft> {
    return super.deploy(overrides || {}) as Promise<LeoNft>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LeoNft {
    return super.attach(address) as LeoNft;
  }
  connect(signer: Signer): LeoNft__factory {
    return super.connect(signer) as LeoNft__factory;
  }
  static readonly contractName: "LeoNft";
  public readonly contractName: "LeoNft";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LeoNftInterface {
    return new utils.Interface(_abi) as LeoNftInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): LeoNft {
    return new Contract(address, _abi, signerOrProvider) as LeoNft;
  }
}