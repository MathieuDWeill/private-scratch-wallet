# Nox integration notes

Private Scratch Wallet is designed as a Nox privacy extension of Scratch Wallet.

The confidential data is the autonomous risk policy:

- bankroll
- max trade size
- max daily loss
- risk mode
- minimum net edge
- claim safety rule

The public chain should not learn these raw values. The public contract only stores:

- encrypted policy / commitment hash
- public decision hash
- decision type
- risk tier
- report URI

## Current adapter

`nox_adapter.ts` provides a small Nox-compatible interface. It is not presented
as a live production Nox runtime deployment. It exists so the static dApp,
policy data model, and Sepolia registry can be tested end-to-end while keeping
the confidential-compute boundary explicit.

1. accept private policy inputs;
2. produce a commitment;
3. run deterministic confidential decision logic;
4. return public decision output.

The private policy inputs are `bankroll`, `max trade size`, `max daily loss`,
`risk mode`, `minimum net edge`, `claim safety rule`, and salt/entropy.

The confidential computation boundary is the call to
`evaluatePolicyWithNoxAdapter`. Today it runs locally in the browser/dev
environment. In production, this boundary is where encrypted inputs should be
submitted to iExec Nox confidential execution.

The public commitment output is limited to:

- encrypted policy / commitment hash
- public decision hash
- decision type
- risk tier
- optional report URI

## Production replacement path

1. Replace the body of `evaluatePolicyWithNoxAdapter` with the official iExec
   Nox client/encryption call available for the hackathon runtime.
2. Move `confidentialEvaluatePolicy` into the confidential execution unit.
3. Return only the same public schema: commitment, decision hash, decision type,
   and risk tier.
4. Continue publishing public commitments to `PrivateScratchRegistry` on
   Ethereum Sepolia.

Official Nox package/docs discovery was attempted during finalization, but the
available package network was timing out. The repo therefore keeps the honest
Nox-compatible adapter and documents the exact replacement points instead of
claiming a runtime integration that was not verified.
