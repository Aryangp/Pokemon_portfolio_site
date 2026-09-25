'use client';

import { useState, useEffect, useCallback } from 'react';
import { STARTER_PROJECTS, StarterProject } from '@/data/portfolioData';
import { normalizePortfolioData, RawPortfolioItem } from './portfolioAdapter';
import { API_ENDPOINTS } from './apiConfig';

/**
 * Go Backend Projects API Endpoint (/api/v1/projects)
 */
export const DEFAULT_BACKEND_PROJECTS_URL = API_ENDPOINTS.projects;

/**
 * Fetches dynamic projects list from the Go / MongoDB backend service
 */
export async function fetchProjectsFromBackend(backendEndpointUrl?: string): Promise<{
  projects: StarterProject[];
  source: string;
  isLive: boolean;
}> {
  const endpoint = backendEndpointUrl || DEFAULT_BACKEND_PROJECTS_URL;

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`[BackendProjectsService] API returned ${res.status}, falling back to bundled projects.`);
      return {
        projects: STARTER_PROJECTS,
        source: 'local_fallback',
        isLive: false,
      };
    }

    const json = await res.json();
    
    // Support Go API response `{ success: true, data: [...] }` or raw array or `{ projects: [...] }`
    let rawList: RawPortfolioItem[] = [];
    if (Array.isArray(json)) {
      rawList = json;
    } else if (Array.isArray(json.data)) {
      rawList = json.data;
    } else if (Array.isArray(json.projects)) {
      rawList = json.projects;
    } else if (Array.isArray(json.portfolio)) {
      rawList = json.portfolio;
    }

    if (rawList.length === 0) {
      return {
        projects: STARTER_PROJECTS,
        source: 'local_fallback',
        isLive: false,
      };
    }

    const normalized = normalizePortfolioData(rawList);

    return {
      projects: normalized.length > 0 ? normalized : STARTER_PROJECTS,
      source: endpoint,
      isLive: true,
    };
  } catch (error) {
    console.warn('[BackendProjectsService] Network error fetching projects from backend, using fallback:', error);
    return {
      projects: STARTER_PROJECTS,
      source: 'local_fallback',
      isLive: false,
    };
  }
}

/**
 * Internal route fetcher
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

/**
 * Custom React Hook for live dynamic projects from Go / Mongo backend
 */
export function useDynamicProjects(customApiUrl?: string) {
  const [projects, setProjects] = useState<StarterProject[]>(STARTER_PROJECTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<string>('local_bundled');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchProjectsFromBackend(customApiUrl);
    setProjects(result.projects);
    setDataSource(result.source);
    setIsLive(result.isLive);
    setLastSyncTime(new Date());
    setIsLoading(false);
  }, [customApiUrl]);

  useEffect(() => {
    let isMounted = true;
    fetchProjectsFromBackend(customApiUrl).then((result) => {
      if (isMounted) {
        setProjects(result.projects);
        setDataSource(result.source);
        setIsLive(result.isLive);
        setLastSyncTime(new Date());
      }
    });

    return () => {
      isMounted = false;
    };
  }, [customApiUrl]);

  return {
    projects,
    isLoading,
    dataSource,
    isLive,
    lastSyncTime,
    reload: loadData,
  };
}
