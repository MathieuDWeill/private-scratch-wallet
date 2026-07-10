# Architecture

```mermaid
flowchart TD
    U[User] --> FE[GitHub Pages dApp]
    FE --> PB[Confidential Policy Builder]
    PB --> NOX[Nox-compatible confidential policy flow]
    NOX --> COMMIT[Policy commitment]
    NOX --> DECISION[Public decision hash]
    COMMIT --> META[MetaMask]
    DECISION --> META
    META --> SEP[PrivateScratchRegistry on Sepolia]
    SEP --> AUDIT[Public audit trail]
```

## Private fields

- bankroll
- max trade size
- max daily loss
- risk mode
- minimum net edge
- claim safety flag

## Public fields

- encrypted policy hash / commitment
- decision hash
- decision type
- risk tier
- report URI
