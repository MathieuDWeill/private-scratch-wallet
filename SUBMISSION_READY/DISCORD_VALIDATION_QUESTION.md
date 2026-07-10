# Discord validation question for iExec WTF channel

Hi iExec team — I’m building **Private Scratch Wallet** for the WTF Hackathon.

The idea is to add a Nox privacy layer to a risk-capped autonomous DeFi micro-wallet. The sensitive agent policy includes bankroll, max trade size, max daily loss, risk mode, minimum edge threshold, and claim-safety rules. The dApp keeps those policy values private and publishes only a commitment plus a public decision hash to a Sepolia registry.

Architecture:
- Static GitHub Pages dApp, no backend.
- Ethereum Sepolia registry contract.
- Nox-style confidential policy flow: private risk policy → confidential decision computation → public commitment / decision output.
- Goal: show how autonomous DeFi agents can be auditable without revealing risk thresholds.

Does this direction fit the WTF Hackathon expectations for using Nox to add privacy to an existing DeFi/autonomous-agent style protocol? Any specific Nox package or example you recommend I prioritize for the final integration?
