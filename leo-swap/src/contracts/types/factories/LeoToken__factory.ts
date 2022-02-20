/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LeoToken, LeoTokenInterface } from "../LeoToken";

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
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    inputs: [],
    name: "buy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ethRate",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "vesting",
    outputs: [
      {
        internalType: "uint256",
        name: "unblockTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vestingPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawToOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040518060400160405280600d81526020017f4c656f636f646520546f6b656e00000000000000000000000000000000000000815250600090805190602001906200005192919062000165565b506040518060400160405280600381526020017f4c454f0000000000000000000000000000000000000000000000000000000000815250600190805190602001906200009f92919062000165565b506012600260006101000a81548160ff021916908360ff16021790555069152d02c7e14af6800000600355348015620000d757600080fd5b5033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600354600560003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506200027a565b828054620001739062000215565b90600052602060002090601f016020900481019282620001975760008555620001e3565b82601f10620001b257805160ff1916838001178555620001e3565b82800160010185558215620001e3579182015b82811115620001e2578251825591602001919060010190620001c5565b5b509050620001f29190620001f6565b5090565b5b8082111562000211576000816000905550600101620001f7565b5090565b600060028204905060018216806200022e57607f821691505b602082108114156200024557620002446200024b565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6119e3806200028a6000396000f3fe6080604052600436106100e85760003560e01c80637313ee5a1161008a578063a9059cbb11610059578063a9059cbb146102db578063d2d93f9014610318578063dd62ed3e14610343578063e388c42314610380576100e8565b80637313ee5a1461023c5780638da5cb5b1461026757806395d89b4114610292578063a6f2ae3a146102bd576100e8565b806323b872dd116100c657806323b872dd14610180578063313ce567146101bd5780633cb40e16146101e857806370a08231146101ff576100e8565b806306fdde03146100ed578063095ea7b31461011857806318160ddd14610155575b600080fd5b3480156100f957600080fd5b506101026103be565b60405161010f91906113e2565b60405180910390f35b34801561012457600080fd5b5061013f600480360381019061013a919061119c565b61044c565b60405161014c91906113c7565b60405180910390f35b34801561016157600080fd5b5061016a6105b0565b6040516101779190611504565b60405180910390f35b34801561018c57600080fd5b506101a760048036038101906101a2919061114d565b6105b6565b6040516101b491906113c7565b60405180910390f35b3480156101c957600080fd5b506101d26108a2565b6040516101df9190611563565b60405180910390f35b3480156101f457600080fd5b506101fd6108b5565b005b34801561020b57600080fd5b50610226600480360381019061022191906110e8565b610a16565b6040516102339190611504565b60405180910390f35b34801561024857600080fd5b50610251610a2e565b60405161025e9190611548565b60405180910390f35b34801561027357600080fd5b5061027c610a35565b60405161028991906113ac565b60405180910390f35b34801561029e57600080fd5b506102a7610a5b565b6040516102b491906113e2565b60405180910390f35b6102c5610ae9565b6040516102d29190611504565b60405180910390f35b3480156102e757600080fd5b5061030260048036038101906102fd919061119c565b610d3e565b60405161030f91906113c7565b60405180910390f35b34801561032457600080fd5b5061032d610ed7565b60405161033a9190611563565b60405180910390f35b34801561034f57600080fd5b5061036a60048036038101906103659190611111565b610edc565b6040516103779190611504565b60405180910390f35b34801561038c57600080fd5b506103a760048036038101906103a291906110e8565b610f01565b6040516103b592919061151f565b60405180910390f35b600080546103cb90611721565b80601f01602080910402602001604051908101604052809291908181526020018280546103f790611721565b80156104445780601f1061041957610100808354040283529160200191610444565b820191906000526020600020905b81548152906001019060200180831161042757829003601f168201915b505050505081565b600082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156104bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b690611444565b60405180910390fd5b82600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258560405161059d9190611504565b60405180910390a3600191505092915050565b60035481565b600082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610629576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062090611444565b60405180910390fd5b6106338584610f25565b82600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156106f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e990611404565b60405180910390fd5b82600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107419190611655565b9250508190555082600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461079791906115a5565b9250508190555082600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461082a9190611655565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161088e9190611504565b60405180910390a360019150509392505050565b600260009054906101000a900460ff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610945576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093c90611484565b60405180910390fd5b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161098d90611397565b60006040518083038185875af1925050503d80600081146109ca576040519150601f19603f3d011682016040523d82523d6000602084013e6109cf565b606091505b5050905080610a13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0a906114c4565b60405180910390fd5b50565b60056020528060005260406000206000915090505481565b62093a8081565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018054610a6890611721565b80601f0160208091040260200160405190810160405280929190818152602001828054610a9490611721565b8015610ae15780601f10610ab657610100808354040283529160200191610ae1565b820191906000526020600020905b815481529060010190602001808311610ac457829003601f168201915b505050505081565b600042600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541115610b70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b67906114a4565b60405180910390fd5b60003411610bb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610baa906114e4565b60405180910390fd5b6000606460ff1634610bc591906115fb565b9050600354811115610c0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0390611424565b60405180910390fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c5b91906115a5565b9250508190555080600560003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cb19190611655565b92505081905550604051806040016040528062093a8063ffffffff1642610cd891906115a5565b815260200182815250600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000155602082015181600101559050508091505090565b600082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610db1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da890611444565b60405180910390fd5b610dbb3384610f25565b82600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e0a9190611655565b9250508190555082600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e6091906115a5565b925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85604051610ec49190611504565b60405180910390a3600191505092915050565b606481565b6006602052816000526040600020602052806000526040600020600091509150505481565b60076020528060005260406000206000915090508060000154908060010154905082565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905042600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154111561100857600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154816110019190611655565b9050611076565b6040518060400160405280600081526020016000815250600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000155602082015181600101559050505b818110156110b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110b090611464565b60405180910390fd5b505050565b6000813590506110cd8161197f565b92915050565b6000813590506110e281611996565b92915050565b6000602082840312156110fa57600080fd5b6000611108848285016110be565b91505092915050565b6000806040838503121561112457600080fd5b6000611132858286016110be565b9250506020611143858286016110be565b9150509250929050565b60008060006060848603121561116257600080fd5b6000611170868287016110be565b9350506020611181868287016110be565b9250506040611192868287016110d3565b9150509250925092565b600080604083850312156111af57600080fd5b60006111bd858286016110be565b92505060206111ce858286016110d3565b9150509250929050565b6111e181611689565b82525050565b6111f08161169b565b82525050565b60006112018261157e565b61120b8185611594565b935061121b8185602086016116ee565b611224816117b1565b840191505092915050565b600061123c601f83611594565b9150611247826117c2565b602082019050919050565b600061125f601883611594565b915061126a826117eb565b602082019050919050565b6000611282601a83611594565b915061128d82611814565b602082019050919050565b60006112a5601d83611594565b91506112b08261183d565b602082019050919050565b60006112c8602783611594565b91506112d382611866565b604082019050919050565b60006112eb602983611594565b91506112f6826118b5565b604082019050919050565b600061130e601483611594565b915061131982611904565b602082019050919050565b6000611331600083611589565b915061133c8261192d565b600082019050919050565b6000611354602483611594565b915061135f82611930565b604082019050919050565b611373816116c7565b82525050565b611382816116d1565b82525050565b611391816116e1565b82525050565b60006113a282611324565b9150819050919050565b60006020820190506113c160008301846111d8565b92915050565b60006020820190506113dc60008301846111e7565b92915050565b600060208201905081810360008301526113fc81846111f6565b905092915050565b6000602082019050818103600083015261141d8161122f565b9050919050565b6000602082019050818103600083015261143d81611252565b9050919050565b6000602082019050818103600083015261145d81611275565b9050919050565b6000602082019050818103600083015261147d81611298565b9050919050565b6000602082019050818103600083015261149d816112bb565b9050919050565b600060208201905081810360008301526114bd816112de565b9050919050565b600060208201905081810360008301526114dd81611301565b9050919050565b600060208201905081810360008301526114fd81611347565b9050919050565b6000602082019050611519600083018461136a565b92915050565b6000604082019050611534600083018561136a565b611541602083018461136a565b9392505050565b600060208201905061155d6000830184611379565b92915050565b60006020820190506115786000830184611388565b92915050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b60006115b0826116c7565b91506115bb836116c7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156115f0576115ef611753565b5b828201905092915050565b6000611606826116c7565b9150611611836116c7565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561164a57611649611753565b5b828202905092915050565b6000611660826116c7565b915061166b836116c7565b92508282101561167e5761167d611753565b5b828203905092915050565b6000611694826116a7565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600060ff82169050919050565b60005b8381101561170c5780820151818401526020810190506116f1565b8381111561171b576000848401525b50505050565b6000600282049050600182168061173957607f821691505b6020821081141561174d5761174c611782565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f41646472657373206e6f7420616c6c6f77656420746f207472616e7366657200600082015250565b7f4e6f7420656e6f75676820746f6b656e7320746f206275790000000000000000600082015250565b7f4164647265737320307830206973206e6f7420616c6c6f776564000000000000600082015250565b7f4e6f7420656e6f75676820746f6b656e7320746f207472616e73666572000000600082015250565b7f596f752068617665206e6f2072696768747320746f20646f2074686973206f7060008201527f65726174696f6e00000000000000000000000000000000000000000000000000602082015250565b7f596f7527766520616c726561647920626f7567687420746f6b656e73206f6e2060008201527f74686973207765656b0000000000000000000000000000000000000000000000602082015250565b7f4661696c656420746f2073656e64206574686572000000000000000000000000600082015250565b50565b7f4d696e206574682076616c756520746f2062757920746f6b656e73206973203160008201527f2077656900000000000000000000000000000000000000000000000000000000602082015250565b61198881611689565b811461199357600080fd5b50565b61199f816116c7565b81146119aa57600080fd5b5056fea26469706673582212207c812d752a172fc6c4487bf678389e6e1c5089ab8d1ad9ece31fe03c34c19c5c64736f6c63430008040033";

type LeoTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LeoTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LeoToken__factory extends ContractFactory {
  constructor(...args: LeoTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "LeoToken";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LeoToken> {
    return super.deploy(overrides || {}) as Promise<LeoToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LeoToken {
    return super.attach(address) as LeoToken;
  }
  connect(signer: Signer): LeoToken__factory {
    return super.connect(signer) as LeoToken__factory;
  }
  static readonly contractName: "LeoToken";
  public readonly contractName: "LeoToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LeoTokenInterface {
    return new utils.Interface(_abi) as LeoTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LeoToken {
    return new Contract(address, _abi, signerOrProvider) as LeoToken;
  }
}