const hre = require("hardhat");

import { expect } from "chai";
import { Contract, ContractFactory, Wallet } from "ethers";
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
import { generateFeeThroughSwap } from "../utils/SwapFunction/swap";
import { string } from "hardhat/internal/core/params/argumentTypes";

export async function shouldBehaveLikeActiveLive(): Promise<void> {
  const createFixtureLoader = waffle.createFixtureLoader;
  let uniswapV3Factory: Contract;
  let uniswapV3PositionManager: NonfungiblePositionManager;
  let uniswapPool: UniswapV3Pool;
  let uniStrategy: Contract;
  let unipilotFactory: UnipilotActiveFactory;
  let swapRouter: Contract;
  // let unipilotVault: UnipilotActiveVault;
  // let shibPilotVault: UnipilotActiveVault;
  let wbtcUSDC: ContractFactory;
  let unipilotVault: UnipilotActiveVault;
  let unipilotVault2: UnipilotActiveVault;
  let wbtcUSDCVault: string;
  let SHIB: Contract;
  let PILOT: Contract;
  let DAI: Contract;
  let WETH: Contract;
  let USDT: Contract;
  let USDC: Contract;
  let WBTC: Contract;
  let daiUsdtUniswapPool: UniswapV3Pool;
  let shibPilotUniswapPool: UniswapV3Pool;
  let owner: any;

  const encodedPrice = encodePriceSqrt(
    parseUnits("1", "8"),
    parseUnits("42244.5", "6"),
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

    swapRouter = await ethers.getContractAt(
      SwapRouterArtifact.abi,
      "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    );

    WETH = await ethers.getContractAt(
      WETH9Artifact.abi,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
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
        "0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35",
        "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36",
      ],
      [1800, 28],
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
        encodedPrice,
        "WBTC-USDC-3000",
        "WBTC-USDC",
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

    wbtcUSDCVault = await unipilotFactory.vaults(
      WBTC.address,
      USDC.address,
      "3000",
    );

    const WethUsdtVault = await unipilotFactory.vaults(
      WETH.address,
      USDT.address,
      "3000",
    );

    wbtcUSDC = await ethers.getContractFactory("UnipilotActiveVault");
    const wethUsdtVaultInstance = await ethers.getContractFactory(
      "UnipilotActiveVault",
    );

    unipilotVault = wbtcUSDC.attach(wbtcUSDCVault) as UnipilotActiveVault;
    unipilotVault2 = wethUsdtVaultInstance.attach(
      WethUsdtVault,
    ) as UnipilotActiveVault;

    await unipilotVault.connect(owner).init();
    await unipilotVault2.connect(owner).init();

    await WBTC.connect(owner).approve(unipilotVault.address, MaxUint256);
    await USDC.connect(owner).approve(unipilotVault.address, MaxUint256);
    await WBTC.connect(owner).approve(swapRouter.address, MaxUint256);
    await USDC.connect(owner).approve(swapRouter.address, MaxUint256);

    await WETH.connect(owner).approve(swapRouter.address, MaxUint256);
    await USDT.connect(owner).approve(swapRouter.address, MaxUint256);

    await WETH.connect(owner).approve(unipilotVault2.address, MaxUint256);
    await USDT.connect(owner).approve(unipilotVault2.address, MaxUint256);
    // await generateFeeThroughSwap(swapRouter, owner, DAI, WETH, "100");
  });

  it("Mainnet Deployments Test", async () => {
    const walletBalancePrior = await ethers.provider.getBalance(owner.address);
    let wbtc = await WBTC.balanceOf(owner.address);
    console.log("WBTC bal", wbtc);
    console.log("Balance Of signer is: ", walletBalancePrior);

    console.log("uniStrategy", uniStrategy.address);

    console.log("Swap Router", swapRouter.address);

    let ticksData = await unipilotVault.ticksData();
    console.log("ticksData", ticksData);

    console.log("unipilotFactory", unipilotFactory.address);

    console.log("wbtcUSDC vault", wbtcUSDCVault);
  });
  it("Should be deposit", async () => {
    let tx = await unipilotVault
      .connect(owner)
      .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);
    console.log("Tx hash", tx.hash);
    expect(await unipilotVault.balanceOf(owner.address)).to.be.gt(0);
  });
  it("Should be readjust", async () => {
    await unipilotVault
      .connect(owner)
      .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);

    let tx = await unipilotVault.connect(owner).readjustLiquidity();
    console.log("Tx hash", tx.hash);
  });

  it("Should be withdraw", async () => {
    await unipilotVault
      .connect(owner)
      .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);
    let liquidity = await unipilotVault.balanceOf(owner.address);
    console.log(liquidity);

    let tx = await unipilotVault
      .connect(owner)
      .withdraw(liquidity, owner.address, false);
    console.log("Tx hash", tx.hash);
    expect(await unipilotVault.balanceOf(owner.address)).to.be.equal(0);
  });

  it("Should Readjust after pull liquidity", async () => {
    await unipilotVault
      .connect(owner)
      .deposit(parseUnits("1", "8"), parseUnits("40000", "6"), owner.address);
    let liquidity = await unipilotVault.balanceOf(owner.address);
    console.log(liquidity);

    await unipilotVault.connect(owner).pullLiquidity(owner.address);

    let positionDetails = await unipilotVault.callStatic.getPositionDetails();

    let reserveBeforeReAdjust =
      positionDetails[0].gte(parseUnits("0", "6")) &&
      positionDetails[0].lte(parseUnits("1", "6"));

    await unipilotVault.connect(owner).readjustLiquidity();

    positionDetails = await unipilotVault.callStatic.getPositionDetails();

    let reserveAfterReAdjust = positionDetails[0].gte(parseUnits("14", "6"));
    expect(reserveBeforeReAdjust && reserveAfterReAdjust).to.be.true;
  });

  it("Pool should out of range then earn fees after rebalance ", async () => {
    await unipilotVault
      .connect(owner)
      .deposit(parseUnits("0.5", "8"), parseUnits("200", "6"), owner.address);
    let liquidity = await unipilotVault.balanceOf(owner.address);
    console.log("LP balance of user is : ", liquidity);

    console.log("Balance before Swaps", {
      USDC: await USDC.balanceOf(owner.address),
      WBTC: await WBTC.balanceOf(owner.address),
    });

    await generateFeeThroughSwap(
      swapRouter,
      owner,
      USDC,
      WBTC,
      (500000).toString(),
    );

    let FeesBeforeSwap = { fees0: "", fees1: "" };
    let FeesAfterSwap = { fees0: "", fees1: "" };
    for (let i = 0; i < 10; i++) {
      await generateFeeThroughSwap(
        swapRouter,
        owner,
        WBTC,
        USDC,
        (1).toString(),
      );
      let PositionDetails = await unipilotVault.callStatic.getPositionDetails();
      let obj = {
        fees0: PositionDetails.fees0.toString(),
        fees1: PositionDetails.fees1.toString(),
      };
      console.log(`***On the swap of ${i + 1} fees are`, obj);
      if (obj.fees0 === "0") {
        FeesBeforeSwap = obj;
        console.log(
          "******** Pool is out of range, so rebalance using fee1 ********",
        );
        await unipilotVault.connect(owner).readjustLiquidity();
        console.log("Swap USDC to WBTC ");

        await generateFeeThroughSwap(
          swapRouter,
          owner,
          USDC,
          WBTC,
          (100).toString(),
        );
      }
      FeesAfterSwap = obj;
    }

    console.log("Balance After Swaps", {
      USDC: await USDC.balanceOf(owner.address),
      WBTC: await WBTC.balanceOf(owner.address),
    });

    let status =
      FeesBeforeSwap.fees0 < FeesAfterSwap.fees0 &&
      FeesBeforeSwap.fees1 > "0" &&
      FeesBeforeSwap.fees1 < FeesAfterSwap.fees1;
    expect(status).to.be.true;
  });

  it("All tests of ETH/USDT", async () => {
    // set the initial ratio of vault equal to uniswap pool
    await unipilotVault2
      .connect(owner)
      .deposit(parseUnits("1", "18"), parseUnits("3112", "6"), owner.address, {
        value: parseUnits("1", "18"),
      });

    // verify liquidity should be added in uniswap
    var reserves = await unipilotVault2.callStatic.getPositionDetails();
    // console.log("res before-> ", reserves);

    // readjust the liquidity to consume all amount of vault
    await unipilotVault2.connect(owner).readjustLiquidity();
    // var reserves = await unipilotVault2.callStatic.getPositionDetails();

    // fetch new account for adding liquidity in Unipilot
    const [user0, user1, user2, user3, user4] = waffle.provider.getWallets();

    // send amount0 & amount1 from existing account to new accounts
    await owner.sendTransaction({
      to: user0.address,
      value: parseUnits("1", "18"),
    });

    await owner.sendTransaction({
      to: user1.address,
      value: parseUnits("1", "18"),
    });

    await owner.sendTransaction({
      to: user2.address,
      value: parseUnits("5", "18"),
    });

    await owner.sendTransaction({
      to: user3.address,
      value: parseUnits("10", "18"),
    });

    await owner.sendTransaction({
      to: user4.address,
      value: parseUnits("16", "18"),
    });

    await USDT.connect(owner).transfer(user0.address, parseUnits("5000", "6"));
    await USDT.connect(owner).transfer(user1.address, parseUnits("6000", "6"));
    await USDT.connect(owner).transfer(user2.address, parseUnits("8000", "6"));
    await USDT.connect(owner).transfer(user3.address, parseUnits("11000", "6"));
    await USDT.connect(owner).transfer(user4.address, parseUnits("19000", "6"));

    await USDT.connect(user0).approve(unipilotVault2.address, MaxUint256);
    await USDT.connect(user1).approve(unipilotVault2.address, MaxUint256);
    await USDT.connect(user2).approve(unipilotVault2.address, MaxUint256);
    await USDT.connect(user3).approve(unipilotVault2.address, MaxUint256);
    await USDT.connect(user4).approve(unipilotVault2.address, MaxUint256);

    // now add liquidity from all new accounts
    await unipilotVault2
      .connect(user0)
      .deposit(parseUnits("1", "18"), parseUnits("3112", "6"), user0.address, {
        value: parseUnits("1", "18"),
      });

    await unipilotVault2
      .connect(user1)
      .deposit(parseUnits("1", "18"), parseUnits("6000", "6"), user1.address, {
        value: parseUnits("1", "18"),
      });

    await unipilotVault2
      .connect(user2)
      .deposit(parseUnits("5", "18"), parseUnits("8000", "6"), user2.address, {
        value: parseUnits("5", "18"),
      });

    await unipilotVault2
      .connect(user3)
      .deposit(
        parseUnits("10", "18"),
        parseUnits("11000", "6"),
        user3.address,
        {
          value: parseUnits("10", "18"),
        },
      );

    await unipilotVault2
      .connect(user4)
      .deposit(
        parseUnits("16", "18"),
        parseUnits("19000", "6"),
        user4.address,
        {
          value: parseUnits("16", "18"),
        },
      );

    // await unipilotVault2.connect(owner).readjustLiquidity();
    // owner dosent has WETH so we just swapped it from other pool
    await generateFeeThroughSwap(swapRouter, owner, USDC, WETH, "5000000");

    // now swap to get the pool out of range
    await generateFeeThroughSwap(swapRouter, owner, WETH, USDT, "900");

    // now pool is out of range so run readjustLiquidity to get both amounts in pool
    await unipilotVault2.connect(owner).readjustLiquidity();

    // pull liquidity and check uniswap reserves are empty now
    await unipilotVault2.connect(owner).pullLiquidity(unipilotVault2.address);

    // push all liquidity to uniswap again
    await unipilotVault2.connect(owner).readjustLiquidity();

    // withdraw all liquidity of existing users
    const ownerLp = await unipilotVault2.balanceOf(owner.address);

    const user0Lp = await unipilotVault2.balanceOf(user0.address);
    const user1Lp = await unipilotVault2.balanceOf(user1.address);
    const user2Lp = await unipilotVault2.balanceOf(user2.address);
    const user3Lp = await unipilotVault2.balanceOf(user3.address);
    const user4Lp = await unipilotVault2.balanceOf(user4.address);

    await unipilotVault2.connect(user4).withdraw(user4Lp, user4.address, false);
    await unipilotVault2.connect(user3).withdraw(user3Lp, user3.address, true);
    await unipilotVault2.connect(user2).withdraw(user2Lp, user2.address, false);
    await unipilotVault2.connect(user1).withdraw(user1Lp, user1.address, true);
    await unipilotVault2.connect(user0).withdraw(user0Lp, user0.address, true);
    await unipilotVault2.connect(owner).withdraw(ownerLp, owner.address, true);

    reserves = await unipilotVault2.callStatic.getPositionDetails();

    console.log("res after-> ", reserves);
    console.log("Balance WETH", {
      WETH: await WETH.balanceOf(unipilotVault2.address),
    });
    console.log("Balance USDT", {
      USDT: await USDT.balanceOf(unipilotVault2.address),
    });
  });
}
