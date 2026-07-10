# Production Nox Integration Plan

The current repo contains a Nox-compatible adapter so the UX, data model, and Sepolia registry can be tested end-to-end without a backend. This file defines the exact replacement path for a production Nox integration.

Finalization status: official Nox package/docs discovery was attempted, but the
available npm/package network timed out before a verified runtime integration
could be installed. No fake runtime claim is made. The project remains a
documented Nox-compatible adapter plus Sepolia registry implementation.

## Confidential inputs

The following fields must be encrypted before confidential execution:

- bankrollUsd
- maxTradeUsd
- maxDailyLossUsd
- riskMode
- minNetEdgeBps
- claimShieldEnabled
- salt / entropy source

## Public outputs

Only these outputs are published:

- encryptedPolicyHash / commitment
- publicDecisionHash
- decisionType
- riskTier
- reportURI

## Nox replacement points

Replace `nox/nox_adapter.ts` functions with calls to the iExec Nox confidential execution flow:

1. `evaluatePolicyWithNoxAdapter`: encrypt policy inputs client-side.
2. `evaluatePolicyWithNoxAdapter`: submit encrypted payload to Nox confidential computation.
3. `confidentialEvaluatePolicy`: move this policy logic into the TEE/confidential runtime.
4. Return only `encryptedPolicyHash`, `publicDecisionHash`, `decisionType`, and `riskTier`.
5. Publish commitment and decision to `PrivateScratchRegistry` on Ethereum Sepolia.

## Security invariant

No plaintext bankroll, stop-loss, or threshold value should be emitted to chain events or stored in the public registry.

## Why Nox matters here

A commitment-only design protects static disclosure, but the decision computation is still local. Nox moves the decision computation into a confidential environment so the user can prove a public decision was produced from private policy inputs without exposing those inputs.
