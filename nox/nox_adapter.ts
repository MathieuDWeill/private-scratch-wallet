import { ethers } from 'ethers';

export type PrivateRiskPolicy = {
  bankrollUsd: number;
  maxTradeUsd: number;
  maxDailyLossUsd: number;
  riskMode: 'Chicken' | 'Normal' | 'Degen';
  minNetEdgeBps: number;
  claimShieldEnabled: boolean;
};

export type PublicNoxDecision = {
  encryptedPolicyHash: string;
  publicDecisionHash: string;
  decisionType: 'PLAY' | 'SKIP' | 'STOP' | 'BLOCKED_CLAIM';
  riskTier: number;
};

export async function evaluatePolicyWithNoxAdapter(policy: PrivateRiskPolicy, salt: string): Promise<PublicNoxDecision> {
  // Private policy inputs enter the confidential boundary here.
  // Production replacement point: encrypt `policy` client-side, submit the ciphertext
  // to iExec Nox confidential execution, and return only the public outputs below.
  const encryptedPolicyHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(policy) + salt));
  const decision = confidentialEvaluatePolicy(policy);
  const publicDecisionHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(decision)));
  return { encryptedPolicyHash, publicDecisionHash, ...decision };
}

function confidentialEvaluatePolicy(policy: PrivateRiskPolicy): Omit<PublicNoxDecision, 'encryptedPolicyHash' | 'publicDecisionHash'> {
  // Nox replacement point: move this deterministic policy evaluation into the
  // confidential runtime so bankroll, limits, thresholds, and claim rules are
  // never emitted to Sepolia or any public API.
  if (!policy.claimShieldEnabled) return { decisionType: 'BLOCKED_CLAIM', riskTier: 88 };
  if (policy.maxDailyLossUsd > policy.bankrollUsd * 0.25) return { decisionType: 'STOP', riskTier: 100 };
  if (policy.riskMode === 'Chicken') return { decisionType: 'SKIP', riskTier: 25 };
  if (policy.minNetEdgeBps < 50 && policy.maxTradeUsd <= policy.bankrollUsd * 0.1) return { decisionType: 'PLAY', riskTier: 38 };
  return { decisionType: 'SKIP', riskTier: 55 };
}
