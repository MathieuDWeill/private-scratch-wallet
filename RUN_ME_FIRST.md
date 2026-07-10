# RUN ME FIRST — Private Scratch Wallet

This repo is prepared for the iExec WTF Hackathon Summer Edition. It is intentionally no-server: Vite React static app + Hardhat Sepolia contract + GitHub Pages.

## Local check

```bash
npm install
npm run ship
```

## Deploy contract to Sepolia

```bash
cp .env.example .env
# put a Sepolia burner private key in DEPLOYER_PRIVATE_KEY
npm run deploy:sepolia
```

After deployment, update:

```env
VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x...
```

## Publish app

Push to GitHub. Enable GitHub Pages from GitHub Actions. The workflow is already included.

## Final deliverables

- public GitHub repo
- GitHub Pages URL
- Sepolia contract URL
- demo video under 4 minutes
- X post tagging `@iEx_ec`
- `feedback.md` included

## Product message

Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.


## v4 max-ops note

This repo has been locally hardened with:

- deterministic `package-lock.json`;
- local `solc-js` compile path, so Hardhat does not need to download the compiler;
- passing frontend build;
- passing Solidity tests;
- generated ABI export for the frontend;
- Sepolia deploy/verify/finalization scripts;
- judge runbook and submission pack.

Validated locally before packaging:

```bash
npm run max:local
```

The only required external steps are real Sepolia deployment, GitHub Pages publication, and best-effort official iExec Nox runtime integration.
