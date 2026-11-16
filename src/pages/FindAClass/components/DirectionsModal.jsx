import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ExternalLink,
  MapPin,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import { ModalShell } from './ModalShell';
import { fetchDirections } from '../../../services/venueService';

const locate = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/locate.png';
const busBlue = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/bus-blue.png';
const busWhite = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/bus-white.png';
const carwhite = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/car-white.png';
const carblue = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/car_blue.png';
const runwhite = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/run-white.png';
const runblue = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/run_2.png';
const bikeblue = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/bike-blue.png';
const bikewhite = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/bike-white.png';
const run = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/run_sky.png';
const bus = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/bus_sky.png';

const MODES = [
  {
    id: 'car',
    label: 'Car',
    img: carblue,
    activeImg: carwhite,
    gmaps: 'driving',
    apple: 'd',
    speedMph: 20
  },
  {
    id: 'transit',
    label: 'Transit',
    img: busBlue,
    activeImg: busWhite,
    gmaps: 'transit',
    apple: 'r',
    speedMph: 12
  },
  {
    id: 'walk',
    label: 'Walk',
    img: runblue,
    activeImg: runwhite,
    gmaps: 'walking',
    apple: 'w',
    speedMph: 3
  },
  {
    id: 'cycle',
    label: 'Cycle',
    img: bikeblue,
    activeImg: bikewhite,
    gmaps: 'bicycling',
    apple: 'w',
    speedMph: 10
  }
];

export const getLatLng = (v) => {
  if (!v) return null;
  if (v.coords && v.coords.lat != null) return [Number(v.coords.lat), Number(v.coords.lng)];
  if (v.lat != null && (v.lng != null || v.lon != null)) return [Number(v.lat), Number(v.lng ?? v.lon)];
  if (v.latitude != null && v.longitude != null) return [Number(v.latitude), Number(v.longitude)];
  return null;
};

// Google Encoded Polyline Decoder
function decodePolyline(encoded) {
  if (!encoded) return [];
  const len = encoded.length;
  let index = 0;
  const array = [];
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    array.push([lat * 1e-5, lng * 1e-5]);
  }

  return array;
}

export function DirectionsModal({ isOpen, onClose, venue, userPostcode }) {
  const [mode, setMode] = useState('transit');
  const [from, setFrom] = useState(userPostcode || venue?.postal_code || venue?.postcode || 'SW10');
  const [editing, setEditing] = useState(false);
  const [tempFrom, setTempFrom] = useState(from);

  // API State
  const [directionData, setDirectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapLayersRef = useRef([]);

  // Sync initial postcode
  useEffect(() => {
    if (isOpen) {
      const initialFrom = userPostcode || venue?.postal_code || venue?.postcode || 'SW10';
      setFrom(initialFrom);
      setTempFrom(initialFrom);
    }
  }, [isOpen, userPostcode, venue]);

  // Venue identifiers
  const venueId = venue?.venueId != null ? venue.venueId : (venue?.id || '');
  const name = venue?.venueName || venue?.name || directionData?.venue?.name || '-';
  const address = directionData?.venue?.address || venue?.address || '-';
  const dest = getLatLng(directionData?.venue) || getLatLng(venue) || [51.4816, -0.1819];

  // Fetch Directions API
  const loadDirections = useCallback(async (vId, pCode) => {
    if (!vId) return;
    setLoading(true);
    setApiError(null);

    try {
      const data = await fetchDirections(vId, pCode);
      if (data) {
        setDirectionData(data);
      }
    } catch (err) {
      console.warn('Could not fetch directions from API:', err);
      setApiError(err.message || 'Failed to load directions');
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger API on modal open or when from/venue changes
  useEffect(() => {
    if (isOpen && venueId) {
      loadDirections(venueId, from);
    }
  }, [isOpen, venueId, from, loadDirections]);

  // Handle postal code change submission
  const handleSaveFrom = () => {
    setEditing(false);
    if (tempFrom.trim() && tempFrom.trim() !== from) {
      setFrom(tempFrom.trim());
    }
  };

  // Map Mode times & distances from API or fallback
  const modeInfo = useMemo(() => {
    const res = {};
    const apiModes = directionData?.modes;

    MODES.forEach((m) => {
      if (apiModes && apiModes[m.id]) {
        res[m.id] = {
          duration: apiModes[m.id].duration || '-',
          distance: apiModes[m.id].distance || ''
        };
      } else {
        const dist = typeof venue?.distanceMiles === 'number' ? venue.distanceMiles : null;
        if (dist != null && dist > 0 && dist < 100) {
          const mins = Math.max(1, Math.round((dist / m.speedMph) * 60));
          res[m.id] = {
            duration: `${mins} min`,
            distance: `${dist} mi`
          };
        } else {
          res[m.id] = { duration: '-', distance: '' };
        }
      }
    });

    return res;
  }, [directionData, venue?.distanceMiles]);

  const active = MODES.find((m) => m.id === mode) || MODES[1];

  // Compute steps
  const steps = useMemo(() => {
    // If transit mode and API returned transit steps
    if (mode === 'transit' && Array.isArray(directionData?.transit?.steps) && directionData.transit.steps.length > 0) {
      return directionData.transit.steps.map((st) => {
        const isWalk = st.type === 'WALK';
        return {
          type: isWalk ? 'walk' : 'bus',
          title: st.instruction || (isWalk ? `Walk ${st.distance || ''}` : `${st.lineName || st.vehicleType || 'Transit'}`),
          meta: isWalk
            ? `${st.duration || ''}${st.distance ? ` · ${st.distance}` : ''}`
            : `${st.departureStop || ''} (${st.departureTime || ''}) → ${st.arrivalStop || ''} (${st.arrivalTime || ''})${st.numStops ? ` · ${st.numStops} stops` : ''}${st.duration ? ` · ${st.duration}` : ''}`
        };
      });
    }

    // Car / Walk / Cycle steps from API
    const currentModeInfo = modeInfo[mode];
    const originLabel = directionData?.origin?.resolvedAddress || directionData?.origin?.query || from || 'your location';
    const destLabel = directionData?.venue?.name || name;

    const actionText = {
      car: 'Drive to',
      transit: 'Travel to',
      walk: 'Walk to',
      cycle: 'Cycle to'
    }[mode] || 'Head to';

    return [
      {
        type: 'walk',
        title: `Start from ${originLabel}`,
        meta: 'Begin journey'
      },
      {
        type: mode === 'car' ? 'bus' : (mode === 'transit' ? 'bus' : 'walk'),
        title: `${actionText} ${destLabel}`,
        meta: `${address}${currentModeInfo?.duration !== '-' ? ` · ${currentModeInfo.duration}` : ''}${currentModeInfo?.distance ? ` (${currentModeInfo.distance})` : ''}`
      }
    ];
  }, [mode, directionData, from, name, address, modeInfo]);

  // External URLs
  const gUrl = directionData?.externalLinks?.googleMaps ||
    `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from || 'Current Location')}&destination=${encodeURIComponent(`${name}, ${address}`)}&travelmode=${active.gmaps}`;
  const aUrl = directionData?.externalLinks?.appleMaps ||
    `https://maps.apple.com/?saddr=${encodeURIComponent(from || 'Current Location')}&daddr=${encodeURIComponent(`${name}, ${address}`)}&dirflg=${active.apple}`;

  const nextClass = venue?.schedule?.classes?.[0];
  const classLabel = nextClass
    ? `${venue?.schedule?.day || ''} ${nextClass.time || ''}`.trim()
    : '-';

  // Leaflet Map with Polyline
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: dest,
          zoom: 12,
          zoomControl: false,
          attributionControl: false,
          dragging: true,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: true
        });

        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear previous markers/polylines
      mapLayersRef.current.forEach((layer) => {
        try {
          map.removeLayer(layer);
        } catch (e) {
          // ignore
        }
      });
      mapLayersRef.current = [];

      // Check if overviewPolyline is available
      const polylineStr = directionData?.mapData?.overviewPolyline;
      if (polylineStr) {
        const points = decodePolyline(polylineStr);
        if (points.length > 0) {
          // Draw Polyline route
          const polylineLayer = L.polyline(points, {
            color: '#002B9A',
            weight: 5,
            opacity: 0.85,
            lineJoin: 'round'
          }).addTo(map);
          mapLayersRef.current.push(polylineLayer);

          // Start Location Marker (Green Dot)
          const startPt = directionData?.mapData?.startLocation
            ? [directionData.mapData.startLocation.lat, directionData.mapData.startLocation.lng]
            : points[0];

          const startMarker = L.marker(startPt, {
            icon: L.divIcon({
              className: '',
              html: '<div style="width:20px;height:20px;border-radius:9999px;background:#10B981;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%)"><div style="width:6px;height:6px;border-radius:9999px;background:#fff"></div></div>',
              iconSize: [0, 0]
            })
          }).addTo(map);
          mapLayersRef.current.push(startMarker);

          // End Location Marker (Yellow Pin)
          const endPt = directionData?.mapData?.endLocation
            ? [directionData.mapData.endLocation.lat, directionData.mapData.endLocation.lng]
            : points[points.length - 1];

          const destMarker = L.marker(endPt, {
            icon: L.divIcon({
              className: '',
              html: '<div style="width:24px;height:24px;border-radius:9999px;background:#FFE600;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%)"><div style="width:8px;height:8px;border-radius:9999px;background:#042C89"></div></div>',
              iconSize: [0, 0]
            })
          }).addTo(map);
          mapLayersRef.current.push(destMarker);

          // Fit bounds
          map.fitBounds(polylineLayer.getBounds(), {
            padding: [24, 24]
          });
          return;
        }
      }

      // Fallback: Just destination marker
      const destMarker = L.marker(dest, {
        icon: L.divIcon({
          className: '',
          html: '<div style="width:24px;height:24px;border-radius:9999px;background:#FFE600;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%)"><div style="width:8px;height:8px;border-radius:9999px;background:#042C89"></div></div>',
          iconSize: [0, 0]
        })
      }).addTo(map);
      mapLayersRef.current.push(destMarker);
      map.setView(dest, 13);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, dest, directionData]);

  // Clean up on unmount or modal close
  useEffect(() => {
    if (!isOpen && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      mapLayersRef.current = [];
    }
  }, [isOpen]);

  // Entrance note from API or venue
  const entranceNote = directionData?.venue?.entranceNote || venue?.entranceNote || venue?.howToEnterFacility || '';

  if (!isOpen) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Directions"
      subtitle={`${name} · ${address}`}
      maxWidth="max-w-[580px]"
      headerDivider={true}
    >
      {/* From Location Bar */}
      <div className="bg-[#F1F5F9] rounded-full px-4 py-3 flex items-center justify-between gap-2 mb-3.5 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0 text-[14px] font-bold text-[#061838]">
          <img src={locate} className="w-4 h-4 shrink-0" alt="" />
          <div className="min-w-0 flex items-center gap-1.5">
            <span className="shrink-0 text-[#042C89] font-bold">From</span>
            {editing ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={tempFrom}
                  onChange={(e) => setTempFrom(e.target.value.toUpperCase())}
                  onBlur={handleSaveFrom}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveFrom()}
                  placeholder="Postcode"
                  className="bg-white rounded-md px-2.5 py-1 text-[13px] font-bold text-[#002B9A] outline-none w-36 uppercase border border-[#002B9A]"
                />
                <button
                  type="button"
                  onClick={handleSaveFrom}
                  className="bg-[#002B9A] text-white p-1 rounded-md text-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="font-bold text-[#042C89] truncate">
                {directionData?.origin?.resolvedAddress || from || '-'}
              </span>
            )}
          </div>
        </div>

        {!editing && (
          <button
            type="button"
            onClick={() => {
              setTempFrom(from);
              setEditing(true);
            }}
            className="text-[13px] font-bold text-[#00A6E3] hover:underline cursor-pointer shrink-0"
          >
            Change
          </button>
        )}
      </div>

      {/* Mini Interactive Map container */}
      <div className="relative isolate z-0 h-[160px] sm:h-[180px] rounded-[16px] overflow-hidden border border-[#E2E8F0] mb-3.5 bg-slate-100 shadow-sm">
        <div ref={mapContainerRef} className="w-full h-full" />
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center gap-2 text-[#042C89] text-xs font-bold z-10">
            <Loader2 className="w-4 h-4 animate-spin text-[#002B9A]" />
            <span>Calculating live route...</span>
          </div>
        )}
      </div>

      {/* Mode tiles (Car, Transit, Walk, Cycle) */}
      <div className="grid grid-cols-4 gap-2.5 mb-3.5">
        {MODES.map(({ id, label, img, activeImg }) => {
          const isActive = mode === id;
          const modeData = modeInfo[id];
          const timeDisplay = modeData?.duration || '-';

          return (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`rounded-[18px] sm:rounded-[20px] py-3 pb-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#042C89] text-white shadow-sm ring-2 ring-[#042C89]/20'
                  : 'bg-white border border-[#E2E8F0] text-[#042C89] hover:border-slate-300 shadow-2xs'
              }`}
            >
              <img
                src={isActive ? activeImg : img}
                alt=""
                className="w-4 h-4 object-contain"
              />

              <span
                className={`text-[12px] sm:text-[13px] font-bold leading-tight mt-1 truncate max-w-[90%] ${
                  isActive ? 'text-white' : 'text-[#042C89]'
                }`}
                title={timeDisplay}
              >
                {timeDisplay}
              </span>

              <span
                className={`text-[10px] sm:text-[11px] font-semibold ${
                  isActive ? 'text-[#C9D3F0]' : 'text-[#797A88]'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Route detail */}
      <div className="border border-[#E2E8F0] rounded-[22px] sm:rounded-[24px] p-5 sm:p-5.5 mb-3.5 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[15px] sm:text-[16px] font-bold text-[#042C89] leading-tight">
            {modeInfo[mode]?.duration !== '-' ? `${modeInfo[mode].duration} · ` : ''}Travel to {name}
          </p>
          <span className="text-[12px] text-[#797A88] font-bold">{classLabel}</span>
        </div>

        {/* Steps List */}
        <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute left-[15px] top-[32px] bottom-[-16px] w-[2px] border-l-2 border-dotted border-[#CBD5E1]" />
              )}
              <div className="flex items-start gap-3.5 relative z-10">
                <span className="w-8 h-8 rounded-full bg-[#EBF7FC] text-[#00A3E0] flex items-center justify-center shrink-0">
                  {s.type === 'bus' ? (
                    <img src={bus} className="w-3.5 h-3.5" alt="" />
                  ) : (
                    <img src={run} className="w-3.5 h-3.5" alt="" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] sm:text-[14px] font-bold text-[#042C89] leading-tight">
                    {s.title}
                  </p>
                  <p className="text-[12px] text-[#64748B] font-medium mt-1 leading-snug">
                    {s.meta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open in Maps Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-3.5">
        <a
          href={gUrl}
          target="_blank"
          rel="noreferrer"
          className="h-12 rounded-full bg-[#042C89] hover:bg-[#03236e] text-white text-[13px] md:text-[14px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 stroke-[2.5]" /> Google Maps
        </a>
        <a
          href={aUrl}
          target="_blank"
          rel="noreferrer"
          className="h-12 rounded-full bg-white border-2 border-[#042C89] hover:bg-slate-50 text-[#042C89] text-[13px] md:text-[14px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 stroke-[2.5]" /> Apple Maps
        </a>
      </div>

      {/* Entrance Note / Venue Location */}
      {entranceNote ? (
        <div className="bg-[#FFF8D6] rounded-[20px] p-4 sm:p-5 flex items-start gap-3.5 mb-2">
          <span className="w-10 h-10 rounded-full bg-white text-[#042C89] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <MapPin className="w-5 h-5 text-[#042C89] stroke-[2.2]" />
          </span>
          <div>
            <p className="text-[14px] font-bold text-[#042C89] leading-tight">
              Facility Entrance & Arrival
            </p>
            <p className="text-[12px] text-[#34353B] font-medium mt-1 leading-relaxed">
              {entranceNote}
            </p>
            <p className="text-[11px] text-[#64748B] mt-1 font-normal">
              {address}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFF8D6] rounded-[20px] p-5 flex items-center gap-3.5 mb-2">
          <span className="w-10 h-10 rounded-full bg-white text-[#042C89] flex items-center justify-center shrink-0 shadow-sm">
            <MapPin className="w-5 h-5 text-[#042C89] stroke-[2.2]" />
          </span>
          <div>
            <p className="text-[14px] font-bold text-[#042C89] leading-tight">Venue Location</p>
            <p className="md:text-[12px] text-[10px] text-[#34353B] font-normal mt-0.5 leading-snug">
              {address}
            </p>
          </div>
        </div>
      )}

      <p className="text-[11px] text-[#797A88] font-normal mt-3 text-center sm:text-left">
        Select Google Maps or Apple Maps for live turn-by-turn routing and departure times.
      </p>
    </ModalShell>
  );
}

export default DirectionsModal;
