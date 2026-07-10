import fs from 'fs';

const required = [
  'README.md',
  'feedback.md',
  'contracts/PrivateScratchRegistry.sol',
  'src/main.tsx',
  'src/App.tsx',
  'nox/README.md',
  'docs/privacy-model.md',
  '.github/workflows/pages.yml',
  'LICENSE'
];

let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error('Missing:', file);
    ok = false;
  } else {
    console.log('OK:', file);
  }
}

if (!ok) process.exit(1);
console.log('Private Scratch Wallet preflight OK.');
