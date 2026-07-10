import { useMemo, useState } from 'react';
import { Shield, Lock, Wallet, Radio, Eye, EyeOff, CheckCircle2, SkipForward, Square, AlertTriangle } from 'lucide-react';
import { PrivatePolicy, RiskMode, computePolicyCommitment, simulateNoxDecision } from './lib/policy';
import { DEFAULT_REGISTRY_ADDRESS, CommitResult, PublicIntent, commitIntent, connectWallet, explorerAddress, explorerTx, publishDecision, readIntent } from './lib/registry';

const initialPolicy: PrivatePolicy = {
  bankrollUsd: 100,
  maxTradeUsd: 8,
  maxDailyLossUsd: 5,
  riskMode: 'Normal',
  minNetEdgeBps: 35,
  claimShieldEnabled: true,
};

function shortHash(value: string) {
  return value ? `${value.slice(0, 10)}…${value.slice(-8)}` : 'not set';
}

function App() {
  const [policy, setPolicy] = useState<PrivatePolicy>(initialPolicy);
  const [salt, setSalt] = useState('private-scratch-demo-salt');
  const [registryAddress, setRegistryAddress] = useState(DEFAULT_REGISTRY_ADDRESS);
  const [intentId, setIntentId] = useState(1);
  const [commitTx, setCommitTx] = useState('');
  const [decisionTx, setDecisionTx] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [loadedIntent, setLoadedIntent] = useState<PublicIntent | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const commitment = useMemo(() => computePolicyCommitment(policy, salt), [policy, salt]);
  const decision = useMemo(() => simulateNoxDecision(policy), [policy]);

  const update = <K extends keyof PrivatePolicy>(key: K, value: PrivatePolicy[K]) => {
    setPolicy((p) => ({ ...p, [key]: value }));
  };

  async function onConnect() {
    setError(''); setBusy(true);
    try {
      const wallet = await connectWallet();
      setWalletAddress(wallet.address);
      setChainId(wallet.chainId);
    } catch (e: any) { setError(e.message || String(e)); }
    finally { setBusy(false); }
  }

  async function onCommit() {
    setError(''); setBusy(true);
    try {
      const result: CommitResult = await commitIntent(registryAddress, commitment, 'ipfs://private-scratch-wallet/demo-intent');
      setCommitTx(result.hash);
      if (result.intentId) setIntentId(result.intentId);
    } catch (e: any) { setError(e.message || String(e)); }
    finally { setBusy(false); }
  }

  async function onPublish() {
    setError(''); setBusy(true);
    try {
      const tx = await publishDecision(registryAddress, intentId, decision.publicDecisionHash, decision.decisionType, decision.riskTier);
      setDecisionTx(tx);
    } catch (e: any) { setError(e.message || String(e)); }
    finally { setBusy(false); }
  }

  async function onReadIntent() {
    setError(''); setBusy(true);
    try {
      const intent = await readIntent(registryAddress, intentId);
      setLoadedIntent(intent);
    } catch (e: any) { setError(e.message || String(e)); }
    finally { setBusy(false); }
  }

  return (
    <main>
      <section className="hero">
        <div className="pill"><Lock size={16}/> iExec Nox privacy layer concept · Sepolia dApp · no server</div>
        <h1>Private Scratch Wallet</h1>
        <p className="subtitle">Scratch Wallet limits downside. Private Scratch Wallet keeps the downside policy private.</p>
        <div className="grid three">
          <Card icon={<Wallet/>} title="Tiny isolated wallet" text="Users do not expose a valuable main wallet to autonomous execution." />
          <Card icon={<EyeOff/>} title="Confidential policy" text="Bankroll, stop-loss, max trade, risk mode and edge thresholds stay private." />
          <Card icon={<Radio/>} title="Public audit trail" text="Only commitments and final decisions are published to Sepolia." />
        </div>
      </section>

      <section className="panel">
        <h2>1. Confidential Policy Builder</h2>
        <p>These fields represent sensitive autonomous-agent risk policy inputs. In production, Nox confidential contracts / TEE execution would process encrypted policy data without publishing plaintext thresholds.</p>
        <div className="formgrid">
          <label>Bankroll USD <input type="number" value={policy.bankrollUsd} onChange={e => update('bankrollUsd', Number(e.target.value))}/></label>
          <label>Max trade USD <input type="number" value={policy.maxTradeUsd} onChange={e => update('maxTradeUsd', Number(e.target.value))}/></label>
          <label>Max daily loss USD <input type="number" value={policy.maxDailyLossUsd} onChange={e => update('maxDailyLossUsd', Number(e.target.value))}/></label>
          <label>Risk mode
            <select value={policy.riskMode} onChange={e => update('riskMode', e.target.value as RiskMode)}>
              <option>Chicken</option><option>Normal</option><option>Degen</option>
            </select>
          </label>
          <label>Minimum net edge bps <input type="number" value={policy.minNetEdgeBps} onChange={e => update('minNetEdgeBps', Number(e.target.value))}/></label>
          <label className="checkbox"><input type="checkbox" checked={policy.claimShieldEnabled} onChange={e => update('claimShieldEnabled', e.target.checked)}/> Claim Shield enabled</label>
        </div>
      </section>

      <section className="grid two">
        <div className="panel">
          <h2><EyeOff/> Private View</h2>
          <PrivateRow label="Bankroll" value={`$${policy.bankrollUsd}`} />
          <PrivateRow label="Max trade" value={`$${policy.maxTradeUsd}`} />
          <PrivateRow label="Max daily loss" value={`$${policy.maxDailyLossUsd}`} />
          <PrivateRow label="Risk mode" value={policy.riskMode} />
          <PrivateRow label="Minimum net edge" value={`${policy.minNetEdgeBps} bps`} />
          <PrivateRow label="Claim policy" value={policy.claimShieldEnabled ? 'Block unsafe approvals' : 'Unsafe'} />
        </div>
        <div className="panel">
          <h2><Eye/> Public View</h2>
          <p className="muted">Plaintext policy values are not stored on-chain. The public layer sees only a commitment and final decision output.</p>
          <Code label="Policy commitment" value={commitment} />
          <Code label="Public decision hash" value={decision.publicDecisionHash} />
          <div className="decision"><DecisionIcon type={decision.decisionType}/><strong>{decision.decisionType}</strong><span>Risk tier {decision.riskTier}/100</span></div>
          <p>{decision.publicReason}</p>
        </div>
      </section>

      <section className="panel">
        <h2>2. Nox Decision Flow</h2>
        <div className="flow">
          <Step title="Encrypted inputs" text="Risk policy values are treated as private inputs." />
          <Step title="Nox confidential compute" text="TEE-style execution decides play / skip / stop without revealing thresholds." />
          <Step title="Public commitment" text="A policy commitment and decision hash are published." />
          <Step title="Sepolia registry" text="The dApp records auditable outputs in PrivateScratchRegistry." />
        </div>
      </section>

      <section className="panel">
        <h2>3. Sepolia Registry</h2>
        <p>Deploy <code>PrivateScratchRegistry</code> with Hardhat, paste the address here, then commit an intent and publish the public decision.</p>
        <div className="actions">
          <button disabled={busy} onClick={onConnect}>{walletAddress ? 'Wallet connected' : 'Connect Sepolia wallet'}</button>
          {walletAddress && <span className="wallet-chip">{shortHash(walletAddress)} · chain {chainId}</span>}
        </div>
        <label>Registry address
          <input value={registryAddress} onChange={e => setRegistryAddress(e.target.value)} placeholder="0x..." />
        </label>
        {registryAddress && <p><a href={explorerAddress(registryAddress)} target="_blank">Open contract on Sepolia Etherscan</a></p>}
        <label>Intent ID for decision publication <input type="number" value={intentId} onChange={e => setIntentId(Number(e.target.value))}/></label>
        <div className="actions">
          <button disabled={!registryAddress || busy} onClick={onCommit}>Commit confidential intent</button>
          <button disabled={!registryAddress || busy} onClick={onPublish}>Publish public decision</button>
          <button disabled={!registryAddress || busy} onClick={onReadIntent}>Read public intent</button>
        </div>
        {commitTx && <p><CheckCircle2/> Commit tx: <a href={explorerTx(commitTx)} target="_blank">{shortHash(commitTx)}</a></p>}
        {decisionTx && <p><CheckCircle2/> Decision tx: <a href={explorerTx(decisionTx)} target="_blank">{shortHash(decisionTx)}</a></p>}
        {loadedIntent && <div className="intent-card">
          <strong>Public intent #{loadedIntent.intentId}</strong>
          <Code label="owner" value={loadedIntent.user} />
          <Code label="encryptedPolicyHash" value={loadedIntent.encryptedPolicyHash} />
          <Code label="publicDecisionHash" value={loadedIntent.publicDecisionHash} />
          <p>decisionType {loadedIntent.decisionType} · riskTier {loadedIntent.riskTier} · reportURI {loadedIntent.reportURI || 'none'}</p>
        </div>}
        {error && <p className="error"><AlertTriangle/> {error}</p>}
      </section>

      <section className="panel">
        <h2>Submission Notes</h2>
        <ul>
          <li>No backend server: this dApp is static and GitHub Pages-ready.</li>
          <li>No profit promise: the project is about confidential bounded downside policies.</li>
          <li>Built as a Nox privacy extension of the Scratch Wallet concept.</li>
          <li>Includes <code>feedback.md</code>, Sepolia contract, docs, and demo script.</li>
        </ul>
      </section>
    </main>
  );
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="card"><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>;
}

function PrivateRow({ label, value }: { label: string; value: string }) {
  return <div className="private-row"><span>{label}</span><strong>{value}</strong></div>;
}

function Code({ label, value }: { label: string; value: string }) {
  return <div className="code"><span>{label}</span><code>{value}</code></div>;
}

function Step({ title, text }: { title: string; text: string }) {
  return <div className="step"><Lock size={18}/><strong>{title}</strong><span>{text}</span></div>;
}

function DecisionIcon({ type }: { type: string }) {
  if (type === 'PLAY') return <CheckCircle2/>;
  if (type === 'SKIP') return <SkipForward/>;
  if (type === 'STOP') return <Square/>;
  return <Shield/>;
}

export default App;
