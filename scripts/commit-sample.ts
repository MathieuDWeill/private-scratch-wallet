import hardhat from 'hardhat';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { ethers } = hardhat;

function registryAddress() {
  if (process.env.PRIVATE_SCRATCH_REGISTRY_ADDRESS && ethers.isAddress(process.env.PRIVATE_SCRATCH_REGISTRY_ADDRESS)) {
    return process.env.PRIVATE_SCRATCH_REGISTRY_ADDRESS;
  }
  const deploymentPath = path.join(process.cwd(), 'deployment', 'sepolia.json');
  if (!fs.existsSync(deploymentPath)) return '';
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
  return deployment.address || '';
}

async function main() {
  const ADDRESS = registryAddress();
  if (!ADDRESS) throw new Error('Set PRIVATE_SCRATCH_REGISTRY_ADDRESS in .env');
  const [signer] = await ethers.getSigners();
  const registry = await ethers.getContractAt('PrivateScratchRegistry', ADDRESS, signer);

  const policyCommitment = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify({
    project: 'Private Scratch Wallet',
    privateFields: ['bankroll', 'maxTradeSize', 'maxDailyLoss', 'riskMode', 'minimumNetEdge'],
    generatedAt: new Date().toISOString()
  })));

  const tx = await registry.commitIntent(policyCommitment, 'ipfs://private-scratch-wallet/demo-policy');
  const receipt = await tx.wait();
  console.log('Committed intent tx:', receipt?.hash);

  const intentId = parseIntentId(registry, receipt);
  if (!intentId) throw new Error('Could not parse IntentCommitted intentId from receipt');
  console.log('Committed intent id:', intentId.toString());

  const decisionHash = ethers.keccak256(ethers.toUtf8Bytes('SKIP: edge died after slippage; policy remained confidential'));
  const tx2 = await registry.publishDecision(intentId, decisionHash, 2, 42); // 2 = SKIP
  const receipt2 = await tx2.wait();
  console.log('Published decision tx:', receipt2?.hash);
}

function parseIntentId(registry: any, receipt: any) {
  for (const log of receipt?.logs || []) {
    try {
      const parsed = registry.interface.parseLog(log);
      if (parsed?.name === 'IntentCommitted') return parsed.args.intentId;
    } catch {
      // Ignore unrelated logs.
    }
  }
  return 0n;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
