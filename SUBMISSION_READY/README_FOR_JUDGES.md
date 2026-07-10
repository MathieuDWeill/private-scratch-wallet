# Private Scratch Wallet — Judge Notes

Private Scratch Wallet is a no-server GitHub Pages dApp that extends Scratch Wallet with a Nox-style confidentiality layer.

## Links

- GitHub: https://github.com/MathieuDWeill/private-scratch-wallet
- GitHub Pages: https://MathieuDWeill.github.io/private-scratch-wallet/
- Sepolia contract: https://sepolia.etherscan.io/address/0x33145C082811c5E88ce055DAD816aE540a89da94
- Sample commitIntent tx: https://sepolia.etherscan.io/tx/0xacb0662e5ec058ef664fbcd99869988cca71c4ffadbe770f4c03b62b41b96109
- Sample publishDecision tx: https://sepolia.etherscan.io/tx/0x2543771ad364220b9172a86eea2373556e74454ab89920aeeba5499bd3cd98e5
- Demo video: TODO YouTube unlisted link

## What to test

1. Open the GitHub Pages app.
2. Build a confidential risk policy.
3. Compare the Private View and Public View.
4. Connect MetaMask on Ethereum Sepolia.
5. Commit the policy commitment to `PrivateScratchRegistry`.
6. Publish a public decision.
7. Inspect the Sepolia explorer links.

## What remains private

- bankroll
- max trade size
- max daily loss
- risk mode
- minimum net edge
- claim safety rule

## What becomes public

- policy commitment
- decision hash
- decision type
- risk tier
- timestamp / transaction

## iExec/Nox angle

The repo includes a Nox-compatible adapter and a concrete integration plan. The confidential policy flow is designed so the current commitment path can be replaced by production Nox encrypted inputs and TEE-backed computation. This submission does not claim a verified live Nox runtime integration unless the final deployment notes include one.

## Why this matters

Autonomous DeFi agents should not reveal their exact risk policies. Public max-loss thresholds and execution rules can be copied, manipulated, or attacked.
