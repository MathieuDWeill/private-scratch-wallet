# Private Scratch Wallet — 3 minute demo narration

Use this in Mureka, ElevenLabs, or any voice tool. Keep the final video under 4 minutes.

## Voiceover

Autonomous DeFi agents are powerful, but they reveal too much.

A public agent policy can expose a user's bankroll, maximum trade size, stop-loss threshold, minimum edge, and claim-safety rules. If those rules are visible, they can be copied, gamed, or attacked.

Private Scratch Wallet adds a confidentiality layer to Scratch Wallet.

Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.

The user starts by creating a confidential risk policy. The private fields include bankroll, max trade, max daily loss, risk mode, minimum net edge, and whether Claim Shield must block unsafe approvals.

Instead of publishing these values on-chain, the app computes a policy commitment. The public chain only sees a hash. The sensitive policy remains private.

The Nox decision flow is designed around confidential execution. In this repo, a Nox-compatible adapter marks the boundary where private inputs should be encrypted, evaluated in confidential compute, and reduced to a public result for Sepolia.

In the demo, the public layer sees only the commitment, the public decision hash, the decision type, and the risk tier. It does not see the user's thresholds.

This is important for autonomous DeFi. A user may want transparent auditability without revealing how their agent decides when to play, skip, block a claim, or stop.

The Sepolia registry records the commitment and the final decision. A judge can verify the transaction, but cannot infer the private risk policy from the public data.

Private Scratch Wallet is not a profit bot. It is a privacy layer for bounded autonomous execution.

Autonomous finance should start with bounded downside. Confidential autonomous finance should keep that downside policy private.

Built by Mathieu D. WEILL for the iExec WTF Hackathon Summer Edition.

## Shot list

1. Landing page: show the one-liner.
2. Confidential Policy Builder: edit bankroll, max trade, max loss and risk mode.
3. Public vs Private View: show private fields hidden behind a public commitment.
4. Nox Decision Flow: show encrypted inputs to confidential compute to public commitment.
5. Sepolia Registry: connect wallet, commit intent, publish decision.
6. Sepolia explorer: show contract and transaction.
7. Final slide: “Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.”
