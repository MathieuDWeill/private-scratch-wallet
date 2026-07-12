# Private Scratch Wallet

**Confidential autonomous DeFi risk policies with an iExec Nox-compatible design on Ethereum Sepolia.**

> Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.

Private Scratch Wallet is a no-server GitHub Pages dApp for the iExec WTF Hackathon Summer Edition. It extends the Scratch Wallet concept into a privacy-first autonomous DeFi flow: users define sensitive risk parameters for a tiny autonomous wallet, but only publish commitments and final decisions on-chain.

## Problem

Autonomous DeFi agents can expose sensitive policy values:

- bankroll;
- max trade size;
- max daily loss;
- risk mode;
- minimum net edge;
- claim safety rules.

If these thresholds are public, they can be copied, gamed, or attacked. A public chain should not need to know the exact policy to audit whether an autonomous decision happened.

## Solution

Private Scratch Wallet uses a Nox-compatible confidential policy flow:

1. User defines a private risk policy locally.
2. The confidential layer computes a policy commitment.
3. The public app publishes only a commitment and final decision.
4. `PrivateScratchRegistry` stores auditable outputs on Ethereum Sepolia.

## Architecture

```text
GitHub Pages static dApp
  -> MetaMask / Sepolia
  -> PrivateScratchRegistry
  -> Nox-compatible confidential policy adapter
```

No backend server is required.

## Current implementation

- Vite React TypeScript frontend.
- Hardhat Solidity contract.
- Sepolia deployment tooling.
- Nox-compatible adapter in `nox/`.
- Official Nox package audit in `docs/nox-official-integration-audit.md`.
- `feedback.md` for iExec tool feedback.
- GitHub Actions workflow for GitHub Pages.

## Setup

```bash
npm install
npm run dev
```

The repo is pinned to `pnpm@11.11.0` for CI/GitHub Pages. If your local npm
version fails internally during install, run `corepack enable` and
`pnpm install --frozen-lockfile --ignore-scripts`, then continue with the same
`npm run ...` scripts.

## Build

```bash
npm run build
```

## Test and compile contracts

```bash
npm run compile
npm run test
```

## Deploy to Sepolia

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Fill:

```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
DEPLOYER_PRIVATE_KEY=0xYOUR_SEPOLIA_BURNER_PRIVATE_KEY
```

Deploy:

```bash
npm run deploy:sepolia
```

Then set:

```env
PRIVATE_SCRATCH_REGISTRY_ADDRESS=0xDEPLOYED_CONTRACT
```

For the frontend on GitHub Pages, set:

```env
VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS=0xDEPLOYED_CONTRACT
```

## GitHub Pages

The repo includes `.github/workflows/pages.yml`. Push to `main`, enable GitHub Pages from GitHub Actions, and the app will be published at:

```text
https://<user>.github.io/private-scratch-wallet/
```

## What is reused from Scratch Wallet?

The original Scratch Wallet idea is reused: risk-capped autonomous micro-wallets with bounded downside. This repo builds a new privacy layer and Sepolia/Nox-oriented dApp around that idea for the iExec WTF Hackathon.

## What is new for this hackathon?

- Confidential policy commitment flow.
- Public vs private view.
- Sepolia registry contract.
- Nox-compatible adapter and documentation.
- GitHub Pages no-server dApp.
- iExec feedback document.

## No profit promise

Private Scratch Wallet does not promise trading profits. It focuses on privacy, bounded downside, and transparent autonomous-agent decisions.

## Final-ops quick path

```bash
npm install
npm run doctor
npm run ship
```

Then deploy to Sepolia with a burner wallet:

```bash
cp .env.example .env
npm run deploy:sepolia
npm run commit:sample
```

For GitHub Pages, push to GitHub and enable Pages from GitHub Actions. The workflow is already included.

## What is private vs public?

Private policy values:
- bankroll;
- maximum trade size;
- maximum daily loss;
- risk mode;
- minimum net edge;
- claim-safety rule.

Public Sepolia values:
- policy commitment hash;
- public decision hash;
- decision type;
- risk tier;
- report URI.

The current repo includes a Nox-compatible confidential flow, official Nox package audit, and explicit production integration plan. It does not claim a live Nox runtime deployment on Ethereum Sepolia because the official local runtime path currently targets Hardhat 3/Docker and the handle SDK defaults target Arbitrum Sepolia.
