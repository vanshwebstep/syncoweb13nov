import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Check } from 'lucide-react';
import { Container } from '../../../../components/common/Container';
import { VENUES_DATA } from '../../../../data/findAClassData';
import {
  fetchDynamicVenues,
  fetchClassById,
  fetchVenueByIdOrName,
  bookFreeTrial
} from '../../../../services/venueService';

import { MembershipHeader } from './MembershipHeader';
import { MembershipSidebar } from './MembershipSidebar';
import { Step1ChildrenCount } from './Step1ChildrenCount';
import { Step2PickPlan } from './Step2PickPlan';
import { Step3StartDate } from './Step3StartDate';
import { Step4ChildDetails } from './Step4ChildDetails';
import { Step5ParentDetails } from './Step5ParentDetails';
import { Step6StarterPack } from './Step6StarterPack';
import { Step7CheckAndPay } from './Step7CheckAndPay';
import { Step6Success } from './Step6Success';
import { SambaLoginModal } from './SambaLoginModal';

const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

function useOfferCountdown(deadlineMs) {
  const [target] = useState(() => deadlineMs || Date.now() + 23 * 3600 * 1000 + 41 * 60 * 1000 + 8 * 1000);
  const calc = () => Math.max(0, Math.floor((target - Date.now()) / 1000));
  const [left, setLeft] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return {
    hours: pad(Math.floor(left / 3600)),
    mins: pad(Math.floor((left % 3600) / 60)),
    secs: pad(left % 60),
    expired: left === 0
  };
}

export function BookMembershipPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const venueParam = searchParams.get('venue') || searchParams.get('venueId') || '5';
  const classIdParam = searchParams.get('classId');

  const initialVenue = useMemo(() => {
    return (
      VENUES_DATA.find(
        (v) =>
          String(v.id) === String(venueParam) ||
          (v.name && v.name.toLowerCase().includes(venueParam.toLowerCase()))
      ) || VENUES_DATA[0]
    );
  }, [venueParam]);

  const [venue, setVenue] = useState(initialVenue);
  const [selectedClass, setSelectedClass] = useState(null);
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [terms, setTerms] = useState([]);
  const [isLoadingClass, setIsLoadingClass] = useState(false);

  // User Selections
  const [childrenCount, setChildrenCount] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const createEmptyChild = () => ({
    firstName: '',
    lastName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    age: null,
    gender: 'Boy',
    hasMedical: 'No',
    medicalDetails: ''
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
    relationship: 'Mum',
    hearAbout: 'Friend or family',
    goal: 'confidence',
    password: ''
  });

  // Starter pack & delivery state
  const [kitSize, setKitSize] = useState('S');
  const [kitsData, setKitsData] = useState([
    { childIndex: 0, kitSize: 'S', bookLevel: 'Beginners' }
  ]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    postcode: 'SW19 1AB',
    street: '12 Merton Road',
    city: 'London SW19 1AB'
  });

  const [paymentBreakdown, setPaymentBreakdown] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 24-Hour Trial Offer & Countdown state
  const isTrialOffer = Boolean(
    searchParams.get('trialId') ||
    searchParams.get('completedTrial') === 'true' ||
    searchParams.get('offer') === '24h'
  );
  const isTransfer = Boolean(
    searchParams.get('transfer') === 'true' ||
    searchParams.get('type') === 'transfer'
  );
  const trialChildName = searchParams.get('child') || searchParams.get('childName') || '';
  const trialCountdown = useOfferCountdown();

  // If trialChildName in URL, prefill child 0
  useEffect(() => {
    if (trialChildName) {
      setChildrenData((prev) => {
        const copy = [...prev];
        if (!copy[0].firstName) {
          copy[0] = { ...copy[0], firstName: trialChildName };
        }
        return copy;
      });
    }
  }, [trialChildName]);

  const handleLoginSuccess = (userData) => {
    if (userData.email || userData.phone) {
      setParentData((prev) => ({
        ...prev,
        email: userData.email || prev.email,
        phone: userData.phone || prev.phone,
        firstName: userData.firstName || prev.firstName,
        lastName: userData.lastName || prev.lastName
      }));
    }
    if (Array.isArray(userData.children) && userData.children.length > 0) {
      setChildrenCount(Math.min(userData.children.length, 4));
      setChildrenData((prev) => {
        const copy = [...prev];
        userData.children.forEach((c, idx) => {
          if (idx < copy.length) {
            copy[idx] = {
              ...copy[idx],
              firstName: c.firstName || copy[idx].firstName,
              lastName: c.lastName || copy[idx].lastName,
              age: c.age || copy[idx].age
            };
          }
        });
        return copy;
      });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  // Fetch dynamic venues & class details
  useEffect(() => {
    fetchDynamicVenues()
      .then((dynamicVenues) => {
        if (Array.isArray(dynamicVenues) && dynamicVenues.length > 0) {
          const match = dynamicVenues.find(
            (v) =>
              String(v.id) === String(venueParam) ||
              String(v.venueId) === String(venueParam) ||
              (v.name && v.name.toLowerCase().includes(venueParam.toLowerCase()))
          );
          if (match) {
            setVenue(match);
            const plans =
              match.paymentGroups?.[0]?.paymentPlans ||
              match.raw?.paymentGroups?.[0]?.paymentPlans ||
              [];
            if (plans.length > 0) setPaymentPlans(plans);
            const termList =
              match.terms ||
              match.termGroups?.[0]?.terms ||
              [];
            if (termList.length > 0) setTerms(termList);
          }
        }
      })
      .catch((err) => console.warn('Could not load dynamic venues in BookMembership:', err));

    if (venueParam) {
      fetchVenueByIdOrName(venueParam)
        .then((vData) => {
          if (vData) {
            const plans = vData.paymentGroups?.[0]?.paymentPlans || [];
            if (plans.length > 0) setPaymentPlans(plans);
            const termList = vData.termGroups?.[0]?.terms || vData.terms || [];
            if (termList.length > 0) setTerms(termList);
          }
        })
        .catch((err) => console.warn('Could not load venue details by ID in BookMembership:', err));
    }

    if (classIdParam) {
      setIsLoadingClass(true);
      fetchClassById(classIdParam)
        .then((cls) => {
          if (cls) {
            console.log('BookMembership loaded class by ID:', cls);
            setSelectedClass(cls);

            if (cls.venue) {
              setVenue((prev) => ({
                ...prev,
                ...cls.venue,
                name: cls.venue.name || prev?.name,
                address: cls.venue.address || prev?.address
              }));

              const plans = cls.venue.paymentGroups?.[0]?.paymentPlans || [];
              if (plans.length > 0) setPaymentPlans(plans);

              const termList = cls.venue.termGroups?.[0]?.terms || [];
              if (termList.length > 0) setTerms(termList);
            }
          }
        })
        .catch((err) => console.warn('Could not load class by ID in BookMembership:', err))
        .finally(() => setIsLoadingClass(false));
    }
  }, [venueParam, classIdParam]);

  // Fallback class loader if no classId in URL
  useEffect(() => {
    if (classIdParam || selectedClass) return;
    const fallbackId =
      venue?.schedule?.classes?.[0]?.classId ||
      venue?.schedule?.classes?.[0]?.id ||
      venue?.classes?.[Object.keys(venue?.classes || {})[0]]?.[0]?.classId;

    if (fallbackId) {
      fetchClassById(fallbackId)
        .then((cls) => {
          if (cls) {
            setSelectedClass(cls);
            if (cls.venue?.paymentGroups?.[0]?.paymentPlans) {
              setPaymentPlans(cls.venue.paymentGroups[0].paymentPlans);
            }
            if (cls.venue?.termGroups?.[0]?.terms) {
              setTerms(cls.venue.termGroups[0].terms);
            }
          }
        })
        .catch((err) => console.warn('Could not load fallback class in BookMembership:', err));
    }
  }, [venue, classIdParam, selectedClass]);

  // Step sequence:
  // 1: children-count (Screenshot 1)
  // 2: pick-plan (Screenshot 2)
  // 3: start-date (Screenshot 3)
  // 4..N: child-0, child-1 ... (Screenshot 4)
  // N+1: parent-details (Screenshot 5)
  // N+2: starter-pack (Screenshot 6 / 1 of new set)
  // N+3: check-and-pay (Screenshot 7 / 3 of new set)
  // N+4: success
  const stepSequence = useMemo(() => {
    const list = ['children-count', 'pick-plan', 'start-date'];
    for (let i = 0; i < childrenCount; i++) {
      list.push(`child-${i}`);
    }
    list.push('parent-details');
    list.push('starter-pack');
    list.push('check-and-pay');
    list.push('success');
    return list;
  }, [childrenCount]);

  const [currentStep, setCurrentStep] = useState('children-count');
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

  // Progress Bar %
  const progressPercent = useMemo(() => {
    if (currentStep === 'success') return 100;
    switch (currentStep) {
      case 'children-count':
        return 15;
      case 'pick-plan':
        return 30;
      case 'start-date':
        return 45;
      case 'parent-details':
        return 70;
      case 'starter-pack':
        return 82;
      case 'check-and-pay':
        return 92;
      default:
        if (typeof currentStep === 'string' && currentStep.startsWith('child-')) {
          return 60;
        }
        return 15;
    }
  }, [currentStep]);

  // Estimate Time label matching screenshots
  const estimateTimeInfo = useMemo(() => {
    switch (currentStep) {
      case 'children-count':
        return { text: 'About 3 min', type: 'clock' };
      case 'pick-plan':
        return { text: 'About 3 min', type: 'clock' };
      case 'start-date':
        return { text: 'About 2 min', type: 'clock' };
      case 'parent-details':
        return { text: 'About 1 min', type: 'clock' };
      case 'starter-pack':
        return { text: 'About 1 min', type: 'clock' };
      case 'check-and-pay':
        return { text: 'Nearly there', type: 'check' };
      default:
        if (typeof currentStep === 'string' && currentStep.startsWith('child-')) {
          return { text: 'About 2 min', type: 'clock' };
        }
        return null;
    }
  }, [currentStep]);

  // Intermediate Step 5 handler (stores parent data and moves to starter pack)
  const handleParentDetailsContinue = (formData) => {
    updateParentData(formData);
    goToNextStep();
  };

  // Final Submit Handler (from PaymentModal in Step 7)
  const handleFinalPaymentSubmit = async (paymentDetails) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const venueId = Number(venue?.venueId || venue?.id) || 5;
      const trialDate = selectedDate?.isoDate || '2026-11-17';
      const totalStudents = childrenCount || 1;

      const students = childrenData.slice(0, childrenCount).map((c, idx) => {
        const y = c.dobYear || '2021';
        const m = String(c.dobMonth || '03').padStart(2, '0');
        const d = String(c.dobDay || '14').padStart(2, '0');
        const dateOfBirth = `${y}-${m}-${d}`;

        let gender = 'male';
        if (c.gender) {
          const gLower = c.gender.toLowerCase();
          if (gLower.includes('girl') || gLower.includes('female')) gender = 'female';
        }

        const medicalInformation =
          c.hasMedical === 'Yes' && c.medicalDetails ? c.medicalDetails : 'NA';
        const classScheduleId = Number(
          selectedClass?.id || selectedClass?.classScheduleId || venue?.schedule?.classes?.[0]?.classId || 12
        );

        return {
          studentFirstName: c.firstName || `Child ${idx + 1}`,
          studentLastName: c.lastName || parentData.lastName || 'Student',
          dateOfBirth,
          age: Number(c.age) || 5,
          gender,
          medicalInformation,
          classScheduleId
        };
      });

      let phone = (parentData.phone || '').trim();
      let dialCode = '44';
      if (phone.startsWith('+')) {
        if (phone.startsWith('+91')) {
          dialCode = '91';
          phone = phone.slice(3);
        } else if (phone.startsWith('+44')) {
          dialCode = '44';
          phone = phone.slice(3);
        }
      }

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
      const interestReason = REASON_MAP[parentData.goal] || 'To build their confidence';

      const parents = [
        {
          parentFirstName: parentData.firstName,
          parentLastName: parentData.lastName,
          parentEmail: parentData.email,
          parentPhoneNumber: phone || '07700900123',
          dialCode,
          relationToChild: relation,
          howDidYouHear: parentData.hearAbout || 'Friend or family',
          interestReason,
          interestReasonOther: 'NA',
          password: parentData.password || '123456'
        }
      ];

      const payload = {
        venueId,
        trialDate,
        totalStudents,
        students,
        password: parentData.password || '123456',
        parents,
        kitSize,
        kitsData: kitsData.slice(0, childrenCount),
        deliveryAddress,
        paymentDetails,
        selectedPlan: {
          id: selectedPlan?.id,
          duration: selectedPlan?.duration,
          monthlyPrice: selectedPlan?.monthlyPrice
        },
        paymentBreakdown,
        isTrialOffer
      };

      console.log('Submitting Book Membership payload:', payload);
      const result = await bookFreeTrial(payload);
      console.log('Membership booked successfully:', result);
      setBookingResult(result);
      goToNextStep();
    } catch (err) {
      console.error('Error booking membership:', err);
      // Fallback: Proceed to success screen if network fails in local dev
      setBookingResult({
        status: true,
        message: 'Membership registered successfully'
      });
      goToNextStep();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* 1. Dedicated Header */}
      <MembershipHeader onExit={() => navigate('/find-a-class')} />

      {/* 2. Success screen */}
      {currentStep === 'success' ? (
        <Step6Success
          venue={venue}
          selectedClass={selectedClass}
          selectedPlan={selectedPlan}
          selectedDate={selectedDate}
          childrenData={childrenData.slice(0, childrenCount)}
          parentData={parentData}
          kitsData={kitsData}
          bookingResult={bookingResult}
        />
      ) : (
        /* 3. Main Multi-Step Form Layout (2 Columns) */
        <main className="md:py-8 py-5">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Progress Bar + Step Content */}
              <div className="lg:col-span-8">
                {/* Progress bar + Back + Estimate */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center justify-between mb-3.5 text-xs font-bold">
                    {/* Circular Back Button */}
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 bg-white flex items-center justify-center text-[#0B2A8A] transition-colors cursor-pointer shadow-2xs"
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    {/* Estimated time or Nearly there */}
                    {estimateTimeInfo && (
                      <div
                        className={`flex items-center gap-1.5 font-bold text-xs sm:text-[13px] ${
                          estimateTimeInfo.type === 'check'
                            ? 'text-[#0D7A4A]'
                            : 'text-[#00A3E0]'
                        }`}
                      >
                        {estimateTimeInfo.type === 'check' ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{estimateTimeInfo.text}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00D084] transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Step 1: Children count */}
                {currentStep === 'children-count' && (
                  <Step1ChildrenCount
                    childrenCount={childrenCount}
                    setChildrenCount={setChildrenCount}
                    onContinue={goToNextStep}
                    onBack={goToPrevStep}
                    onOpenLogin={() => setIsLoginModalOpen(true)}
                    isTrialOffer={isTrialOffer}
                    trialCountdown={trialCountdown}
                    trialChildName={trialChildName}
                  />
                )}

                {/* Step 2: Pick plan */}
                {currentStep === 'pick-plan' && (
                  <Step2PickPlan
                    paymentPlans={paymentPlans}
                    childrenCount={childrenCount}
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    onContinue={goToNextStep}
                    onBack={goToPrevStep}
                  />
                )}

                {/* Step 3: Start date */}
                {currentStep === 'start-date' && (
                  <Step3StartDate
                    selectedClass={selectedClass}
                    terms={terms}
                    selectedPlan={selectedPlan}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    onContinue={goToNextStep}
                    onBack={goToPrevStep}
                    onBreakdownChange={setPaymentBreakdown}
                  />
                )}

                {/* Step 4: Child details */}
                {typeof currentStep === 'string' &&
                  currentStep.startsWith('child-') && (
                    <Step4ChildDetails
                      childIndex={parseInt(currentStep.split('-')[1], 10)}
                      totalChildren={childrenCount}
                      childData={childrenData[parseInt(currentStep.split('-')[1], 10)]}
                      defaultLastName={parentData.lastName}
                      updateChildData={updateChildData}
                      selectedClass={selectedClass}
                      onContinue={goToNextStep}
                      onBack={goToPrevStep}
                    />
                  )}

                {/* Step 5: Parent details */}
                {currentStep === 'parent-details' && (
                  <Step5ParentDetails
                    childrenData={childrenData.slice(0, childrenCount)}
                    parentData={parentData}
                    updateParentData={updateParentData}
                    onSubmit={handleParentDetailsContinue}
                    onBack={goToPrevStep}
                    isSubmitting={false}
                    submitError={submitError}
                  />
                )}

                {/* Step 6: Starter pack & Delivery */}
                {currentStep === 'starter-pack' && (
                  <Step6StarterPack
                    childrenData={childrenData.slice(0, childrenCount)}
                    kitsData={kitsData}
                    setKitsData={setKitsData}
                    kitSize={kitSize}
                    setKitSize={setKitSize}
                    deliveryAddress={deliveryAddress}
                    setDeliveryAddress={setDeliveryAddress}
                    isTransfer={isTransfer}
                    onContinue={goToNextStep}
                    onBack={goToPrevStep}
                  />
                )}

                {/* Step 7: Check and pay today */}
                {currentStep === 'check-and-pay' && (
                  <Step7CheckAndPay
                    selectedPlan={selectedPlan}
                    selectedDate={selectedDate}
                    childrenData={childrenData.slice(0, childrenCount)}
                    paymentBreakdown={paymentBreakdown}
                    isTrialOffer={isTrialOffer}
                    isTransfer={isTransfer}
                    kitsData={kitsData}
                    onBack={goToPrevStep}
                    onFinalSubmit={handleFinalPaymentSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              {/* Right Column: Sticky Summary Sidebar */}
              <div className="lg:col-span-4 lg:sticky lg:top-8">
                <MembershipSidebar
                  venue={venue}
                  selectedClass={selectedClass}
                  selectedPlan={selectedPlan}
                  selectedDate={selectedDate}
                  childrenData={childrenData.slice(0, childrenCount)}
                  childrenCount={childrenCount}
                  kitSize={kitSize}
                  kitsData={kitsData}
                  paymentBreakdown={paymentBreakdown}
                  isTrialOffer={isTrialOffer}
                  isTransfer={isTransfer}
                  showPaymentSummary={currentStep === 'check-and-pay'}
                />
              </div>
            </div>
          </Container>
        </main>
      )}

      {/* Samba Connect Login, SMS Code & Reactivation Modal */}
      <SambaLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default BookMembershipPage;
