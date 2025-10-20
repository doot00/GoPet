// app/api/nearby/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing lat or lng' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&key=${apiKey}`;

  try {
    const response = await fetch(googleUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Google API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch from Google API' }, { status: 500 });
  }
}
