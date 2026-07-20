import { NextResponse } from 'next/server';
import { fetchBySegment } from '@/lib/cloudinary';
import type { CloudinarySegment } from '@/lib/types';

const VALID_SEGMENTS: CloudinarySegment[] = [
  'works',
  'editions',
  'curatorialprojects',
  'about',
  'contact',
  'home',
];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segment: string }> }
) {
  const { segment: rawSegment } = await params;
  const segment = rawSegment.toLowerCase() as CloudinarySegment;

  if (!VALID_SEGMENTS.includes(segment)) {
    return NextResponse.json({ error: 'Invalid segment' }, { status: 400 });
  }

  try {
    const data = await fetchBySegment(segment);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
