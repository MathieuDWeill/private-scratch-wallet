# Operator Manual

## 1. Local

```bash
npm install
npm run ship
```

## 2. Sepolia deploy

Use a burner wallet only.

```bash
cp .env.example .env
# edit .env
npm run deploy:sepolia
```

## 3. Commit sample

```bash
PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x... npm run commit:sample
```

## 4. GitHub Pages

GitHub Pages is deployed from GitHub Actions:

```text
https://mathieudweill.github.io/private-scratch-wallet/
```

## 5. Demo video

Record under 4 minutes:

1. Landing.
2. Policy builder.
3. Public vs private view.
4. Nox flow.
5. Commit to Sepolia.
6. Publish decision.
7. Show explorer.
8. Show feedback.md.

## 6. X post

Use `SUBMISSION_READY/X_POST.md` and tag `@iEx_ec`.
