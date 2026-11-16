import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix standard Leaflet marker icons in bundlers like Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom Brand Pin Icon
const brandPinIcon = L.divIcon({
  className: 'custom-venue-pin',
  html: `
    <div style="
      position: relative;
      width: 36px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
    ">
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 0C8.06 0 0 8.06 0 18C0 29.5 18 44 18 44C18 44 36 29.5 36 18C36 8.06 27.94 0 18 0Z" fill="#042C89"/>
        <circle cx="18" cy="17" r="10" fill="#0DD180"/>
        <circle cx="18" cy="17" r="5" fill="#FFFFFF"/>
      </svg>
    </div>
  `,
  iconSize: [36, 44],
  iconAnchor: [18, 44],
  popupAnchor: [0, -42],
});

export function CleanVenueMap({
  venue,
  venueName = 'Venue',
  className = 'w-full h-full min-h-[380px]',
  zoom = 14,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Parse coordinates with reliable fallback (London coordinates)
  const lat = parseFloat(venue?.latitude) || 51.5074;
  const lng = parseFloat(venue?.longitude) || -0.1278;
  const address = venue?.address || (venueName ? `${venueName}, UK` : 'London, UK');
  const googleDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent duplicate map initialization
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: zoom,
        zoomControl: false, // We add custom positioned zoom control at bottomright
        attributionControl: false,
      });

      // Google Maps Clean Street Tile layer (No API key required)
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      // Add Zoom control at bottom-right (matching the screenshot)
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add Marker
      const marker = L.marker([lat, lng], { icon: brandPinIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 160px;">
          <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #042C89;">
            ${venueName}
          </h4>
          <p style="margin: 0 0 8px; font-size: 12px; color: #475569; line-height: 1.3;">
            ${address}
          </p>
          <a 
            href="${googleDirectionsUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="display: inline-block; font-size: 11px; font-weight: 600; color: #0DD180; text-decoration: none;"
          >
            Get Directions &rarr;
          </a>
        </div>
      `;
      marker.bindPopup(popupContent);

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      // If coordinates change dynamically
      mapInstanceRef.current.setView([lat, lng], zoom);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px; min-width: 160px;">
            <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #042C89;">
              ${venueName}
            </h4>
            <p style="margin: 0 0 8px; font-size: 12px; color: #475569; line-height: 1.3;">
              ${address}
            </p>
            <a 
              href="${googleDirectionsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="display: inline-block; font-size: 11px; font-weight: 600; color: #0DD180; text-decoration: none;"
            >
              Get Directions &rarr;
            </a>
          </div>
        `;
        markerRef.current.setPopupContent(popupContent);
      }
    }

    // Handle container resize
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [lat, lng, venueName, address, zoom, googleDirectionsUrl]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full min-h-inherit z-0" />
      
      {/* Floating Directions Badge */}
      <div className="absolute top-3 left-3 z-[400]">
        <a
          href={googleDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-[#042C89] hover:text-[#0DD180] text-xs font-semibold rounded-full shadow-md backdrop-blur-sm transition-all border border-slate-200"
        >
          <svg className="w-3.5 h-3.5 text-[#0DD180]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Directions
        </a>
      </div>
    </div>
  );
}

export default CleanVenueMap;
