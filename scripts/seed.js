import { useDrizzle } from '#imports';
import * as tables from '../server/database/schema';

async function seed() {
  console.log('Running DB seed task...');

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
    }
  ];

  const db = useDrizzle();
  await db.insert(tables.ideas).values(ideas);
  console.log(`Seeded ${ideas.length} ideas`);
}

seed().catch(console.error);