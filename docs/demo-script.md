# Demo Script Under 4 Minutes

## 0:00 - Problem

Autonomous DeFi agents often expose too much. If bankroll, stop-loss thresholds,
and execution rules are public, the agent can be copied or gamed.

## 0:30 - Solution

Private Scratch Wallet keeps the downside policy private. The user defines a
tiny-wallet risk policy, and the public chain only receives a commitment and
decision hash.

## 1:00 - Build a private policy

Show bankroll, max trade, max daily loss, risk mode, and Claim Shield.

## 1:30 - Public vs private

Show private fields locally and the public commitment that will be published.

## 2:00 - Nox flow

Explain private policy inputs, the confidential computation boundary, and the
public commitment output. Mention that the repo includes an official Nox package
audit and a Nox-compatible adapter with exact production replacement points.

## 2:40 - Sepolia registry

Show the deployed Sepolia contract and the sample `commitIntent` /
`publishDecision` transactions.

## 3:30 - Close

Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy
private.
