# DoraHacks / iExec WTF Fields

## Project name

Private Scratch Wallet

## Short description

Confidential autonomous DeFi risk policies: Scratch Wallet limits downside, Private Scratch Wallet keeps the downside policy private with a Nox-style flow and Sepolia registry.

## Long description

Private Scratch Wallet is a no-server GitHub Pages dApp that adds a confidentiality layer to the Scratch Wallet concept. Autonomous DeFi agents often expose sensitive parameters: bankroll, max trade size, max daily loss, risk mode, minimum edge, and claim safety rules. If these values are public, they can be copied, gamed, or attacked.

Private Scratch Wallet lets users create a confidential risk policy, generate a policy commitment, and publish only auditable decisions to Ethereum Sepolia. The public registry sees a commitment and decision hash, while the sensitive policy values remain private.

The project includes a Vite React frontend, Hardhat Sepolia contract, Nox-compatible confidential policy adapter, public-vs-private UX, feedback.md, and a GitHub Pages deployment pipeline.

## Track / tags

DeFi, TEE, Institutional, Tokenisation, Platform technology, ETH Sepolia, iExec, Privacy

## GitHub

https://github.com/MathieuDWeill/private-scratch-wallet

## Website

https://MathieuDWeill.github.io/private-scratch-wallet/

## Demo video

Pending YouTube upload. Record with `docs/demo-script.md`; keep under 4 minutes.

## Sepolia contract

https://sepolia.etherscan.io/address/0x33145C082811c5E88ce055DAD816aE540a89da94

## Sample Sepolia transactions

commitIntent:
https://sepolia.etherscan.io/tx/0xacb0662e5ec058ef664fbcd99869988cca71c4ffadbe770f4c03b62b41b96109

publishDecision:
https://sepolia.etherscan.io/tx/0x2543771ad364220b9172a86eea2373556e74454ab89920aeeba5499bd3cd98e5

## X post

Use `SUBMISSION_READY/X_POST.md`.
