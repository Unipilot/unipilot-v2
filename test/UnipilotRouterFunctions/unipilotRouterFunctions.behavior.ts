import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
const { expect } = require("chai");

export async function shouldBehaveLikeUnipilotRouterFunctions(
  wallets: SignerWithAddress[],
  UnipilotFactory: Contract,
  UnipilotRouter: Contract,
  // UnipilotVault: Contract,
  PILOT: Contract,
  USDT: Contract,
): Promise<void> {
  const owner = wallets[0];
  const alice = wallets[1];
  let UnipilotVault: String;

  it("Deposit: it should be fail  reason: Zero address !!", async () => {
    let _vault: String = "0x0000000000000000000000000000000000000000";
    await expect(
      UnipilotRouter.connect(owner).deposit(
        _vault,
        owner.address,
        parseUnits("1000", "18"),
        parseUnits("1", "18"),
      ),
    ).to.be.revertedWith("NA");
  });

  it("Deposit: it should be fail  reason: 0 amount of token0 ", async () => {
    let _vault: String = "0x0000000000000000000000000000000000000001";
    await expect(
      UnipilotRouter.connect(owner).deposit(
        _vault,
        owner.address,
        parseUnits("0", "18"),
        parseUnits("1000", "18"),
      ),
    ).to.be.revertedWith("IF");
  });
  it("Deposit: it should be fail  reason: 0 amount of token1 !!", async () => {
    let _vault: String = "0x0000000000000000000000000000000000000001";
    await expect(
      UnipilotRouter.connect(owner).deposit(
        _vault,
        owner.address,
        parseUnits("1000", "18"),
        parseUnits("0", "18"),
      ),
    ).to.be.revertedWith("IF");
  });

  it("Deposit: it should be pass", async () => {
    const vaultStatic = await UnipilotFactory.connect(
      owner,
    ).callStatic.createVault(
      PILOT.address,
      USDT.address,
      3000,
      42951287100,
      "unipilot PILOT-USDT",
      "PILOT-USDT",
    );
    console.log("Create Vault", vaultStatic._pool.toString());
    UnipilotVault = await UnipilotFactory.connect(owner).createVault(
      PILOT.address,
      USDT.address,
      3000,
      42951287100,
      "unipilot PILOT-USDT",
      "PILOT-USDT",
    );

    await PILOT.connect(owner).approve(UnipilotRouter.address, MaxUint256);
    await USDT.connect(owner).approve(UnipilotRouter.address, MaxUint256);

    // let staticDeposit = await UnipilotRouter.connect(owner).callStatic.deposit(
    //   vaultStatic._vault,
    //   owner.address,
    //   parseUnits("1000", "18"),
    //   parseUnits("1", "6"),
    // );

    let deposit = await UnipilotRouter.connect(owner).deposit(
      vaultStatic._vault,
      owner.address,
      parseUnits("1000", "18"),
      parseUnits("1", "6"),
    );

    expect(deposit).to.be.ok;
  });
}
