# Deploy and Submit Checklist

## 1. Local checks

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm run max:local
```

## 2. Sepolia deployment

Current deployed contract:

```text
0x33145C082811c5E88ce055DAD816aE540a89da94
```

Explorer:

```text
https://sepolia.etherscan.io/address/0x33145C082811c5E88ce055DAD816aE540a89da94
```

Sample transactions:

- commitIntent: https://sepolia.etherscan.io/tx/0xacb0662e5ec058ef664fbcd99869988cca71c4ffadbe770f4c03b62b41b96109
- publishDecision: https://sepolia.etherscan.io/tx/0x2543771ad364220b9172a86eea2373556e74454ab89920aeeba5499bd3cd98e5

## 3. GitHub Pages

GitHub Pages is enabled from Actions and deployed at:

```text
https://mathieudweill.github.io/private-scratch-wallet/
```

## 4. Demo video

Use `SUBMISSION_READY/VIDEO_SCRIPT_MUREKA.md` or `docs/demo-script.md`.
Keep the video under 4 minutes and show:

- private policy builder;
- public vs private view;
- Nox-compatible confidential boundary;
- official Nox audit file;
- Sepolia contract;
- sample commit and decision transactions;
- `feedback.md`.

## 5. X submission

Use `SUBMISSION_READY/FINAL_X_POST.md` and tag `@iEx_ec`.
