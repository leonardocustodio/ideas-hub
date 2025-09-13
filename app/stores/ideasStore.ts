import { defineStore } from 'pinia';

interface IdeasState {
  ideas: Idea[];
  loading: boolean;
}

export const useIdeasStore = defineStore('ideas', () => {
  // State
  const state = ref<IdeasState>({
  ideas: [
    {
      id: '1',
      name: 'Polkadot Mobile Wallet SDK',
      description: 'A comprehensive SDK for building mobile wallets that interact seamlessly with the Polkadot ecosystem. This would lower the barrier for developers to create user-friendly mobile applications.',
      links: ['https://docs.polkadot.network/'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 24,
      hasVoted: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      tags: ['SDK', 'Mobile', 'Developer Tools']
    },
    {
      id: '2',
      name: 'Cross-Chain NFT Marketplace',
      description: 'A decentralized marketplace where users can trade NFTs across different parachains without needing to bridge tokens manually. The platform would handle cross-chain operations automatically.',
      links: ['https://polkadot.network/features/cross-chain/', 'https://opensea.io/'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 18,
      hasVoted: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      tags: ['NFT', 'Cross-chain', 'Marketplace']
    },
    {
      id: '3',
      name: 'Parachain Performance Analytics',
      description: 'Real-time analytics dashboard for parachain performance metrics, including transaction throughput, block times, and network health indicators.',
      links: ['https://polkadot.subscan.io/'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 31,
      hasVoted: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      tags: ['Analytics', 'Performance', 'Dashboard']
    },
    {
      id: '4',
      name: 'Substrate Smart Contract Templates',
      description: 'Pre-built smart contract templates for common use cases like DeFi protocols, DAOs, and token standards. Would accelerate development time for new projects.',
      links: ['https://substrate.io/', 'https://docs.substrate.io/tutorials/smart-contracts/'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 42,
      hasVoted: false,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      tags: ['Smart Contracts', 'Templates', 'Substrate']
    },
    {
      id: '5',
      name: 'Polkadot Identity Verification Service',
      description: 'A decentralized identity verification system that works across all parachains, allowing users to verify their identity once and use it everywhere in the ecosystem.',
      links: ['https://wiki.polkadot.network/docs/learn-identity'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 67,
      hasVoted: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      tags: ['Identity', 'Verification', 'Cross-chain']
    },
    {
      id: '6',
      name: 'Automated Parachain Deployment Tool',
      description: 'One-click deployment tool for launching new parachains with customizable parameters. Includes templates for different use cases and automated testing.',
      links: ['https://docs.substrate.io/tutorials/build-a-blockchain/'],
      attachments: [],
      mockImages: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 29,
      hasVoted: false,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      tags: ['Deployment', 'Automation', 'Parachain']
    },
    {
      id: '7',
      name: 'Multi-Chain Portfolio Tracker',
      description: 'Track your assets across all Polkadot parachains in one unified dashboard. Real-time price updates, yield farming tracking, and portfolio analytics.',
      links: ['https://polkadot.js.org/apps/'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 55,
      hasVoted: false,
      createdAt: new Date('2024-01-01'),
      tags: ['Portfolio', 'DeFi', 'Analytics']
    },
    {
      id: '8',
      name: 'Polkadot Gaming SDK',
      description: 'Gaming-focused SDK with built-in support for NFTs, in-game economies, and cross-chain asset transfers. Includes Unity and Unreal Engine plugins.',
      links: ['https://unity.com/', 'https://www.unrealengine.com/'],
      attachments: [],
      mockImages: [
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/21067/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
      ],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 38,
      hasVoted: false,
      createdAt: new Date('2023-12-28'),
      tags: ['Gaming', 'SDK', 'NFT']
    },
    {
      id: '9',
      name: 'Decentralized Bug Bounty Platform',
      description: 'A platform where developers can post bug bounties for their Substrate-based projects, and security researchers can claim rewards in DOT or parachain tokens.',
      links: ['https://immunefi.com/', 'https://hackerone.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 44,
      hasVoted: false,
      createdAt: new Date('2023-12-25'),
      tags: ['Security', 'Bug Bounty', 'Platform']
    },
    {
      id: '10',
      name: 'Cross-Chain Governance Aggregator',
      description: 'Unified interface for participating in governance across multiple parachains. Vote on proposals, delegate tokens, and track governance activity from one dashboard.',
      links: ['https://polkadot.network/features/governance/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 72,
      hasVoted: false,
      createdAt: new Date('2023-12-22'),
      tags: ['Governance', 'Cross-chain', 'Voting']
    },
    {
      id: '11',
      name: 'Substrate Node Monitoring Suite',
      description: 'Comprehensive monitoring and alerting system for Substrate nodes. Includes performance metrics, uptime tracking, and automated alerts for validators.',
      links: ['https://prometheus.io/', 'https://grafana.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 33,
      hasVoted: false,
      createdAt: new Date('2023-12-20'),
      tags: ['Monitoring', 'Validators', 'Infrastructure']
    },
    {
      id: '12',
      name: 'Polkadot Educational Platform',
      description: 'Interactive learning platform with courses on Substrate development, parachain deployment, and Polkadot ecosystem fundamentals. Includes hands-on coding exercises.',
      links: ['https://substrate.io/developers/', 'https://academy.polkadot.network/'],
      attachments: [
        new File([''], 'course-interface.png', { type: 'image/png' }),
        new File(['sample video content'], 'interactive-tutorial.mp4', { type: 'video/mp4' })
      ],
      mockImages: [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
      ],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 89,
      hasVoted: false,
      createdAt: new Date('2023-12-18'),
      tags: ['Education', 'Learning', 'Developer Tools']
    },
    {
      id: '13',
      name: 'Cross-Chain DEX Aggregator',
      description: 'Find the best prices for token swaps across all Polkadot DEXs. Automatically routes trades through multiple parachains to minimize slippage and fees.',
      links: ['https://app.uniswap.org/', '1inch.io'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 61,
      hasVoted: false,
      createdAt: new Date('2023-12-15'),
      tags: ['DEX', 'DeFi', 'Cross-chain']
    },
    {
      id: '14',
      name: 'Polkadot Social Recovery Wallet',
      description: 'Social recovery wallet system where users can recover their accounts through trusted friends and family members, eliminating the risk of lost seed phrases.',
      links: ['https://wiki.polkadot.network/docs/learn-account-recovery'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 47,
      hasVoted: false,
      createdAt: new Date('2023-12-12'),
      tags: ['Wallet', 'Security', 'Recovery']
    },
    {
      id: '15',
      name: 'Parachain Crowdloan Analytics',
      description: 'Advanced analytics for parachain crowdloans including contribution tracking, reward calculations, and historical performance data.',
      links: ['https://parachains.info/', 'https://polkadot.js.org/apps/#/parachains/crowdloan'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 36,
      hasVoted: false,
      createdAt: new Date('2023-12-10'),
      tags: ['Crowdloan', 'Analytics', 'Parachain']
    },
    {
      id: '16',
      name: 'Decentralized Code Repository',
      description: 'Git-based code repository system built on Polkadot where developers can store, version, and collaborate on code with built-in token incentives for contributions.',
      links: ['https://github.com/', 'https://gitlab.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 52,
      hasVoted: false,
      createdAt: new Date('2023-12-08'),
      tags: ['Git', 'Collaboration', 'Developer Tools']
    },
    {
      id: '17',
      name: 'Multi-Signature Treasury Management',
      description: 'Advanced multi-signature wallet specifically designed for managing parachain treasuries with role-based permissions and spending proposals.',
      links: ['https://wiki.polkadot.network/docs/learn-treasury'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 41,
      hasVoted: false,
      createdAt: new Date('2023-12-05'),
      tags: ['Treasury', 'Multi-sig', 'Governance']
    },
    {
      id: '18',
      name: 'Polkadot API Gateway',
      description: 'Unified API gateway that provides REST and GraphQL endpoints for interacting with multiple parachains, simplifying integration for traditional web developers.',
      links: ['https://polkadot.js.org/docs/api/', 'https://graphql.org/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 28,
      hasVoted: false,
      createdAt: new Date('2023-12-03'),
      tags: ['API', 'Gateway', 'Integration']
    },
    {
      id: '19',
      name: 'Cross-Chain Lending Protocol',
      description: 'Lending and borrowing protocol that works across parachains, allowing users to collateralize assets on one chain and borrow on another.',
      links: ['https://compound.finance/', 'https://aave.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 74,
      hasVoted: false,
      createdAt: new Date('2023-12-01'),
      tags: ['DeFi', 'Lending', 'Cross-chain']
    },
    {
      id: '20',
      name: 'Substrate Runtime Upgrade Simulator',
      description: 'Testing environment for simulating runtime upgrades before deploying to mainnet. Includes automated testing and rollback capabilities.',
      links: ['https://docs.substrate.io/maintain/runtime-upgrades/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 39,
      hasVoted: false,
      createdAt: new Date('2023-11-28'),
      tags: ['Testing', 'Runtime', 'Simulation']
    },
    {
      id: '21',
      name: 'Polkadot Name Service (PNS)',
      description: 'Human-readable naming system for Polkadot addresses, similar to ENS but designed specifically for the multi-chain ecosystem.',
      links: ['https://ens.domains/', 'https://unstoppabledomains.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 83,
      hasVoted: false,
      createdAt: new Date('2023-11-25'),
      tags: ['Naming', 'Identity', 'UX']
    },
    {
      id: '22',
      name: 'Cross-Chain Oracle Network',
      description: 'Decentralized oracle network that provides real-world data to smart contracts across all Polkadot parachains with built-in data verification.',
      links: ['https://chain.link/', 'https://bandprotocol.com/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 56,
      hasVoted: false,
      createdAt: new Date('2023-11-22'),
      tags: ['Oracle', 'Data', 'Cross-chain']
    },
    {
      id: '23',
      name: 'Polkadot Carbon Credit Marketplace',
      description: 'Marketplace for trading carbon credits as NFTs across parachains, with verification through IoT sensors and satellite data oracles.',
      links: ['https://www.goldstandard.org/', 'https://verra.org/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 45,
      hasVoted: false,
      createdAt: new Date('2023-11-20'),
      tags: ['Carbon Credits', 'Sustainability', 'NFT']
    },
    {
      id: '24',
      name: 'Decentralized CI/CD Pipeline',
      description: 'Blockchain-based continuous integration and deployment system for Substrate projects with automated testing and deployment to testnets.',
      links: ['https://github.com/features/actions', 'https://www.jenkins.io/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 32,
      hasVoted: false,
      createdAt: new Date('2023-11-18'),
      tags: ['CI/CD', 'Automation', 'DevOps']
    },
    {
      id: '25',
      name: 'Polkadot Staking Pool Manager',
      description: 'User-friendly interface for managing nomination pools with automated rebalancing, reward optimization, and risk assessment tools.',
      links: ['https://wiki.polkadot.network/docs/learn-nomination-pools'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 68,
      hasVoted: false,
      createdAt: new Date('2023-11-15'),
      tags: ['Staking', 'Pools', 'DeFi']
    },
    {
      id: '26',
      name: 'Cross-Chain Insurance Protocol',
      description: 'Decentralized insurance protocol covering smart contract risks, validator slashing, and bridge failures across the Polkadot ecosystem.',
      links: ['https://nexusmutual.io/', 'https://insurace.io/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 51,
      hasVoted: false,
      createdAt: new Date('2023-11-12'),
      tags: ['Insurance', 'Risk Management', 'DeFi']
    },
    {
      id: '27',
      name: 'Substrate Pallet Marketplace',
      description: 'Marketplace for buying, selling, and sharing Substrate pallets with ratings, documentation, and automated compatibility checking.',
      links: ['https://docs.substrate.io/reference/frame-pallets/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 37,
      hasVoted: false,
      createdAt: new Date('2023-11-10'),
      tags: ['Pallets', 'Marketplace', 'Substrate']
    },
    {
      id: '28',
      name: 'Polkadot Privacy Mixer',
      description: 'Privacy-preserving transaction mixer that works across parachains, allowing users to break transaction links while maintaining compliance.',
      links: ['https://tornado.cash/', 'https://www.aztec.network/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 29,
      hasVoted: false,
      createdAt: new Date('2023-11-08'),
      tags: ['Privacy', 'Mixer', 'Compliance']
    },
    {
      id: '29',
      name: 'Cross-Chain Subscription Service',
      description: 'Recurring payment system that works across parachains, enabling subscription-based services with automatic token conversion and payment routing.',
      links: ['https://stripe.com/billing', 'https://www.recurly.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 43,
      hasVoted: false,
      createdAt: new Date('2023-11-05'),
      tags: ['Subscriptions', 'Payments', 'Cross-chain']
    },
    {
      id: '30',
      name: 'Polkadot Validator Dashboard',
      description: 'Comprehensive dashboard for validators showing performance metrics, commission optimization, and automated alerting for issues.',
      links: ['https://polkadot.js.org/apps/#/staking'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 54,
      hasVoted: false,
      createdAt: new Date('2023-11-03'),
      tags: ['Validators', 'Dashboard', 'Monitoring']
    },
    {
      id: '31',
      name: 'Decentralized Domain Hosting',
      description: 'Host websites and applications on IPFS with domain names managed through Polkadot, providing censorship-resistant web hosting.',
      links: ['https://ipfs.io/', 'https://fleek.co/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 41,
      hasVoted: false,
      createdAt: new Date('2023-11-01'),
      tags: ['Hosting', 'IPFS', 'Decentralization']
    },
    {
      id: '32',
      name: 'Cross-Chain Yield Farming Optimizer',
      description: 'Automatically find and move funds to the highest-yielding opportunities across all Polkadot DeFi protocols with risk assessment.',
      links: ['https://yearn.finance/', 'https://beefy.finance/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 76,
      hasVoted: false,
      createdAt: new Date('2023-10-29'),
      tags: ['Yield Farming', 'DeFi', 'Optimization']
    },
    {
      id: '33',
      name: 'Polkadot Event Ticketing System',
      description: 'NFT-based event ticketing system with anti-scalping measures, transferable tickets, and integration with real-world venues.',
      links: ['https://www.ticketmaster.com/', 'https://guts.tickets/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 38,
      hasVoted: false,
      createdAt: new Date('2023-10-26'),
      tags: ['Ticketing', 'NFT', 'Events']
    },
    {
      id: '34',
      name: 'Substrate Development IDE',
      description: 'Integrated development environment specifically designed for Substrate development with built-in testing, debugging, and deployment tools.',
      links: ['https://code.visualstudio.com/', 'https://www.jetbrains.com/idea/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 49,
      hasVoted: false,
      createdAt: new Date('2023-10-24'),
      tags: ['IDE', 'Development', 'Tools']
    },
    {
      id: '35',
      name: 'Cross-Chain Reputation System',
      description: 'Universal reputation system that tracks user behavior across all parachains, enabling trust-based interactions and reduced collateral requirements.',
      links: ['https://www.upwork.com/', 'https://www.airbnb.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 62,
      hasVoted: false,
      createdAt: new Date('2023-10-22'),
      tags: ['Reputation', 'Trust', 'Cross-chain']
    },
    {
      id: '36',
      name: 'Polkadot Supply Chain Tracker',
      description: 'Track products through supply chains using Polkadot parachains, providing transparency and authenticity verification for consumers.',
      links: ['https://www.walmart.com/foodtraceability', 'https://www.vechain.org/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 44,
      hasVoted: false,
      createdAt: new Date('2023-10-20'),
      tags: ['Supply Chain', 'Tracking', 'Transparency']
    },
    {
      id: '37',
      name: 'Decentralized Job Marketplace',
      description: 'Freelance marketplace built on Polkadot with escrow payments, reputation tracking, and dispute resolution through on-chain governance.',
      links: ['https://www.upwork.com/', 'https://www.freelancer.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 53,
      hasVoted: false,
      createdAt: new Date('2023-10-18'),
      tags: ['Marketplace', 'Jobs', 'Escrow']
    },
    {
      id: '38',
      name: 'Cross-Chain Asset Bridge Monitor',
      description: 'Real-time monitoring and alerting system for cross-chain bridges with automatic incident response and user notifications.',
      links: ['https://bridge.poly.network/', 'https://multichain.org/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 35,
      hasVoted: false,
      createdAt: new Date('2023-10-15'),
      tags: ['Bridges', 'Monitoring', 'Security']
    },
    {
      id: '39',
      name: 'Polkadot Prediction Markets',
      description: 'Decentralized prediction markets for ecosystem events, parachain auctions, and governance outcomes with automated settlement.',
      links: ['https://augur.net/', 'https://polymarket.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 47,
      hasVoted: false,
      createdAt: new Date('2023-10-12'),
      tags: ['Prediction Markets', 'Governance', 'DeFi']
    },
    {
      id: '40',
      name: 'Substrate Runtime Fuzzer',
      description: 'Automated fuzzing tool for testing Substrate runtimes to discover potential vulnerabilities and edge cases before deployment.',
      links: ['https://github.com/google/oss-fuzz', 'https://llvm.org/docs/LibFuzzer.html'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 31,
      hasVoted: false,
      createdAt: new Date('2023-10-10'),
      tags: ['Security', 'Testing', 'Fuzzing']
    },
    {
      id: '41',
      name: 'Cross-Chain DAO Framework',
      description: 'Framework for creating DAOs that can operate across multiple parachains with unified governance and treasury management.',
      links: ['https://aragon.org/', 'https://daohaus.club/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 69,
      hasVoted: false,
      createdAt: new Date('2023-10-08'),
      tags: ['DAO', 'Governance', 'Framework']
    },
    {
      id: '42',
      name: 'Polkadot Mobile App Store',
      description: 'Decentralized app store for mobile applications that interact with Polkadot, with token-based payments and developer incentives.',
      links: ['https://play.google.com/', 'https://www.apple.com/app-store/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 58,
      hasVoted: false,
      createdAt: new Date('2023-10-05'),
      tags: ['Mobile', 'App Store', 'Marketplace']
    },
    {
      id: '43',
      name: 'Cross-Chain Atomic Swaps',
      description: 'Trustless atomic swap protocol enabling direct peer-to-peer trading between different parachain tokens without intermediaries.',
      links: ['https://bitcoinwiki.org/wiki/atomic-swap', 'https://thorchain.org/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 52,
      hasVoted: false,
      createdAt: new Date('2023-10-03'),
      tags: ['Atomic Swaps', 'P2P', 'Trading']
    },
    {
      id: '44',
      name: 'Polkadot Documentation Generator',
      description: 'Automated documentation generator for Substrate pallets and runtime modules with interactive examples and API references.',
      links: ['https://docs.rs/', 'https://swagger.io/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 26,
      hasVoted: false,
      createdAt: new Date('2023-10-01'),
      tags: ['Documentation', 'Automation', 'Developer Tools']
    },
    {
      id: '45',
      name: 'Cross-Chain Crowdfunding Platform',
      description: 'Crowdfunding platform where projects can raise funds in multiple tokens across different parachains with milestone-based releases.',
      links: ['https://www.kickstarter.com/', 'https://www.indiegogo.com/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 64,
      hasVoted: false,
      createdAt: new Date('2023-09-28'),
      tags: ['Crowdfunding', 'Cross-chain', 'Milestones']
    },
    {
      id: '46',
      name: 'Polkadot Network Explorer',
      description: 'Advanced blockchain explorer with cross-chain transaction tracking, validator analytics, and real-time network statistics.',
      links: ['https://polkadot.subscan.io/', 'https://polkascan.io/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 42,
      hasVoted: false,
      createdAt: new Date('2023-09-25'),
      tags: ['Explorer', 'Analytics', 'Network']
    },
    {
      id: '47',
      name: 'Substrate Benchmarking Suite',
      description: 'Comprehensive benchmarking tools for measuring and comparing performance of different Substrate configurations and pallets.',
      links: ['https://docs.substrate.io/test/benchmark/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Leonardo Custodio',
      votes: 33,
      hasVoted: false,
      createdAt: new Date('2023-09-22'),
      tags: ['Benchmarking', 'Performance', 'Testing']
    },
    {
      id: '48',
      name: 'Cross-Chain Messaging Protocol',
      description: 'Secure messaging protocol for communication between users across different parachains with end-to-end encryption.',
      links: ['https://signal.org/', 'https://matrix.org/'],
      attachments: [],
      isAnonymous: true,
      authorName: 'Anonymous',
      votes: 39,
      hasVoted: false,
      createdAt: new Date('2023-09-20'),
      tags: ['Messaging', 'Privacy', 'Communication']
    },
    {
      id: '49',
      name: 'Polkadot Grant Management System',
      description: 'Platform for managing Web3 Foundation grants with milestone tracking, automated payments, and community feedback integration.',
      links: ['https://grants.web3.foundation/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Shawn Coe',
      votes: 71,
      hasVoted: false,
      createdAt: new Date('2023-09-18'),
      tags: ['Grants', 'Management', 'Funding']
    },
    {
      id: '50',
      name: 'Cross-Chain Identity Aggregator',
      description: 'Aggregate and manage digital identities across multiple parachains with privacy controls and selective disclosure features.',
      links: ['https://www.microsoft.com/en-us/security/business/identity-access/decentralized-identity-blockchain'],
      attachments: [],
      isAnonymous: false,
      authorName: 'David Castro',
      votes: 56,
      hasVoted: false,
      createdAt: new Date('2023-09-15'),
      tags: ['Identity', 'Privacy', 'Aggregation']
    },
    {
      id: '51',
      name: 'Polkadot Ecosystem Map',
      description: 'Interactive visual map of the entire Polkadot ecosystem showing relationships between projects, parachains, and services.',
      links: ['https://polkaproject.com/', 'https://parachains.info/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Karim Jedda',
      votes: 48,
      hasVoted: false,
      createdAt: new Date('2023-09-12'),
      tags: ['Ecosystem', 'Visualization', 'Discovery']
    },
    {
      id: '52',
      name: 'Substrate Testing Framework',
      description: 'Comprehensive testing framework for Substrate-based blockchains with automated test generation and continuous integration support.',
      links: ['https://docs.substrate.io/test/'],
      attachments: [],
      isAnonymous: false,
      authorName: 'Nico Morgan',
      votes: 37,
      hasVoted: false,
      createdAt: new Date('2023-09-10'),
      tags: ['Testing', 'Framework', 'CI/CD']
    }
  ],
  loading: false,
  });

  // Getters
  const ideas = computed(() => state.value.ideas);
  const loading = computed(() => state.value.loading);
  const totalIdeas = computed(() => state.value.ideas.length);
  const recentIdeas = computed(() =>
    state.value.ideas
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
  );

  // Actions
  const addIdea = (formData: IdeaFormData): void => {
  // Process tags
  const processedTags = formData.tags
    ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : [];

  // Combine all media files into attachments array
  const allAttachments: File[] = [];
  if (formData.thumbnail) allAttachments.push(formData.thumbnail);
  if (formData.gallery.length > 0) allAttachments.push(...formData.gallery);

  const newIdea: Idea = {
    id: Date.now().toString(),
    name: formData.name,
    description: formData.description,
    links: (() => {
      const regularLinks = formData.links ? formData.links.split('\n').filter(link => link.trim()) : [];
      const videoLink = formData.videoLink.trim() ? [formData.videoLink.trim()] : [];
      return [...regularLinks, ...videoLink];
    })(),
    attachments: allAttachments,
    isAnonymous: formData.isAnonymous,
    authorName: formData.isAnonymous ? 'Anonymous' : formData.authorName,
    votes: 0,
    hasVoted: false,
    createdAt: new Date(),
    tags: processedTags
  };

    state.value.ideas.unshift(newIdea);
  };

  const toggleVote = (ideaId: string): void => {
    const idea = state.value.ideas.find(i => i.id === ideaId);
    if (idea) {
      if (idea.hasVoted) {
        idea.votes--;
        idea.hasVoted = false;
      } else {
        idea.votes++;
        idea.hasVoted = true;
      }
    }
  };

  const setLoading = (isLoading: boolean): void => {
    state.value.loading = isLoading;
  };

  const getIdeaById = (id: string): Idea | undefined => {
    return state.value.ideas.find(idea => idea.id === id);
  };

  const getIdeasByTag = (tag: string): Idea[] => {
    return state.value.ideas.filter(idea =>
      idea.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  };

  const searchIdeas = (query: string): Idea[] => {
    const lowerQuery = query.toLowerCase();
    return state.value.ideas.filter(idea =>
      idea.name.toLowerCase().includes(lowerQuery) ||
      idea.description.toLowerCase().includes(lowerQuery) ||
      idea.authorName.toLowerCase().includes(lowerQuery) ||
      idea.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  // Return store interface
  return {
    // State (as getters)
    ideas,
    loading,
    totalIdeas,
    recentIdeas,

    // Actions
    addIdea,
    toggleVote,
    setLoading,
    getIdeaById,
    getIdeasByTag,
    searchIdeas
  };
});
