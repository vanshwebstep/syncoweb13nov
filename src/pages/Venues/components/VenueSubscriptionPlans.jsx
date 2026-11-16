import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, CheckCircle2, ChevronDown } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching.png';
import { useVenue } from '../VenueContext';

function parseFeatures(htmlString) {
  if (!htmlString) return [];
  const clean = htmlString
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&bull;/g, '')
    .replace(/&nbsp;/g, ' ');
  return clean
    .split('\n')
    .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
    .filter((s) => s.length > 2);
}

export function VenueSubscriptionPlans() {
  const { venue, venueName } = useVenue();
  const { openModal } = useModal();

  // Extract all classes across all days
  const allClasses = useMemo(() => {
    if (!venue?.classes || typeof venue.classes !== 'object') {
      return [
        { classId: 1, className: 'Beginner Football Training', time: '9:30am - 10:30am', level: 'Beginner', day: 'Saturday' },
        { classId: 2, className: 'Intermediate Skills Squad', time: '10:30am - 11:30am', level: 'Intermediate', day: 'Saturday' },
        { classId: 3, className: 'Elite Pro Academy', time: '11:30am - 12:30pm', level: 'Advanced', day: 'Sunday' }
      ];
    }
    const list = [];
    Object.entries(venue.classes).forEach(([day, dayClasses]) => {
      if (Array.isArray(dayClasses)) {
        dayClasses.forEach((cls) => {
          list.push({ ...cls, day: day.charAt(0).toUpperCase() + day.slice(1) });
        });
      }
    });
    return list.length > 0 ? list : [
      { classId: 1, className: 'Standard Football Class', time: '9:30am - 10:30am', level: 'All Levels', day: 'Weekend' }
    ];
  }, [venue]);

  // Extract terms
  const allTerms = useMemo(() => {
    if (Array.isArray(venue?.terms) && venue.terms.length > 0) {
      return venue.terms;
    }
    return [
      { id: 101, name: 'Autumn Term 2026', startDate: '2026-09-11', endDate: '2026-12-04', totalSessions: 12 },
      { id: 102, name: 'Spring Term 2027', startDate: '2027-01-10', endDate: '2027-03-28', totalSessions: 12 }
    ];
  }, [venue]);

  const [student, setStudent] = useState('1 Student');
  const [selectedClassId, setSelectedClassId] = useState(allClasses[0]?.classId || '');
  const [selectedTermId, setSelectedTermId] = useState(allTerms[0]?.id || '');

  // Keep selection synchronized if venue updates
  useEffect(() => {
    if (allClasses.length > 0 && !allClasses.some((c) => c.classId === selectedClassId)) {
      setSelectedClassId(allClasses[0].classId);
    }
  }, [allClasses, selectedClassId]);

  useEffect(() => {
    if (allTerms.length > 0 && !allTerms.some((t) => t.id === selectedTermId)) {
      setSelectedTermId(allTerms[0].id);
    }
  }, [allTerms, selectedTermId]);

  const activeClass = allClasses.find((c) => c.classId === selectedClassId) || allClasses[0];
  const activeTerm = allTerms.find((t) => t.id === selectedTermId) || allTerms[0];

  const handleClassChange = (classId) => {
    const numericId = Number(classId) || classId;
    setSelectedClassId(numericId);
    const foundClass = allClasses.find((c) => c.classId === numericId);
    if (foundClass?.day) {
      const matchingTerm = allTerms.find(
        (t) => t.day && t.day.toLowerCase() === foundClass.day.toLowerCase()
      );
      if (matchingTerm) {
        setSelectedTermId(matchingTerm.id);
      }
    }
  };

  const handleTermChange = (termId) => {
    const numericId = Number(termId) || termId;
    setSelectedTermId(numericId);
    const foundTerm = allTerms.find((t) => t.id === numericId);
    if (foundTerm?.day) {
      const matchingClass = allClasses.find(
        (c) => c.day && c.day.toLowerCase() === foundTerm.day.toLowerCase()
      );
      if (matchingClass) {
        setSelectedClassId(matchingClass.classId);
      }
    }
  };

  const studentCount = useMemo(() => {
    const match = student.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }, [student]);

  const studentOptions = useMemo(() => {
    const rawPlans = venue?.paymentGroups?.[0]?.paymentPlans;
    if (Array.isArray(rawPlans) && rawPlans.length > 0) {
      const counts = [...new Set(rawPlans.map((p) => Number(p.students)).filter(Boolean))].sort((a, b) => a - b);
      if (counts.length > 0) {
        const merged = [...new Set([...counts, 1, 2, 3])].sort((a, b) => a - b);
        return merged.map((n) => `${n} Student${n > 1 ? 's' : ''}`);
      }
    }
    return ['1 Student', '2 Students', '3 Students'];
  }, [venue]);

  // Dynamic Plans based on Selected Students, Class, and Term
  const plans = useMemo(() => {
    const rawPlans = venue?.paymentGroups?.[0]?.paymentPlans;
    const starterBasePrice = Number(venue?.starterPacks?.[0]?.price) || 89.99;
    const starterFee = `£${(starterBasePrice * studentCount).toFixed(2)} Starter Pack${studentCount > 1 ? ` (${studentCount} Students)` : ''}`;

    // Sibling discount multiplier for unconfigured student counts:
    // 1 student: 1.0
    // 2 students: 1.85 (15% off 2nd student)
    // 3 students: 2.65 (15% off 2nd, 20% off 3rd)
    const multiplier = studentCount === 1 ? 1 : studentCount === 2 ? 1.85 : 1 + (studentCount - 1) * 0.825;

    if (Array.isArray(rawPlans) && rawPlans.length > 0) {
      // 1. Check if venue has explicit plans for this student count
      let matchingPlans = rawPlans.filter((p) => Number(p.students) === studentCount);
      let isSyntheticScale = false;

      if (matchingPlans.length === 0) {
        // Fallback to 1-student plans and scale them
        matchingPlans = rawPlans.filter((p) => Number(p.students) === 1);
        if (matchingPlans.length === 0) {
          matchingPlans = rawPlans;
        }
        isSyntheticScale = true;
      }

      const mapped = matchingPlans.map((plan) => {
        let title = plan.title;
        if (isSyntheticScale && studentCount > 1) {
          title = `${plan.title} (${studentCount} Students)`;
        }

        let priceStr = '';
        let totalNoteStr = null;

        if (isSyntheticScale) {
          const scaledPrice = Math.round(Number(plan.price) * multiplier);
          if (plan.priceLesson) {
            priceStr = `£${(Number(plan.priceLesson) * multiplier).toFixed(2)}`;
            totalNoteStr = `Total £${scaledPrice} (${plan.duration || 6} mos)${studentCount > 1 ? ` • for ${studentCount} students` : ''}`;
          } else {
            priceStr = `£${scaledPrice}`;
            totalNoteStr = `Total for ${studentCount} students (${plan.duration || 6} mos)`;
          }
        } else {
          priceStr = plan.priceLesson ? `£${Number(plan.priceLesson).toFixed(2)}` : `£${plan.price}`;
          totalNoteStr = plan.priceLesson && plan.price 
            ? `Total £${plan.price} (${plan.duration || 6} mos)${studentCount > 1 ? ` • ${studentCount} students` : ''}`
            : null;
        }

        const period = plan.priceLesson ? '/lesson' : `/${(plan.interval || 'month').toLowerCase()}`;

        // Build feature list responsive to dropdowns
        const durationMonths = plan.duration || (plan.title.includes('12') ? 12 : 6);
        const totalLessons = (durationMonths * 4) * studentCount;
        const lessonsPerMonth = 4 * studentCount;

        const features = [
          `Valid for ${durationMonths} months`,
          `${totalLessons} lessons included (${lessonsPerMonth} lessons per month)`,
          activeClass?.className ? `${activeClass.className} (${activeClass.day || 'Weekly'})` : 'Flexible scheduling across all sessions',
          activeClass?.time ? `Time: ${activeClass.time} • Level: ${activeClass.level || 'All Levels'}` : 'Priority booking support',
          activeTerm?.name ? `Includes all ${activeTerm.name} term sessions` : 'Access to online learning materials'
        ];

        if (studentCount > 1) {
          features.push(`Sibling discount included for ${studentCount} students`);
        }

        const fee = plan.joiningFee 
          ? `£${(Number(plan.joiningFee) * studentCount).toFixed(2)} Joining Fee` 
          : starterFee;

        const dur = plan.duration || (plan.title.includes('12') ? 12 : plan.title.includes('6') ? 6 : 1);
        const badge = dur === 12 ? 'BEST VALUE' : dur === 6 ? 'MOST POPULAR' : dur === 1 ? 'FLEXIBLE' : null;
        const badgeColor = dur === 12 ? 'bg-[#FFE600] text-[#042C89]' : dur === 6 ? 'bg-[#00D084] text-white' : 'bg-[#E2EDF8] text-[#042C89]';

        return {
          id: plan.id,
          title,
          badge,
          badgeColor,
          price: priceStr,
          period,
          totalNote: totalNoteStr,
          features,
          fee
        };
      });

      // If only 2 plans returned, add the flexi monthly option for 3-card balance
      if (mapped.length === 2) {
        const baseFlexiPrice = 55.0;
        const flexiPrice = (baseFlexiPrice * multiplier).toFixed(2);
        mapped.push({
          id: 'flexi-plan',
          title: studentCount > 1 ? `Flexi Monthly Plan (${studentCount} Students)` : 'Flexi Monthly Plan',
          price: `£${flexiPrice}`,
          period: '/month',
          totalNote: `Pay monthly, cancel anytime${studentCount > 1 ? ` (${studentCount} students)` : ''}`,
          features: [
            `Rolling monthly subscription for ${studentCount} student${studentCount > 1 ? 's' : ''}`,
            `${4 * studentCount} weekly lessons included per month`,
            activeClass?.className ? `${activeClass.className} (${activeClass.day || 'Weekly'})` : `Weekly classes at ${venueName}`,
            `Time: ${activeClass?.time || 'Flexible'} • Level: ${activeClass?.level || 'All Levels'}`,
            `10% off SSS uniform & merchandise for ${studentCount} student${studentCount > 1 ? 's' : ''}`,
            'Skills tutorial access included'
          ],
          fee: starterFee
        });
      }

      return mapped;
    }

    // Default fallback plans if venue has no API paymentGroups
    const baseFlexi = (50.00 * multiplier).toFixed(2);

    return [
      {
        id: '6m',
        title: studentCount > 1 ? `6 Months Premium Plan (${studentCount} Students)` : '6 Months Premium Plan',
        price: `£${(22.50 * multiplier).toFixed(2)}`,
        period: '/lesson',
        totalNote: `Total £${Math.round(540 * multiplier)} (6 mos)${studentCount > 1 ? ` • for ${studentCount} students` : ''}`,
        features: [
          `Valid for 6 months (${studentCount} student${studentCount > 1 ? 's' : ''})`,
          `${24 * studentCount} lessons included (${4 * studentCount} lessons per month)`,
          activeClass?.className ? `${activeClass.className} (${activeClass.day || 'Weekly'})` : 'Flexible scheduling',
          `Time: ${activeClass?.time || '9:30am - 10:30am'} • Level: ${activeClass?.level || 'Beginner'}`,
          activeTerm?.name ? `Includes all ${activeTerm.name} term sessions` : 'Access to online learning materials'
        ],
        fee: starterFee
      },
      {
        id: '12m',
        title: studentCount > 1 ? `12 Months Premium Plan (${studentCount} Students)` : '12 Months Premium Plan',
        price: `£${(20.00 * multiplier).toFixed(2)}`,
        period: '/lesson',
        totalNote: `Total £${Math.round(960 * multiplier)} (12 mos)${studentCount > 1 ? ` • for ${studentCount} students` : ''}`,
        features: [
          `Valid for 12 months (${studentCount} student${studentCount > 1 ? 's' : ''})`,
          `${48 * studentCount} lessons included (${4 * studentCount} lessons per month)`,
          activeClass?.className ? `${activeClass.className} (${activeClass.day || 'Weekly'})` : 'Priority scheduling',
          `Time: ${activeClass?.time || '9:30am - 10:30am'} • Level: ${activeClass?.level || 'Beginner'}`,
          'Free study resources and assessments',
          'Dedicated student support'
        ],
        fee: starterFee
      },
      {
        id: 'flexi',
        title: studentCount > 1 ? `Flexi Monthly Plan (${studentCount} Students)` : 'Flexi Monthly Plan',
        price: `£${baseFlexi}`,
        period: '/month',
        totalNote: `Pay monthly, cancel anytime${studentCount > 1 ? ` (${studentCount} students)` : ''}`,
        features: [
          `Rolling monthly subscription (${studentCount} student${studentCount > 1 ? 's' : ''})`,
          `${4 * studentCount} weekly classes per month`,
          activeClass?.className ? `${activeClass.className} (${activeClass.day || 'Weekly'})` : 'Weekly classes at this venue',
          `Time: ${activeClass?.time || '9:30am - 10:30am'} • Level: ${activeClass?.level || 'Beginner'}`,
          '10% off SSS uniform & merchandise',
          'Skills tutorial access included'
        ],
        fee: starterFee
      }
    ];
  }, [venue, venueName, studentCount, activeClass, activeTerm]);

  return (
    <section 
      className="py-16 sm:py-24  text-white relative overflow-hidden font-sans border-t border-white/10"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <Container className="relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="gasoek text-4xl sm:text-[48px] text-[#FFDE14] tracking-[1%]  drop-shadow-md">
            Subscription Plan
          </h2>
        </div>

        {/* Outer White Card Container */}
        <div className="bg-white poppins rounded-[2.5rem] p-6 sm:p-10 shadow-2xl max-w-6xl mx-auto border border-slate-100 text-slate-800 space-y-6">
          
          {/* Top Search & Filter Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                key={venue?.address || venueName}
                defaultValue={venue?.address || (venueName ? `${venueName}, UK` : "123 Oxford Road, Manchester, M1 7ED")}
                className="w-full bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-full pl-11 pr-5 py-3 outline-none  shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
            </div>

            {/* 6 Filter Select Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {/* Student */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Students</label>
                <select
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  className="w-full bg-transparent text-slate-800 text-xs font-semibold outline-none cursor-pointer pr-4 appearance-none"
                >
                  {studentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>

              {/* Class */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Class</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full bg-transparent text-slate-800 text-xs font-semibold outline-none cursor-pointer pr-4 appearance-none truncate"
                >
                  {allClasses.map((cls) => (
                    <option key={cls.classId} value={cls.classId}>
                      {cls.className} ({cls.day})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>

              {/* Level */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Level</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="truncate text-slate-800 font-semibold">{activeClass?.level || 'All Levels'}</span>
                </div>
              </div>

              {/* Term */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Term</label>
                <select
                  value={selectedTermId}
                  onChange={(e) => handleTermChange(e.target.value)}
                  className="w-full bg-transparent text-slate-800 text-xs font-semibold outline-none cursor-pointer pr-4 appearance-none truncate"
                >
                  {allTerms.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} {t.day ? `(${t.day})` : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>

              {/* Time */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="truncate text-slate-800 font-semibold">{activeClass?.time || '9:30am - 10:30am'}</span>
                </div>
              </div>

              {/* Date */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="truncate text-slate-800 font-semibold text-[11px]">
                    {activeTerm?.startDate ? `${activeTerm.startDate} - ${activeTerm.endDate}` : 'Autumn Term 2026'}
                  </span>
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
                </div>
              </div>
            </div>

            {/* Blue Search Button */}
            <button
              type="submit"
              onClick={() => openModal('booking', {
                venueName,
                classTitle: activeClass?.className,
                level: activeClass?.level,
                time: activeClass?.time,
                day: activeClass?.day,
                termName: activeTerm?.name,
                students: student
              })}
              className="w-full bg-[#052975] hover:bg-[#031b52] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-full shadow-md transition-all cursor-pointer text-center uppercase tracking-wider mt-2"
            >
              Book Class for {venueName}
            </button>
          </form>

          {/* Results Count Divider */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-slate-500 font-semibold text-xs block mb-4">
              {plans.length} packages available for {student} • {activeClass?.className}
            </span>

            {/* Subscription Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {plans.map((plan, idx) => (
                <div 
                  key={plan.id || idx}
                  className="bg-white rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg border border-slate-200/80 flex flex-col justify-between space-y-5 lg:space-y-6 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-3.5 lg:space-y-4">
                    {/* Title & Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-slate-900 text-sm md:text-[15px] lg:text-lg">
                        {plan.title}
                      </h3>
                      {plan.badge && (
                        <span className={`${plan.badgeColor} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs shrink-0`}>
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="pb-2 border-b border-slate-100">
                      <div className="flex items-baseline">
                        <span className="font-black text-2xl md:text-3xl lg:text-4xl text-slate-900">
                          {plan.price}
                        </span>
                        <span className="text-slate-400 font-semibold text-xs ml-1">
                          {plan.period}
                        </span>
                      </div>
                      {plan.totalNote && (
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {plan.totalNote}
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 lg:space-y-3 pt-1">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#0DD180] fill-[#0DD180]/20 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fee Action Button */}
                  <button
                    onClick={() => openModal('booking', {
                      venueName,
                      planName: plan.title,
                      planPrice: plan.price,
                      className: activeClass?.className,
                      level: activeClass?.level,
                      time: activeClass?.time,
                      day: activeClass?.day,
                      termName: activeTerm?.name,
                      students: student
                    })}
                    className="w-full bg-[#052975] hover:bg-[#031b52] text-white font-extrabold text-[11px] sm:text-xs py-3 lg:py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer text-center"
                  >
                    {plan.fee}
                  </button>

                </div>
              ))}
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
