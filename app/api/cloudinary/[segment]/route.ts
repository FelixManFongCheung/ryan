import { NextResponse } from 'next/server';
import {
  CLOUDINARY_REVALIDATE_SECONDS,
  getAbout,
  getCollections,
  getContact,
  getHomeImage,
} from '@/lib/data';
import type { CloudinarySegment } from '@/lib/types';

const VALID_SEGMENTS: CloudinarySegment[] = [
  'works',
  'editions',
  'curatorialprojects',
  'about',
  'contact',
  'home',
];

export const revalidate = 600;

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
    let data;
    if (
      segment === 'works' ||
      segment === 'editions' ||
      segment === 'curatorialprojects'
    ) {
      data = await getCollections(segment);
    } else if (segment === 'about') {
      data = await getAbout();
    } else if (segment === 'contact') {
      data = await getContact();
    } else {
      data = await getHomeImage();
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `s-maxage=${CLOUDINARY_REVALIDATE_SECONDS}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
