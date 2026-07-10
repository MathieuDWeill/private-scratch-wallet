# iExec / Nox developer feedback

## Integration status for this submission

Private Scratch Wallet currently ships a Nox-compatible adapter with explicit
production replacement points. During finalization, package/docs discovery was
attempted, but npm/package network timeouts prevented installing and verifying a
real iExec Nox runtime path inside the repo. The submission is therefore honest:
it demonstrates the confidential DeFi risk-policy boundary, public commitment
schema, and Sepolia registry, but does not claim a verified Nox runtime
deployment.

## What worked well

- The Nox positioning is clear and useful for DeFi: encrypted inputs and public commitments are a natural fit for autonomous-agent risk policies.
- The idea of confidential smart contracts is easy to explain to users when framed as “private policy, public decision”.
- The Hardhat starter/plugin approach is the right direction for developers already building EVM apps.

## What was hard

- It was not immediately obvious which minimum Nox pieces are required for a hackathon-grade end-to-end demo.
- The boundary between a local confidential adapter, a TEE execution flow, and a deployed confidential smart contract could use more step-by-step examples.
- The docs would benefit from a complete “hello confidential commitment” example: frontend -> encrypted input -> Nox execution -> Sepolia commitment.

## Suggested improvements

- Provide a minimal React + Hardhat + Nox template.
- Add a small example for confidential risk scoring or private thresholds.
- Include a troubleshooting page for Sepolia deployment and wallet switching.
- Add diagrams showing exactly what remains private and what becomes public.

## Product feedback

Nox is especially promising for DeFi agents, private treasury policies, confidential RFQs, private liquidation thresholds, hidden payroll streams, and private portfolio rebalancing rules.

Private Scratch Wallet uses the pattern for autonomous DeFi risk policies: the user’s policy remains private, while public decisions remain auditable.
