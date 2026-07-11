import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const required = [
  'README.md',
  'feedback.md',
  'LICENSE',
  'package.json',
  'vite.config.ts',
  'hardhat.config.ts',
  'contracts/PrivateScratchRegistry.sol',
  'src/App.tsx',
  'src/lib/policy.ts',
  'src/lib/registry.ts',
  'nox/README.md',
  'nox/confidential_policy_flow.md',
  'nox/nox_adapter.ts',
  'docs/architecture.md',
  'docs/privacy-model.md',
  'docs/demo-script.md',
  'docs/submission.md',
  'docs/judge-notes.md',
  'SUBMISSION_READY/CODEX_FINALIZE_PROMPT.md',
  'SUBMISSION_READY/DORAHACKS_FIELDS.md',
  'SUBMISSION_READY/X_POST.md',
  '.github/workflows/pages.yml',
  '.github/workflows/ci.yml'
];

const forbidden = ['.env', 'node_modules', 'dist', 'artifacts', 'cache', 'submission_bundle'];
let ok = true;
let trackedFiles = [];

try {
  trackedFiles = execSync('git ls-files', { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean);
} catch {
  trackedFiles = [];
}

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`MISSING ${file}`);
    ok = false;
  } else {
    console.log(`OK ${file}`);
  }
}
for (const f of forbidden) {
  const tracked = trackedFiles.filter((file) => file === f || file.startsWith(`${f}/`));
  if (tracked.length > 0) {
    console.error(`FORBIDDEN generated/sensitive path tracked in git: ${f}`);
    ok = false;
  }
}

const secretPatterns = [/DEPLOYER_PRIVATE_KEY=0x[a-fA-F0-9]{64}/, /PRIVATE_KEY=0x[a-fA-F0-9]{64}/];
const scanFiles = trackedFiles.length > 0 ? trackedFiles : [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'dist', 'artifacts', 'cache', 'submission_bundle'].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (['.ts', '.tsx', '.js', '.mjs', '.md', '.json', '.env', '.example', '.yml', '.yaml'].some(ext => p.endsWith(ext))) scanFiles.push(p);
  }
}
if (scanFiles.length === 0) walk('.');
for (const file of scanFiles) {
  if (!fs.existsSync(file)) continue;
  if (!['.ts', '.tsx', '.js', '.mjs', '.md', '.json', '.env', '.example', '.yml', '.yaml'].some(ext => file.endsWith(ext))) continue;
  const txt = fs.readFileSync(file, 'utf8');
  for (const re of secretPatterns) {
    if (re.test(txt) && !file.endsWith('.env.example')) {
      console.error(`POSSIBLE SECRET in ${file}`);
      ok = false;
    }
  }
}
if (!ok) process.exit(1);
console.log('\nPrivate Scratch Wallet final check OK.');
