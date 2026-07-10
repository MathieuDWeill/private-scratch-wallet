import { ethers } from 'ethers';
import { decisionEnum, DecisionType } from './policy';
import { DEPLOYMENT } from '../generated/deployment';

export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_CHAIN_ID_HEX = '0xaa36a7';

export const REGISTRY_ABI = [
  'function commitIntent(bytes32 encryptedPolicyHash,string reportURI) external returns (uint256)',
  'function publishDecision(uint256 intentId,bytes32 publicDecisionHash,uint8 decisionType,uint8 riskTier) external',
  'function stopWallet(uint256 intentId,bytes32 publicDecisionHash) external',
  'function getIntent(uint256 intentId) external view returns (tuple(uint256 intentId,address user,bytes32 encryptedPolicyHash,bytes32 publicDecisionHash,uint8 decisionType,uint8 riskTier,uint64 createdAt,uint64 updatedAt,string reportURI,bool exists))',
  'function getIntentIdsByUser(address user) external view returns (uint256[])',
  'event IntentCommitted(uint256 indexed intentId,address indexed user,bytes32 indexed encryptedPolicyHash,uint64 createdAt,string reportURI)',
  'event DecisionPublished(uint256 indexed intentId,address indexed user,uint8 decisionType,uint8 riskTier,bytes32 publicDecisionHash,uint64 updatedAt)',
  'event WalletStopped(uint256 indexed intentId,address indexed user,bytes32 publicDecisionHash,uint64 updatedAt)'
] as const;

export const DEFAULT_REGISTRY_ADDRESS = import.meta.env.VITE_PRIVATE_SCRATCH_REGISTRY_ADDRESS || DEPLOYMENT.address || '';

export interface WalletState {
  address: string;
  chainId: number;
}

export interface CommitResult {
  hash: string;
  intentId?: number;
}

export interface PublicIntent {
  intentId: number;
  user: string;
  encryptedPolicyHash: string;
  publicDecisionHash: string;
  decisionType: number;
  riskTier: number;
  createdAt: number;
  updatedAt: number;
  reportURI: string;
  exists: boolean;
}

declare global {
  interface Window { ethereum?: any }
}

export function hasWallet() {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}

export async function connectWallet(): Promise<WalletState> {
  if (!window.ethereum) throw new Error('MetaMask or another EIP-1193 wallet is required.');
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  await ensureSepolia(provider);
  const signer = await provider.getSigner();
  const network = await provider.getNetwork();
  return { address: await signer.getAddress(), chainId: Number(network.chainId) };
}

export async function ensureSepolia(provider?: ethers.BrowserProvider) {
  if (!window.ethereum) throw new Error('MetaMask or another EIP-1193 wallet is required.');
  const browserProvider = provider || new ethers.BrowserProvider(window.ethereum);
  const network = await browserProvider.getNetwork();
  if (Number(network.chainId) === SEPOLIA_CHAIN_ID) return;
  try {
    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }] });
  } catch (switchError: any) {
    if (switchError?.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: SEPOLIA_CHAIN_ID_HEX,
          chainName: 'Ethereum Sepolia',
          nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
          rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
          blockExplorerUrls: ['https://sepolia.etherscan.io']
        }]
      });
      return;
    }
    throw switchError;
  }
}

export async function getBrowserSigner() {
  if (!window.ethereum) throw new Error('MetaMask or another EIP-1193 wallet is required.');
  const provider = new ethers.BrowserProvider(window.ethereum);
  await ensureSepolia(provider);
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
}

export async function commitIntent(registryAddress: string, commitment: string, reportURI: string): Promise<CommitResult> {
  assertAddress(registryAddress);
  const signer = await getBrowserSigner();
  const registry = new ethers.Contract(registryAddress, REGISTRY_ABI, signer);
  const tx = await registry.commitIntent(commitment, reportURI);
  const receipt = await tx.wait();
  const intentId = parseIntentIdFromReceipt(registry, receipt);
  return { hash: receipt?.hash as string, intentId };
}

export async function publishDecision(
  registryAddress: string,
  intentId: number,
  decisionHash: string,
  decisionType: DecisionType,
  riskTier: number
): Promise<string> {
  assertAddress(registryAddress);
  const signer = await getBrowserSigner();
  const registry = new ethers.Contract(registryAddress, REGISTRY_ABI, signer);
  const tx = await registry.publishDecision(intentId, decisionHash, decisionEnum(decisionType), riskTier);
  const receipt = await tx.wait();
  return receipt?.hash as string;
}

export async function readIntent(registryAddress: string, intentId: number): Promise<PublicIntent> {
  assertAddress(registryAddress);
  const signer = await getBrowserSigner();
  const registry = new ethers.Contract(registryAddress, REGISTRY_ABI, signer);
  const raw = await registry.getIntent(intentId);
  return {
    intentId: Number(raw.intentId),
    user: raw.user,
    encryptedPolicyHash: raw.encryptedPolicyHash,
    publicDecisionHash: raw.publicDecisionHash,
    decisionType: Number(raw.decisionType),
    riskTier: Number(raw.riskTier),
    createdAt: Number(raw.createdAt),
    updatedAt: Number(raw.updatedAt),
    reportURI: raw.reportURI,
    exists: raw.exists,
  };
}

function parseIntentIdFromReceipt(registry: ethers.Contract, receipt: ethers.TransactionReceipt | null): number | undefined {
  if (!receipt) return undefined;
  for (const log of receipt.logs) {
    try {
      const parsed = registry.interface.parseLog(log);
      if (parsed?.name === 'IntentCommitted') return Number(parsed.args.intentId);
    } catch { /* ignore unrelated logs */ }
  }
  return undefined;
}

function assertAddress(address: string) {
  if (!ethers.isAddress(address)) throw new Error('Paste a valid deployed PrivateScratchRegistry address first.');
}

export function explorerTx(hash: string) {
  return `https://sepolia.etherscan.io/tx/${hash}`;
}

export function explorerAddress(address: string) {
  return `https://sepolia.etherscan.io/address/${address}`;
}
