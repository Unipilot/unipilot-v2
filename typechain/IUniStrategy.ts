/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type PoolStrategyStruct = {
  baseThreshold: BigNumberish;
  rangeThreshold: BigNumberish;
  maxTwapDeviation: BigNumberish;
  readjustThreshold: BigNumberish;
  twapDuration: BigNumberish;
};

export type PoolStrategyStructOutput = [
  number,
  number,
  number,
  number,
  number,
] & {
  baseThreshold: number;
  rangeThreshold: number;
  maxTwapDeviation: number;
  readjustThreshold: number;
  twapDuration: number;
};

export interface IUniStrategyInterface extends utils.Interface {
  functions: {
    "getReadjustThreshold(address)": FunctionFragment;
    "getStrategy(address)": FunctionFragment;
    "getTicks(address)": FunctionFragment;
    "getTwap(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getReadjustThreshold",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "getStrategy", values: [string]): string;
  encodeFunctionData(functionFragment: "getTicks", values: [string]): string;
  encodeFunctionData(functionFragment: "getTwap", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getReadjustThreshold",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStrategy",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getTicks", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTwap", data: BytesLike): Result;

  events: {
    "BaseTicksUpdated(int24,int24)": EventFragment;
    "GovernanceUpdated(address,address)": EventFragment;
    "MaxTwapDeviationUpdated(int24,int24)": EventFragment;
    "RangeTicksUpdated(int24,int24)": EventFragment;
    "ReadjustMultiplierUpdated(int24,int24)": EventFragment;
    "StrategyUpdated(tuple,tuple)": EventFragment;
    "TwapDurationUpdated(uint32,uint32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BaseTicksUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GovernanceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MaxTwapDeviationUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RangeTicksUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReadjustMultiplierUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TwapDurationUpdated"): EventFragment;
}

export type BaseTicksUpdatedEvent = TypedEvent<
  [number, number],
  { oldBaseTicks: number; newBaseTicks: number }
>;

export type BaseTicksUpdatedEventFilter =
  TypedEventFilter<BaseTicksUpdatedEvent>;

export type GovernanceUpdatedEvent = TypedEvent<
  [string, string],
  { oldGovernance: string; newGovernance: string }
>;

export type GovernanceUpdatedEventFilter =
  TypedEventFilter<GovernanceUpdatedEvent>;

export type MaxTwapDeviationUpdatedEvent = TypedEvent<
  [number, number],
  { oldDeviation: number; newDeviation: number }
>;

export type MaxTwapDeviationUpdatedEventFilter =
  TypedEventFilter<MaxTwapDeviationUpdatedEvent>;

export type RangeTicksUpdatedEvent = TypedEvent<
  [number, number],
  { oldRangeTicks: number; newRangeTicks: number }
>;

export type RangeTicksUpdatedEventFilter =
  TypedEventFilter<RangeTicksUpdatedEvent>;

export type ReadjustMultiplierUpdatedEvent = TypedEvent<
  [number, number],
  { oldMultiplier: number; newMultiplier: number }
>;

export type ReadjustMultiplierUpdatedEventFilter =
  TypedEventFilter<ReadjustMultiplierUpdatedEvent>;

export type StrategyUpdatedEvent = TypedEvent<
  [PoolStrategyStructOutput, PoolStrategyStructOutput],
  {
    oldStrategy: PoolStrategyStructOutput;
    newStrategy: PoolStrategyStructOutput;
  }
>;

export type StrategyUpdatedEventFilter = TypedEventFilter<StrategyUpdatedEvent>;

export type TwapDurationUpdatedEvent = TypedEvent<
  [number, number],
  { oldDuration: number; newDuration: number }
>;

export type TwapDurationUpdatedEventFilter =
  TypedEventFilter<TwapDurationUpdatedEvent>;

export interface IUniStrategy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IUniStrategyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getReadjustThreshold(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<[number] & { readjustThreshold: number }>;

    getStrategy(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<
      [PoolStrategyStructOutput] & { strategy: PoolStrategyStructOutput }
    >;

    getTicks(
      _pool: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    getTwap(_pool: string, overrides?: CallOverrides): Promise<[number]>;
  };

  getReadjustThreshold(
    _pool: string,
    overrides?: CallOverrides,
  ): Promise<number>;

  getStrategy(
    _pool: string,
    overrides?: CallOverrides,
  ): Promise<PoolStrategyStructOutput>;

  getTicks(
    _pool: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  getTwap(_pool: string, overrides?: CallOverrides): Promise<number>;

  callStatic: {
    getReadjustThreshold(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<number>;

    getStrategy(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<PoolStrategyStructOutput>;

    getTicks(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<
      [number, number, number, number, number, number] & {
        baseLower: number;
        baseUpper: number;
        bidLower: number;
        bidUpper: number;
        askLower: number;
        askUpper: number;
      }
    >;

    getTwap(_pool: string, overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    "BaseTicksUpdated(int24,int24)"(
      oldBaseTicks?: null,
      newBaseTicks?: null,
    ): BaseTicksUpdatedEventFilter;
    BaseTicksUpdated(
      oldBaseTicks?: null,
      newBaseTicks?: null,
    ): BaseTicksUpdatedEventFilter;

    "GovernanceUpdated(address,address)"(
      oldGovernance?: null,
      newGovernance?: null,
    ): GovernanceUpdatedEventFilter;
    GovernanceUpdated(
      oldGovernance?: null,
      newGovernance?: null,
    ): GovernanceUpdatedEventFilter;

    "MaxTwapDeviationUpdated(int24,int24)"(
      oldDeviation?: null,
      newDeviation?: null,
    ): MaxTwapDeviationUpdatedEventFilter;
    MaxTwapDeviationUpdated(
      oldDeviation?: null,
      newDeviation?: null,
    ): MaxTwapDeviationUpdatedEventFilter;

    "RangeTicksUpdated(int24,int24)"(
      oldRangeTicks?: null,
      newRangeTicks?: null,
    ): RangeTicksUpdatedEventFilter;
    RangeTicksUpdated(
      oldRangeTicks?: null,
      newRangeTicks?: null,
    ): RangeTicksUpdatedEventFilter;

    "ReadjustMultiplierUpdated(int24,int24)"(
      oldMultiplier?: null,
      newMultiplier?: null,
    ): ReadjustMultiplierUpdatedEventFilter;
    ReadjustMultiplierUpdated(
      oldMultiplier?: null,
      newMultiplier?: null,
    ): ReadjustMultiplierUpdatedEventFilter;

    "StrategyUpdated(tuple,tuple)"(
      oldStrategy?: null,
      newStrategy?: null,
    ): StrategyUpdatedEventFilter;
    StrategyUpdated(
      oldStrategy?: null,
      newStrategy?: null,
    ): StrategyUpdatedEventFilter;

    "TwapDurationUpdated(uint32,uint32)"(
      oldDuration?: null,
      newDuration?: null,
    ): TwapDurationUpdatedEventFilter;
    TwapDurationUpdated(
      oldDuration?: null,
      newDuration?: null,
    ): TwapDurationUpdatedEventFilter;
  };

  estimateGas: {
    getReadjustThreshold(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getStrategy(_pool: string, overrides?: CallOverrides): Promise<BigNumber>;

    getTicks(
      _pool: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    getTwap(_pool: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getReadjustThreshold(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getStrategy(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getTicks(
      _pool: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    getTwap(
      _pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
