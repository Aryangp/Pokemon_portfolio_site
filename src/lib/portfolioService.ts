import { STARTER_PROJECTS, StarterProject } from '@/data/portfolioData';
import { normalizePortfolioData, RawPortfolioItem } from './portfolioAdapter';

/**
 * Portfolio Service for fetching from internal or external APIs
 */
export async function fetchPortfolioFromApi(sourceUrl?: string): Promise<StarterProject[]> {
  try {
    const endpoint = sourceUrl
      ? `/api/portfolio?source=${encodeURIComponent(sourceUrl)}`
      : `/api/portfolio`;

    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`Portfolio API returned ${res.status}, falling back to static dataset.`);
      return STARTER_PROJECTS;
    }

    const data = await res.json();
    return data.projects || STARTER_PROJECTS;
  } catch (error) {
    console.error('Error fetching portfolio from API:', error);
    return STARTER_PROJECTS;
  }
}

/**
 * Synchronously normalize any external raw JSON array directly in-memory
 */
export function loadCustomPortfolio(rawItems: RawPortfolioItem[]): StarterProject[] {
  return normalizePortfolioData(rawItems);
}
