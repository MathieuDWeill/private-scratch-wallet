# Privacy model

Private Scratch Wallet protects autonomous DeFi agent risk policies.

## Threat

If an agent publishes its full policy, adversaries can infer its thresholds and exploit behavior. Examples:

- copy profitable strategies;
- manipulate liquidity just below/above thresholds;
- target known stop-loss settings;
- infer bankroll and risk appetite;
- craft claims that bypass naive rules.

## Privacy goal

Keep sensitive policy values private while allowing public verification that a decision was registered.

## Public auditability

The chain stores commitments and decisions. Judges and users can see that an intent and decision were published, but not the exact private thresholds.

## Production Nox path

The current repo includes a Nox-compatible adapter. The production path is to replace the adapter internals with iExec Nox confidential execution while keeping the same public contract interface.
