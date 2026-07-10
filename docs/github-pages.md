# GitHub Pages deployment

The app is static and serverless.

## Repository settings

1. Push the repo to GitHub.
2. Go to Settings → Pages.
3. Source: GitHub Actions.
4. The workflow `.github/workflows/pages.yml` builds the Vite app and deploys `dist/`.

## Vite base path

The Vite config is prepared for a repository named `private-scratch-wallet`. If you rename the repo, update `vite.config.ts` base path.

## Public environment value

GitHub Pages builds can expose non-secret values with `VITE_` variables. Do not put private keys in GitHub Pages.

If needed, put the deployed registry address directly in `.env.production` or GitHub Actions variables:

```env
VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x...
```
