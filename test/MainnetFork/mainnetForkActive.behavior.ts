const hre = require("hardhat");

import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { MaxUint256 } from "@ethersproject/constants";
import { ethers, waffle } from "hardhat";
import { encodePriceSqrt } from "../utils/encodePriceSqrt";
import {
  UniswapV3Pool,
  NonfungiblePositionManager,
  UnipilotActiveFactory,
  UnipilotActiveVault,
} from "../../typechain";
import ERC20Artifact from "../../artifacts/contracts/test/ERC20.sol/ERC20.json";
import WETH9Artifact from "uniswap-v3-deploy-plugin/src/util/WETH9.json";

// import SwapRouterArtifact from "../utils/MainnetSwapRouterJson/SwapRouter.json";
import SwapRouterArtifact from "../../artifacts/contracts/test/SwapRouter.sol/SwapRouter.json";
import {
  deployActiveFactory,
  deployPassiveFactory,
  deployStrategy,
} from "../stubs";
import { generateFeeThroughSwap } from "../utils/SwapFunction/swapFork";
import { string } from "hardhat/internal/core/params/argumentTypes";

export async function shouldBehaveLikeActiveLive(): Promise<void> {
  const createFixtureLoader = waffle.createFixtureLoader;
  let uniswapV3Factory: Contract;
  let uniswapV3PositionManager: NonfungiblePositionManager;
  let uniswapPool: UniswapV3Pool;
  let uniStrategy: Contract;
  let unipilotFactory: UnipilotActiveFactory;
  let swapRouter: Contract;
  let wbtcUSDC: ContractFactory;
  let wbtcWeth1: ContractFactory;
  let wbtcWeth2: ContractFactory;
  let wethUsdt: ContractFactory;
  let wethUsdc: ContractFactory;
  let wethUsdc500: ContractFactory;

  let wbtcUSDCVault: string;
  let wbtcWethVault1: string;
  let wbtcWethVault2: string;
  let usdcWethVault: string;
  let usdcWethVault500: string;

  let SHIB: Contract;
  let PILOT: Contract;
  let DAI: Contract;
  let WETH: Contract;
  let USDT: Contract;
  let USDC: Contract;
  let WBTC: Contract;
  let daiUsdtUniswapPool: UniswapV3Pool;
  let shibPilotUniswapPool: UniswapV3Pool;
  let unipilotVault1: UnipilotActiveVault; // WBTC-USDC-3000
  let unipilotVault2: UnipilotActiveVault; //WBTC-WETH-500
  let unipilotVault3: UnipilotActiveVault; //WBTC-WETH-3000
  let unipilotVault4: UnipilotActiveVault; //ETH-USDT-3000
  let unipilotVault5: UnipilotActiveVault; //WETH-USDC-3000
  let unipilotVault6: UnipilotActiveVault; //WETH-USDC-500

  let owner: any;

  const encodedPriceWbtcUsdc = encodePriceSqrt(
    parseUnits("1", "8"),
    parseUnits("42244.5", "6"),
  );
  const encodedPriceWbtcWeth = encodePriceSqrt(
    parseUnits("1", "8"),
    parseUnits("14.212", "18"),
  );
  const encodedPrice2 = encodePriceSqrt(1, 3120);

  beforeEach("Fork Begin", async () => {
    await hre.network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.FORK}`,
            blockNumber: 13724774,
          },
        },
      ],
    });
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2"],
    });
    //vitalik 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
    //Hacker 0xB3764761E297D6f121e79C32A65829Cd1dDb4D32
    owner = await ethers.getSigner(
      "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2",
    );

    USDT = await ethers.getContractAt(
      ERC20Artifact.abi,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    );
    WBTC = await ethers.getContractAt(
      ERC20Artifact.abi,
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    );

    USDC = await ethers.getContractAt(
      ERC20Artifact.abi,
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    );

    USDT = await ethers.getContractAt(
      ERC20Artifact.abi,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    );

    WETH = await ethers.getContractAt(
      WETH9Artifact.abi,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    );

    swapRouter = await ethers.getContractAt(
      SwapRouterArtifact.abi,
      "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    );

    uniStrategy = await deployStrategy(owner);

    unipilotFactory = await deployActiveFactory(
      owner,
      "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      owner.address,
      uniStrategy.address,
      owner.address,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      10,
    );

    await uniStrategy.setBaseTicks(
      [
        "0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35", //WBTC-USDC-3000
        "0x4585FE77225b41b697C938B018E2Ac67Ac5a20c0", //WBTC-WETH-500
        "0xCBCdF9626bC03E24f779434178A73a0B4bad62eD", //WBTC-WETH-3000
        "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36", //ETH-USDT-3000
        "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8", //WETH-USDC-3000
        "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640", //WETH-USDC-500
      ],
      [27, 22, 10, 28, 27, 27],
    );

    uniswapPool = (await ethers.getContractAt(
      "UniswapV3Pool",
      "0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35",
    )) as UniswapV3Pool;

    await unipilotFactory
      .connect(owner)
      .createVault(
        WBTC.address,
        USDC.address,
        "3000",
        encodedPriceWbtcUsdc,
        "WBTC-USDC-3000",
        "WBTC-USDC",
      );

    await unipilotFactory
      .connect(owner)
      .createVault(
        WBTC.address,
        WETH.address,
        "500",
        encodedPriceWbtcWeth,
        "WBTC-WETH-500",
        "WBTC-WETH",
      );

    await unipilotFactory
      .connect(owner)
      .createVault(
        WBTC.address,
        WETH.address,
        "3000",
        encodedPriceWbtcWeth,
        "WBTC-WETH-3000",
        "WBTC-WETH",
      );

    await unipilotFactory
      .connect(owner)
      .createVault(
        WETH.address,
        USDT.address,
        "3000",
        encodedPrice2,
        "WETH-USDT-3000",
        "WETH-USDT",
      );

    await unipilotFactory
      .connect(owner)
      .createVault(
        WETH.address,
        USDC.address,
        "3000",
        encodedPrice2,
        "WETH-USDC-3000",
        "WETH-USDC",
      );

    await unipilotFactory
      .connect(owner)
      .createVault(
        WETH.address,
        USDC.address,
        "500",
        encodedPrice2,
        "WETH-USDC-500",
        "WETH-USDC",
      );

    const WethUsdtVault = await unipilotFactory.vaults(
      WETH.address,
      USDT.address,
      "3000",
    );

    wbtcWethVault1 = await unipilotFactory.vaults(
      WBTC.address,
      WETH.address,
      "500",
    );

    wbtcWethVault2 = await unipilotFactory.vaults(
      WBTC.address,
      WETH.address,
      "3000",
    );

    wbtcUSDCVault = await unipilotFactory.vaults(
      WBTC.address,
      USDC.address,
      "3000",
    );

    usdcWethVault = await unipilotFactory.vaults(
      WETH.address,
      USDC.address,
      "3000",
    );

    usdcWethVault500 = await unipilotFactory.vaults(
      WETH.address,
      USDC.address,
      "500",
    );

    wbtcUSDC = await ethers.getContractFactory("UnipilotActiveVault");
    wbtcWeth1 = await ethers.getContractFactory("UnipilotActiveVault");
    wbtcWeth2 = await ethers.getContractFactory("UnipilotActiveVault");
    wethUsdt = await ethers.getContractFactory("UnipilotActiveVault");
    wethUsdc = await ethers.getContractFactory("UnipilotActiveVault");
    wethUsdc500 = await ethers.getContractFactory("UnipilotActiveVault");

    const wethUsdtVaultInstance = await ethers.getContractFactory(
      "UnipilotActiveVault",
    );

    unipilotVault1 = wbtcUSDC.attach(wbtcUSDCVault) as UnipilotActiveVault;
    unipilotVault2 = wbtcWeth1.attach(wbtcWethVault1) as UnipilotActiveVault;
    unipilotVault3 = wbtcWeth2.attach(wbtcWethVault2) as UnipilotActiveVault;
    unipilotVault4 = wethUsdtVaultInstance.attach(
      WethUsdtVault,
    ) as UnipilotActiveVault;
    unipilotVault5 = wethUsdc.attach(usdcWethVault) as UnipilotActiveVault;
    unipilotVault6 = wethUsdc500.attach(
      usdcWethVault500,
    ) as UnipilotActiveVault;

    await unipilotVault1.connect(owner).init();
    await unipilotVault2.connect(owner).init();
    await unipilotVault3.connect(owner).init();
    await unipilotVault4.connect(owner).init();
    await unipilotVault5.connect(owner).init();
    await unipilotVault6.connect(owner).init();

    await WBTC.connect(owner).approve(unipilotVault1.address, MaxUint256);
    await USDC.connect(owner).approve(unipilotVault1.address, MaxUint256);

    await WBTC.connect(owner).approve(unipilotVault2.address, MaxUint256);
    await WETH.connect(owner).approve(unipilotVault2.address, MaxUint256);

    await WBTC.connect(owner).approve(unipilotVault3.address, MaxUint256);
    await WETH.connect(owner).approve(unipilotVault3.address, MaxUint256);

    await WETH.connect(owner).approve(unipilotVault4.address, MaxUint256);
    await USDT.connect(owner).approve(unipilotVault4.address, MaxUint256);

    await USDC.connect(owner).approve(unipilotVault5.address, MaxUint256);

    await USDC.connect(owner).approve(unipilotVault6.address, MaxUint256);

    await WETH.connect(owner).approve(swapRouter.address, MaxUint256);
    await USDC.connect(owner).approve(swapRouter.address, MaxUint256);
    await WBTC.connect(owner).approve(swapRouter.address, MaxUint256);
  });

  it("Mainnet Deployments Test", async () => {
    const walletBalancePrior = await ethers.provider.getBalance(owner.address);
    let wbtc = await WBTC.balanceOf(owner.address);
    console.log("WBTC bal", wbtc);
    console.log("Balance Of signer is: ", walletBalancePrior);

    console.log("uniStrategy", uniStrategy.address);

    console.log("Swap Router", swapRouter.address);

    let ticksData = await unipilotVault1.ticksData();
    console.log(" WBTC-USDC ticksData->", ticksData);

    ticksData = await unipilotVault2.ticksData();
    console.log("WBTC-WETH-500 ticksData->", ticksData);

    ticksData = await unipilotVault3.ticksData();
    console.log("WBTC-WETH-3000 ticksData->", ticksData);

    ticksData = await unipilotVault5.ticksData();
    console.log("WETH-USDC-3000 ticksData->", ticksData);

    console.log("unipilotFactory", unipilotFactory.address);

    console.log("WBTC-USDC-3000", unipilotVault1.address);
    console.log("WBTC-WETH-500", unipilotVault2.address);
    console.log("WBTC-WETH-3000", unipilotVault3.address);
    console.log("USDT-WETH-3000", unipilotVault4.address);
    console.log("WETH-USDC-3000", unipilotVault5.address);
  });

  // it("Should be deposit", async () => {
  //   let tx = await unipilotVault1
  //     .connect(owner)
  //     .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);
  //   console.log("Tx hash", tx.hash);
  //   expect(await unipilotVault1.balanceOf(owner.address)).to.be.gt(0);
  // });
  // it("Should be readjust", async () => {
  //   await unipilotVault1
  //     .connect(owner)
  //     .deposit(parseUnits("1", "8"), parseUnits("20000", "6"), owner.address);

  //   let tx = await unipilotVault1.connect(owner).readjustLiquidity();
  //   console.log("Tx hash", tx.hash);
  // });

  // it("Should be withdraw", async () => {
  //   await unipilotVault1
  //     .connect(owner)
  //     .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);
  //   let liquidity = await unipilotVault1.balanceOf(owner.address);
  //   console.log(liquidity);

  //   let tx = await unipilotVault1
  //     .connect(owner)
  //     .withdraw(liquidity, owner.address, false);
  //   console.log("Tx hash", tx.hash);
  //   expect(await unipilotVault1.balanceOf(owner.address)).to.be.equal(0);
  // });

  // // it("Should Readjust after pull liquidity", async () => {
  // //   await unipilotVault1
  // //     .connect(owner)
  // //     .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);
  // //     await unipilotVault1
  // //     .connect(owner)
  // //     .deposit(parseUnits("0.5", "8"), parseUnits("1500", "6"), owner.address);
  // //     await unipilotVault1
  // //     .connect(owner)
  // //     .deposit(parseUnits("10", "8"), parseUnits("100", "6"), owner.address);
  // //   let liquidity = await unipilotVault1.balanceOf(owner.address);
  // //   console.log("LP Balance ", liquidity);

  // //   await unipilotVault1.connect(owner).pullLiquidity(owner.address);

  // //   let positionDetails = await unipilotVault1.callStatic.getPositionDetails();

  // //   let reserveBeforeReAdjust =
  // //     positionDetails[0].gte(parseUnits("0", "6")) &&
  // //     positionDetails[0].lte(parseUnits("1", "6"));

  // //   await unipilotVault1.connect(owner).readjustLiquidity();

  // //   // positionDetails = await unipilotVault1.callStatic.getPositionDetails();

  // //   // let reserveAfterReAdjust = positionDetails[0].gte(parseUnits("14", "6"));
  // //   // expect(reserveBeforeReAdjust && reserveAfterReAdjust).to.be.true;
  // // });

  // it("WBTC-USDC-3000: Pool should out of range then earn fees after rebalance ", async () => {
  //   await unipilotVault1
  //     .connect(owner)
  //     .deposit(parseUnits("0.1", "8"), parseUnits("10", "6"), owner.address);
  //   let liquidity = await unipilotVault1.balanceOf(owner.address);
  //   console.log("LP balance of user is : ", liquidity);

  //   console.log("Balance before Swaps", {
  //     USDC: await USDC.balanceOf(owner.address),
  //     WBTC: await WBTC.balanceOf(owner.address),
  //   });

  //   await generateFeeThroughSwap(
  //     swapRouter,
  //     owner,
  //     USDC,
  //     WBTC,
  //     (600000).toString(),
  //     3000,
  //   );

  //   let FeesBeforeSwap = { fees0: "", fees1: "" };
  //   let FeesAfterSwap = { fees0: "", fees1: "" };
  //   for (let i = 0; i < 10; i++) {
  //     await generateFeeThroughSwap(
  //       swapRouter,
  //       owner,
  //       WBTC,
  //       USDC,
  //       (5).toString(),
  //       3000,
  //     );
  //     let PositionDetails =
  //       await unipilotVault1.callStatic.getPositionDetails();
  //     let obj = {
  //       fees0: PositionDetails.fees0.toString(),
  //       fees1: PositionDetails.fees1.toString(),
  //     };
  //     console.log(`***On the swap of ${i + 1} fees are`, obj);
  //     if (obj.fees0 === "0" || obj.fees0 === "15105") {
  //       FeesBeforeSwap = obj;
  //       console.log(
  //         "******** Pool is out of range, so rebalance using fee1 ********",
  //       );
  //       await unipilotVault1.connect(owner).readjustLiquidity();
  //       console.log("Swap USDC to WBTC ");

  //       await generateFeeThroughSwap(
  //         swapRouter,
  //         owner,
  //         USDC,
  //         WBTC,
  //         (100).toString(),
  //         3000,
  //       );
  //     }
  //     FeesAfterSwap = obj;
  //   }

  //   console.log("Balance After Swaps", {
  //     USDC: await USDC.balanceOf(owner.address),
  //     WBTC: await WBTC.balanceOf(owner.address),
  //   });

  //   let status =
  //     FeesBeforeSwap.fees0 > FeesAfterSwap.fees0 &&
  //     FeesBeforeSwap.fees1 > FeesAfterSwap.fees1;
  //   expect(status).to.be.true;
  // });

  // it("WBTC-WETH-500: Pool should out of range then earn fees after rebalance ", async () => {
  //   await generateFeeThroughSwap(
  //     swapRouter,
  //     owner,
  //     WBTC,
  //     WETH,
  //     (10).toString(),
  //     500,
  //   );
  //   await unipilotVault2
  //     .connect(owner)
  //     .deposit(parseUnits("0.1", "8"), parseUnits("10", "18"), owner.address, {
  //       value: parseUnits("10", "18"),
  //     });
  //   let liquidity = await unipilotVault2.balanceOf(owner.address);
  //   console.log("liquidity", liquidity);

  //   console.log("WETH Balance ", await WETH.balanceOf(owner.address));

  //   await unipilotVault2.connect(owner).readjustLiquidity();

  //   for (let i = 0; i < 7; i++) {
  //     await unipilotVault2
  //       .connect(owner)
  //       .deposit(
  //         parseUnits("0.3", "8"),
  //         parseUnits((i + 1).toString(), "18"),
  //         owner.address,
  //         {
  //           value: parseUnits(i.toString(), "18"),
  //         },
  //       );
  //   }

  //   await generateFeeThroughSwap(
  //     swapRouter,
  //     owner,
  //     WBTC,
  //     WETH,
  //     (40).toString(),
  //     500,
  //   );
  //   let PositionDetails = await unipilotVault2.callStatic.getPositionDetails();
  //   let obj = {
  //     fees0: PositionDetails.fees0.toString(),
  //     fees1: PositionDetails.fees1.toString(),
  //   };
  //   console.log(obj);

  //   console.log("Pool is out of range now");

  //   await unipilotVault2.connect(owner).readjustLiquidity();

  //   await unipilotVault2.connect(owner).pullLiquidity(owner.address);

  //   await unipilotVault2
  //     .connect(owner)
  //     .withdraw(
  //       await unipilotVault2.balanceOf(owner.address),
  //       owner.address,
  //       false,
  //     );

  //   let amounts = {
  //     amount0: await WBTC.balanceOf(owner.address),
  //     amount1: await WETH.balanceOf(owner.address),
  //   };

  //   console.log("Amounts", amounts);

  //   let status =
  //     amounts.amount0 >= parseUnits("2659.17297488", "8") &&
  //     amounts.amount1 >= parseUnits("623.040697040711721106", "18");

  //   expect(status).to.be.true;
  // });

  // it("WBTC-WETH-3000: Pool should out of range then earn fees after rebalance ", async () => {
  //   await generateFeeThroughSwap(
  //     swapRouter,
  //     owner,
  //     WBTC,
  //     WETH,
  //     (10).toString(),
  //     3000,
  //   );
  //   await unipilotVault3
  //     .connect(owner)
  //     .deposit(parseUnits("0.1", "8"), parseUnits("10", "18"), owner.address, {
  //       value: parseUnits("10", "18"),
  //     });
  //   let liquidity = await unipilotVault3.balanceOf(owner.address);
  //   console.log("liquidity", liquidity);

  //   console.log("WETH Balance ", await WETH.balanceOf(owner.address));

  //   await unipilotVault3.connect(owner).readjustLiquidity();

  //   for (let i = 0; i < 7; i++) {
  //     await unipilotVault3
  //       .connect(owner)
  //       .deposit(
  //         parseUnits("0.3", "8"),
  //         parseUnits((i + 1).toString(), "18"),
  //         owner.address,
  //         {
  //           value: parseUnits(i.toString(), "18"),
  //         },
  //       );
  //   }

  //   await generateFeeThroughSwap(
  //     swapRouter,
  //     owner,
  //     WBTC,
  //     WETH,
  //     (100).toString(),
  //     3000,
  //   );
  //   let PositionDetails = await unipilotVault3.callStatic.getPositionDetails();
  //   let obj = {
  //     fees0: PositionDetails.fees0.toString(),
  //     fees1: PositionDetails.fees1.toString(),
  //   };
  //   console.log(obj);
  //   // await generateFeeETHThroughSwap(
  //   //   swapRouter,
  //   //   owner,
  //   //   WBTC,
  //   //   WETH,
  //   //   (1).toString(),
  //   //   3000,
  //   // );
  //   // PositionDetails = await unipilotVault3.callStatic.getPositionDetails();
  //   // obj = {
  //   //   fees0: PositionDetails.fees0.toString(),
  //   //   fees1: PositionDetails.fees1.toString(),
  //   // };
  //   // console.log(obj);

  //   console.log("Pool is out of range now");

  //   await unipilotVault3.connect(owner).readjustLiquidity();

  //   await unipilotVault3.connect(owner).pullLiquidity(owner.address);

  //   await unipilotVault3
  //     .connect(owner)
  //     .withdraw(
  //       await unipilotVault3.balanceOf(owner.address),
  //       owner.address,
  //       false,
  //     );

  //   let amounts = {
  //     amount0: await WBTC.balanceOf(owner.address),
  //     amount1: await WETH.balanceOf(owner.address),
  //   };

  //   console.log("Amounts", amounts);

  //   let status =
  //     amounts.amount0 >= parseUnits("2599.97262993", "8") &&
  //     amounts.amount1 >= parseUnits("1346.820502673353853014", "18");

  //   expect(status).to.be.true;
  // });

  // it("ETH-USDT-3000: All tests of ETH/USDT", async () => {
  //   // set the initial ratio of vault equal to uniswap pool
  //   await unipilotVault4
  //     .connect(owner)
  //     .deposit(parseUnits("1", "18"), parseUnits("3112", "6"), owner.address, {
  //       value: parseUnits("1", "18"),
  //     });

  //   // verify liquidity should be added in uniswap
  //   var reserves = await unipilotVault4.callStatic.getPositionDetails();
  //   // console.log("res before-> ", reserves);

  //   // readjust the liquidity to consume all amount of vault
  //   await unipilotVault4.connect(owner).readjustLiquidity();
  //   // var reserves = await unipilotVault4.callStatic.getPositionDetails();

  //   // fetch new account for adding liquidity in Unipilot
  //   const [user0, user1, user2, user3, user4] = waffle.provider.getWallets();

  //   // send amount0 & amount1 from existing account to new accounts
  //   await owner.sendTransaction({
  //     to: user0.address,
  //     value: parseUnits("1", "18"),
  //   });

  //   await owner.sendTransaction({
  //     to: user1.address,
  //     value: parseUnits("1", "18"),
  //   });

  //   await owner.sendTransaction({
  //     to: user2.address,
  //     value: parseUnits("5", "18"),
  //   });

  //   await owner.sendTransaction({
  //     to: user3.address,
  //     value: parseUnits("10", "18"),
  //   });

  //   await owner.sendTransaction({
  //     to: user4.address,
  //     value: parseUnits("16", "18"),
  //   });

  //   await USDT.connect(owner).transfer(user0.address, parseUnits("5000", "6"));
  //   await USDT.connect(owner).transfer(user1.address, parseUnits("6000", "6"));
  //   await USDT.connect(owner).transfer(user2.address, parseUnits("8000", "6"));
  //   await USDT.connect(owner).transfer(user3.address, parseUnits("11000", "6"));
  //   await USDT.connect(owner).transfer(user4.address, parseUnits("19000", "6"));

  //   await USDT.connect(user0).approve(unipilotVault4.address, MaxUint256);
  //   await USDT.connect(user1).approve(unipilotVault4.address, MaxUint256);
  //   await USDT.connect(user2).approve(unipilotVault4.address, MaxUint256);
  //   await USDT.connect(user3).approve(unipilotVault4.address, MaxUint256);
  //   await USDT.connect(user4).approve(unipilotVault4.address, MaxUint256);

  //   // now add liquidity from all new accounts
  //   await unipilotVault4
  //     .connect(user0)
  //     .deposit(parseUnits("1", "18"), parseUnits("3112", "6"), user0.address, {
  //       value: parseUnits("1", "18"),
  //     });

  //   await unipilotVault4
  //     .connect(user1)
  //     .deposit(parseUnits("1", "18"), parseUnits("6000", "6"), user1.address, {
  //       value: parseUnits("1", "18"),
  //     });

  //   await unipilotVault4
  //     .connect(user2)
  //     .deposit(parseUnits("5", "18"), parseUnits("8000", "6"), user2.address, {
  //       value: parseUnits("5", "18"),
  //     });

  //   await unipilotVault4
  //     .connect(user3)
  //     .deposit(
  //       parseUnits("10", "18"),
  //       parseUnits("11000", "6"),
  //       user3.address,
  //       {
  //         value: parseUnits("10", "18"),
  //       },
  //     );

  //   await unipilotVault4
  //     .connect(user4)
  //     .deposit(
  //       parseUnits("16", "18"),
  //       parseUnits("19000", "6"),
  //       user4.address,
  //       {
  //         value: parseUnits("16", "18"),
  //       },
  //     );

  //   // await unipilotVault4.connect(owner).readjustLiquidity();
  //   // owner dosent has WETH so we just swapped it from other pool
  //   await generateFeeThroughSwap(
  //     swapRouter,
  //     owner,
  //     USDC,
  //     WETH,
  //     "5000000",
  //     3000,
  //   );

  //   // now swap to get the pool out of range
  //   await generateFeeThroughSwap(swapRouter, owner, WETH, USDT, "900", 3000);

  //   // now pool is out of range so run readjustLiquidity to get both amounts in pool
  //   await unipilotVault4.connect(owner).readjustLiquidity();

  //   // pull liquidity and check uniswap reserves are empty now
  //   await unipilotVault4.connect(owner).pullLiquidity(unipilotVault4.address);

  //   // push all liquidity to uniswap again
  //   await unipilotVault4.connect(owner).readjustLiquidity();

  //   // withdraw all liquidity of existing users
  //   const ownerLp = await unipilotVault4.balanceOf(owner.address);

  //   const user0Lp = await unipilotVault4.balanceOf(user0.address);
  //   const user1Lp = await unipilotVault4.balanceOf(user1.address);
  //   const user2Lp = await unipilotVault4.balanceOf(user2.address);
  //   const user3Lp = await unipilotVault4.balanceOf(user3.address);
  //   const user4Lp = await unipilotVault4.balanceOf(user4.address);

  //   await unipilotVault4.connect(user4).withdraw(user4Lp, user4.address, false);
  //   await unipilotVault4.connect(user3).withdraw(user3Lp, user3.address, true);
  //   await unipilotVault4.connect(user2).withdraw(user2Lp, user2.address, false);
  //   await unipilotVault4.connect(user1).withdraw(user1Lp, user1.address, true);
  //   await unipilotVault4.connect(user0).withdraw(user0Lp, user0.address, true);
  //   await unipilotVault4.connect(owner).withdraw(ownerLp, owner.address, true);

  //   reserves = await unipilotVault4.callStatic.getPositionDetails();

  //   console.log("res after-> ", reserves);
  //   console.log("Balance WETH", {
  //     WETH: await WETH.balanceOf(unipilotVault4.address),
  //   });
  //   console.log("Balance USDT", {
  //     USDT: await USDT.balanceOf(unipilotVault4.address),
  //   });
  // });

  it("Should deposit in WETH USDC 3000 vault", async () => {
    let tx = await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("20000", "6"),
        parseUnits("10", "18"),
        owner.address,
        {
          value: parseUnits("10", "18"),
        },
      );

    let positionDetails = await unipilotVault5.callStatic.getPositionDetails();
    console.log("positionDetails", positionDetails);

    let tick = await unipilotVault5.ticksData();

    console.log("TICKS", tick);

    console.log(await unipilotVault5.callStatic.getCurrentTick());

    await unipilotVault5.connect(owner).readjustLiquidity();

    await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault5
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await generateFeeThroughSwap(swapRouter, owner, USDC, WETH, "120000", 3000);

    await unipilotVault5.connect(owner).readjustLiquidity();

    let usdcBalanceBeforePull = await USDC.balanceOf(unipilotVault5.address);
    let wethBalanceBeforePull = await WETH.balanceOf(unipilotVault5.address);

    console.log("usdcBalanceBeforePull", usdcBalanceBeforePull);
    console.log("wethBalanceBeforePull", wethBalanceBeforePull);

    await unipilotVault5.connect(owner).pullLiquidity(unipilotVault5.address);

    positionDetails = await unipilotVault5.callStatic.getPositionDetails();
    console.log("positionDetails", positionDetails);

    let usdcBalanceAfterPull = await USDC.balanceOf(unipilotVault5.address);
    let wethBalanceAfterPull = await WETH.balanceOf(unipilotVault5.address);

    console.log("usdcBalanceAfterPull", usdcBalanceAfterPull);
    console.log("wethBalanceAfterPull", wethBalanceAfterPull);

    expect(usdcBalanceAfterPull).to.be.gt(usdcBalanceBeforePull);
    expect(wethBalanceAfterPull).to.be.gt(wethBalanceBeforePull);

    await unipilotVault5.connect(owner).readjustLiquidity();

    const usdtBalance = await USDC.balanceOf(unipilotVault5.address);
    const wethBalance = await WETH.balanceOf(unipilotVault5.address);
    console.log("usdtBalance after readjust", usdtBalance);

    positionDetails = await unipilotVault5.callStatic.getPositionDetails();

    console.log("positionDetails", positionDetails);

    tick = await unipilotVault5.ticksData();
    console.log("TICKS", tick);

    console.log(await unipilotVault5.callStatic.getCurrentTick());

    const usdtBalanceOnPosition = positionDetails[0];
    const wethBalanceOnPosition = positionDetails[1];

    const totalBalanceEarningInVaultUSDT = usdtBalance.add(
      usdtBalanceOnPosition,
    );

    const totalBalanceEarningInVaultWETH = wethBalance.add(
      wethBalanceOnPosition,
    );

    console.log(
      "totalBalanceEarningInVaultUSDT",
      totalBalanceEarningInVaultUSDT,
    );
    console.log(
      "totalBalanceEarningInVaultWETH",
      totalBalanceEarningInVaultWETH,
    );

    expect(totalBalanceEarningInVaultUSDT).to.be.gt(parseUnits("26000", "6"));

    const liquidity = await unipilotVault5.balanceOf(owner.address);

    // await unipilotVault5
    //   .connect(owner)
    //   .withdraw(liquidity, owner.address, false);
  });

  it("Should deposit in WETH USDC 500 vault", async () => {
    let tx = await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("20000", "6"),
        parseUnits("10", "18"),
        owner.address,
        {
          value: parseUnits("10", "18"),
        },
      );

    let positionDetails = await unipilotVault6.callStatic.getPositionDetails();
    console.log("positionDetails", positionDetails);

    await unipilotVault6.connect(owner).readjustLiquidity();

    await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await unipilotVault6
      .connect(owner)
      .deposit(
        parseUnits("1000", "6"),
        parseUnits("0.3", "18"),
        owner.address,
        {
          value: parseUnits("0.3", "18"),
        },
      );

    await generateFeeThroughSwap(swapRouter, owner, USDC, WETH, "120000", 3000);

    positionDetails = await unipilotVault6.callStatic.getPositionDetails();
    console.log("positionDetails", positionDetails);

    await unipilotVault6.connect(owner).readjustLiquidity();

    positionDetails = await unipilotVault6.callStatic.getPositionDetails();
    console.log("positionDetails", positionDetails);

    let usdcBalanceBeforePull = await USDC.balanceOf(unipilotVault6.address);
    let wethBalanceBeforePull = await WETH.balanceOf(unipilotVault6.address);

    console.log("usdcBalanceBeforePull", usdcBalanceBeforePull);
    console.log("wethBalanceBeforePull", wethBalanceBeforePull);

    await unipilotVault6.connect(owner).pullLiquidity(unipilotVault6.address);

    positionDetails = await unipilotVault6.callStatic.getPositionDetails();
    console.log("positionDetails", positionDetails);

    let usdcBalanceAfterPull = await USDC.balanceOf(unipilotVault6.address);
    let wethBalanceAfterPull = await WETH.balanceOf(unipilotVault6.address);

    console.log("usdcBalanceAfterPull", usdcBalanceAfterPull);
    console.log("wethBalanceAfterPull", wethBalanceAfterPull);

    expect(usdcBalanceAfterPull).to.be.gt(usdcBalanceBeforePull);
    expect(wethBalanceAfterPull).to.be.gt(wethBalanceBeforePull);

    await unipilotVault6.connect(owner).readjustLiquidity();

    const liquidity = await unipilotVault6.balanceOf(owner.address);

    // await unipilotVault6
    //   .connect(owner)
    //   .withdraw(liquidity, owner.address, false);
  });
}
