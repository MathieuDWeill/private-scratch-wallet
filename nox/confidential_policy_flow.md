# Confidential policy flow

Private Scratch Wallet protects the most sensitive part of a small autonomous DeFi agent: its risk policy.

## Private inputs

The following values are treated as private:

- bankroll
- max trade size
- max daily loss
- risk mode
- minimum net edge threshold
- claim safety flag

## Nox-compatible computation

A Nox confidential execution flow receives encrypted policy inputs and evaluates whether the agent should:

- PLAY
- SKIP
- STOP
- BLOCKED_CLAIM

The computation can access the private thresholds, but the chain only receives a commitment and public decision output.

## Public outputs

- encryptedPolicyHash
- publicDecisionHash
- decisionType
- riskTier
- reportURI

## Why this matters

If an autonomous DeFi agent reveals its full thresholds, other actors can copy or exploit its behavior. Keeping the policy private makes the agent harder to game while preserving a public audit trail.
