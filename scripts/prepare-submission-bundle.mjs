import fs from 'fs';
import path from 'path';

const out = 'submission_bundle';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const copy = (src, dst = src) => {
  const target = path.join(out, dst);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(src, target);
};
const files = [
  'README.md', 'feedback.md', 'LICENSE',
  'docs/architecture.md', 'docs/privacy-model.md', 'docs/demo-script.md', 'docs/submission.md', 'docs/judge-notes.md',
  'SUBMISSION_READY/DORAHACKS_FIELDS.md', 'SUBMISSION_READY/X_POST.md', 'SUBMISSION_READY/CODEX_FINALIZE_PROMPT.md', 'SUBMISSION_READY/README_FOR_JUDGES.md',
  'contracts/PrivateScratchRegistry.sol', 'nox/README.md', 'nox/confidential_policy_flow.md', 'nox/production_nox_integration_plan.md'
];
for (const f of files) if (fs.existsSync(f)) copy(f);
const manifest = {
  project: 'Private Scratch Wallet',
  builder: 'Mathieu D. WEILL',
  hackathon: 'iExec WTF Hackathon Summer Edition',
  required_next_steps: [
    'Deploy PrivateScratchRegistry to Ethereum Sepolia',
    'Set VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS for GitHub Pages build',
    'Publish GitHub Pages',
    'Record 4-minute max demo video',
    'Post on X tagging @iEx_ec with GitHub and demo links'
  ]
};
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Submission bundle prepared in ${out}/`);
