import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair } from 'lucide-react';

const DEFAULT_USER = [51.4816, -0.1819]; // London SW10 fallback

export const getLatLng = (v) => {
  if (!v) return null;
  if (v.coords && v.coords.lat != null) return [Number(v.coords.lat), Number(v.coords.lng)];
  if (v.lat != null && (v.lng != null || v.lon != null)) return [Number(v.lat), Number(v.lng ?? v.lon)];
  if (v.latitude != null && v.longitude != null) return [Number(v.latitude), Number(v.longitude)];
  return null;
};

const PIN_SVG = (color = '#042C89', size = 14) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

const venueIcon = (selected, label, distanceStr = '') => {
  const size = selected ? 38 : 30;
  const bgColor = '#FFE600';
  const iconColor = '#042C89';

  const pin = `
    <div style="position:absolute;left:0;top:0;transform:translate(-50%,-50%);
      width:${size}px;height:${size}px;border-radius:9999px;background:${bgColor};
      border:2.5px solid #fff;box-shadow:0 2px 8px rgba(6,24,56,.3);
      display:flex;align-items:center;justify-content:center;cursor:pointer;">
      ${PIN_SVG(iconColor, selected ? 16 : 13)}
    </div>`;

  const tip = selected
    ? `<div style="position:absolute;left:0;bottom:${size / 2 + 8}px;transform:translateX(-50%);
        background:#042C89;color:#fff;
        padding:8px 16px;border-radius:9999px;white-space:nowrap;font-family:'Poppins', sans-serif;font-size:13px;font-weight:700;
        display:flex;align-items:center;gap:6px;pointer-events:none;box-shadow:0 3px 10px rgba(4,44,137,0.35);">
        <span>${label}</span>
        ${distanceStr ? `<span style="color:#E6F4FB;font-weight:600;">· ${distanceStr}</span>` : ''}
        <span style="position:absolute;left:50%;bottom:-4px;transform:translateX(-50%) rotate(45deg);
          width:8px;height:8px;background:#042C89;"></span>
      </div>`
    : '';

  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:0;height:0;">${tip}${pin}</div>`,
    iconSize: [0, 0]
  });
};

const youIcon = () =>
  L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:0;height:0;display:flex;flex-direction:column;align-items:center;">
        <div style="position:absolute;left:0;top:0;transform:translate(-50%,-50%);width:22px;height:22px;border-radius:9999px;background:#fff;border:3px solid #EF4444;box-shadow:0 2px 6px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;">
          <div style="width:8px;height:8px;border-radius:9999px;background:#EF4444;"></div>
        </div>
        <div style="position:absolute;left:0;top:16px;transform:translateX(-50%);background:#fff;border:1.5px solid #EF4444;color:#EF4444;font-size:11px;font-weight:800;padding:1px 7px;border-radius:9999px;font-family:'Poppins', sans-serif;box-shadow:0 1px 4px rgba(0,0,0,.15);pointer-events:none;">
          You
        </div>
      </div>
    `,
    iconSize: [0, 0]
  });

export function VenueMap({
  venues = [],
  selectedId,
  selectedVenue,
  onSelect,
  onSelectVenue,
  className = ''
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersGroupRef = useRef(null);

  const activeVenue =
    selectedVenue ||
    venues.find((v) => v.id === selectedId || String(v.venueId) === String(selectedId)) ||
    venues[0];

  const handleSelect = (v) => {
    if (onSelect) onSelect(v);
    if (onSelectVenue) onSelectVenue(v);
  };

  const handleRecenter = () => {
    if (!mapRef.current) return;
    const target = getLatLng(activeVenue) || DEFAULT_USER;
    mapRef.current.setView(target, 13, { animate: true });
  };

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      const initialPos = getLatLng(activeVenue) || DEFAULT_USER;
      const map = L.map(containerRef.current, {
        center: initialPos,
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers on venues or selection change
  useEffect(() => {
    const map = mapRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Add "You" marker
    L.marker(DEFAULT_USER, { icon: youIcon(), interactive: false, zIndexOffset: 200 }).addTo(markersGroup);

    const currentSelectedId = activeVenue?.id || selectedId;
    const validCoords = [DEFAULT_USER];

    venues.forEach((venue) => {
      const coords = getLatLng(venue);
      if (!coords) return;
      validCoords.push(coords);

      const isSelected =
        String(venue.id) === String(currentSelectedId) ||
        String(venue.venueId) === String(currentSelectedId);

      const distStr = venue.distanceDisplay || venue.mapDistanceDisplay || '';
      const icon = venueIcon(isSelected, venue.venueName || venue.name || '-', distStr);

      const marker = L.marker(coords, {
        icon,
        zIndexOffset: isSelected ? 1000 : 100
      });

      marker.on('click', () => {
        handleSelect(venue);
      });

      marker.addTo(markersGroup);
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    const targetCoords = getLatLng(activeVenue);
    if (targetCoords) {
      map.panTo(targetCoords, { animate: true, duration: 0.5 });
    } else if (validCoords.length > 0) {
      const bounds = L.latLngBounds(validCoords);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [venues, activeVenue, selectedId]);

  return (
    <div
      className={`relative w-full h-full min-h-[360px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm ${className}`}
    >
      <div ref={containerRef} className="w-full h-full min-h-[360px]" />
      
      {/* Floating Recenter / Crosshairs Button */}
      <button
        type="button"
        onClick={handleRecenter}
        aria-label="Recenter map"
        className="absolute top-3 right-3 z-[400] w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-[#042C89] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
      >
        <Crosshair className="w-5 h-5 text-[#042C89] stroke-[2.2]" />
      </button>
    </div>
  );
}

export default VenueMap;