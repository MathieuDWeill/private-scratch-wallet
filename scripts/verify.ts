import hardhat from 'hardhat';
import fs from 'fs';
import path from 'path';

const { run } = hardhat;

async function main() {
  const deploymentPath = path.join(process.cwd(), 'deployment', 'sepolia.json');
  if (!fs.existsSync(deploymentPath)) {
    throw new Error('deployment/sepolia.json not found. Run npm run deploy:sepolia first.');
  }
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
  if (!deployment.address) throw new Error('Missing deployment.address');

  console.log('Verifying PrivateScratchRegistry at', deployment.address);
  await run('verify:verify', {
    address: deployment.address,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
