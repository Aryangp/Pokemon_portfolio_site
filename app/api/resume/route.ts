import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_RESUME_DATA } from '@/data/resumeData';
import { normalizeResumeData } from '@/lib/resumeService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const DEFAULT_LIVE_GIST_URL =
  'https://gist.githubusercontent.com/Aryangp/3fb13310b3446037c1b24a1412b1ded0/raw/resume.json';

/**
 * GET /api/resume
 * Query Parameters:
 *   ?gist=<raw_gist_url> - Fetch and normalize directly from a remote GitHub Gist
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl =
    searchParams.get('gist') ||
    process.env.GIST_RESUME_URL ||
    process.env.NEXT_PUBLIC_GIST_RESUME_URL ||
    DEFAULT_LIVE_GIST_URL;

  // Automatically strip Git commit SHAs from raw gist URLs to always fetch latest revision
  const cleanGistUrl = rawUrl.replace(/\/raw\/[a-f0-9]{40}\//i, '/raw/');
  const fetchUrl = cleanGistUrl.includes('?')
    ? `${cleanGistUrl}&_t=${Date.now()}`
    : `${cleanGistUrl}?_t=${Date.now()}`;

  try {
    const gistRes = await fetch(fetchUrl, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
    });

    if (gistRes.ok) {
      const raw = await gistRes.json();
      const normalized = normalizeResumeData(raw);
      return NextResponse.json(
        {
          status: 'success',
          source: cleanGistUrl,
          isRemote: true,
          data: normalized,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        }
      );
    } else {
      console.warn(`[API /api/resume] Failed to fetch gist (${gistRes.status}) from ${fetchUrl}`);
    }
  } catch (err: any) {
    console.warn('[API /api/resume] Failed to fetch from Gist URL, falling back to local dataset:', err.message);
  }

  return NextResponse.json({
    status: 'success',
    source: 'local_bundled',
    isRemote: false,
    data: DEFAULT_RESUME_DATA,
  });
}
