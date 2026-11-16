import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import WhoJoining from "./components/WhoJoining";
import WaitingListConfirmed from "./components/WaitingListConfirmed";
import { VENUES_DATA } from "../../data/findAClassData";
import { fetchDynamicVenues, fetchClassById } from "../../services/venueService";
import "./waitinglist-translated.css";

function normalizeVenue(apiVenue, selectedClass) {
  if (!apiVenue) return null;

  const vId = Number(apiVenue.venueId || apiVenue.id) || 5;
  const vName = apiVenue.venueName || apiVenue.name || "Samba Venue";
  const address = apiVenue.address || `${apiVenue.area || 'London'}, UK`;
  const phone = apiVenue.phone || "020 7205 2723";

  // Build slots from classes if available
  const slots = {
    "4–5s": "4:00 – 5:00pm",
    "6–7s": "5:00 – 6:00pm",
    "8–9s": "6:00 – 7:00pm",
    "10–12s": "7:00 – 8:00pm",
  };

  let primaryDay = "Saturdays";
  let shortDay = "Sat";

  const classes = apiVenue.schedule?.classes || [];
  if (classes.length > 0) {
    primaryDay = classes[0].day ? `${classes[0].day}s` : "Saturdays";
    shortDay = classes[0].day ? classes[0].day.slice(0, 3) : "Sat";
    classes.forEach((c) => {
      const name = (c.className || c.ageGroup || '').toLowerCase();
      if (name.includes('4') || name.includes('5')) slots["4–5s"] = c.time || slots["4–5s"];
      if (name.includes('6') || name.includes('7')) slots["6–7s"] = c.time || slots["6–7s"];
      if (name.includes('8') || name.includes('9')) slots["8–9s"] = c.time || slots["8–9s"];
      if (name.includes('10') || name.includes('11') || name.includes('12')) slots["10–12s"] = c.time || slots["10–12s"];
    });
  } else if (apiVenue.classes && typeof apiVenue.classes === 'object') {
    const dayKeys = Object.keys(apiVenue.classes);
    if (dayKeys.length > 0) {
      primaryDay = dayKeys[0].charAt(0).toUpperCase() + dayKeys[0].slice(1) + "s";
      shortDay = dayKeys[0].slice(0, 3).toUpperCase();
      const firstDayClasses = apiVenue.classes[dayKeys[0]] || [];
      firstDayClasses.forEach((c) => {
        const name = (c.className || '').toLowerCase();
        if (name.includes('4') || name.includes('5')) slots["4–5s"] = c.time || slots["4–5s"];
        if (name.includes('6') || name.includes('7')) slots["6–7s"] = c.time || slots["6–7s"];
        if (name.includes('8') || name.includes('9')) slots["8–9s"] = c.time || slots["8–9s"];
        if (name.includes('10') || name.includes('11') || name.includes('12')) slots["10–12s"] = c.time || slots["10–12s"];
      });
    }
  }

  if (selectedClass) {
    if (selectedClass.day) {
      const capDay = selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1);
      primaryDay = `${capDay}s`;
      shortDay = selectedClass.day.slice(0, 3).charAt(0).toUpperCase() + selectedClass.day.slice(1, 3);
    }
    const name = (selectedClass.className || selectedClass.ageGroup || '').toLowerCase();
    if (name.includes('4') || name.includes('5')) slots["4–5s"] = selectedClass.time || slots["4–5s"];
    if (name.includes('6') || name.includes('7')) slots["6–7s"] = selectedClass.time || slots["6–7s"];
    if (name.includes('8') || name.includes('9')) slots["8–9s"] = selectedClass.time || slots["8–9s"];
    if (name.includes('10') || name.includes('11') || name.includes('12')) slots["10–12s"] = selectedClass.time || slots["10–12s"];
  }

  return {
    ...apiVenue,
    id: vId,
    venueId: vId,
    name: vName,
    address,
    phone,
    day: primaryDay,
    shortDay,
    slots,
    selectedClassId: selectedClass?.classId || selectedClass?.id || null
  };
}

const Waitinglist = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const venueParam = searchParams.get('venue') || searchParams.get('venueId') || '5';
  const classIdParam = searchParams.get('classId');

  const initialVenue = useMemo(() => {
    const raw =
      VENUES_DATA.find(
        (v) =>
          String(v.id) === String(venueParam) ||
          (v.name && v.name.toLowerCase().includes(venueParam.toLowerCase()))
      ) || VENUES_DATA[0];
    return normalizeVenue(raw, null);
  }, [venueParam]);

  const [venue, setVenue] = useState(initialVenue);
  const [selectedClass, setSelectedClass] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  const fetchedClassIdRef = useRef(null);
  const fetchedVenueRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [confirmed]);

  // Load dynamic venue and class by ID (same API as booking flow)
  useEffect(() => {
    if (venueParam && fetchedVenueRef.current !== venueParam) {
      fetchedVenueRef.current = venueParam;
      fetchDynamicVenues()
        .then((dynamicVenues) => {
          if (Array.isArray(dynamicVenues) && dynamicVenues.length > 0) {
            const match = dynamicVenues.find(
              (v) =>
                String(v.id) === String(venueParam) ||
                String(v.venueId) === String(venueParam) ||
                (v.name && v.name.toLowerCase().includes(venueParam.toLowerCase())) ||
                (v.venueName && v.venueName.toLowerCase().includes(venueParam.toLowerCase()))
            );
            if (match) {
              setVenue((prev) => normalizeVenue(match, null) || prev);
            }
          }
        })
        .catch((err) => console.warn('Could not load dynamic venues in Waitinglist:', err));
    }

    if (classIdParam && fetchedClassIdRef.current !== classIdParam) {
      fetchedClassIdRef.current = classIdParam;
      fetchClassById(classIdParam)
        .then((cls) => {
          if (cls) {
            console.log('Waitinglist loaded class by ID:', cls);
            setSelectedClass(cls);
            setVenue((prev) => normalizeVenue(prev, cls) || prev);
          }
        })
        .catch((err) => console.warn('Could not load class by ID in Waitinglist:', err));
    }
  }, [venueParam, classIdParam]);

  return (
    <div className="waitinglist-page-container">
      <main className="w-full overflow-x-hidden">
        {confirmed ? (
          <WaitingListConfirmed {...confirmed} />
        ) : (
          <WhoJoining
            venue={venue}
            selectedClass={selectedClass}
            onComplete={setConfirmed}
            onExit={() => navigate('/find-a-class')}
          />
        )}
      </main>
    </div>
  );
};

export default Waitinglist;
