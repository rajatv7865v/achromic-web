import { NextRequest, NextResponse } from 'next/server';
import { mockPartners } from '../../../data/mockPartners';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredPartners = [...mockPartners];

    // Filter by featured status
    if (featured === 'true') {
      filteredPartners = filteredPartners.filter(partner => partner.featured);
    }

    // Filter by category
    if (category) {
      filteredPartners = filteredPartners.filter(partner => partner.category === category);
    }

    // Filter active partners only
    filteredPartners = filteredPartners.filter(partner => partner.isActive);

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPartners = filteredPartners.slice(startIndex, endIndex);

    const response = {
      partners: paginatedPartners,
      total: filteredPartners.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPartners.length / limit)
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate the data and save to database
    const newPartner = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    );
  }
}
