import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchVenueByIdOrName } from '../../services/venueService';

const VenueContext = createContext(null);

export function VenueProvider({ children }) {
  const [searchParams] = useSearchParams();
  const idFromParam = searchParams.get('id') || searchParams.get('venueId');
  const nameFromParam = searchParams.get('name') || searchParams.get('location');

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchVenueByIdOrName(idFromParam || 78, nameFromParam)
      .then((data) => {
        if (isMounted) {
          setVenue(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error loading venue:', err);
          setError(err?.message || 'Failed to fetch venue data');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [idFromParam, nameFromParam]);
console.log('VenueContext: venue data loaded', venue);
  const venueDisplayName = venue?.venueName || nameFromParam || 'Elite Sports Academy';
  const venueDisplayArea = venue?.area || 'Manchester Central';

  return (
    <VenueContext.Provider
      value={{
        venue,
        loading,
        error,
        venueName: venueDisplayName,
        area: venueDisplayArea
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
