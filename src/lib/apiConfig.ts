/**
 * Global API Configuration & Backend Endpoints
 * Base URL is configurable via NEXT_PUBLIC_BACKEND_API_BASE_URL or BACKEND_API_BASE_URL.
 */

export const BACKEND_BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ||
  process.env.BACKEND_API_BASE_URL ||
  'https://portfolio-backend-go-yg0s.onrender.com'
).replace(/\/+$/, '');

/**
 * Standard Go Backend Endpoints
 */
export const API_ENDPOINTS = {
  // Projects endpoint
  projects: `${BACKEND_BASE_URL}/api/v1/projects`,
  // Contact endpoint
  contact: `${BACKEND_BASE_URL}/api/v1/contact`,
  // Health check endpoint
  health: `${BACKEND_BASE_URL}/api/v1/health`,
} as const;

/**
 * Helper to build custom API v1 URLs on the backend
 */
export function getBackendEndpoint(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BACKEND_BASE_URL}${cleanPath}`;
}
