import fs from 'fs';

const required = [
  'README.md',
  'feedback.md',
  'contracts/PrivateScratchRegistry.sol',
  'docs/privacy-model.md',
  'nox/README.md',
  'SUBMISSION_READY/FINAL_X_POST.md',
];
let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error('Missing required file:', file);
    ok = false;
  }
}

if (!fs.existsSync('deployment/sepolia.json')) {
  console.warn('deployment/sepolia.json not found yet. This is expected before real Sepolia deployment.');
} else {
  const dep = JSON.parse(fs.readFileSync('deployment/sepolia.json', 'utf8'));
  if (!/^0x[a-fA-F0-9]{40}$/.test(dep.address || '')) {
    console.error('Invalid deployment address in deployment/sepolia.json');
    ok = false;
  }
  if (String(dep.chainId) !== '11155111') {
    console.error('deployment/sepolia.json chainId must be 11155111');
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('Sepolia readiness check passed.');
