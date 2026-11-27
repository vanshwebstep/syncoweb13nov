export const BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'https://api.grabbite.com';

export const requestOptions = {
  method: "GET",
  redirect: "follow"
};

/**
 * Fetch legal page data by slug
 * @param {string} slug - e.g. 'terms-and-conditions', 'privacy-policy', 'safeguarding-policy', 'accessibility-statement'
 * @returns {Promise<any>}
 */
export async function fetchLegalPage(slug = 'terms-and-conditions') {
  try {
    const response = await fetch(`${BASE_URL}/api/open/legal-pages/${slug}`, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch legal page (${slug}): ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in fetchLegalPage [${slug}]:`, error);
    throw error;
  }
}

/**
 * Convenience methods for all legal pages
 */
export const fetchTermsAndConditions = () => fetchLegalPage('terms-and-conditions');
export const fetchPrivacyPolicy = () => fetchLegalPage('privacy-policy');
export const fetchSafeguardingPolicy = () => fetchLegalPage('safeguarding-policy');
export const fetchAccessibilityStatement = () => fetchLegalPage('accessibility-statement');
