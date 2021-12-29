import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish, Contract } from "ethers";
import { shouldBehaveLikeTokenApproval } from "../TokenApproval/tokenApprove.behavior";

export async function shouldBehaveLikeVaultFunctions(
  wallets: SignerWithAddress[],
  vault: Contract,
  uniswapFactory: Contract,
): Promise<void> {
  it("should fail depoit with IL", async () => {
    await expect(
      vault.deposit(
        wallets[0].address,
        wallets[0].address,
        0,
        parseUnits("2", "18"),
      ),
    ).to.be.revertedWith("IL");
  });
  it("should successfully deposit liquidity", async () => {
    console.log("Vault name", (await vault.name()).toString());
    console.log("Vault symbol", (await vault.symbol()).toString());
    console.log("Vault supply", (await vault.totalSupply()).toString());
    let simulatedLpShares = await getShares(
      parseUnits("2", "18"),
      parseUnits("2", "18"),
      vault,
    );

    let lpShares = (
      await vault.callStatic.deposit(
        wallets[0].address,
        wallets[0].address,
        parseUnits("2", "18"),
        parseUnits("2", "18"),
      )
    ).toString();

    expect(lpShares).to.be.equal(simulatedLpShares.toString());
  });
}

async function getShares(
  amount0Desired: any,
  amount1Desired: any,
  vault: Contract,
): Promise<any> {
  let totalSupply = await vault.totalSupply();
  let totalAmount0 = await vault.totalAmount0();
  let totalAmount1 = await vault.totalAmount1();
  let lpShares: any;
  if (totalSupply == 0) {
    lpShares =
      amount0Desired > amount1Desired ? amount0Desired : amount1Desired;
    console.log("INSIDE SIMULATED GET SHARES", lpShares);
  } else if (totalAmount0 == 0) {
    lpShares = (amount1Desired * totalSupply) / totalAmount1;
    console.log("INSIDE SIMULATED GET SHARES", lpShares);
  } else if (totalAmount1 == 1) {
    lpShares = (amount0Desired * totalSupply) / totalAmount0;
    console.log("INSIDE SIMULATED GET SHARES", lpShares);
  } else {
    let cross: any =
      amount0Desired * totalAmount1
        ? amount0Desired * totalAmount1 < amount1Desired * totalAmount0
        : amount1Desired * totalAmount0;

    lpShares = (cross * totalSupply) / totalAmount0 / totalAmount1;
    console.log("INSIDE SIMULATED GET SHARES", lpShares);
  }
  return lpShares;
}
