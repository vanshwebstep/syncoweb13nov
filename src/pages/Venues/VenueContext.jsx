import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDynamicVenues, fetchVenueByIdOrName } from '../../services/venueService';

const VenueContext = createContext(null);

export function VenueProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const idFromParam = searchParams.get('id') || searchParams.get('venueId');
  const nameFromParam = searchParams.get('name') || searchParams.get('location');

  const [allVenues, setAllVenues] = useState([]);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVenues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const venuesList = await fetchDynamicVenues();
      setAllVenues(venuesList);

      let selected = null;

      if (idFromParam) {
        selected = venuesList.find(
          (v) => String(v.venueId) === String(idFromParam) || String(v.id) === String(idFromParam)
        );
      }

      if (!selected && nameFromParam) {
        const lower = nameFromParam.toLowerCase();
        selected = venuesList.find(
          (v) =>
            (v.venueName && v.venueName.toLowerCase().includes(lower)) ||
            (v.name && v.name.toLowerCase().includes(lower)) ||
            (v.area && v.area.toLowerCase().includes(lower))
        );
      }

      if (!selected && venuesList.length > 0) {
        selected = venuesList[0];
      }

      // If specific id was passed and we need detailed data
      if (selected?.venueId) {
        try {
          const detailed = await fetchVenueByIdOrName(selected.venueId);
          if (detailed) {
            selected = { ...selected, ...detailed };
          }
        } catch (detailErr) {
          // ignore, keep selected
        }
      }

      setVenue(selected);
      setLoading(false);
    } catch (err) {
      console.error('Error loading venue:', err);
      setError(err?.message || 'Failed to fetch venue data');
      setLoading(false);
    }
  }, [idFromParam, nameFromParam]);

  useEffect(() => {
    loadVenues();
  }, [loadVenues]);

  const changeVenue = useCallback(
    async (newVenueOrId) => {
      const targetId = typeof newVenueOrId === 'object' ? (newVenueOrId.venueId || newVenueOrId.id) : newVenueOrId;
      let matched = allVenues.find(
        (v) => String(v.venueId) === String(targetId) || String(v.id) === String(targetId)
      );
      if (targetId) {
        try {
          const detailed = await fetchVenueByIdOrName(targetId);
          if (detailed) {
            matched = { ...(matched || {}), ...detailed };
          }
        } catch (detailErr) {
          // ignore
        }
      }
      if (matched) {
        setVenue(matched);
      }
      setSearchParams({ id: targetId });
    },
    [allVenues, setSearchParams]
  );

  const venueDisplayName = venue?.venueName || venue?.name || 'Chelsea Academy';
  const venueDisplayArea = venue?.area || 'Chelsea';

  return (
    <VenueContext.Provider
      value={{
        venue,
        allVenues,
        loading,
        error,
        venueName: venueDisplayName,
        area: venueDisplayArea,
        changeVenue,
        reloadVenue: loadVenues
      }}
    >
      {children}
    </VenueContext.Provider>
  );
}

export function useVenue() {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error('useVenue must be used within a VenueProvider');
  }
  return context;
}
