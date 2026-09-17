import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_RESUME_DATA } from '@/data/resumeData';
import { normalizeResumeData } from '@/lib/resumeService';

/**
 * GET /api/resume
 * Query Parameters:
 *   ?gist=<raw_gist_url> - Fetch and normalize directly from a remote GitHub Gist
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gistUrl = searchParams.get('gist') || process.env.GIST_RESUME_URL;

  if (gistUrl) {
    try {
      const gistRes = await fetch(gistUrl, {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      });

      if (gistRes.ok) {
        const raw = await gistRes.json();
        const normalized = normalizeResumeData(raw);
        return NextResponse.json({
          status: 'success',
          source: gistUrl,
          isRemote: true,
          data: normalized,
        });
      }
    } catch (err: any) {
      console.warn('Failed to fetch from Gist URL, falling back to local dataset:', err.message);
    }
  }

  return NextResponse.json({
    status: 'success',
    source: 'local_bundled',
    isRemote: false,
    data: DEFAULT_RESUME_DATA,
  });
}
