import { ethers } from 'ethers';

export type RiskMode = 'Chicken' | 'Normal' | 'Degen';
export type DecisionType = 'PLAY' | 'SKIP' | 'STOP' | 'BLOCKED_CLAIM';

export interface PrivatePolicy {
  bankrollUsd: number;
  maxTradeUsd: number;
  maxDailyLossUsd: number;
  riskMode: RiskMode;
  minNetEdgeBps: number;
  claimShieldEnabled: boolean;
}

export interface PublicDecision {
  decisionType: DecisionType;
  riskTier: number;
  publicReason: string;
  publicDecisionHash: string;
}

export function canonicalPolicy(policy: PrivatePolicy): string {
  return JSON.stringify({
    bankrollUsd: Number(policy.bankrollUsd.toFixed(2)),
    maxTradeUsd: Number(policy.maxTradeUsd.toFixed(2)),
    maxDailyLossUsd: Number(policy.maxDailyLossUsd.toFixed(2)),
    riskMode: policy.riskMode,
    minNetEdgeBps: Math.round(policy.minNetEdgeBps),
    claimShieldEnabled: policy.claimShieldEnabled,
  });
}

export function computePolicyCommitment(policy: PrivatePolicy, salt: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(`${canonicalPolicy(policy)}::${salt}`));
}

export function simulateNoxDecision(policy: PrivatePolicy): PublicDecision {
  const tooRisky = policy.maxDailyLossUsd > policy.bankrollUsd * 0.25 || policy.maxTradeUsd > policy.bankrollUsd * 0.5;
  const edgeTooHigh = policy.minNetEdgeBps > 120;
  const claimUnsafe = !policy.claimShieldEnabled;

  let decisionType: DecisionType = 'SKIP';
  let riskTier = 42;
  let publicReason = 'Skipped: confidential policy rejected the opportunity after slippage and bankroll checks.';

  if (claimUnsafe) {
    decisionType = 'BLOCKED_CLAIM';
    riskTier = 88;
    publicReason = 'Blocked: claim safety rule was not satisfied.';
  } else if (tooRisky) {
    decisionType = 'STOP';
    riskTier = 100;
    publicReason = 'Stopped: private bankroll policy detected excessive downside.';
  } else if (!edgeTooHigh && policy.riskMode !== 'Chicken') {
    decisionType = 'PLAY';
    riskTier = policy.riskMode === 'Degen' ? 71 : 38;
    publicReason = 'Played: opportunity survived private risk checks without revealing thresholds.';
  }

  const publicDecisionHash = ethers.keccak256(ethers.toUtf8Bytes(`${decisionType}:${riskTier}:${publicReason}`));
  return { decisionType, riskTier, publicReason, publicDecisionHash };
}

export function decisionEnum(decision: DecisionType): number {
  return { PLAY: 1, SKIP: 2, STOP: 3, BLOCKED_CLAIM: 4 }[decision];
}
