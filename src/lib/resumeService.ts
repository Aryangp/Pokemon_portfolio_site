'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_RESUME_DATA, FullResumeData } from '@/data/resumeData';

// Public Gist or remote JSON URL override (supports both GIST_RESUME_URL and NEXT_PUBLIC_GIST_RESUME_URL, or server route /api/resume)
const DEFAULT_GIST_URL =
  process.env.GIST_RESUME_URL ||
  '/api/resume';

/**
 * Normalizes and validates incoming JSON into FullResumeData
 */
export function normalizeResumeData(incoming: unknown): FullResumeData {
  if (!incoming || typeof incoming !== 'object') {
    return DEFAULT_RESUME_DATA;
  }

  const inc = incoming as Record<string, any>;

  return {
    profile: {
      ...DEFAULT_RESUME_DATA.profile,
      ...(inc.profile || {}),
      stats: {
        ...DEFAULT_RESUME_DATA.profile.stats,
        ...(inc.profile?.stats || {}),
      },
    },
    technicalSkills: {
      languages: inc.technicalSkills?.languages || DEFAULT_RESUME_DATA.technicalSkills.languages,
      databasesAndCaching:
        inc.technicalSkills?.databasesAndCaching ||
        DEFAULT_RESUME_DATA.technicalSkills.databasesAndCaching,
      toolsAndFrameworks:
        inc.technicalSkills?.toolsAndFrameworks ||
        DEFAULT_RESUME_DATA.technicalSkills.toolsAndFrameworks,
    },
    workExperience: Array.isArray(inc.workExperience) && inc.workExperience.length > 0
      ? inc.workExperience
      : DEFAULT_RESUME_DATA.workExperience,
    education: Array.isArray(inc.education) && inc.education.length > 0
      ? inc.education
      : DEFAULT_RESUME_DATA.education,
    achievements: Array.isArray(inc.achievements) && inc.achievements.length > 0
      ? inc.achievements
      : DEFAULT_RESUME_DATA.achievements,
    partyMembers: Array.isArray(inc.partyMembers) && inc.partyMembers.length > 0
      ? inc.partyMembers
      : DEFAULT_RESUME_DATA.partyMembers,
    gymBadges: Array.isArray(inc.gymBadges) && inc.gymBadges.length > 0
      ? inc.gymBadges
      : DEFAULT_RESUME_DATA.gymBadges,
  };
}

/**
 * Fetches dynamic resume data from a GitHub Gist (raw URL) or internal API
 */
export async function fetchResumeFromGist(customGistUrl?: string): Promise<{
  data: FullResumeData;
  source: string;
  isRemote: boolean;
}> {
  const targetUrl = customGistUrl || DEFAULT_GIST_URL;

  try {
    const res = await fetch(targetUrl, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.warn(`[GistService] Failed to load from ${targetUrl} (${res.status}), falling back to default.`);
      return {
        data: DEFAULT_RESUME_DATA,
        source: 'local_bundled',
        isRemote: false,
      };
    }

    const rawJson = await res.json();
    const payload = rawJson && rawJson.data ? rawJson.data : rawJson;
    const normalized = normalizeResumeData(payload);
    const isRemoteResponse = rawJson && typeof rawJson.isRemote === 'boolean'
      ? rawJson.isRemote
      : targetUrl !== '/resume_gist.json' && targetUrl !== '/api/resume';

    return {
      data: normalized,
      source: rawJson.source || targetUrl,
      isRemote: isRemoteResponse,
    };
  } catch (error) {
    console.warn('[GistService] Network error fetching resume, using local fallback:', error);
    return {
      data: DEFAULT_RESUME_DATA,
      source: 'local_bundled',
      isRemote: false,
    };
  }
}

/**
 * Custom React Hook for live dynamic resume data
 */
export function useDynamicResumeData(customGistUrl?: string) {
  const [resumeData, setResumeData] = useState<FullResumeData>(DEFAULT_RESUME_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<string>('local_bundled');
  const [isRemote, setIsRemote] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchResumeFromGist(customGistUrl);
    setResumeData(result.data);
    setDataSource(result.source);
    setIsRemote(result.isRemote);
    setLastSyncTime(new Date());
    setIsLoading(false);
  }, [customGistUrl]);

  useEffect(() => {
    let isMounted = true;
    fetchResumeFromGist(customGistUrl).then((result) => {
      if (isMounted) {
        setResumeData(result.data);
        setDataSource(result.source);
        setIsRemote(result.isRemote);
        setLastSyncTime(new Date());
      }
    });

    return () => {
      isMounted = false;
    };
  }, [customGistUrl]);

  return {
    resumeData,
    isLoading,
    dataSource,
    isRemote,
    lastSyncTime,
    reload: loadData,
  };
}
