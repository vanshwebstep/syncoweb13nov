import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { ChildAvatar } from './ChildAvatar';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

function calcAge(day, month, year) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (!d || !m || !y || y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) {
    return null;
  }
  const dob = new Date(y, m - 1, d);
  if (
    dob.getFullYear() !== y ||
    dob.getMonth() !== m - 1 ||
    dob.getDate() !== d ||
    isNaN(dob.getTime())
  ) {
    return null;
  }
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age -= 1;
  }
  if (age < 0 || age > 25) return null;
  return age;
}

const digitsOnly = (v) => v.replace(/\D/g, '');

function parseAgeRange(ageStr = '') {
  const nums = (String(ageStr).match(/\d+/g) || []).map(Number);
  if (!nums.length) return { min: 4, max: 12 };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: Math.min(nums[0], nums[1]), max: Math.max(nums[0], nums[1]) };
}

export function Step4ChildDetails({
  childIndex = 0,
  totalChildren = 1,
  childData,
  defaultLastName = '',
  updateChildData,
  selectedClass,
  venue = null,
  onSelectClass = null,
  onContinue,
  onBack
}) {
  const [firstName, setFirstName] = useState(childData?.firstName || '');
  const [lastName, setLastName] = useState(childData?.lastName || defaultLastName || '');
  const [dobDay, setDobDay] = useState(childData?.dobDay || '');
  const [dobMonth, setDobMonth] = useState(childData?.dobMonth || '');
  const [dobYear, setDobYear] = useState(childData?.dobYear || '');
  const [gender, setGender] = useState(childData?.gender || 'Boy');
  const [hasMedical, setHasMedical] = useState(childData?.hasMedical || 'No');
  const [medicalDetails, setMedicalDetails] = useState(childData?.medicalDetails || '');
  const [allowAgeOverride, setAllowAgeOverride] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const age = useMemo(() => calcAge(dobDay, dobMonth, dobYear), [dobDay, dobMonth, dobYear]);

  // Keep parent state updated
  useEffect(() => {
    updateChildData(childIndex, {
      firstName,
      lastName,
      dobDay,
      dobMonth,
      dobYear,
      age,
      gender,
      hasMedical,
      medicalDetails
    });
  }, [
    childIndex,
    firstName,
    lastName,
    dobDay,
    dobMonth,
    dobYear,
    age,
    gender,
    hasMedical,
    medicalDetails,
    updateChildData
  ]);

  const handleDayChange = (e) => {
    const val = digitsOnly(e.target.value).slice(0, 2);
    setDobDay(val);
    if (val.length === 2 && monthRef.current) monthRef.current.focus();
  };

  const handleMonthChange = (e) => {
    const val = digitsOnly(e.target.value).slice(0, 2);
    setDobMonth(val);
    if (val.length === 2 && yearRef.current) yearRef.current.focus();
  };

  const handleYearChange = (e) => {
    const val = digitsOnly(e.target.value).slice(0, 4);
    setDobYear(val);
  };

  const nameDisplay = firstName.trim() || `Child ${childIndex + 1}`;
  const pronoun = gender === 'Girl' ? 'she' : 'he';

  const classTime = selectedClass?.time || (selectedClass?.startTime ? `${selectedClass.startTime} – ${selectedClass.endTime}` : '4:00 – 5:00pm');
  const classAge = selectedClass?.className || selectedClass?.ageGroup || '4–5 Years';
  const classLevel = selectedClass?.level || 'Beginners';
  const classDay = selectedClass?.day ? selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1).slice(0, 3) : 'Tue';
  const classStartTime = selectedClass?.startTime || '4:00pm';

  const ageRange = useMemo(() => parseAgeRange(classAge), [classAge]);
  const isAgeMatch = useMemo(() => {
    if (age == null) return true;
    return age >= ageRange.min && age <= ageRange.max;
  }, [age, ageRange]);

  // Find a matching class in venue if age doesn't match
  const suggestedClass = useMemo(() => {
    if (isAgeMatch || age == null || !venue) return null;
    const allVenueClasses = [];
    if (venue.classes && typeof venue.classes === 'object') {
      Object.entries(venue.classes).forEach(([day, list]) => {
        if (Array.isArray(list)) {
          list.forEach((cls) => allVenueClasses.push({ ...cls, day }));
        }
      });
    } else if (Array.isArray(venue.schedule?.classes)) {
      allVenueClasses.push(...venue.schedule.classes);
    }

    return allVenueClasses.find((cls) => {
      const r = parseAgeRange(cls.className || cls.ageGroup);
      return age >= r.min && age <= r.max;
    });
  }, [isAgeMatch, age, venue]);

  const errors = {
    firstName: !firstName.trim() ? 'Please enter first name' : '',
    lastName: !lastName.trim() ? 'Please enter last name' : '',
    dob: age == null ? 'Please enter a valid date of birth' : '',
    ageMismatch: (age != null && !isAgeMatch && !allowAgeOverride)
      ? `${nameDisplay} is ${age} years old. This class is for ${classAge} (${ageRange.min}–${ageRange.max} years).`
      : ''
  };

  const isValid = Object.values(errors).every((e) => !e);

  const handleNext = () => {
    setSubmitted(true);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Multi-child Indicator badge */}
      {totalChildren > 1 && (
        <div className="flex items-center gap-2 bg-[#EBF7FC] border border-[#BAE6FD] text-[#002B9A] px-3.5 py-1.5 rounded-full w-fit text-xs font-extrabold uppercase tracking-wider">
          <ChildAvatar firstName={firstName || `Child ${childIndex + 1}`} lastName={lastName} size="xs" />
          <span>Child {childIndex + 1} of {totalChildren}</span>
        </div>
      )}

      {/* Step Heading */}
      <div className="pb-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
            {totalChildren > 1 ? `Child ${childIndex + 1}: Tell us about` : 'Tell us about'} <br />
            <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
              your child.
              <img
                src={YELLOW_SPLASH}
                alt=""
                className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
              />
            </span>
          </h1>
        </div>

        {/* Dynamic child avatar if name started */}
        {firstName && (
          <ChildAvatar
            firstName={firstName}
            lastName={lastName}
            size="lg"
            className="hidden sm:flex border-2 border-[#002B9A] shadow-sm mt-1"
          />
        )}
      </div>

      <div className="space-y-5">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              placeholder="e.g. Leo"
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full h-[52px] px-4 rounded-[16px] bg-white border text-[14px] sm:text-[15px] font-medium placeholder:text-[#94A3B8] outline-none transition-all ${
                submitted && errors.firstName
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-[#C9D3F0] focus:border-[#042C89]'
              }`}
            />
            {submitted && errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              placeholder="e.g. Smith"
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full h-[52px] px-4 rounded-[16px] bg-white border text-[14px] sm:text-[15px] font-medium placeholder:text-[#94A3B8] outline-none transition-all ${
                submitted && errors.lastName
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-[#C9D3F0] focus:border-[#042C89]'
              }`}
            />
            {submitted && errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Date of Birth & Right class pill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5">
              Date of birth
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                maxLength={2}
                placeholder="DD"
                value={dobDay}
                onChange={handleDayChange}
                className="h-[52px] text-center rounded-[16px] bg-white border border-[#C9D3F0] text-[15px] font-bold outline-none focus:border-[#042C89] placeholder:text-[#94A3B8]"
              />
              <input
                ref={monthRef}
                type="text"
                maxLength={2}
                placeholder="MM"
                value={dobMonth}
                onChange={handleMonthChange}
                className="h-[52px] text-center rounded-[16px] bg-white border border-[#C9D3F0] text-[15px] font-bold outline-none focus:border-[#042C89] placeholder:text-[#94A3B8]"
              />
              <input
                ref={yearRef}
                type="text"
                maxLength={4}
                placeholder="YYYY"
                value={dobYear}
                onChange={handleYearChange}
                className="h-[52px] text-center rounded-[16px] bg-white border border-[#C9D3F0] text-[15px] font-bold outline-none focus:border-[#042C89] placeholder:text-[#94A3B8]"
              />
            </div>
            {submitted && errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Class Age Status Banner */}
          {isAgeMatch ? (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-[18px] p-3.5 flex items-start gap-3 h-[52px] sm:h-auto overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3.5]" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] sm:text-[13px] font-bold text-[#065F46] leading-tight truncate">
                  {age != null ? `${nameDisplay} is ${age}, so ${pronoun}'s in the right class` : `Matches class age criteria`}
                </p>
                <p className="text-[11px] text-[#047857] mt-0.5 leading-tight truncate">
                  {classAge} · {classLevel} · {classDay} {classStartTime}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-[18px] p-3.5 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">!</span>
                <div className="min-w-0">
                  <p className="text-[12px] sm:text-[13px] font-bold text-[#92400E] leading-tight">
                    {nameDisplay} is {age} years old (Class is for {classAge})
                  </p>
                  <p className="text-[11px] text-[#B45309] mt-0.5 leading-tight">
                    Children develop best with their peer age group.
                  </p>
                </div>
              </div>

              {suggestedClass && onSelectClass && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(suggestedClass);
                    setAllowAgeOverride(false);
                  }}
                  className="self-start text-[11px] font-bold text-white bg-[#0B2A8A] hover:bg-[#08206b] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>Switch to {suggestedClass.className || suggestedClass.ageGroup} class</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setAllowAgeOverride(true)}
                className="text-[10px] text-[#92400E] hover:underline font-semibold self-start mt-0.5 cursor-pointer"
              >
                {allowAgeOverride ? '✓ Age override accepted' : 'Proceed anyway with this class'}
              </button>
            </div>
          )}
        </div>

        {submitted && errors.ageMismatch && (
          <p className="text-red-500 text-xs font-bold px-1">{errors.ageMismatch}</p>
        )}

        {/* Gender & Medical Needs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Gender */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5">
              {nameDisplay} is a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Boy', 'Girl'].map((g) => {
                const isSelected = gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`h-[52px] rounded-[16px] font-bold text-[14px] relative flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF7FC] border-2 border-[#002B9A] text-[#002B9A] shadow-xs'
                        : 'bg-white border border-[#C9D3F0] text-[#1E293B] hover:border-slate-300'
                    }`}
                  >
                    <span>{g}</span>
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#002B9A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Medical */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5">
              Any medical or additional needs?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['No', 'Yes'].map((m) => {
                const isSelected = hasMedical === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setHasMedical(m)}
                    className={`h-[52px] rounded-[16px] font-bold text-[14px] relative flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF7FC] border-2 border-[#002B9A] text-[#002B9A] shadow-xs'
                        : 'bg-white border border-[#C9D3F0] text-[#1E293B] hover:border-slate-300'
                    }`}
                  >
                    <span>{m}</span>
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#002B9A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conditional Medical Info Textarea */}
        {hasMedical === 'Yes' && (
          <div className="pt-2 animate-badge-fade-in">
            <label className="block text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5">
              Please share any medical or additional needs details
            </label>
            <textarea
              rows={3}
              value={medicalDetails}
              onChange={(e) => setMedicalDetails(e.target.value)}
              placeholder="e.g. Inhaler required for asthma, allergies, etc."
              className="w-full p-3.5 rounded-[16px] bg-white border border-[#C9D3F0] text-[14px] font-medium outline-none focus:border-[#042C89]"
            />
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#002B9A] hover:underline font-bold text-xs sm:text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-xs sm:text-[14px] px-7 sm:px-8 py-3 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Step4ChildDetails;
