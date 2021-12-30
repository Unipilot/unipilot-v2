/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IUnipilotFactory,
  IUnipilotFactoryInterface,
} from "../IUnipilotFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_oldGovernance",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_newGovernance",
        type: "address",
      },
    ],
    name: "GovernanceChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
    ],
    name: "VaultCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "_fee",
        type: "uint24",
      },
      {
        internalType: "uint160",
        name: "_sqrtPriceX96",
        type: "uint160",
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
    name: "createVault",
    outputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "_fee",
        type: "uint24",
      },
    ],
    name: "getVaults",
    outputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
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
        name: "_newGovernance",
        type: "address",
      },
    ],
    name: "setGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IUnipilotFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IUnipilotFactoryInterface {
    return new utils.Interface(_abi) as IUnipilotFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IUnipilotFactory {
    return new Contract(address, _abi, signerOrProvider) as IUnipilotFactory;
  }
}
