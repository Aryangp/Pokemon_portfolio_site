import { STARTER_PROJECTS, StarterProject } from '@/data/portfolioData';
import { normalizePortfolioData, RawPortfolioItem } from './portfolioAdapter';

/**
 * =========================================================================
 * BACKEND API PLACEHOLDER FOR PROJECTS
 * =========================================================================
 * Aryan, when your backend API is ready:
 * 1. Set NEXT_PUBLIC_PROJECTS_API_URL in .env.local (e.g. https://api.yourdomain.com/v1/projects)
 * 2. This function will automatically fetch from your live backend and normalize into StarterProjects!
 */
export async function fetchProjectsFromBackend(backendEndpointUrl?: string): Promise<{
  projects: StarterProject[];
  source: 'backend_api' | 'local_placeholder';
  isLive: boolean;
}> {
  const endpoint =
    backendEndpointUrl ||
    process.env.NEXT_PUBLIC_PROJECTS_API_URL ||
    null;

  // If no backend endpoint configured yet, return bundled placeholder projects
  if (!endpoint) {
    return {
      projects: STARTER_PROJECTS,
      source: 'local_placeholder',
      isLive: false,
    };
  }

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        // 'Authorization': `Bearer ${process.env.PROJECTS_API_KEY || ''}` // Optional token
      },
    });

    if (!res.ok) {
      console.warn(`[BackendProjectsService] API returned ${res.status}, falling back to placeholder projects.`);
      return {
        projects: STARTER_PROJECTS,
        source: 'local_placeholder',
        isLive: false,
      };
    }

    const json = await res.json();
    const rawList: RawPortfolioItem[] = Array.isArray(json)
      ? json
      : json.projects || json.portfolio || [];

    const normalized = normalizePortfolioData(rawList);

    return {
      projects: normalized.length > 0 ? normalized : STARTER_PROJECTS,
      source: 'backend_api',
      isLive: true,
    };
  } catch (error) {
    console.warn('[BackendProjectsService] Network error fetching projects from backend, using fallback:', error);
    return {
      projects: STARTER_PROJECTS,
      source: 'local_placeholder',
      isLive: false,
    };
  }
}

/**
 * Internal route fetcher for backwards compatibility
 */
export async function fetchPortfolioFromApi(sourceUrl?: string): Promise<StarterProject[]> {
  const result = await fetchProjectsFromBackend(sourceUrl);
  return result.projects;
}

/**
 * Synchronously normalize any external raw JSON array directly in-memory
 */
export function loadCustomPortfolio(rawItems: RawPortfolioItem[]): StarterProject[] {
  return normalizePortfolioData(rawItems);
}
