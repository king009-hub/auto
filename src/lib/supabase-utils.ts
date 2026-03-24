import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Wraps a promise in a timeout.
 */
export async function withTimeout<T>(promise: Promise<T>, timeoutMs = DEFAULT_TIMEOUT): Promise<T> {
  let timeoutHandle: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    return result;
  } finally {
    clearTimeout(timeoutHandle);
  }
}

/**
 * Specifically for Supabase queries that return PostgrestResponse.
 */
export async function fetchWithTimeout<T>(
  query: Promise<PostgrestResponse<T>>,
  timeoutMs = DEFAULT_TIMEOUT
): Promise<PostgrestResponse<T>> {
  return withTimeout(query, timeoutMs);
}

/**
 * Specifically for Supabase single-row queries.
 */
export async function fetchSingleWithTimeout<T>(
  query: Promise<PostgrestSingleResponse<T>>,
  timeoutMs = DEFAULT_TIMEOUT
): Promise<PostgrestSingleResponse<T>> {
  return withTimeout(query, timeoutMs);
}
