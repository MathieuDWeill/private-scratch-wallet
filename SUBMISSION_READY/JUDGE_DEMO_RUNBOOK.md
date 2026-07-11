# Judge Demo Runbook

## 30-second version

Private Scratch Wallet is a no-server GitHub Pages dApp for confidential autonomous DeFi risk policies.

1. Open the GitHub Pages URL.
2. Connect MetaMask on Sepolia.
3. Build a confidential policy.
4. Commit the policy commitment to Sepolia.
5. Publish a public decision.
6. Read the public intent back from the registry.

Private values such as bankroll, max loss, max trade size, and edge threshold are never stored in plaintext on-chain.

## What to inspect

- `contracts/PrivateScratchRegistry.sol`
- `src/lib/policy.ts`
- `src/lib/registry.ts`
- `nox/README.md`
- `nox/production_nox_integration_plan.md`
- `feedback.md`

## Evidence links

- GitHub: https://github.com/MathieuDWeill/private-scratch-wallet
- GitHub Pages: https://mathieudweill.github.io/private-scratch-wallet/
- Sepolia contract: https://sepolia.etherscan.io/address/0x33145C082811c5E88ce055DAD816aE540a89da94
- Commit tx: https://sepolia.etherscan.io/tx/0xacb0662e5ec058ef664fbcd99869988cca71c4ffadbe770f4c03b62b41b96109
- Decision tx: https://sepolia.etherscan.io/tx/0x2543771ad364220b9172a86eea2373556e74454ab89920aeeba5499bd3cd98e5
- Demo video: pending YouTube upload
- X post: pending publication
