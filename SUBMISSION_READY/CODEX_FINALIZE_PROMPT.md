You are in the repo `private-scratch-wallet`.

Goal: finalize for the iExec WTF Hackathon Summer Edition with minimal changes.

Do NOT rebuild from scratch. Keep the product:
Private Scratch Wallet — confidential autonomous DeFi risk policies.
Core line: “Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.”

Hard requirements from hackathon:
- public GitHub repo;
- functional frontend dApp;
- demo video under 4 minutes;
- deployed on Ethereum Sepolia;
- feedback.md in repo;
- meaningful iExec Nox / confidential DeFi integration;
- no backend server needed.

Immediate tasks:
1. Run:
   npm install
   npm run doctor
   npm run ship
2. Fix only real build/test/runtime errors.
3. Inspect iExec Nox docs/packages and replace the current nox-compatible adapter with the most realistic working Nox integration feasible in the available time.
   - Prefer official packages/examples from iExec-Nox.
   - If full runtime integration is blocked, keep the adapter but make the limitation explicit in README, nox/production_nox_integration_plan.md, and feedback.md.
4. Deploy `PrivateScratchRegistry.sol` to Ethereum Sepolia using a burner wallet only.
5. Run `npm run commit:sample` to create a real Sepolia transaction.
6. Update all submission files with:
   - Sepolia contract URL;
   - sample tx URL;
   - GitHub URL;
   - GitHub Pages URL;
   - YouTube demo URL if available.
7. Publish to GitHub Pages through the included workflow.
8. Prepare the final X post from `SUBMISSION_READY/FINAL_X_POST.md` and tag `@iEx_ec`.
9. Return a final report with commands run, tests status, contract URL, tx URL, GitHub Pages URL, and remaining manual steps.

Safety:
- Never commit `.env`, private keys, node_modules, dist, artifacts, cache, or generated bundles.
- Use a Sepolia burner wallet only.
- Do not use cloud AI.
- Do not add a backend server.
- Do not promise trading profits.
