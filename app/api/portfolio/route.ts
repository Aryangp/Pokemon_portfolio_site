import { NextRequest, NextResponse } from 'next/server';
import { RAW_PORTFOLIO_DATA, STARTER_PROJECTS } from '@/data/portfolioData';
import { normalizePortfolioData, RawPortfolioItem, RawPortfolioResponse } from '@/lib/portfolioAdapter';

/**
 * GET /api/portfolio
 * Returns normalized Pokémon portfolio data or raw format.
 * Optional query params:
 *   ?raw=true           - returns the raw JSON list
 *   ?source=<api_url>   - fetches from an external API URL, normalizes, and returns
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawParam = searchParams.get('raw');
  const sourceParam = searchParams.get('source');

  try {
    // If source parameter is provided, fetch dynamically from external API
    if (sourceParam) {
      const externalRes = await fetch(sourceParam, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 },
      });

      if (!externalRes.ok) {
        return NextResponse.json(
          { error: `Failed to fetch from external source: ${externalRes.statusText}` },
          { status: 502 }
        );
      }

      const externalJson = await externalRes.json();
      const rawList: RawPortfolioItem[] = Array.isArray(externalJson)
        ? externalJson
        : externalJson.portfolio || [];

      const normalized = normalizePortfolioData(rawList);
      return NextResponse.json({
        source: sourceParam,
        count: normalized.length,
        projects: normalized,
      });
    }

    // If raw parameter requested, return raw portfolio array
    if (rawParam === 'true') {
      return NextResponse.json({
        portfolio: RAW_PORTFOLIO_DATA,
      });
    }

    // Default: return normalized StarterProjects
    return NextResponse.json({
      status: 'success',
      lab: "Prof. Aryan's Pokémon Research Laboratory",
      count: STARTER_PROJECTS.length,
      projects: STARTER_PROJECTS,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portfolio
 * Accepts a raw JSON body { portfolio: RawPortfolioItem[] } or RawPortfolioItem[]
 * and dynamically converts it into Pokémon StarterProjects.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawList: RawPortfolioItem[] = Array.isArray(body)
      ? body
      : body.portfolio || [];

    if (!rawList.length) {
      return NextResponse.json(
        { error: 'Invalid payload. Expected { portfolio: [...] } or array of items.' },
        { status: 400 }
      );
    }

    const normalized = normalizePortfolioData(rawList);
    return NextResponse.json({
      status: 'success',
      count: normalized.length,
      projects: normalized,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
