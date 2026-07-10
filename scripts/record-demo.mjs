import fs from 'fs';
import { spawn } from 'child_process';

const out = 'demo_recording_notes';
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(`${out}/voiceover.txt`, `Private Scratch Wallet keeps autonomous DeFi risk policies private.\n\nUsers define bankroll, max trade size, max daily loss, risk mode, and execution thresholds. These values are sensitive: if public, they can be copied, gamed, or attacked.\n\nThe dApp generates a confidential policy commitment, shows what remains private, and publishes only auditable decisions on Ethereum Sepolia.\n\nScratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.\n`);
fs.writeFileSync(`${out}/shot_list.md`, `# Demo shot list\n\n1. Landing page: Private Scratch Wallet.\n2. Confidential Policy Builder: change risk mode and max daily loss.\n3. Public vs Private View: show private fields versus public commitment.\n4. Nox Decision Flow: explain confidential compute.\n5. Sepolia Registry: connect wallet, commit intent, publish decision.\n6. Open Sepolia explorer links.\n7. Close with feedback.md and GitHub repo.\n`);
console.log('Demo notes generated in demo_recording_notes/. Use OBS/Loom, or add Playwright if you want automated browser recording.');
