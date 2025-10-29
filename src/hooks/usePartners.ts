import { useState, useEffect } from 'react';
import { Partner } from '../services/partner';
import { mockPartners } from '../data/mockPartners';

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [featuredPartners, setFeaturedPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/partners');
      if (!response.ok) throw new Error('Failed to fetch partners');
      const data = await response.json();
      setPartners(data.partners);
    } catch (err) {
      setError('Failed to fetch partners');
      console.error('Error fetching partners:', err);
      // Fallback to mock data
      setPartners(mockPartners);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/partners/featured');
      if (!response.ok) throw new Error('Failed to fetch featured partners');
      const featured = await response.json();
      setFeaturedPartners(featured);
    } catch (err) {
      setError('Failed to fetch featured partners');
      console.error('Error fetching featured partners:', err);
      // Fallback to mock data
      const featured = mockPartners.filter(p => p.featured);
      setFeaturedPartners(featured);
    } finally {
      setLoading(false);
    }
  };

  const getPartnersByCategory = async (category: Partner['category']) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/partners?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch partners by category');
      const data = await response.json();
      return data.partners;
    } catch (err) {
      setError('Failed to fetch partners by category');
      console.error('Error fetching partners by category:', err);
      return mockPartners.filter(p => p.category === category);
    } finally {
      setLoading(false);
    }
  };

  const getEventPartners = async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      // For now, return mock data filtered by event
      return mockPartners.filter(partner => partner.isActive);
    } catch (err) {
      setError('Failed to fetch event partners');
      console.error('Error fetching event partners:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
    fetchFeaturedPartners();
  }, []);

  return {
    partners,
    featuredPartners,
    loading,
    error,
    fetchPartners,
    fetchFeaturedPartners,
    getPartnersByCategory,
    getEventPartners,
    refetch: fetchPartners
  };
};
