export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task'
  },
  async run() {
    console.log('Running DB seed task...')

    const db = useDrizzle()

    // First, create authors
    const authorData = [
      { name: 'Shawn Coe' },
      { name: 'Leonardo Custodio' },
      { name: 'David Castro' },
      { name: 'Karim Jedda' },
      { name: 'Nico Morgan' },
      { name: 'Anonymous' }
    ]

    // Insert authors and get their IDs
    const insertedAuthors = await Promise.all(
      authorData.map(async (author) => {
        return await db.insert(tables.authors)
          .values(author)
          .returning()
          .get()
      })
    )

    // Create a map for easy author lookup
    const authorMap = new Map()
    insertedAuthors.forEach(author => {
      authorMap.set(author.name, author.id)
    })

    // Now create ideas with authorId references
    const ideas = [
      {
        name: 'Polkadot Mobile Wallet SDK',
        tagline: 'Comprehensive SDK for mobile wallet development',
        description: 'A comprehensive SDK for building mobile wallets that interact seamlessly with the Polkadot ecosystem. This would lower the barrier for developers to create user-friendly mobile applications.',
        links: ['https://docs.polkadot.network/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Shawn Coe'),
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        name: 'Cross-Chain NFT Marketplace',
        tagline: 'Decentralized NFT trading across parachains',
        description: 'A decentralized marketplace where users can trade NFTs across different parachains without needing to bridge tokens manually. The platform would handle cross-chain operations automatically.',
        links: ['https://polkadot.network/features/cross-chain/', 'https://opensea.io/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Leonardo Custodio'),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        name: 'Parachain Performance Analytics',
        tagline: 'Real-time analytics for parachain metrics',
        description: 'Real-time analytics dashboard for parachain performance metrics, including transaction throughput, block times, and network health indicators.',
        links: ['https://polkadot.subscan.io/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('David Castro'),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        name: 'Substrate Smart Contract Templates',
        tagline: 'Pre-built templates for common use cases',
        description: 'Pre-built smart contract templates for common use cases like DeFi protocols, DAOs, and token standards. Would accelerate development time for new projects.',
        links: ['https://substrate.io/', 'https://docs.substrate.io/tutorials/smart-contracts/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Karim Jedda'),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        name: 'Polkadot Identity Verification Service',
        tagline: 'Decentralized identity for all parachains',
        description: 'A decentralized identity verification system that works across all parachains, allowing users to verify their identity once and use it everywhere in the ecosystem.',
        links: ['https://wiki.polkadot.network/docs/learn-identity'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Nico Morgan'),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        name: 'Automated Parachain Deployment Tool',
        tagline: 'One-click parachain deployment',
        description: 'One-click deployment tool for launching new parachains with customizable parameters. Includes templates for different use cases and automated testing.',
        links: ['https://docs.substrate.io/tutorials/build-a-blockchain/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Anonymous'),
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        name: 'Multi-Chain Portfolio Tracker',
        tagline: 'Track assets across all Polkadot parachains',
        description: 'Track your assets across all Polkadot parachains in one unified dashboard. Real-time price updates, yield farming tracking, and portfolio analytics.',
        links: ['https://polkadot.js.org/apps/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Leonardo Custodio'),
        createdAt: new Date('2024-01-01'),
      },
      {
        name: 'Polkadot Gaming SDK',
        tagline: 'Gaming SDK with NFT and cross-chain support',
        description: 'Gaming-focused SDK with built-in support for NFTs, in-game economies, and cross-chain asset transfers. Includes Unity and Unreal Engine plugins.',
        links: ['https://unity.com/', 'https://www.unrealengine.com/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Shawn Coe'),
        createdAt: new Date('2023-12-28'),
      },
      {
        name: 'Decentralized Bug Bounty Platform',
        tagline: 'Security rewards for Substrate projects',
        description: 'A platform where developers can post bug bounties for their Substrate-based projects, and security researchers can claim rewards in DOT or parachain tokens.',
        links: ['https://immunefi.com/', 'https://hackerone.com/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('David Castro'),
        createdAt: new Date('2023-12-25'),
      },
      {
        name: 'Cross-Chain Governance Aggregator',
        tagline: 'Unified governance interface',
        description: 'Unified interface for participating in governance across multiple parachains. Vote on proposals, delegate tokens, and track governance activity from one dashboard.',
        links: ['https://polkadot.network/features/governance/'],
        icon: null,
        video: null,
        images: null,
        authorId: authorMap.get('Anonymous'),
        createdAt: new Date('2023-12-22'),
      }
    ]

    // Insert ideas
    const insertedIdeas = await Promise.all(
      ideas.map(async (idea) => {
        return await db.insert(tables.ideas)
          .values(idea)
          .returning()
          .get()
      })
    )

    // Now add tags for each idea
    const tagsData = [
      { ideaId: insertedIdeas[0].id, tags: ['SDK', 'Mobile', 'Developer Tools'] },
      { ideaId: insertedIdeas[1].id, tags: ['NFT', 'Cross-chain', 'Marketplace'] },
      { ideaId: insertedIdeas[2].id, tags: ['Analytics', 'Performance', 'Dashboard'] },
      { ideaId: insertedIdeas[3].id, tags: ['Smart Contracts', 'Templates', 'Substrate'] },
      { ideaId: insertedIdeas[4].id, tags: ['Identity', 'Verification', 'Cross-chain'] },
      { ideaId: insertedIdeas[5].id, tags: ['Deployment', 'Automation', 'Parachain'] },
      { ideaId: insertedIdeas[6].id, tags: ['Portfolio', 'DeFi', 'Analytics'] },
      { ideaId: insertedIdeas[7].id, tags: ['Gaming', 'SDK', 'NFT'] },
      { ideaId: insertedIdeas[8].id, tags: ['Security', 'Bug Bounty', 'Platform'] },
      { ideaId: insertedIdeas[9].id, tags: ['Governance', 'Cross-chain', 'Voting'] }
    ]

    // Insert tags
    for (const ideaTags of tagsData) {
      for (const tag of ideaTags.tags) {
        await db.insert(tables.tags)
          .values({
            tag,
            ideaId: ideaTags.ideaId
          })
          .get()
      }
    }

    // Add sample images for some ideas
    const imagesData = [
      {
        ideaId: insertedIdeas[0].id,
        images: [
          'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        ideaId: insertedIdeas[1].id,
        images: [
          'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        ideaId: insertedIdeas[2].id,
        images: [
          'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        ideaId: insertedIdeas[3].id,
        images: [
          'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        ideaId: insertedIdeas[4].id,
        images: [
          'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        ideaId: insertedIdeas[6].id,
        images: [
          'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      {
        ideaId: insertedIdeas[7].id,
        images: [
          'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/21067/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    ]

    // Insert images
    for (const ideaImages of imagesData) {
      for (const imageUrl of ideaImages.images) {
        await db.insert(tables.images)
          .values({
            file: imageUrl,
            ideaId: ideaImages.ideaId
          })
          .get()
      }
    }

    console.log(`Seeded ${insertedAuthors.length} authors`)
    console.log(`Seeded ${insertedIdeas.length} ideas`)
    console.log(`Seeded tags and images for ideas`)

    return { result: 'success' }
  }
})
