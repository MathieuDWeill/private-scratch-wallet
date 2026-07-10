import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

function ok(msg){ console.log(`✅ ${msg}`); }
function warn(msg){ console.log(`⚠️  ${msg}`); }
function fail(msg){ console.error(`❌ ${msg}`); process.exitCode = 1; }

console.log('Private Scratch Wallet doctor\n');

const required = [
  'README.md','feedback.md','package.json','contracts/PrivateScratchRegistry.sol',
  'src/App.tsx','nox/README.md','SUBMISSION_READY/CODEX_FINALIZE_PROMPT.md',
  '.github/workflows/pages.yml'
];
for (const f of required) existsSync(f) ? ok(`${f} present`) : fail(`${f} missing`);

const pkg = JSON.parse(readFileSync('package.json','utf8'));
for (const s of ['dev','build','compile','test','deploy:sepolia','ship']) {
  pkg.scripts?.[s] ? ok(`npm script ${s} present`) : fail(`npm script ${s} missing`);
}

try { execSync('git status --short', {stdio:'pipe'}); ok('git available'); } catch { warn('not a git repo yet'); }

if (existsSync('.env')) {
  const env = readFileSync('.env','utf8');
  if (/PRIVATE_KEY=0x[a-fA-F0-9]{64}/.test(env)) warn('.env contains a private key locally; ensure it is never committed');
  else ok('.env present without detected private key format');
} else warn('.env not present yet; copy .env.example before Sepolia deploy');

console.log('\nNext: npm install && npm run ship');
