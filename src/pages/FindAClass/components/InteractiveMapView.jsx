import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair } from 'lucide-react';
import { MAP_EXTRA_LOCATIONS } from '../../../data/findAClassData';

export function InteractiveMapView({
  venues = [],
  selectedVenue,
  onSelectVenue
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = selectedVenue?.lat || 51.485;
      const initialLng = selectedVenue?.lng || -0.125;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Google Maps Clean Street Tile layer (No API key required)
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map);

      // Add Zoom Control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when venues or selectedVenue change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // 1. Render all main venues
    venues.forEach((venue) => {
      const isSelected = selectedVenue?.id === venue.id;

      if (isSelected) {
        // Active selected venue with dark navy tooltip and yellow pin
        const distanceStr = venue.mapDistanceDisplay || venue.distanceDisplay || '1.2 mi';
        const iconHtml = `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
            <!-- Dark Navy Tooltip Bubble -->
            <div style="
              background: #061838;
              color: #ffffff;
              font-family: 'Poppins', sans-serif;
              font-size: 11px;
              font-weight: 800;
              padding: 4px 10px;
              border-radius: 12px;
              box-shadow: 0 4px 14px rgba(6, 24, 56, 0.35);
              white-space: nowrap;
              letter-spacing: 0.2px;
            ">
              ${venue.name} · ${distanceStr}
            </div>
            <!-- Tooltip Caret -->
            <div style="
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid #061838;
              margin-top: -1px;
              margin-bottom: 3px;
            "></div>
            <!-- Yellow Location Pin Badge -->
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: #FFE600;
              border: 2.5px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 10px rgba(0,0,0,0.25);
            ">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#061838" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>
        `;

        const activeIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-active-pin',
          iconSize: [0, 0]
        });

        const marker = L.marker([venue.lat, venue.lng], { icon: activeIcon, zIndexOffset: 1000 });
        marker.on('click', () => onSelectVenue(venue));
        marker.addTo(markersGroup);
      } else {
        // Other main venues (green circular pin)
        const iconHtml = `
          <div style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #0DD180;
            border: 2px solid #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.22);
            cursor: pointer;
            transform: translate(-50%, -50%);
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
          </div>
        `;

        const pinIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-green-pin',
          iconSize: [0, 0]
        });

        const marker = L.marker([venue.lat, venue.lng], { icon: pinIcon, zIndexOffset: 500 });
        marker.on('click', () => onSelectVenue(venue));
        marker.addTo(markersGroup);
      }
    });

    // 2. Render extra London area pins for authentic London coverage matching screenshot 2
    MAP_EXTRA_LOCATIONS.forEach((loc) => {
      const extraIconHtml = `
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #0DD180;
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          cursor: pointer;
          transform: translate(-50%, -50%);
          opacity: 0.9;
        ">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
        </div>
      `;

      const extraIcon = L.divIcon({
        html: extraIconHtml,
        className: 'custom-extra-pin',
        iconSize: [0, 0]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: extraIcon, zIndexOffset: 100 });
      marker.on('click', () => {
        // Find closest main venue or select first
        onSelectVenue(venues[0]);
      });
      marker.addTo(markersGroup);
    });

    // Pan map to selected venue smoothly
    if (selectedVenue) {
      map.panTo([selectedVenue.lat, selectedVenue.lng], {
        animate: true,
        duration: 0.6
      });
    }
  }, [venues, selectedVenue, onSelectVenue]);

  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    const targetLat = selectedVenue?.lat || 51.485;
    const targetLng = selectedVenue?.lng || -0.125;
    mapInstanceRef.current.setView([targetLat, targetLng], 11, { animate: true });
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      {/* Leaflet DOM container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Recalibrate / Target Button Top-Right */}
      <div className="absolute top-4 right-4 z-[400]">
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map"
          className="bg-white hover:bg-slate-50 text-[#061838] p-2.5 rounded-2xl shadow-lg border border-slate-100 transition-all active:scale-95 cursor-pointer flex items-center justify-center"
        >
          <Crosshair className="w-4 h-4 text-[#061838]" />
        </button>
      </div>
    </div>
  );
}

export default InteractiveMapView;
