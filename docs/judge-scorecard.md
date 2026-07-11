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

The contract is deployed on Ethereum Sepolia and the repo includes the generated deployment export for the frontend.

- Contract: `0x33145C082811c5E88ce055DAD816aE540a89da94`
- Contract explorer: https://sepolia.etherscan.io/address/0x33145C082811c5E88ce055DAD816aE540a89da94
- Sample commitIntent tx: https://sepolia.etherscan.io/tx/0xacb0662e5ec058ef664fbcd99869988cca71c4ffadbe770f4c03b62b41b96109
- Sample publishDecision tx: https://sepolia.etherscan.io/tx/0x2543771ad364220b9172a86eea2373556e74454ab89920aeeba5499bd3cd98e5

## iExec Nox usage

The project is structured around Nox confidential policy execution and documents the official package audit:

- `nox/nox_adapter.ts` defines the adapter boundary;
- `nox/confidential_policy_flow.md` explains the intended Nox flow;
- `nox/production_nox_integration_plan.md` lists the exact replacement points for production Nox calls;
- `docs/nox-official-integration-audit.md` records the official Nox packages checked and why no incompatible runtime claim is made;
- `nox/experimental/NoxPrivateScratchRegistry.sol` provides a contract-side sketch for a Nox-specific version.

The shipped dApp uses a documented Nox-compatible adapter on Ethereum Sepolia. It does not claim a verified live Nox runtime integration because the official Nox local runtime package currently targets Hardhat 3 plus Docker, while this public submission is a no-backend static GitHub Pages app with a Hardhat 2 Sepolia deployment.

## UX

The UI explicitly separates private fields from public commitments and gives judges Sepolia tx links.
