const hre = require("hardhat");

import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

import ERC20Artifact from "../../artifacts/contracts/test/ERC20.sol/ERC20.json";
import WETH9Artifact from "uniswap-v3-deploy-plugin/src/util/WETH9.json";
import SwapRouterArtifact from "../../artifacts/contracts/test/SwapRouter.sol/SwapRouter.json";
import AstWethArtifact from "../utils/astWeth.json";
import { UniswapV3Pool } from "../../typechain";

import { generateFeeThroughSwap } from "../utils/SwapFunction/swapFork";
import { deployRouter } from "../stubs";
import { MaxUint128 } from "../../tasks/shared/utilities";

export async function shouldBehaveLikeRouterLive(): Promise<void> {
  let WETH: Contract;
  let AST: Contract;
  let USDT: Contract;

  let uniStrategy: Contract;
  let unipilotVault: Contract;
  let router: Contract;
  let uniswapPool: UniswapV3Pool;
  let swapRouter: Contract;

  let owner: any;

  const impersonateAddress = async (address: any) => {
    const hre = require("hardhat");
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [address],
    });
    // const signer: any = await ethers.provider.getSigner(address);
    // signer.address = signer._address;
    const signer: any = await ethers.getSigner(address);
    return signer;
  };

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
    //Bot 0x1e13e5b5acbb0c3f0fde50fe7661fdf75df8f932
    //vitalik 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
    //Hacker 0xB3764761E297D6f121e79C32A65829Cd1dDb4D32
    //Exchange 0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2
    owner = await ethers.getSigner(
      "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2",
    );

    swapRouter = await ethers.getContractAt(
      SwapRouterArtifact.abi,
      "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    );

    WETH = await ethers.getContractAt(
      WETH9Artifact.abi,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    );
    AST = await ethers.getContractAt(
      ERC20Artifact.abi,
      "0x27054b13b1B798B345b591a4d22e6562d47eA75a",
    );
    USDT = await ethers.getContractAt(
      ERC20Artifact.abi,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    );
    uniswapPool = (await ethers.getContractAt(
      "UniswapV3Pool",
      "0x117439f6fDdE9A09D28Eb78759cD5c852A8653F0",
    )) as UniswapV3Pool;

    //weth-ast vault - 0x038957e11ee9a299e2f7c2e74adaf12b62c7cb1d
    unipilotVault = await ethers.getContractAt(
      AstWethArtifact.abi,
      "0x038957e11ee9a299e2f7c2e74adaf12b62c7cb1d",
    );

    router = await deployRouter(
      owner,
      "0x4b8e58D252ba251e044ec63125E83172ECa5118f",
      "0x06c2AE330C57a6320b2de720971ebD09003C7a01",
    );
  });

  it("AST Frontrun test", async () => {
    console.log("Deployed router address is: ", router.address);
    console.log("User's AST balance :", await AST.balanceOf(owner.address));

    await WETH.connect(owner).approve(swapRouter.address, MaxUint128);
    await USDT.connect(owner).approve(swapRouter.address, MaxUint128);

    await generateFeeThroughSwap(
      swapRouter,
      owner,
      USDT,
      WETH,
      (1000).toString(),
      3000,
    );
  });
}
