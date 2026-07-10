const { expect } = require('chai');
const hre = require('hardhat');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');

const { ethers } = hre;

describe('PrivateScratchRegistry', function () {
  async function deployFixture() {
    const [user, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('PrivateScratchRegistry');
    const registry = await Factory.deploy();
    await registry.waitForDeployment();
    return { registry, user, other };
  }

  it('commits an intent and publishes a decision', async function () {
    const { registry, user } = await deployFixture();
    const policyHash = ethers.keccak256(ethers.toUtf8Bytes('private-policy'));
    const decisionHash = ethers.keccak256(ethers.toUtf8Bytes('skip'));

    await expect(registry.commitIntent(policyHash, 'ipfs://demo'))
      .to.emit(registry, 'IntentCommitted')
      .withArgs(1, user.address, policyHash, anyValue, 'ipfs://demo');

    await expect(registry.publishDecision(1, decisionHash, 2, 42))
      .to.emit(registry, 'DecisionPublished');

    const intent = await registry.getIntent(1);
    expect(intent.user).to.equal(user.address);
    expect(intent.encryptedPolicyHash).to.equal(policyHash);
    expect(intent.publicDecisionHash).to.equal(decisionHash);
    expect(intent.decisionType).to.equal(2n);
    expect(intent.riskTier).to.equal(42n);

    const ids = await registry.getIntentIdsByUser(user.address);
    expect(ids.map(Number)).to.deep.equal([1]);
  });

  it('emits WalletStopped for STOP decisions', async function () {
    const { registry, user } = await deployFixture();
    const policyHash = ethers.keccak256(ethers.toUtf8Bytes('private-policy'));
    const decisionHash = ethers.keccak256(ethers.toUtf8Bytes('stop'));
    await registry.commitIntent(policyHash, 'ipfs://demo');
    await expect(registry.stopWallet(1, decisionHash))
      .to.emit(registry, 'WalletStopped')
      .withArgs(1, user.address, decisionHash, anyValue);
  });

  it('rejects empty policy hashes', async function () {
    const { registry } = await deployFixture();
    await expect(registry.commitIntent(ethers.ZeroHash, '')).to.be.revertedWithCustomError(registry, 'EmptyPolicyHash');
  });

  it('rejects non-owners and invalid risk tiers', async function () {
    const { registry, other } = await deployFixture();
    const policyHash = ethers.keccak256(ethers.toUtf8Bytes('private-policy'));
    const decisionHash = ethers.keccak256(ethers.toUtf8Bytes('play'));
    await registry.commitIntent(policyHash, 'ipfs://demo');

    await expect(registry.connect(other).publishDecision(1, decisionHash, 1, 20))
      .to.be.revertedWithCustomError(registry, 'NotIntentOwner');

    await expect(registry.publishDecision(1, decisionHash, 1, 101))
      .to.be.revertedWithCustomError(registry, 'InvalidRiskTier');
  });
});
