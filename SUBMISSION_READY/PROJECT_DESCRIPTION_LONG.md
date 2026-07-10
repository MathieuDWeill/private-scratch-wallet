# Private Scratch Wallet

Private Scratch Wallet is a confidential extension of Scratch Wallet for autonomous DeFi risk policies.

Autonomous DeFi agents should not expose sensitive execution rules. If bankroll, max trade size, max daily loss, minimum edge, risk mode, or claim-approval rules are public, adversaries can copy, game, or front-run the agent's policy.

Private Scratch Wallet keeps those parameters private through a Nox-style confidential policy flow and publishes only auditable commitments and final decisions on Ethereum Sepolia.

The project is intentionally no-server: a GitHub Pages static dApp connects to MetaMask and writes to `PrivateScratchRegistry` on Sepolia. The registry stores encrypted-policy commitments, public decision hashes, risk tiers, and report URIs. The frontend shows judges the private-vs-public separation and provides Sepolia transaction links.

Core message:

> Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.

The project does not promise profit. It focuses on bounded downside, confidentiality, and public auditability for autonomous DeFi execution.
