/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { UnipilotVault, UnipilotVaultInterface } from "../UnipilotVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_strategy",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lpShares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
        name: "account",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        name: "_depositor",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount0Desired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount1Desired",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "lpShares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
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
    name: "getVaultInfo",
    outputs: [
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
    name: "governance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "token0",
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
    name: "token1",
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
    name: "totalAmount0",
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
    name: "totalAmount1",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6101406040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610120523480156200003757600080fd5b506040516200249538038062002495833981810160405260a08110156200005d57600080fd5b8151602083015160408085015160608601805192519496939591949391820192846401000000008211156200009157600080fd5b908301906020820185811115620000a757600080fd5b8251640100000000811182820188101715620000c257600080fd5b82525081516020918201929091019080838360005b83811015620000f1578181015183820152602001620000d7565b50505050905090810190601f1680156200011f5780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200014357600080fd5b9083019060208201858111156200015957600080fd5b82516401000000008111828201881017156200017457600080fd5b82525081516020918201929091019080838360005b83811015620001a357818101518382015260200162000189565b50505050905090810190601f168015620001d15780820380516001836020036101000a031916815260200191505b506040525050508180604051806040016040528060018152602001603160f81b815250848481600390805190602001906200020e9291906200063a565b508051620002249060049060208401906200063a565b50506005805460ff1916601217905550815160208084019190912082519183019190912060c082905260e08190527f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6200027d620002e1565b60a0526200028d818484620002e5565b608052610100525050600a80546001600160a01b03808b166001600160a01b031992831617909255600b80549289169290911691909117905550620002d6915085905062000349565b5050505050620006e6565b4690565b6000838383620002f4620002e1565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b03168152602001955050505050506040516020818303038152906040528051906020012090509392505050565b600b546040805163802036f560e01b81526001600160a01b0384811660048301529151919092169163802036f59160248083019260c09291908290030181600087803b1580156200039957600080fd5b505af1158015620003ae573d6000803e3d6000fd5b505050506040513d60c0811015620003c557600080fd5b5080516020808301516040808501516060860151608087015160a090970151600f805462ffffff60481b19166901000000000000000000600293840b62ffffff908116919091029190911762ffffff60301b191666010000000000009a840b82169a909a029990991762ffffff60781b1916600160781b93830b8a16939093029290921762ffffff60601b19166c0100000000000000000000000093820b8916939093029290921765ffffff0000001916630100000094830b8816949094029390931762ffffff191694900b9490941692909217909155600980546001600160a01b0319166001600160a01b0385811691909117918290558351630dfe168160e01b81529351911692630dfe1681926004808301939192829003018186803b158015620004f157600080fd5b505afa15801562000506573d6000803e3d6000fd5b505050506040513d60208110156200051d57600080fd5b5051600780546001600160a01b0319166001600160a01b039283161790556009546040805163d21220a760e01b81529051919092169163d21220a7916004808301926020929190829003018186803b1580156200057957600080fd5b505afa1580156200058e573d6000803e3d6000fd5b505050506040513d6020811015620005a557600080fd5b5051600880546001600160a01b0319166001600160a01b039283161790556009546040805163ddca3f4360e01b81529051919092169163ddca3f43916004808301926020929190829003018186803b1580156200060157600080fd5b505afa15801562000616573d6000803e3d6000fd5b505050506040513d60208110156200062d57600080fd5b505162ffffff16600c5550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620006725760008555620006bd565b82601f106200068d57805160ff1916838001178555620006bd565b82800160010185558215620006bd579182015b82811115620006bd578251825591602001919060010190620006a0565b50620006cb929150620006cf565b5090565b5b80821115620006cb5760008155600101620006d0565b60805160a05160c05160e0516101005161012051611d656200073060003980610b9952508061137a5250806113bc52508061139b5250806113215250806113515250611d656000f3fe60806040526004361061018f5760003560e01c80635aa6e675116100d6578063a457c2d71161007f578063d505accf11610059578063d505accf146105af578063dd62ed3e1461060d578063ddca3f431461064857610196565b8063a457c2d714610528578063a9059cbb14610561578063d21220a71461059a57610196565b80637ecebe00116100b05780637ecebe00146104a15780637f98aa71146104d457806395d89b411461051357610196565b80635aa6e6751461042057806370a082311461043557806379cc67901461046857610196565b8063313ce56711610138578063395093511161011257806339509351146103a857806342966c68146103e157806350e0f5b71461040b57610196565b8063313ce5671461035357806335c4b49e1461037e5780633644e5151461039357610196565b806318160ddd1161016957806318160ddd146102a057806320e8c565146102c757806323b872dd1461031057610196565b806306fdde0314610198578063095ea7b3146102225780630dfe16811461026f57610196565b3661019657005b005b3480156101a457600080fd5b506101ad61065d565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101e75781810151838201526020016101cf565b50505050905090810190601f1680156102145780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561022e57600080fd5b5061025b6004803603604081101561024557600080fd5b506001600160a01b0381351690602001356106f4565b604080519115158252519081900360200190f35b34801561027b57600080fd5b50610284610712565b604080516001600160a01b039092168252519081900360200190f35b3480156102ac57600080fd5b506102b5610721565b60408051918252519081900360200190f35b3480156102d357600080fd5b506102b5600480360360808110156102ea57600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135610727565b34801561031c57600080fd5b5061025b6004803603606081101561033357600080fd5b506001600160a01b03813581169160208101359091169060400135610870565b34801561035f57600080fd5b506103686108f7565b6040805160ff9092168252519081900360200190f35b34801561038a57600080fd5b506102b5610900565b34801561039f57600080fd5b506102b5610906565b3480156103b457600080fd5b5061025b600480360360408110156103cb57600080fd5b506001600160a01b038135169060200135610915565b3480156103ed57600080fd5b506101966004803603602081101561040457600080fd5b5035610963565b34801561041757600080fd5b506102b5610977565b34801561042c57600080fd5b5061028461097d565b34801561044157600080fd5b506102b56004803603602081101561045857600080fd5b50356001600160a01b031661098c565b34801561047457600080fd5b506101966004803603604081101561048b57600080fd5b506001600160a01b0381351690602001356109a7565b3480156104ad57600080fd5b506102b5600480360360208110156104c457600080fd5b50356001600160a01b0316610a01565b3480156104e057600080fd5b506104e9610a22565b604080516001600160a01b0394851681529290931660208301528183015290519081900360600190f35b34801561051f57600080fd5b506101ad610a3e565b34801561053457600080fd5b5061025b6004803603604081101561054b57600080fd5b506001600160a01b038135169060200135610a9f565b34801561056d57600080fd5b5061025b6004803603604081101561058457600080fd5b506001600160a01b038135169060200135610b07565b3480156105a657600080fd5b50610284610b1b565b3480156105bb57600080fd5b50610196600480360360e08110156105d257600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610b2a565b34801561061957600080fd5b506102b56004803603604081101561063057600080fd5b506001600160a01b0381358116916020013516610ce1565b34801561065457600080fd5b506102b5610d0c565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106e95780601f106106be576101008083540402835291602001916106e9565b820191906000526020600020905b8154815290600101906020018083116106cc57829003601f168201915b505050505090505b90565b6000610708610701610d12565b8484610d16565b5060015b92915050565b6007546001600160a01b031681565b60025490565b600080831180156107385750600082115b61076e576040805162461bcd60e51b8152602060048201526002602482015261125360f21b604482015290519081900360640190fd5b6001600160a01b0385161580159061078e57506001600160a01b03841615155b6107c4576040805162461bcd60e51b8152602060048201526002602482015261494160f01b604482015290519081900360640190fd5b6107dc600d54600e546107d5610721565b8686610e02565b90506107e88482610edc565b600754610800906001600160a01b0316863086610fcc565b600854610818906001600160a01b0316863085610fcc565b604080516001600160a01b0387168152602081018590528082018490526060810183905290517f36af321ec8d3c75236829c5317affd40ddb308863a1236d2d277a4025cccee1e9181900360800190a1949350505050565b600061087d84848461112b565b6108ed84610889610d12565b6108e885604051806060016040528060288152602001611c7e602891396001600160a01b038a166000908152600160205260408120906108c7610d12565b6001600160a01b031681526020810191909152604001600020549190611286565b610d16565b5060019392505050565b60055460ff1690565b600e5481565b600061091061131d565b905090565b6000610708610922610d12565b846108e88560016000610933610d12565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906113e7565b61097461096e610d12565b82611448565b50565b600d5481565b600a546001600160a01b031681565b6001600160a01b031660009081526020819052604090205490565b60006109de82604051806060016040528060248152602001611ca6602491396109d7866109d2610d12565b610ce1565b9190611286565b90506109f2836109ec610d12565b83610d16565b6109fc8383611448565b505050565b6001600160a01b038116600090815260066020526040812061070c90611544565b600754600854600c546001600160a01b03928316939290911691565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106e95780601f106106be576101008083540402835291602001916106e9565b6000610708610aac610d12565b846108e885604051806060016040528060258152602001611d346025913960016000610ad6610d12565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611286565b6000610708610b14610d12565b848461112b565b6008546001600160a01b031681565b83421115610b7f576040805162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e65000000604482015290519081900360640190fd5b6001600160a01b03871660009081526006602052604081207f000000000000000000000000000000000000000000000000000000000000000090899089908990610bc890611544565b8960405160200180878152602001866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200182815260200196505050505050506040516020818303038152906040528051906020012090506000610c3182611548565b90506000610c4182878787611594565b9050896001600160a01b0316816001600160a01b031614610ca9576040805162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e61747572650000604482015290519081900360640190fd5b6001600160a01b038a166000908152600660205260409020610cca90611709565b610cd58a8a8a610d16565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600c5481565b3390565b6001600160a01b038316610d5b5760405162461bcd60e51b8152600401808060200182810382526024815260200180611d106024913960400191505060405180910390fd5b6001600160a01b038216610da05760405162461bcd60e51b8152600401808060200182810382526022815260200180611bd16022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000831580610e115750600086115b80610e1c5750600085115b610e2257fe5b83610e3857610e318383611712565b9050610ed3565b85610e5157610e3185610e4b8487611729565b90611782565b84610e6457610e3186610e4b8587611729565b6000610e82610e738588611729565b610e7d858a611729565b6117e9565b905060008111610ebf576040805162461bcd60e51b815260206004820152600360248201526243525360e81b604482015290519081900360640190fd5b610ecf86610e4b8981858a611729565b9150505b95945050505050565b6001600160a01b038216610f37576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610f43600083836109fc565b600254610f5090826113e7565b6002556001600160a01b038216600090815260208190526040902054610f7690826113e7565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b03841673c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2148015610ff85750804710155b156110f85773c02aaa39b223fe8d0a0e5c4f27ead9083c756cc26001600160a01b031663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561104c57600080fd5b505af1158015611060573d6000803e3d6000fd5b50506040805163a9059cbb60e01b81526001600160a01b038716600482015260248101869052905173c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2945063a9059cbb9350604480830193506020928290030181600087803b1580156110c657600080fd5b505af11580156110da573d6000803e3d6000fd5b505050506040513d60208110156110f057600080fd5b506111259050565b6001600160a01b038316301415611119576111148483836117f8565b611125565b6111258484848461195b565b50505050565b6001600160a01b0383166111705760405162461bcd60e51b8152600401808060200182810382526025815260200180611ceb6025913960400191505060405180910390fd5b6001600160a01b0382166111b55760405162461bcd60e51b8152600401808060200182810382526023815260200180611b8c6023913960400191505060405180910390fd5b6111c08383836109fc565b6111fd81604051806060016040528060268152602001611bf3602691396001600160a01b0386166000908152602081905260409020549190611286565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461122c90826113e7565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156113155760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156112da5781810151838201526020016112c2565b50505050905090810190601f1680156113075780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60007f0000000000000000000000000000000000000000000000000000000000000000611348611ac8565b141561137557507f00000000000000000000000000000000000000000000000000000000000000006106f1565b6113e07f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000611acc565b90506106f1565b600082820183811015611441576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b03821661148d5760405162461bcd60e51b8152600401808060200182810382526021815260200180611cca6021913960400191505060405180910390fd5b611499826000836109fc565b6114d681604051806060016040528060228152602001611baf602291396001600160a01b0385166000908152602081905260409020549190611286565b6001600160a01b0383166000908152602081905260409020556002546114fc9082611b2e565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b5490565b600061155261131d565b82604051602001808061190160f01b81525060020183815260200182815260200192505050604051602081830303815290604052805190602001209050919050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156115f55760405162461bcd60e51b8152600401808060200182810382526022815260200180611c196022913960400191505060405180910390fd5b8360ff16601b148061160a57508360ff16601c145b6116455760405162461bcd60e51b8152600401808060200182810382526022815260200180611c3b6022913960400191505060405180910390fd5b600060018686868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156116a1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610ed3576040805162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015290519081900360640190fd5b80546001019055565b6000818310156117225781611441565b5090919050565b6000826117385750600061070c565b8282028284828161174557fe5b04146114415760405162461bcd60e51b8152600401808060200182810382526021815260200180611c5d6021913960400191505060405180910390fd5b60008082116117d8576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b8183816117e157fe5b049392505050565b60008183106117225781611441565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b1781529251825160009485949389169392918291908083835b602083106118895780518252601f19909201916020918201910161186a565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146118eb576040519150601f19603f3d011682016040523d82523d6000602084013e6118f0565b606091505b509150915081801561191e57508051158061191e575080806020019051602081101561191b57600080fd5b50515b611954576040805162461bcd60e51b815260206004820152600260248201526114d560f21b604482015290519081900360640190fd5b5050505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166323b872dd60e01b178152925182516000948594938a169392918291908083835b602083106119f45780518252601f1990920191602091820191016119d5565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611a56576040519150601f19603f3d011682016040523d82523d6000602084013e611a5b565b606091505b5091509150818015611a89575080511580611a895750808060200190516020811015611a8657600080fd5b50515b611ac0576040805162461bcd60e51b815260206004820152600360248201526229aa2360e91b604482015290519081900360640190fd5b505050505050565b4690565b6000838383611ad9611ac8565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b03168152602001955050505050506040516020818303038152906040528051906020012090509392505050565b600082821115611b85576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545434453413a20696e76616c6964207369676e6174757265202773272076616c756545434453413a20696e76616c6964207369676e6174757265202776272076616c7565536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7745524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa164736f6c6343000706000a";

type UnipilotVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnipilotVaultConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UnipilotVault__factory extends ContractFactory {
  constructor(...args: UnipilotVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _governance: string,
    _pool: string,
    _strategy: string,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<UnipilotVault> {
    return super.deploy(
      _governance,
      _pool,
      _strategy,
      _name,
      _symbol,
      overrides || {},
    ) as Promise<UnipilotVault>;
  }
  getDeployTransaction(
    _governance: string,
    _pool: string,
    _strategy: string,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(
      _governance,
      _pool,
      _strategy,
      _name,
      _symbol,
      overrides || {},
    );
  }
  attach(address: string): UnipilotVault {
    return super.attach(address) as UnipilotVault;
  }
  connect(signer: Signer): UnipilotVault__factory {
    return super.connect(signer) as UnipilotVault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnipilotVaultInterface {
    return new utils.Interface(_abi) as UnipilotVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): UnipilotVault {
    return new Contract(address, _abi, signerOrProvider) as UnipilotVault;
  }
}
