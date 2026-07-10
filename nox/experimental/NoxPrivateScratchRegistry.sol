// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/*
  Experimental Nox integration placeholder.

  This file is intentionally NOT imported by the default Hardhat compile path.
  It documents the intended upgrade from commitment-only demo to real Nox-backed
  confidential inputs.

  Production target:
  - replace bytes32 encryptedPolicyHash with Nox encrypted handle types;
  - validate Nox proof / computation result through Nox protocol contracts;
  - publish only the public decision hash and risk tier.

  Keep contracts/PrivateScratchRegistry.sol as the stable Sepolia demo contract.
*/

contract NoxPrivateScratchRegistrySketch {
    event ConfidentialIntentCommitted(uint256 indexed intentId, address indexed user, bytes32 encryptedPolicyHandleHash);
    event ConfidentialDecisionPublished(uint256 indexed intentId, bytes32 publicDecisionHash, uint8 decisionType, uint8 riskTier);
}
