# Codex Handoff

Do not rebuild the project. The repo already contains the app, contract, tests, docs, submission files, and GitHub Pages workflow.

## First commands

```bash
npm install
npm run max:local
```

`npm run compile` uses local solc-js, not Hardhat's remote compiler downloader. This avoids losing time if Hardhat cannot download solc.

## Required finalization

1. Try official iExec Nox integration.
2. Deploy `PrivateScratchRegistry` to Sepolia.
3. Run `npm run after:deploy` to export the frontend deployment config.
4. Push to GitHub.
5. Enable GitHub Pages.
6. Record demo.
7. Publish X post tagging `@iEx_ec`.

## Non-negotiables

- No private key in git.
- No backend server.
- No Streamlit.
- No profit promises.
- Keep the name `Private Scratch Wallet`.
- Keep the message: `Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.`
