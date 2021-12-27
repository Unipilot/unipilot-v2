/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IUnipilotFactoryInterface extends ethers.utils.Interface {
  functions: {
    "createVault(address,address,uint24,uint160,string,string)": FunctionFragment;
    "getVaults(address,address,uint24)": FunctionFragment;
    "governance()": FunctionFragment;
    "setGovernance(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createVault",
    values: [string, string, BigNumberish, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getVaults",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setGovernance",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "createVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVaults", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGovernance",
    data: BytesLike
  ): Result;

  events: {
    "GovernanceChanged(address,address)": EventFragment;
    "VaultCreated(address,address,uint24)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GovernanceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VaultCreated"): EventFragment;
}

export type GovernanceChangedEvent = TypedEvent<
  [string, string] & { _oldGovernance: string; _newGovernance: string }
>;

export type VaultCreatedEvent = TypedEvent<
  [string, string, number] & { _tokenA: string; _tokenB: string; fee: number }
>;

export class IUnipilotFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IUnipilotFactoryInterface;

  functions: {
    createVault(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      _sqrtPriceX96: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getVaults(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { _vault: string }>;

    governance(overrides?: CallOverrides): Promise<[string]>;

    setGovernance(
      _newGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createVault(
    _tokenA: string,
    _tokenB: string,
    _fee: BigNumberish,
    _sqrtPriceX96: BigNumberish,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getVaults(
    _tokenA: string,
    _tokenB: string,
    _fee: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  governance(overrides?: CallOverrides): Promise<string>;

  setGovernance(
    _newGovernance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createVault(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      _sqrtPriceX96: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getVaults(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    governance(overrides?: CallOverrides): Promise<string>;

    setGovernance(
      _newGovernance: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "GovernanceChanged(address,address)"(
      _oldGovernance?: string | null,
      _newGovernance?: string | null
    ): TypedEventFilter<
      [string, string],
      { _oldGovernance: string; _newGovernance: string }
    >;

    GovernanceChanged(
      _oldGovernance?: string | null,
      _newGovernance?: string | null
    ): TypedEventFilter<
      [string, string],
      { _oldGovernance: string; _newGovernance: string }
    >;

    "VaultCreated(address,address,uint24)"(
      _tokenA?: string | null,
      _tokenB?: string | null,
      fee?: null
    ): TypedEventFilter<
      [string, string, number],
      { _tokenA: string; _tokenB: string; fee: number }
    >;

    VaultCreated(
      _tokenA?: string | null,
      _tokenB?: string | null,
      fee?: null
    ): TypedEventFilter<
      [string, string, number],
      { _tokenA: string; _tokenB: string; fee: number }
    >;
  };

  estimateGas: {
    createVault(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      _sqrtPriceX96: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getVaults(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<BigNumber>;

    setGovernance(
      _newGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createVault(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      _sqrtPriceX96: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getVaults(
      _tokenA: string,
      _tokenB: string,
      _fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setGovernance(
      _newGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
