# Official Nox Integration Audit

This file records the official Nox packages checked during finalization and the exact decision for this submission.

## Packages checked

- `@iexec-nox/nox-confidential-contracts@0.2.2`
  - Official repository: `https://github.com/iExec-Nox/nox-confidential-contracts`
  - Purpose: confidential Solidity contracts, including ERC-7984 implementations and utilities.
  - Requirements in package README: Node.js >= 24, pnpm >= 10, Hardhat >= 3.

- `@iexec-nox/nox-hardhat-plugin@0.1.0`
  - Official repository: `https://github.com/iExec-Nox/nox-hardhat-plugin`
  - Purpose: Hardhat 3 plugin that starts the local Nox offchain stack with Docker Compose and injects `NoxCompute` into a local Hardhat node.
  - Fit for this repo: useful for a future local Nox runtime test harness, but not a drop-in production Sepolia/GitHub Pages integration.

- `@iexec-nox/handle@0.1.0-beta.13`
  - Official repository: `https://github.com/iExec-Nox/nox-handle-sdk`
  - Purpose: TypeScript SDK for encrypting/decrypting confidential handles.
  - Important limitation from package README: built-in defaults include Arbitrum Sepolia; other chains require full gateway, protocol contract, and subgraph configuration.

## Submission decision

Private Scratch Wallet keeps the shipped implementation on Ethereum Sepolia with no backend server. The official Nox runtime tooling is promising, but the verified path found during finalization is local Hardhat 3 plus Docker Compose or handle encryption defaults outside Ethereum Sepolia.

To avoid fake claims, this submission does not present the adapter as a live Nox runtime deployment. Instead it provides:

- a working static Sepolia dApp;
- a deployed `PrivateScratchRegistry`;
- sample `commitIntent` and `publishDecision` transactions;
- a Nox-compatible adapter boundary in `nox/nox_adapter.ts`;
- exact production replacement points in `nox/production_nox_integration_plan.md`.

## Production replacement points

1. Upgrade the confidential runtime branch to Hardhat 3.
2. Add `@iexec-nox/nox-hardhat-plugin` for local end-to-end Nox runtime tests.
3. Replace `evaluatePolicyWithNoxAdapter` with official handle encryption and Nox confidential execution.
4. Keep `PrivateScratchRegistry` as the Ethereum Sepolia public audit sink for commitments and final decisions.
