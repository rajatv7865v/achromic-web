import { NextResponse } from 'next/server';
import { mockPartners } from '../../../../data/mockPartners';

export async function GET() {
  try {
    const featuredPartners = mockPartners.filter(partner => partner.featured && partner.isActive);
    
    return NextResponse.json(featuredPartners);
  } catch (error) {
    console.error('Error fetching featured partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured partners' },
      { status: 500 }
    );
  }
}
