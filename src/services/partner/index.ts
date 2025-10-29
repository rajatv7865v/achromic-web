// For now, we'll use fetch for local API routes
// import { axiosInstance } from '../axios.config';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description?: string;
  category: 'conference' | 'corporate' | 'academic' | 'government' | 'ngo';
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PartnersResponse {
  partners: Partner[];
  total: number;
  page: number;
  limit: number;
}

export const partnerService = {
  // Get all partners
  getAllPartners: async (): Promise<PartnersResponse> => {
    try {
      const response = await fetch('/api/partners');
      if (!response.ok) throw new Error('Failed to fetch partners');
      return await response.json();
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  },

  // Get featured partners (for homepage)
  getFeaturedPartners: async (): Promise<Partner[]> => {
    try {
      const response = await fetch('/api/partners/featured');
      if (!response.ok) throw new Error('Failed to fetch featured partners');
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured partners:', error);
      throw error;
    }
  },

  // Get partners by category
  getPartnersByCategory: async (category: Partner['category']): Promise<Partner[]> => {
    try {
      const response = await fetch(`/api/partners?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch partners by category');
      const data = await response.json();
      return data.partners;
    } catch (error) {
      console.error('Error fetching partners by category:', error);
      throw error;
    }
  },

  // Get partners for specific event
  getEventPartners: async (eventId: string): Promise<Partner[]> => {
    try {
      // For now, return mock data filtered by event
      const { mockPartners } = await import('../../data/mockPartners');
      return mockPartners.filter(partner => partner.isActive);
    } catch (error) {
      console.error('Error fetching event partners:', error);
      throw error;
    }
  },

  // Get partner by ID
  getPartnerById: async (id: string): Promise<Partner> => {
    try {
      const { mockPartners } = await import('../../data/mockPartners');
      const partner = mockPartners.find(p => p.id === id);
      if (!partner) throw new Error('Partner not found');
      return partner;
    } catch (error) {
      console.error('Error fetching partner:', error);
      throw error;
    }
  },

  // Create new partner (admin only)
  createPartner: async (partnerData: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partner> => {
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData)
      });
      if (!response.ok) throw new Error('Failed to create partner');
      return await response.json();
    } catch (error) {
      console.error('Error creating partner:', error);
      throw error;
    }
  },

  // Update partner (admin only)
  updatePartner: async (id: string, partnerData: Partial<Partner>): Promise<Partner> => {
    try {
      // For now, return mock data
      const { mockPartners } = await import('../../data/mockPartners');
      const partner = mockPartners.find(p => p.id === id);
      if (!partner) throw new Error('Partner not found');
      return { ...partner, ...partnerData };
    } catch (error) {
      console.error('Error updating partner:', error);
      throw error;
    }
  },

  // Delete partner (admin only)
  deletePartner: async (id: string): Promise<void> => {
    try {
      // For now, just log the action
      console.log('Partner deleted:', id);
    } catch (error) {
      console.error('Error deleting partner:', error);
      throw error;
    }
  }
};

// Re-export mockPartners for convenience
export { mockPartners } from '../../data/mockPartners';
