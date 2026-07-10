// Lightweight static smoke check for CI environments without a browser.
import fs from 'fs';

const files = ['src/App.tsx', 'src/lib/policy.ts', 'src/lib/registry.ts'];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const needle of ['Private Scratch Wallet']) {
    if (file === 'src/App.tsx' && !text.includes(needle)) {
      throw new Error(`${file} does not include ${needle}`);
    }
  }
}
console.log('UI smoke check passed.');
