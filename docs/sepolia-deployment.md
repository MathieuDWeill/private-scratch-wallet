# Sepolia deployment guide

This project has no backend server. The only required deployment for the hackathon is the Ethereum Sepolia contract plus the GitHub Pages static frontend.

## 1. Create a burner wallet

Use a dedicated Sepolia-only burner wallet. Never use a wallet holding real funds.

## 2. Fund with Sepolia ETH

Use a Sepolia faucet. Keep just enough test ETH for deployment and a few transactions.

## 3. Configure `.env`

```bash
cp .env.example .env
```

Set:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
DEPLOYER_PRIVATE_KEY=0xYOUR_SEPOLIA_BURNER_PRIVATE_KEY
PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x33145C082811c5E88ce055DAD816aE540a89da94
VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x33145C082811c5E88ce055DAD816aE540a89da94
```

## 4. Deploy

```bash
npm install
npm run compile
npm run test
npm run deploy:sepolia
```

Copy the deployed address into `.env`:

```env
PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x...
VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS=0x...
```

## 5. Commit a sample intent

```bash
npm run commit:sample
```

## 6. Update docs

Add the contract and transaction links to:

- `README.md`
- `SUBMISSION_READY/DORAHACKS_FIELDS.md`
- `SUBMISSION_READY/README_FOR_JUDGES.md`
- `SUBMISSION_READY/FINAL_X_POST.md`
