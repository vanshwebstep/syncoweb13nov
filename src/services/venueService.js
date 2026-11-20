import { VENUES_DATA } from '../data/findAClassData.js';

export const BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'https://api.grabbite.com';

export const API_URL = `${BASE_URL}/api/open/find-class`;

let cachedRawVenues = null;
let cachedDynamicVenues = null;
let fetchPromise = null;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const toTitleCase = (str = '') =>
  String(str)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const capFirst = (s = '') => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

/** "4-5 years", "4–5 Years", "6-8 Years", "10–12 Years" -> '4-5' | '6-7' | '8-9' | '10-12' */
export const getAgeId = (name = '') => {
  const nums = (String(name).match(/\d+/g) || []).map(Number);
  if (!nums.length) return '4-5';
  const mid = (nums[0] + (nums[1] ?? nums[0])) / 2;
  if (mid < 6) return '4-5';
  if (mid < 8) return '6-7';
  if (mid < 10) return '8-9';
  return '10-12';
};

/* ------------------------------------------------------------------ */
/* Venues API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Fetch raw dynamic venues list: GET /api/open/find-class
 * @param {boolean} forceRefresh
 * @returns {Promise<Array>}
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
      const response = await fetch(API_URL, { method: 'GET', redirect: 'follow' });
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
 * Fetch a single class and its venue: GET /api/open/find-class/:id
 */
export async function fetchClassById(classId) {
  if (!classId) return null;

  try {
    const url = `${BASE_URL}/api/open/find-class/${classId}`;
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });

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
 * Transform an API venue into the format used by FindAClass UI components.
 */
export function transformApiVenue(raw) {
  if (!raw) return null;

  const rawId = raw.venueId != null ? raw.venueId : raw.id;
  const venueIdStr = String(rawId || 'venue');

  const formattedName = raw.venueName ? toTitleCase(raw.venueName) : raw.name || '-';
  const formattedArea = raw.area ? toTitleCase(raw.area) : '-';

  // Classes & days
  const scheduleClasses = [];
  let primaryDay = '-';

  if (raw.classes && typeof raw.classes === 'object') {
    const dayKeys = Object.keys(raw.classes);
    if (dayKeys.length > 0) primaryDay = capFirst(dayKeys[0]);

    dayKeys.forEach((dayKey) => {
      const capDay = capFirst(dayKey);
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

        const ageId = getAgeId(c.className);

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

  // Pricing (1, 2, 3 children)
  const pricing = {};
  const paymentGroup = raw.paymentGroups?.[0] || null;
  const plans = paymentGroup?.paymentPlans || [];

  [1, 2, 3].forEach((studentCount) => {
    const p12 = plans.find((p) => p.students === studentCount && p.duration === 12);
    const p6 = plans.find((p) => p.students === studentCount && p.duration === 6);
    const p1 = plans.find((p) => p.students === studentCount && p.duration === 1);

    const m12TotalPrice = p12 && p12.price != null ? Number(p12.price) : null;
    const m12PerChild = m12TotalPrice != null ? (m12TotalPrice / 12 / studentCount).toFixed(2) : '-';
    const m12TotalMonthly = m12TotalPrice != null ? (m12TotalPrice / 12).toFixed(2) : '-';

    const m6TotalPrice = p6 && p6.price != null ? Number(p6.price) : null;
    const m6PerChild = m6TotalPrice != null ? (m6TotalPrice / 6 / studentCount).toFixed(2) : '-';
    const m6TotalMonthly = m6TotalPrice != null ? (m6TotalPrice / 6).toFixed(2) : '-';

    const m1TotalPrice = p1 && p1.price != null ? Number(p1.price) : null;
    const m1PerChild = m1TotalPrice != null ? (m1TotalPrice / studentCount).toFixed(2) : '-';

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

  // Starter pack (no hardcoded offer price; offerPrice only if API sends it)
  const starterPackItem = raw.starterPacks?.[0];
  let starterPack = null;
  if (starterPackItem) {
    const regularPrice = starterPackItem.price != null ? Number(starterPackItem.price) : 0;
    const offerPrice =
      starterPackItem.offerPrice != null ? Number(starterPackItem.offerPrice) : regularPrice;

    starterPack = {
      id: starterPackItem.id,
      title: starterPackItem.title || 'Starter Pack',
      price: regularPrice.toFixed(2),
      was: regularPrice.toFixed(2),
      now: offerPrice.toFixed(2),
      hasOffer: offerPrice < regularPrice,
      description: starterPackItem.description || '-',
      paymentRouting: starterPackItem.paymentRouting || '-',
      items: Array.isArray(starterPackItem.items) ? starterPackItem.items : []
    };
  }

  // Terms
  const terms = Array.isArray(raw.terms)
    ? raw.terms.map((t) => ({
        id: String(t.id != null ? t.id : (t.name || 'term').toLowerCase()),
        name: t.name ? (t.name.toLowerCase().includes('term') ? t.name : `${t.name} term`) : '-',
        day: t.day ? capFirst(t.day) : primaryDay,
        startDate: t.startDate || null,
        endDate: t.endDate || null,
        start: t.startDate || null,
        end: t.endDate || null,
        exclusionDates: Array.isArray(t.exclusionDates) ? t.exclusionDates : [],
        totalSessions: t.totalSessions != null ? t.totalSessions : (t.sessionsMap?.length || 0),
        sessionsMap: Array.isArray(t.sessionsMap) ? t.sessionsMap : []
      }))
    : [];

  const parkingInfo = {
    hasParking: Boolean(raw.hasParking),
    parkingNote: raw.parkingNote || '',
    isCongested: Boolean(raw.isCongested)
  };

  // NOTE: API's distanceMiles is NOT reliable (backend has no user location -> 10000+ mi).
  // Distance is calculated client side via withDistance().
  return {
    id: venueIdStr,
    venueId: rawId,
    name: formattedName,
    venueName: formattedName,
    area: formattedArea,
    address: raw.address || '-',
    postcode: raw.postal_code || raw.postcode || '-',
    postal_code: raw.postal_code || raw.postcode || '-',
    lat: Number(raw.latitude) || null,
    lng: Number(raw.longitude) || null,
    facility: raw.facility || '-',
    parkingNote: raw.parkingNote || '',
    hasParking: Boolean(raw.hasParking),
    isCongested: Boolean(raw.isCongested),
    distanceMiles: null,
    distanceDisplay: '-',
    mapDistanceDisplay: '-',
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
 * Fetch dynamic venues and transform them into FindAClass UI format.
 * Falls back to static VENUES_DATA only if the API fails / is empty.
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
    console.warn('[venueService] API returned 0 venues -> using static VENUES_DATA');
  } catch (error) {
    console.error('[venueService] LIVE API FAILED -> using static VENUES_DATA:', error);
  }

  return VENUES_DATA;
}

/* ------------------------------------------------------------------ */
/* Grouping / search / distance                                        */
/* ------------------------------------------------------------------ */

/**
 * Group venues by area for accordion navigation
 */
export function groupVenuesByArea(venues = []) {
  const groups = {};

  venues.forEach((venue) => {
    const area = toTitleCase(venue.area && venue.area !== '-' ? venue.area : 'Other Locations');
    if (!groups[area]) groups[area] = [];
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
 * Search venues by keyword/postcode across name, area, address, postal_code
 * (postcode compare ignores spaces: "SW10 0AB" == "sw100ab")
 */
export function searchVenues(venues = [], query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return venues;
  const qNoSpace = q.replace(/\s+/g, '');

  return venues.filter((venue) => {
    const name = (venue.venueName || venue.name || '').toLowerCase();
    const area = (venue.area || '').toLowerCase();
    const address = (venue.address || '').toLowerCase();
    const postal = (venue.postal_code || venue.postcode || '').toLowerCase();

    return (
      name.includes(q) ||
      area.includes(q) ||
      address.includes(q) ||
      postal.includes(q) ||
      postal.replace(/\s+/g, '').includes(qNoSpace)
    );
  });
}

/**
 * Haversine distance in miles
 */
export function getDistanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
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
 * Closest venue to a lat/lng
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

/* ------------------------------------------------------------------ */
/* Postcode helpers (postcodes.io - free, no key, UK only)             */
/* ------------------------------------------------------------------ */

/**
 * "SW10 0AB" (full) or "W3" (outcode only) -> { lat, lng } | null
 */
export async function postcodeToCoords(postcode = '') {
  const clean = postcode.trim().replace(/\s+/g, ' ');
  if (!clean) return null;

  const isFull = /\d[A-Za-z]{2}$/.test(clean.replace(/\s/g, ''));
  const endpoint = isFull ? 'postcodes' : 'outcodes';

  try {
    const res = await fetch(
      `https://api.postcodes.io/${endpoint}/${encodeURIComponent(clean.replace(/\s/g, ''))}`
    );
    if (!res.ok) return null;
    const { result } = await res.json();
    if (!result || result.latitude == null) return null;
    return { lat: result.latitude, lng: result.longitude };
  } catch (err) {
    console.error('postcodeToCoords failed:', err);
    return null;
  }
}

/**
 * Browser lat/lng -> user's real nearest postcode (string) | null
 */
export async function coordsToPostcode(lat, lng) {
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}&limit=1`);
    if (!res.ok) return null;
    const { result } = await res.json();
    return result?.[0]?.postcode || null;
  } catch (err) {
    console.error('coordsToPostcode failed:', err);
    return null;
  }
}

/**
 * Attach real distance from user coords to each venue and sort nearest first.
 * If coords is null, venues are returned unchanged.
 */
export function withDistance(venues = [], coords) {
  if (!coords) return venues;

  return venues
    .map((v) => {
      const d =
        v.lat != null && v.lng != null
          ? getDistanceMiles(coords.lat, coords.lng, Number(v.lat), Number(v.lng))
          : null;
      const display = d != null ? `${d.toFixed(1)} mi` : '-';
      return {
        ...v,
        distanceMiles: d,
        distanceDisplay: display,
        mapDistanceDisplay: display
      };
    })
    .sort((a, b) => (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity));
}

/* ------------------------------------------------------------------ */
/* Other endpoints                                                     */
/* ------------------------------------------------------------------ */

/**
 * Fetch venue by ID or fallback by name.
 */
export async function fetchVenueByIdOrName(venueId = 78, venueName = '') {
  const targetId = venueId || 78;

  try {
    const response = await fetch(`${BASE_URL}/api/open/find-class/venue/${targetId}`, {
      method: 'GET',
      redirect: 'follow'
    });
    if (response.ok) {
      const json = await response.json();
      if (json?.data) return json.data;
    }
  } catch (err) {
    // fallback below
  }

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
 * Shared JSON POST helper
 */
async function postJson(path, body) {
  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const url = `${cleanBase}${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'follow'
  });

  const text = await response.text();
  let result = null;
  try {
    result = JSON.parse(text);
  } catch (parseErr) {
    console.error(`Non-JSON response from ${path}:`, text);
    throw new Error(`Unexpected server response (${response.status}). Please try again.`);
  }

  return { response, result };
}

/**
 * Book a free trial: POST /api/open/book-free-trial/create
 */
export async function bookFreeTrial(payload) {
  const response = await fetch(`${BASE_URL}/api/open/book-free-trial/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'follow'
  });
  const result = await response.json();

  if (!response.ok || result?.status === false) {
    throw new Error(result?.message || `Booking failed with status ${response.status}`);
  }

  return result;
}

/**
 * Check whether a parent account exists: POST /api/check-parent-email/
 */
export async function checkParentEmail(email) {
  if (!email || !email.trim()) {
    throw new Error('Please enter an email address.');
  }

  try {
    const { response, result } = await postJson('/api/check-parent-email/', {
      email: email.trim().toLowerCase()
    });

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
 * Parent login: POST /api/parent/login/
 */
export async function loginParent(email, password) {
  if (!email || !email.trim()) throw new Error('Please enter your email address.');
  if (!password) throw new Error('Please enter your password.');

  try {
    const { response, result } = await postJson('/api/parent/login/', {
      email: email.trim().toLowerCase(),
      password
    });

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
 * Create waiting list entry: POST /api/open/waiting-list/create
 */
export async function createWaitingListBooking(payload) {
  try {
    const { response, result } = await postJson('/api/open/waiting-list/create', payload);

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
 * Directions: GET /api/open/find-class/directions?venueId=&postal_code=
 */
export async function fetchDirections(venueId, postalCode) {
  if (!venueId) throw new Error('venueId is required to fetch directions.');

  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const pCode = postalCode ? encodeURIComponent(postalCode.trim()) : '';
  const url = `${cleanBase}/api/open/find-class/directions?venueId=${venueId}&postal_code=${pCode}`;

  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
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