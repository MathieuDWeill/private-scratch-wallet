# iExec / Nox Developer Feedback

## Integration status for this submission

Private Scratch Wallet currently ships a Nox-compatible adapter with explicit
production replacement points. During finalization, official Nox packages were
checked: `@iexec-nox/nox-confidential-contracts`,
`@iexec-nox/nox-hardhat-plugin`, and `@iexec-nox/handle`.

The verified runtime path found is not a drop-in match for a no-backend Ethereum
Sepolia GitHub Pages dApp: the official Hardhat plugin targets Hardhat 3 plus a
Docker-managed local Nox stack, and the handle SDK defaults include Arbitrum
Sepolia unless full gateway/protocol/subgraph config is supplied.

The submission therefore stays honest: it demonstrates the confidential DeFi
risk-policy boundary, public commitment schema, and Ethereum Sepolia registry,
but does not claim a verified live Nox runtime deployment.

## What worked well

- The Nox positioning is clear and useful for DeFi: encrypted inputs and public commitments are a natural fit for autonomous-agent risk policies.
- The idea of confidential smart contracts is easy to explain to users when framed as "private policy, public decision".
- The official package split is understandable: protocol contracts, confidential contracts, handle SDK, and Hardhat local runtime plugin.

## What was hard

- It was not immediately obvious which minimum Nox pieces are required for a hackathon-grade end-to-end demo on Ethereum Sepolia.
- The local Nox runtime path requires Hardhat 3 and Docker, while many existing hackathon dApps still use Hardhat 2 deployment scripts.
- The handle SDK README notes built-in defaults for Arbitrum Sepolia; Ethereum Sepolia needs full custom gateway, protocol contract, and subgraph configuration.
- The docs would benefit from a complete "hello confidential commitment" example: frontend -> encrypted input -> Nox execution -> Ethereum Sepolia commitment.

## Suggested improvements

- Provide a minimal React + Hardhat + Nox template for no-backend dApps.
- Add a complete example for confidential risk scoring or private thresholds.
- Publish a clear Ethereum Sepolia configuration example for the handle SDK.
- Include a troubleshooting page for Hardhat 2 vs Hardhat 3 migration.
- Add diagrams showing exactly what remains private and what becomes public.

## Product feedback

Nox is especially promising for DeFi agents, private treasury policies,
confidential RFQs, private liquidation thresholds, hidden payroll streams, and
private portfolio rebalancing rules.

Private Scratch Wallet uses the pattern for autonomous DeFi risk policies: the
user's policy remains private, while public decisions remain auditable.
