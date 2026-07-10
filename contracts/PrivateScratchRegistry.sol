// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title PrivateScratchRegistry
/// @notice Public Sepolia registry for confidential autonomous DeFi risk-policy commitments.
/// @dev Sensitive policy values are never stored in plaintext. The contract stores commitments
///      and public decision hashes, mirroring how a Nox confidential policy flow can publish
///      auditable outputs without revealing raw bankroll, stop-loss, or strategy thresholds.
contract PrivateScratchRegistry {
    enum DecisionType {
        NONE,
        PLAY,
        SKIP,
        STOP,
        BLOCKED_CLAIM
    }

    struct Intent {
        uint256 intentId;
        address user;
        bytes32 encryptedPolicyHash;
        bytes32 publicDecisionHash;
        DecisionType decisionType;
        uint8 riskTier;
        uint64 createdAt;
        uint64 updatedAt;
        string reportURI;
        bool exists;
    }

    uint256 public nextIntentId = 1;
    mapping(uint256 => Intent) private intents;
    mapping(address => uint256[]) private intentsByUser;

    event IntentCommitted(
        uint256 indexed intentId,
        address indexed user,
        bytes32 indexed encryptedPolicyHash,
        uint64 createdAt,
        string reportURI
    );

    event DecisionPublished(
        uint256 indexed intentId,
        address indexed user,
        DecisionType decisionType,
        uint8 riskTier,
        bytes32 publicDecisionHash,
        uint64 updatedAt
    );

    event WalletStopped(
        uint256 indexed intentId,
        address indexed user,
        bytes32 publicDecisionHash,
        uint64 updatedAt
    );

    error IntentNotFound(uint256 intentId);
    error NotIntentOwner(uint256 intentId, address caller);
    error EmptyPolicyHash();
    error EmptyDecisionHash();
    error InvalidRiskTier(uint8 riskTier);

    function commitIntent(bytes32 encryptedPolicyHash, string calldata reportURI) external returns (uint256 intentId) {
        if (encryptedPolicyHash == bytes32(0)) revert EmptyPolicyHash();

        intentId = nextIntentId++;
        uint64 nowTs = uint64(block.timestamp);

        intents[intentId] = Intent({
            intentId: intentId,
            user: msg.sender,
            encryptedPolicyHash: encryptedPolicyHash,
            publicDecisionHash: bytes32(0),
            decisionType: DecisionType.NONE,
            riskTier: 0,
            createdAt: nowTs,
            updatedAt: nowTs,
            reportURI: reportURI,
            exists: true
        });

        intentsByUser[msg.sender].push(intentId);
        emit IntentCommitted(intentId, msg.sender, encryptedPolicyHash, nowTs, reportURI);
    }

    function publishDecision(
        uint256 intentId,
        bytes32 publicDecisionHash,
        DecisionType decisionType,
        uint8 riskTier
    ) external {
        Intent storage intent = _ownedIntent(intentId);
        if (publicDecisionHash == bytes32(0)) revert EmptyDecisionHash();
        if (riskTier > 100) revert InvalidRiskTier(riskTier);
        require(decisionType != DecisionType.NONE, "decision required");

        intent.publicDecisionHash = publicDecisionHash;
        intent.decisionType = decisionType;
        intent.riskTier = riskTier;
        intent.updatedAt = uint64(block.timestamp);

        emit DecisionPublished(intentId, msg.sender, decisionType, riskTier, publicDecisionHash, intent.updatedAt);

        if (decisionType == DecisionType.STOP) {
            emit WalletStopped(intentId, msg.sender, publicDecisionHash, intent.updatedAt);
        }
    }

    function stopWallet(uint256 intentId, bytes32 publicDecisionHash) external {
        Intent storage intent = _ownedIntent(intentId);
        if (publicDecisionHash == bytes32(0)) revert EmptyDecisionHash();

        intent.publicDecisionHash = publicDecisionHash;
        intent.decisionType = DecisionType.STOP;
        intent.riskTier = 100;
        intent.updatedAt = uint64(block.timestamp);

        emit DecisionPublished(intentId, msg.sender, DecisionType.STOP, 100, publicDecisionHash, intent.updatedAt);
        emit WalletStopped(intentId, msg.sender, publicDecisionHash, intent.updatedAt);
    }

    function getIntent(uint256 intentId) external view returns (Intent memory) {
        if (!intents[intentId].exists) revert IntentNotFound(intentId);
        return intents[intentId];
    }

    function getIntentIdsByUser(address user) external view returns (uint256[] memory) {
        return intentsByUser[user];
    }

    function _ownedIntent(uint256 intentId) internal view returns (Intent storage intent) {
        intent = intents[intentId];
        if (!intent.exists) revert IntentNotFound(intentId);
        if (intent.user != msg.sender) revert NotIntentOwner(intentId, msg.sender);
    }
}
