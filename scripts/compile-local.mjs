import fs from 'fs';
import path from 'path';
import solc from 'solc';

const sourceName = 'contracts/PrivateScratchRegistry.sol';
const contractName = 'PrivateScratchRegistry';
const source = fs.readFileSync(sourceName, 'utf8');
const input = {
  language: 'Solidity',
  sources: { [sourceName]: { content: source } },
  settings: {
    optimizer: { enabled: true, runs: 200 },
    outputSelection: { '*': { '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'metadata'] } }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const errors = output.errors || [];
for (const err of errors) {
  const line = err.severity === 'error' ? console.error : console.warn;
  line(`${err.severity}: ${err.formattedMessage}`);
}
if (errors.some((e) => e.severity === 'error')) process.exit(1);
const c = output.contracts[sourceName][contractName];
const artifact = {
  _format: 'hh-sol-artifact-1',
  contractName,
  sourceName,
  abi: c.abi,
  bytecode: `0x${c.evm.bytecode.object}`,
  deployedBytecode: `0x${c.evm.deployedBytecode.object}`,
  linkReferences: {},
  deployedLinkReferences: {}
};
const outDir = path.join('artifacts', 'contracts', 'PrivateScratchRegistry.sol');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'PrivateScratchRegistry.json'), JSON.stringify(artifact, null, 2));
fs.mkdirSync('src/generated', { recursive: true });
fs.writeFileSync('src/generated/PrivateScratchRegistry.abi.json', JSON.stringify(c.abi, null, 2));
console.log('Compiled with local solc-js and wrote Hardhat-compatible artifact.');
