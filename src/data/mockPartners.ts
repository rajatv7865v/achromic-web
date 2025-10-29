import { Partner } from '../services/partner';

export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: '/images/partners/techcorp-logo.png',
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider',
    category: 'corporate',
    isActive: true,
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Global Conference Network',
    logo: '/images/partners/gcn-logo.png',
    website: 'https://globalconf.net',
    description: 'International conference organizer',
    category: 'conference',
    isActive: true,
    featured: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    name: 'University of Technology',
    logo: '/images/partners/ut-logo.png',
    website: 'https://universitytech.edu',
    description: 'Premier technical university',
    category: 'academic',
    isActive: true,
    featured: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'Innovation Hub',
    logo: '/images/partners/innovation-hub-logo.png',
    website: 'https://innovationhub.org',
    description: 'Startup accelerator and incubator',
    category: 'ngo',
    isActive: true,
    featured: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '5',
    name: 'Digital Solutions Inc',
    logo: '/images/partners/digital-solutions-logo.png',
    website: 'https://digitalsolutions.com',
    description: 'Digital transformation specialists',
    category: 'corporate',
    isActive: true,
    featured: false,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'Future Tech Summit',
    logo: '/images/partners/future-tech-logo.png',
    website: 'https://futuretechsummit.com',
    description: 'Annual technology conference',
    category: 'conference',
    isActive: true,
    featured: false,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z'
  }
];
