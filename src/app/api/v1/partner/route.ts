import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search') || '';
    const searchFields = searchParams.get('searchFields') || 'name,email';
    const eventId = searchParams.get('eventId') || '';
    
    // Build query parameters for the backend API
    const params = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      searchFields
    });
    
    // Add event ID to params if provided
    if (eventId) {
      params.append('eventId', eventId);
    }
    
    // Make request to the backend API using the configured axios instance
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5001/api/v1', // Use the same base URL as in axios.config.ts
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    
    const response = await axiosInstance.get(`/partner?${params}`);
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching partners from backend API:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch partners',
        message: error.message || 'An error occurred while fetching partners'
      },
      { status: error.response?.status || 500 }
    );
  }
}