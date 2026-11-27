import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Check, MapPin } from 'lucide-react';
import { Container } from '../../components/common/Container';
import { VENUES_DATA } from '../../data/findAClassData';
import { fetchDynamicVenues, fetchClassById, bookFreeTrial } from '../../services/venueService';
import { BookingHeader } from './components/BookingHeader';
import { BookingSidebar } from './components/BookingSidebar';
import { Step1ChildrenCount } from './components/Step1ChildrenCount';
import { Step2SelectDate } from './components/Step2SelectDate';
import { StepChildDetails } from './components/StepChildDetails';
import { StepParentDetails } from './components/StepParentDetails';
import { StepQuickQuestion } from './components/StepQuickQuestion';
import { Step6AccountCreation } from './components/Step6AccountCreation';
import { Step7SuccessScreen } from './components/Step7SuccessScreen';

export function BookingFlowPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Find initial venue from URL or default to Chelsea Academy
  const venueParam = searchParams.get('venue') || searchParams.get('venueId') || '5';
  const classIdParam = searchParams.get('classId');

  const initialVenue = useMemo(() => {
    return (
      VENUES_DATA.find((v) => String(v.id) === String(venueParam) || v.name.toLowerCase().includes(venueParam.toLowerCase())) ||
      VENUES_DATA[0]
    );
  }, [venueParam]);

  const [venue, setVenue] = useState(initialVenue);
  const [availableVenues, setAvailableVenues] = useState(VENUES_DATA);
  const [showVenuePicker, setShowVenuePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    setVenue(initialVenue);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [initialVenue]);

  // Load dynamic venue and class by ID
  useEffect(() => {
    fetchDynamicVenues()
      .then((dynamicVenues) => {
        if (Array.isArray(dynamicVenues) && dynamicVenues.length > 0) {
          setAvailableVenues(dynamicVenues);
          const match = dynamicVenues.find(
            (v) =>
              String(v.id) === String(venueParam) ||
              String(v.venueId) === String(venueParam) ||
              v.name.toLowerCase().includes(venueParam.toLowerCase())
          );
          if (match) setVenue(match);
        }
      })
      .catch((err) => console.warn('Could not load dynamic venues in BookingFlow:', err));

    if (classIdParam) {
      fetchClassById(classIdParam)
        .then((cls) => {
          if (cls) {
            console.log('BookingFlow loaded class by ID:', cls);
            setSelectedClass(cls);
            if (cls.className && cls.day && cls.startTime && cls.endTime) {
              const capDay = cls.day.charAt(0).toUpperCase() + cls.day.slice(1);
              const timeDesc = `${cls.className} · ${capDay} ${cls.startTime} – ${cls.endTime}`;
              setChildrenData((prev) => {
                const updated = [...prev];
                if (updated[0]) updated[0] = { ...updated[0], ageGroupText: timeDesc, classScheduleId: cls.id };
                return updated;
              });
            }
          }
        })
        .catch((err) => console.warn('Could not load class by ID in BookingFlow:', err));
    }
  }, [venueParam, classIdParam]);

  // Fallback class loader if no classId in URL
  useEffect(() => {
    if (classIdParam) return;
    const fallbackId =
      venue?.schedule?.classes?.[0]?.classId ||
      venue?.schedule?.classes?.[0]?.id ||
      venue?.classes?.[Object.keys(venue?.classes || {})[0]]?.[0]?.classId;
    if (fallbackId && (!selectedClass || String(selectedClass.id) !== String(fallbackId))) {
      fetchClassById(fallbackId)
        .then((cls) => {
          if (cls) {
            setSelectedClass(cls);
            if (cls.className && cls.day && cls.startTime && cls.endTime) {
              const capDay = cls.day.charAt(0).toUpperCase() + cls.day.slice(1);
              const timeDesc = `${cls.className} · ${capDay} ${cls.startTime} – ${cls.endTime}`;
              setChildrenData((prev) => {
                const updated = [...prev];
                if (updated[0] && !updated[0].ageGroupText) {
                  updated[0] = { ...updated[0], ageGroupText: timeDesc, classScheduleId: cls.id };
                }
                return updated;
              });
            }
          }
        })
        .catch((err) => console.warn('Could not load fallback class by ID in BookingFlow:', err));
    }
  }, [venue, classIdParam, selectedClass]);

  // Master Step State: 1 | 2 | 'child-0' | 'child-1' ... | 'parent' | 'account' | 'success'
  const [currentStep, setCurrentStep] = useState(1);
  const [childrenCount, setChildrenCount] = useState(1);

  const [selectedDate, setSelectedDate] = useState(null);

  const createEmptyChild = () => ({
    firstName: '',
    lastName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    age: null,
    gender: '',
    hasMedical: '',
    medicalDetails: '',
    ageGroupText: '',
    classScheduleId: null
  });

  const [childrenData, setChildrenData] = useState([
    createEmptyChild(),
    createEmptyChild(),
    createEmptyChild(),
    createEmptyChild()
  ]);

  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    relationship: '',
    hearAbout: '',
    otherSource: ''
  });

  const [accountStatus, setAccountStatus] = useState(null);

  const [selectedReason, setSelectedReason] = useState('confidence');

  const updateChildData = (index, data) => {
    setChildrenData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });
  };

  const updateParentData = (data) => {
    setParentData((prev) => ({ ...prev, ...data }));
  };

  // Determine sequential steps
  // e.g. for 2 children: [1, 2, 'child-0', 'child-1', 'parent', 'quick-question', 'account', 'success']
  const stepSequence = useMemo(() => {
    const list = [1, 2];
    for (let i = 0; i < childrenCount; i++) {
      list.push(`child-${i}`);
    }
    list.push('parent');
    list.push('quick-question');
    list.push('account');
    list.push('success');
    return list;
  }, [childrenCount]);

  const currentStepIdx = stepSequence.indexOf(currentStep);

  const goToNextStep = () => {
    if (currentStepIdx < stepSequence.length - 1) {
      const next = stepSequence[currentStepIdx + 1];
      setCurrentStep(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStepIdx > 0) {
      const prev = stepSequence[currentStepIdx - 1];
      setCurrentStep(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/find-a-class');
    }
  };

  // Progress percentage calculation
  const progressPercent = useMemo(() => {
    if (currentStep === 'success') return 100;
    const totalWorkingSteps = stepSequence.length - 1; // exclude success
    const currentPos = Math.max(1, currentStepIdx + 1);
    return Math.min(100, Math.round((currentPos / totalWorkingSteps) * 100));
  }, [currentStep, currentStepIdx, stepSequence]);

  // Estimate time label
  const estimateTime = useMemo(() => {
    if (currentStep === 1 || currentStep === 2) return 'About 2 min';
    if (typeof currentStep === 'string' && currentStep.startsWith('child-')) return 'About 90 sec';
    if (currentStep === 'parent') return 'About 1 min';
    if (currentStep === 'quick-question') return 'Nearly there';
    if (currentStep === 'account') return 'Last step';
    return '';
  }, [currentStep]);

  const venueDay = useMemo(() => {
    if (selectedClass?.day) {
      return selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1).slice(0, 3);
    }
    if (venue?.schedule?.day) {
      return venue.schedule.day.slice(0, 3);
    }
    return 'Sat';
  }, [selectedClass, venue]);

  const venueTime = useMemo(() => {
    if (selectedClass?.startTime) {
      return selectedClass.startTime.toLowerCase().replace(/\s+/g, '');
    }
    const t = venue?.schedule?.classes?.[0]?.time;
    if (t) {
      return t.split('-')[0].trim().toLowerCase().replace(/\s+/g, '');
    }
    return '7:15am';
  }, [selectedClass, venue]);

  const handleAccountSubmit = async (accountData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const venueId = Number(venue?.venueId || venue?.id) || 5;
      const trialDate = selectedDate?.isoDate || '2026-10-24';
      const totalStudents = childrenCount || 1;

      const students = childrenData.slice(0, childrenCount).map((c, idx) => {
        const y = c.dobYear || '2019';
        const m = String(c.dobMonth || '01').padStart(2, '0');
        const d = String(c.dobDay || '01').padStart(2, '0');
        const dateOfBirth = `${y}-${m}-${d}`;

        let gender = 'female';
        if (c.gender) {
          const gLower = c.gender.toLowerCase();
          if (gLower.includes('boy') || gLower.includes('male')) gender = 'male';
        }

        const medicalInformation =
          c.hasMedical === 'Yes' && c.medicalDetails ? c.medicalDetails : 'NA';
        const classScheduleId = Number(
          c.classScheduleId || c.classId || venue?.schedule?.classes?.[0]?.classId || 12
        );

        return {
          studentFirstName: c.firstName || `Child ${idx + 1}`,
          studentLastName: c.lastName || parentData.lastName || 'Student',
          dateOfBirth,
          age: Number(c.age) || 6,
          gender,
          medicalInformation,
          classScheduleId
        };
      });

      let rawPhone = (parentData.phone || '').trim();
      let dialCode = parentData.dialCode || '44';
      let cleanPhone = rawPhone;
      if (cleanPhone.startsWith('+')) {
        if (cleanPhone.startsWith('+91')) {
          dialCode = '91';
          cleanPhone = cleanPhone.slice(3).trim();
        } else if (cleanPhone.startsWith('+44')) {
          dialCode = '44';
          cleanPhone = cleanPhone.slice(3).trim();
        } else {
          cleanPhone = cleanPhone.replace(/^\+/, '').trim();
        }
      }

      const digits = cleanPhone.replace(/\D/g, '');
      let localDigits = digits;
      if (localDigits.startsWith('0')) {
        localDigits = localDigits.slice(1);
      } else if (localDigits.startsWith(dialCode) && localDigits.length > 10) {
        localDigits = localDigits.slice(dialCode.length);
      }
      const formattedPhoneNumber = localDigits ? `+${dialCode}${localDigits}` : `+${dialCode}7700900123`;

      let relation = (parentData.relationship || 'mother').toLowerCase();
      if (relation.includes('mum') || relation.includes('mom')) relation = 'mother';
      else if (relation.includes('dad')) relation = 'father';
      else if (!['mother', 'father', 'guardian'].includes(relation)) relation = 'guardian';

      const REASON_MAP = {
        confidence: 'To build their confidence',
        skills: 'To improve their technical football skills',
        friends: 'To make new friends',
        active: 'To get active and exercise'
      };
      const interestReason = REASON_MAP[selectedReason] || 'To improve their technical football skills';

      const resolvedEmail = (accountData.email || parentData.email || '').trim();
      const resolvedFirstName = (accountData.firstName || parentData.firstName || 'Parent').trim();
      const resolvedLastName = (accountData.lastName || parentData.lastName || 'Guardian').trim();

      if (
        resolvedEmail !== parentData.email ||
        resolvedFirstName !== parentData.firstName ||
        resolvedLastName !== parentData.lastName
      ) {
        updateParentData({
          email: resolvedEmail,
          firstName: resolvedFirstName,
          lastName: resolvedLastName
        });
      }

      const parents = [
        {
          parentFirstName: resolvedFirstName,
          parentLastName: resolvedLastName,
          parentEmail: resolvedEmail,
          parentPhoneNumber: formattedPhoneNumber,
          dialCode,
          relationToChild: relation,
          howDidYouHear: parentData.hearAbout || 'Other',
          interestReason,
          interestReasonOther: parentData.otherSource || 'NA',
          password: accountData.password || '123456'
        }
      ];

      const payload = {
        venueId,
        trialDate,
        totalStudents,
        students,
        password: accountData.password || '123456',
        parents
      };

      console.log('Submitting book-free-trial payload:', payload);
      const result = await bookFreeTrial(payload);
      console.log('Booking successful:', result);
      setBookingResult(result);
      goToNextStep();
    } catch (err) {
      console.error('Error booking free trial:', err);
      setSubmitError(err.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* 1. Dedicated Header */}
      <BookingHeader onExit={() => navigate('/find-a-class')} />

      {/* 2. Success screen has full-width layout matching Screenshot 7 */}
      {currentStep === 'success' ? (
        <Step7SuccessScreen
          venue={venue}
          selectedDate={selectedDate}
          childrenData={childrenData.slice(0, childrenCount)}
          parentData={parentData}
          bookingResult={bookingResult}
        />
      ) : (
        /* 3. Main Multi-Step Form Layout (2 Columns) */
        <main className="md:py-8 py-5">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Progress Bar + Form Step */}
              <div className="lg:col-span-8">
                {/* Top Controls: Back Arrow + Progress Bar + Estimate */}
                <div className="mb-4 sm:mb-8">
                  <div className="flex items-center justify-between mb-3.5 text-xs font-bold">
                    {/* Circular Back Button */}
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      aria-label="Previous step"
                      className="w-9 h-9 rounded-full bg-white border border-[#C9D3F0] hover:border-slate-300 text-[#042C89] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Estimate Time Badge */}
                    {estimateTime && (
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        {currentStep === 'account' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00D084] stroke-[3]" />
                            <span className="text-[#042C89]">Last step</span>
                          </>
                        ) : currentStep === 'quick-question' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00D084] stroke-[3]" />
                            <span className="text-[#042C89]">Nearly there</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-[#00A3E0] stroke-[2.5]" />
                            <span className="text-[#042C89]">{estimateTime}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00D084] transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Mobile Venue Pill */}
                <div className="lg:hidden mb-4">
                  <div className="inline-flex items-center gap-2 border border-[#CFE3F5] rounded-full px-3.5 py-1.5 bg-white text-xs font-bold text-[#042C89] shadow-2xs">
                    <MapPin className="w-3.5 h-3.5 text-[#00A3E0] shrink-0 stroke-[2.5]" />
                    <span>{venue?.name || 'Chelsea Academy'} · {venueDay} from {venueTime}</span>
                  </div>
                </div>

                {/* Step Content Rendered Dynamically */}
                <div className="bg-transparent">
                  {currentStep === 1 && (
                    <Step1ChildrenCount
                      childrenCount={childrenCount}
                      setChildrenCount={setChildrenCount}
                      onContinue={goToNextStep}
                      onBack={goToPrevStep}
                    />
                  )}

                  {currentStep === 2 && (
                    <Step2SelectDate
                      venue={venue}
                      classData={selectedClass}
                      classId={classIdParam}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      onContinue={goToNextStep}
                      onBack={goToPrevStep}
                    />
                  )}

                  {typeof currentStep === 'string' && currentStep.startsWith('child-') && (
                    <StepChildDetails
                      key={currentStep}
                      childIndex={parseInt(currentStep.split('-')[1], 10)}
                      totalChildren={childrenCount}
                      childData={childrenData[parseInt(currentStep.split('-')[1], 10)]}
                      updateChildData={updateChildData}
                      onContinue={goToNextStep}
                      onBack={goToPrevStep}
                    />
                  )}

                  {currentStep === 'parent' && (
                    <StepParentDetails
                      childrenData={childrenData.slice(0, childrenCount)}
                      parentData={parentData}
                      updateParentData={updateParentData}
                      onSubmit={(status) => {
                        if (status) setAccountStatus(status);
                        goToNextStep();
                      }}
                      onBack={goToPrevStep}
                    />
                  )}

                  {currentStep === 'quick-question' && (
                    <StepQuickQuestion
                      selectedReason={selectedReason}
                      setSelectedReason={setSelectedReason}
                      onContinue={goToNextStep}
                      onBack={goToPrevStep}
                    />
                  )}

                  {currentStep === 'account' && (
                    <Step6AccountCreation
                      parentData={parentData}
                      parentEmail={parentData.email}
                      accountStatus={accountStatus}
                      venue={venue}
                      selectedDate={selectedDate}
                      childrenData={childrenData.slice(0, childrenCount)}
                      onSubmit={handleAccountSubmit}
                      onBack={goToPrevStep}
                      onEditTrial={() => setCurrentStep(2)}
                      isSubmitting={isSubmitting}
                      apiError={submitError}
                    />
                  )}
                </div>
              </div>

              {/* Right Column: Sticky Summary Sidebar */}
              <div className="lg:col-span-4 sticky top-6 hidden lg:block">
                <BookingSidebar
                  venue={venue}
                  selectedDate={selectedDate}
                  childrenCount={childrenCount}
                  childrenData={childrenData.slice(0, childrenCount)}
                  currentStep={currentStep}
                  onChangeVenue={() => setShowVenuePicker(true)}
                />
              </div>
            </div>
          </Container>
        </main>
      )}

      {/* Quick Venue Change Modal */}
      {showVenuePicker && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-black text-xl text-[#061838]">
              Select a Venue for Free Trial
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableVenues.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVenue(v);
                    setShowVenuePicker(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    venue.id === v.id
                      ? 'border-[#061838] bg-[#F0F7FF] font-bold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-extrabold text-[#061838]">{v.name}</div>
                  <div className="text-xs text-slate-500">{v.address}</div>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowVenuePicker(false)}
              className="w-full py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingFlowPage;
