export default eventHandler(async () => {
  const ideas = [
    {
      author: 'Shawn Coe',
      name: 'Polkadot Mobile Wallet SDK',
      tagline: 'Comprehensive SDK for mobile wallet development',
      tags: ['SDK', 'Mobile', 'Developer Tools'],
      description: 'A comprehensive SDK for building mobile wallets that interact seamlessly with the Polkadot ecosystem. This would lower the barrier for developers to create user-friendly mobile applications.',
      links: ['https://docs.polkadot.network/'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      author: 'Leonardo Custodio',
      name: 'Cross-Chain NFT Marketplace',
      tagline: 'Decentralized NFT trading across parachains',
      tags: ['NFT', 'Cross-chain', 'Marketplace'],
      description: 'A decentralized marketplace where users can trade NFTs across different parachains without needing to bridge tokens manually. The platform would handle cross-chain operations automatically.',
      links: ['https://polkadot.network/features/cross-chain/', 'https://opensea.io/'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      author: 'David Castro',
      name: 'Parachain Performance Analytics',
      tagline: 'Real-time analytics for parachain metrics',
      tags: ['Analytics', 'Performance', 'Dashboard'],
      description: 'Real-time analytics dashboard for parachain performance metrics, including transaction throughput, block times, and network health indicators.',
      links: ['https://polkadot.subscan.io/'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      author: 'Karim Jedda',
      name: 'Substrate Smart Contract Templates',
      tagline: 'Pre-built templates for common use cases',
      tags: ['Smart Contracts', 'Templates', 'Substrate'],
      description: 'Pre-built smart contract templates for common use cases like DeFi protocols, DAOs, and token standards. Would accelerate development time for new projects.',
      links: ['https://substrate.io/', 'https://docs.substrate.io/tutorials/smart-contracts/'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      author: 'Nico Morgan',
      name: 'Polkadot Identity Verification Service',
      tagline: 'Decentralized identity for all parachains',
      tags: ['Identity', 'Verification', 'Cross-chain'],
      description: 'A decentralized identity verification system that works across all parachains, allowing users to verify their identity once and use it everywhere in the ecosystem.',
      links: ['https://wiki.polkadot.network/docs/learn-identity'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      author: 'Anonymous',
      name: 'Automated Parachain Deployment Tool',
      tagline: 'One-click parachain deployment',
      tags: ['Deployment', 'Automation', 'Parachain'],
      description: 'One-click deployment tool for launching new parachains with customizable parameters. Includes templates for different use cases and automated testing.',
      links: ['https://docs.substrate.io/tutorials/build-a-blockchain/'],
      icon: null,
      video: null,
      images: null,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      author: 'Leonardo Custodio',
      name: 'Multi-Chain Portfolio Tracker',
      tagline: 'Track assets across all Polkadot parachains',
      tags: ['Portfolio', 'DeFi', 'Analytics'],
      description: 'Track your assets across all Polkadot parachains in one unified dashboard. Real-time price updates, yield farming tracking, and portfolio analytics.',
      links: ['https://polkadot.js.org/apps/'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date('2024-01-01'),
    },
    {
      author: 'Shawn Coe',
      name: 'Polkadot Gaming SDK',
      tagline: 'Gaming SDK with NFT and cross-chain support',
      tags: ['Gaming', 'SDK', 'NFT'],
      description: 'Gaming-focused SDK with built-in support for NFTs, in-game economies, and cross-chain asset transfers. Includes Unity and Unreal Engine plugins.',
      links: ['https://unity.com/', 'https://www.unrealengine.com/'],
      icon: null,
      video: null,
      images: [
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/21067/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
      ],
      createdAt: new Date('2023-12-28'),
    },
    {
      author: 'David Castro',
      name: 'Decentralized Bug Bounty Platform',
      tagline: 'Security rewards for Substrate projects',
      tags: ['Security', 'Bug Bounty', 'Platform'],
      description: 'A platform where developers can post bug bounties for their Substrate-based projects, and security researchers can claim rewards in DOT or parachain tokens.',
      links: ['https://immunefi.com/', 'https://hackerone.com/'],
      icon: null,
      video: null,
      images: null,
      createdAt: new Date('2023-12-25'),
    },
    {
      author: 'Anonymous',
      name: 'Cross-Chain Governance Aggregator',
      tagline: 'Unified governance interface',
      tags: ['Governance', 'Cross-chain', 'Voting'],
      description: 'Unified interface for participating in governance across multiple parachains. Vote on proposals, delegate tokens, and track governance activity from one dashboard.',
      links: ['https://polkadot.network/features/governance/'],
      icon: null,
      video: null,
      images: null,
      createdAt: new Date('2023-12-22'),
    }
  ];

  try {
    await useDrizzle().insert(tables.ideas).values(ideas);
    return { success: true, message: `Seeded ${ideas.length} ideas` };
  } catch (error) {
    return { success: false, error: error.message };
  }
})