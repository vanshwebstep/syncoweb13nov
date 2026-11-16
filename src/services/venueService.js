import { VENUES_DATA } from '../data/findAClassData.js';

export const BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'https://api.grabbite.com';

export const API_URL = `${BASE_URL}/api/open/find-class`;

let cachedRawVenues = null;
let cachedDynamicVenues = null;
let fetchPromise = null;

/**
 * Fetch raw dynamic venues list from live API endpoint: /api/open/find-class
 * @param {boolean} forceRefresh - If true, bypass memory cache
 * @returns {Promise<Array>} List of raw venue objects
 */
export async function fetchVenues(forceRefresh = false) {
  if (cachedRawVenues && !forceRefresh) {
    return cachedRawVenues;
  }

  if (fetchPromise && !forceRefresh) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        throw new Error(`Failed to fetch venues: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const venues = Array.isArray(result?.data) ? result.data : [];
      cachedRawVenues = venues;
      return venues;
    } catch (error) {
      console.error('Error fetching dynamic venues from', API_URL, error);
      throw error;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Fetch a single class and its venue details by classId: /api/open/find-class/:id
 * e.g. GET https://api.grabbite.com/api/open/find-class/115 (or classId)
 * @param {string|number} classId
 * @returns {Promise<Object|null>}
 */
export async function fetchClassById(classId) {
  if (!classId) return null;

  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const url = `${BASE_URL}/api/open/find-class/${classId}`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch class ${classId}: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result?.data || null;
  } catch (error) {
    console.error(`Error fetching class by ID (${classId}) from ${BASE_URL}:`, error);
    throw error;
  }
}

/**
 * Transform an API venue from /api/open/find-class into the rich format
 * expected by FindAClass UI components (VenueCardList, VenueCardCompact, Modals, Map).
 * @param {Object} raw - Raw venue from API
 * @returns {Object} Transformed venue object
 */
export function transformApiVenue(raw) {
  if (!raw) return null;

  const rawId = raw.venueId != null ? raw.venueId : raw.id;
  const venueIdStr = String(rawId || 'venue');

  // Format clean venue name
  const formattedName = raw.venueName
    ? raw.venueName
        .split(' ')
        .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ''))
        .join(' ')
    : raw.name || '-';

  // Process classes & days
  const scheduleClasses = [];
  let primaryDay = '-';

  if (raw.classes && typeof raw.classes === 'object') {
    const dayKeys = Object.keys(raw.classes);
    if (dayKeys.length > 0) {
      primaryDay = dayKeys[0].charAt(0).toUpperCase() + dayKeys[0].slice(1);
    }

    dayKeys.forEach((dayKey) => {
      const capDay = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
      const dayClasses = Array.isArray(raw.classes[dayKey]) ? raw.classes[dayKey] : [];

      dayClasses.forEach((c) => {
        const cap = Number(c.capacity) || 0;
        const total = Number(c.totalCapacity) || 20;
        const spotsLeft = Math.max(0, total - cap);

        let statusType = 'available';
        let statusText = 'Spaces available';
        if (spotsLeft === 0) {
          statusType = 'full';
          statusText = 'Full';
        } else if (spotsLeft <= 5) {
          statusType = 'few_left';
          statusText = `Only ${spotsLeft} place${spotsLeft === 1 ? '' : 's'} left`;
        }

        // Determine age group id: '4-5' | '6-7' | '8-9' | '10-12'
        const nameLower = (c.className || '').toLowerCase();
        let ageId = '4-5';
        if (nameLower.includes('4') || nameLower.includes('5')) ageId = '4-5';
        else if (nameLower.includes('6') || nameLower.includes('7')) ageId = '6-7';
        else if (nameLower.includes('8') || nameLower.includes('9')) ageId = '8-9';
        else if (nameLower.includes('10') || nameLower.includes('11') || nameLower.includes('12')) ageId = '10-12';

        scheduleClasses.push({
          id: String(c.classId || `${venueIdStr}-${dayKey}-${scheduleClasses.length}`),
          classId: c.classId,
          time: c.time || '-',
          timeShort: `${capDay} ${c.time || ''}`.trim(),
          day: capDay,
          ageId,
          ageGroup: c.className ? `${c.className} · ${c.level || 'Beginner'}` : (c.level || '-'),
          ageSimple: c.className || '-',
          level: c.level || '-',
          capacity: cap,
          totalCapacity: total,
          spacesLeft: spotsLeft,
          statusType,
          statusText,
          allowFreeTrial: c.allowFreeTrial === true,
          canBookTrial: c.allowFreeTrial === true,
          canBookMembership: true,
          rawClass: c
        });
      });
    });
  }

  // Pricing structure for PricesModal (for 1, 2, 3 children)
  const pricing = {};
  const paymentGroup = raw.paymentGroups?.[0] || null;
  const plans = paymentGroup?.paymentPlans || [];
  [1, 2, 3].forEach((studentCount) => {
    const p12 = plans.find((p) => p.students === studentCount && p.duration === 12);
    const p6 = plans.find((p) => p.students === studentCount && p.duration === 6);
    const p1 = plans.find((p) => p.students === studentCount && p.duration === 1);

    // 12-Month Calculations
    const m12PerChild =
      p12 && p12.price != null
        ? (Number(p12.price) / 12 / studentCount).toFixed(2)
        : '-';
    const m12TotalMonthly =
      p12 && p12.price != null
        ? (Number(p12.price) / 12).toFixed(2)
        : '-';
    const m12TotalPrice = p12 && p12.price != null ? Number(p12.price) : null;

    // 6-Month Calculations
    const m6PerChild =
      p6 && p6.price != null
        ? (Number(p6.price) / 6 / studentCount).toFixed(2)
        : '-';
    const m6TotalMonthly =
      p6 && p6.price != null
        ? (Number(p6.price) / 6).toFixed(2)
        : '-';
    const m6TotalPrice = p6 && p6.price != null ? Number(p6.price) : null;

    // 1-Month Calculations
    const m1TotalPrice = p1 && p1.price != null ? Number(p1.price) : null;
    const m1PerChild =
      p1 && p1.price != null
        ? (Number(p1.price) / studentCount).toFixed(2)
        : '-';

    // Savings compared to rolling 1-month plan over 12 months
    const saveVal =
      m1TotalPrice != null && m12TotalPrice != null
        ? Math.round(m1TotalPrice * 12 - m12TotalPrice)
        : null;

    pricing[studentCount] = {
      m12: m12PerChild,
      m12PerChild,
      m12TotalMonthly,
      m12TotalPrice,
      m6: m6PerChild,
      m6PerChild,
      m6TotalMonthly,
      m6TotalPrice,
      m1TotalPrice,
      m1PerChild,
      save: saveVal != null && saveVal > 0 ? saveVal : null,
      plans: { p12, p6, p1 }
    };
  });

  // Starter pack from API
  const starterPackItem = raw.starterPacks?.[0];
  const regularPrice = starterPackItem?.price != null ? Number(starterPackItem.price) : 89.99;
  const offerPrice = starterPackItem?.offerPrice != null ? Number(starterPackItem.offerPrice) : 49.99;
  const starterPack = starterPackItem
    ? {
        id: starterPackItem.id,
        title: starterPackItem.title || 'Starter Pack',
        price: regularPrice.toFixed(2),
        was: regularPrice.toFixed(2),
        now: offerPrice.toFixed(2),
        description: starterPackItem.description || '-',
        paymentRouting: starterPackItem.paymentRouting || '-',
        items: Array.isArray(starterPackItem.items) ? starterPackItem.items : []
      }
    : null;

  // Term dates from API
  const terms = Array.isArray(raw.terms)
    ? raw.terms.map((t) => ({
        id: String(t.id != null ? t.id : (t.name || 'term').toLowerCase()),
        name: t.name ? (t.name.toLowerCase().includes('term') ? t.name : `${t.name} term`) : '-',
        day: t.day ? t.day.charAt(0).toUpperCase() + t.day.slice(1) : primaryDay,
        startDate: t.startDate || null,
        endDate: t.endDate || null,
        start: t.startDate || null,
        end: t.endDate || null,
        exclusionDates: Array.isArray(t.exclusionDates) ? t.exclusionDates : [],
        totalSessions: t.totalSessions != null ? t.totalSessions : (t.sessionsMap?.length || 0),
        sessionsMap: Array.isArray(t.sessionsMap) ? t.sessionsMap : []
      }))
    : [];

  // Parking info
  const parkingInfo = {
    hasParking: Boolean(raw.hasParking),
    parkingNote: raw.parkingNote || '',
    isCongested: Boolean(raw.isCongested)
  };

  const distMiles = typeof raw.distanceMiles === 'number' ? raw.distanceMiles : null;
  const distDisplay = distMiles != null ? `${distMiles.toLocaleString()} mi` : '-';

  return {
    id: venueIdStr,
    venueId: rawId,
    name: formattedName,
    venueName: raw.venueName || formattedName,
    area: raw.area || '-',
    address: raw.address || '-',
    postcode: raw.postal_code || raw.postcode || '-',
    postal_code: raw.postal_code || raw.postcode || '-',
    lat: Number(raw.latitude) || null,
    lng: Number(raw.longitude) || null,
    facility: raw.facility || '-',
    parkingNote: raw.parkingNote || '',
    hasParking: Boolean(raw.hasParking),
    isCongested: Boolean(raw.isCongested),
    distanceMiles: distMiles,
    distanceDisplay: distDisplay,
    mapDistanceDisplay: distDisplay,
    parkingInfo,
    schedule: {
      day: primaryDay,
      classes: scheduleClasses
    },
    pricing,
    starterPack,
    starterPacks: raw.starterPacks || [],
    terms,
    termGroups: raw.termGroups || [],
    paymentGroups: raw.paymentGroups || [],
    raw
  };
}

/**
 * Fetch dynamic venues and transform them into FindAClass UI format
 * @param {boolean} forceRefresh
 * @returns {Promise<Array>} List of transformed venues
 */
export async function fetchDynamicVenues(forceRefresh = false) {
  if (cachedDynamicVenues && !forceRefresh) {
    return cachedDynamicVenues;
  }

  try {
    const rawVenues = await fetchVenues(forceRefresh);
    if (Array.isArray(rawVenues) && rawVenues.length > 0) {
      const transformed = rawVenues.map(transformApiVenue).filter(Boolean);
      cachedDynamicVenues = transformed;
      return transformed;
    }
  } catch (error) {
    console.warn('Falling back to static VENUES_DATA due to fetch error:', error);
  }

  return VENUES_DATA;
}

/**
 * Group venues by area for accordion navigation
 * @param {Array} venues - Array of venue objects
 * @returns {Array<{ name: string, count: number, venues: Array }>}
 */
export function groupVenuesByArea(venues = []) {
  const groups = {};

  venues.forEach((venue) => {
    const area = (venue.area || 'Other Locations').trim();
    if (!groups[area]) {
      groups[area] = [];
    }
    groups[area].push(venue);
  });

  return Object.entries(groups)
    .map(([name, venueList]) => ({
      name,
      count: venueList.length,
      venues: venueList
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Search venues by keyword/postcode across venueName, area, address, postal_code
 * @param {Array} venues
 * @param {string} query
 * @returns {Array} Matching venues
 */
export function searchVenues(venues = [], query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return venues;

  return venues.filter((venue) => {
    const name = (venue.venueName || venue.name || '').toLowerCase();
    const area = (venue.area || '').toLowerCase();
    const address = (venue.address || '').toLowerCase();
    const postal = (venue.postal_code || venue.postcode || '').toLowerCase();

    return (
      name.includes(q) ||
      area.includes(q) ||
      address.includes(q) ||
      postal.includes(q)
    );
  });
}

/**
 * Calculate distance between two lat/lng points using Haversine formula (in miles)
 */
export function getDistanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find the closest venue to a given lat/lon
 * @param {Array} venues
 * @param {number} userLat
 * @param {number} userLng
 * @returns {Object|null} Nearest venue
 */
export function findNearestVenue(venues = [], userLat, userLng) {
  let nearest = null;
  let minDistance = Infinity;

  venues.forEach((venue) => {
    const lat = venue.lat != null ? venue.lat : venue.latitude;
    const lng = venue.lng != null ? venue.lng : venue.longitude;
    if (lat && lng) {
      const dist = getDistanceMiles(userLat, userLng, Number(lat), Number(lng));
      if (dist < minDistance) {
        minDistance = dist;
        nearest = { ...venue, calculatedDistanceMiles: dist };
      }
    }
  });

  return nearest;
}

/**
 * Fetch venue details dynamically by ID or fallback by name.
 * @param {string|number} [venueId=78]
 * @param {string} [venueName]
 * @returns {Promise<Object|null>}
 */
export async function fetchVenueByIdOrName(venueId = 78, venueName = '') {
  const targetId = venueId || 78;

  // 1. Try direct venue endpoint: /api/open/find-class/venue/:id
  try {
    const response = await fetch(`${BASE_URL}/api/open/find-class/venue/${targetId}`, {
      method: 'GET',
      redirect: 'follow'
    });
    if (response.ok) {
      const json = await response.json();
      if (json?.data) {
        return json.data;
      }
    }
  } catch (err) {
    // fallback
  }

  // 2. Fallback to /api/open/find-class list
  const venues = await fetchVenues();
  if (Array.isArray(venues) && venues.length > 0) {
    if (targetId) {
      const match = venues.find(
        (v) => String(v.venueId) === String(targetId) || String(v.id) === String(targetId)
      );
      if (match) return match;
    }
    if (venueName) {
      const nameLower = venueName.toLowerCase();
      const match = venues.find(
        (v) =>
          (v.venueName && v.venueName.toLowerCase().includes(nameLower)) ||
          (v.name && v.name.toLowerCase().includes(nameLower)) ||
          (v.area && v.area.toLowerCase().includes(nameLower))
      );
      if (match) return match;
    }
    return venues.find((v) => String(v.venueId) === '78') || venues[0];
  }

  return null;
}

/**
 * Book a free trial: POST /api/open/book-free-trial/create
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function bookFreeTrial(payload) {
  const url = `${BASE_URL}/api/open/book-free-trial/create`;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload),
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);
  const result = await response.json();

  if (!response.ok || result?.status === false) {
    throw new Error(result?.message || `Booking failed with status ${response.status}`);
  }

  return result;
}

/**
 * Check whether a parent account exists: POST /api/check-parent-email/
 * @param {string} email
 * @returns {Promise<{ exists: boolean, message: string, data?: any }>}
 */
export async function checkParentEmail(email) {
  if (!email || !email.trim()) {
    throw new Error('Please enter an email address.');
  }

  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const url = `${cleanBase}/api/check-parent-email/`;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    let result = null;
    const text = await response.text();
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.error('Non-JSON response from check-parent-email:', text);
      throw new Error(`Unexpected server response (${response.status}). Please try again.`);
    }

    if (!response.ok && response.status !== 400 && response.status !== 404) {
      throw new Error(result?.message || `Failed to verify email (${response.status}).`);
    }

    if (result?.status === false && result?.message) {
      throw new Error(result.message);
    }

    return {
      exists: Boolean(result?.exists),
      message: result?.message || '',
      data: result?.data || null
    };
  } catch (error) {
    console.error('Error in checkParentEmail:', error);
    throw error;
  }
}

/**
 * Authenticate existing parent account: POST /api/parent/login/
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export async function loginParent(email, password) {
  if (!email || !email.trim()) {
    throw new Error('Please enter your email address.');
  }
  if (!password) {
    throw new Error('Please enter your password.');
  }

  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const url = `${cleanBase}/api/parent/login/`;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    let result = null;
    const text = await response.text();
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.error('Non-JSON response from parent login:', text);
      throw new Error(`Unexpected server response (${response.status}). Please try again.`);
    }

    if (!response.ok) {
      throw new Error(result?.message || 'Login failed. Please check your credentials.');
    }

    return result;
  } catch (error) {
    console.error('Error in loginParent:', error);
    throw error;
  }
}

/**
 * Create a waiting list entry: POST /api/open/waiting-list/create
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function createWaitingListBooking(payload) {
  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const url = `${cleanBase}/api/open/waiting-list/create`;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload),
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    let result = null;
    const text = await response.text();
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.error('Non-JSON response from waiting-list create:', text);
      throw new Error(`Unexpected server response (${response.status}). Please try again.`);
    }

    if (!response.ok || result?.status === false) {
      throw new Error(result?.message || `Waiting list submission failed with status ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error in createWaitingListBooking:', error);
    throw error;
  }
}

/**
 * Fetch directions between a user's postal code and a venue:
 * GET /api/open/find-class/directions?venueId=:venueId&postal_code=:postal_code
 * @param {string|number} venueId
 * @param {string} postalCode
 * @returns {Promise<Object>}
 */
export async function fetchDirections(venueId, postalCode) {
  if (!venueId) {
    throw new Error('venueId is required to fetch directions.');
  }

  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const pCode = postalCode ? encodeURIComponent(postalCode.trim()) : '';
  const url = `${cleanBase}/api/open/find-class/directions?venueId=${venueId}&postal_code=${pCode}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch directions: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result?.data || null;
  } catch (error) {
    console.error('Error fetching directions from', url, error);
    throw error;
  }
}



