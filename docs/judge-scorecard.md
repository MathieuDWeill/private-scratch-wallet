# Judge Scorecard Mapping

This file maps the project directly to the iExec WTF evaluation criteria so judges do not have to infer intent.

## Creativity

Private Scratch Wallet applies confidentiality to autonomous DeFi risk policies rather than to a generic private transfer demo. The problem is specific: an autonomous agent reveals its thresholds if bankroll, max trade size, stop-loss, and execution rules are public.

## End-to-end accessibility

The dApp is a static GitHub Pages app. The end-to-end demo is:

1. connect MetaMask on Sepolia;
2. build a private policy locally;
3. generate an encrypted-policy commitment;
4. commit the intent to `PrivateScratchRegistry`;
5. publish a public decision hash;
6. read the public intent back from the contract.

## ETH Sepolia deployment

The repo includes Hardhat deployment scripts, local solc-js compilation, and a generated deployment export for the frontend.

## iExec Nox usage

The project is structured around Nox confidential policy execution:

- `nox/nox_adapter.ts` defines the adapter boundary;
- `nox/confidential_policy_flow.md` explains the intended Nox flow;
- `nox/production_nox_integration_plan.md` lists the exact replacement points for production Nox calls;
- `nox/experimental/NoxPrivateScratchRegistry.sol` provides a contract-side sketch for a Nox-specific version.

Codex should prioritize replacing the adapter with official iExec Nox runtime calls if the packages are stable in the build environment.

## UX

The UI explicitly separates private fields from public commitments and gives judges Sepolia tx links.
