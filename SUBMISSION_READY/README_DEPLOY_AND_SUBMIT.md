# Deploy and Submit Checklist

## 1. Local checks

```bash
npm install
npm run max:local
```

## 2. Sepolia deploy

```bash
cp .env.example .env
# add DEPLOYER_PRIVATE_KEY and optionally ETHERSCAN_API_KEY
npm run deploy:sepolia
npm run after:deploy
```

## 3. Verify if possible

```bash
npm run verify:sepolia
```

## 4. GitHub Pages

```bash
git add .
git commit -m "Build Private Scratch Wallet"
gh repo create private-scratch-wallet --public --source=. --remote=origin --push
```

Then GitHub → Settings → Pages → GitHub Actions.

## 5. Demo video

Use `SUBMISSION_READY/VIDEO_SCRIPT_MUREKA.md` and show:

- private policy builder;
- public vs private view;
- Sepolia commit;
- decision publish;
- read intent;
- feedback.md.

## 6. X submission

Use `SUBMISSION_READY/FINAL_X_POST.md` and tag `@iEx_ec`.
