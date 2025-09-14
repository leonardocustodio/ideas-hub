export default eventHandler(async () => {
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
      ]
    },
    {
      ideaId: insertedIdeas[1].id,
      images: [
        'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
      ]
    },
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

  // Add sample comments
  const commentsData = [
    {
      ideaId: insertedIdeas[0].id,
      authorId: authorMap.get('Leonardo Custodio'),
      comment: 'This would be amazing for onboarding new users to the Polkadot ecosystem!',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      ideaId: insertedIdeas[0].id,
      authorId: authorMap.get('David Castro'),
      comment: 'We should prioritize React Native support for cross-platform development.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      ideaId: insertedIdeas[1].id,
      authorId: authorMap.get('Shawn Coe'),
      comment: 'Cross-chain NFT transfers are the future. This could revolutionize digital asset trading.',
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    },
    {
      ideaId: insertedIdeas[1].id,
      authorId: authorMap.get('Karim Jedda'),
      comment: 'How would this handle different NFT standards across parachains?',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      ideaId: insertedIdeas[2].id,
      authorId: authorMap.get('Nico Morgan'),
      comment: 'Real-time monitoring is crucial for parachain operators. Great idea!',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]

  // Insert comments
  for (const commentData of commentsData) {
    await db.insert(tables.comments)
      .values(commentData)
      .get()
  }

  console.log(`Seeded ${insertedAuthors.length} authors`)
  console.log(`Seeded ${insertedIdeas.length} ideas`)
  console.log(`Seeded tags, images, and comments for ideas`)

  return {
    success: true,
    authors: insertedAuthors.length,
    ideas: insertedIdeas.length,
    comments: commentsData.length
  }
})