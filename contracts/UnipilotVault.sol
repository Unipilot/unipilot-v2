//SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/drafts/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./base/PeripheryPayments.sol";
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "./interfaces/IUnipilotVault.sol";
import "./libraries/UnipilotMaths.sol";

contract UnipilotVault is
    ERC20Permit,
    ERC20Burnable,
    IUnipilotVault,
    PeripheryPayments
{
    using SafeMath for uint256;
    address public token0;
    address public token1;
    IUniswapV3Pool private pool;
    address public governance;
    address private router;
    uint256 public fee;
    uint256 public totalAmount0;
    uint256 public totalAmount1;
    int24 private baseTickLower;
    int24 private baseTickUpper;
    int24 private rangeTickLower;
    int24 private rangeTickUpper;

    //mappings
    // mapping(address=>UserPosition) public userPosition;
    //modifiers
    modifier onlyGovernance() {
        require(msg.sender == governance, "NG");
        _;
    }

    modifier onlyRouter() {
        require(msg.sender == router, "NR");
        _;
    }

    constructor(
        address _governance,
        address _pool,
        string memory _name,
        string memory _symbol
    ) ERC20Permit(_name) ERC20(_name, _symbol) {
        governance = _governance;
        pool = IUniswapV3Pool(_pool);
        initializeVault(pool);
    }

    function initializeVault(IUniswapV3Pool pool) internal {
        token0 = pool.token0();
        token1 = pool.token1();
        fee = pool.fee();
    }

    function deposit(
        address _depositor,
        address _recipient,
        uint256 _amount0Desired,
        uint256 _amount1Desired
    ) external override returns (uint256 lpShares) {
        require(_amount0Desired > 0 && _amount1Desired > 0, "IL");
        require(_depositor != address(0) && _recipient != address(0), "IA");
        lpShares = UnipilotMaths.getShares(
            totalAmount0,
            totalAmount1,
            totalSupply(),
            _amount0Desired,
            _amount1Desired
        );

        _mint(_recipient, lpShares);

        pay(token0, _depositor, address(this), _amount0Desired);

        pay(token1, _depositor, address(this), _amount1Desired);

        emit Deposit(_depositor, _amount0Desired, _amount1Desired, lpShares);
    }

    function getVaultInfo()
        external
        view
        override
        returns (
            address,
            address,
            uint256
        )
    {
        console.log("Calling Vault",token0,fee);
        return (token0, token1, fee);
    }
}
