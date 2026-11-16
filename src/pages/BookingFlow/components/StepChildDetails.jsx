import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

const AGE_GROUPS = [
  { min: 4, max: 5, label: '4–5 Years', time: 'Sat 7:15 – 8:15am' },
  { min: 6, max: 7, label: '6–7 Years', time: 'Sat 8:15 – 9:15am' },
  { min: 8, max: 9, label: '8–9 Years', time: 'Sat 9:15 – 10:15am' },
  { min: 10, max: 12, label: '10–12 Years', time: 'Sat 10:15 – 11:15am' }
];

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

function OptionButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`relative h-[60px] px-4 rounded-[16px] font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
        selected
          ? 'bg-[#E3F3FC] border-2 border-[#042C89] text-[#042C89]'
          : 'bg-white border-[1.2px] border-[#D5DCF0] text-[#282829] hover:border-slate-300'
      }`}
    >
      {selected && (
        <span className="absolute top-1.5 right-2 w-[18px] h-[18px] rounded-full bg-[#042C89] text-white flex items-center justify-center">
          <Check className="w-2.5 h-2.5 stroke-[3.5]" />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}

const labelCls = 'text-[12px] md:text-[14px] font-bold text-[#042C89] block mb-1.5 leading-tight';

const inputCls = (hasError) =>
  `w-full h-[54px] bg-white border-[1.2px] rounded-[14px] px-4 text-[13px] font-normal text-[#282829] outline-none transition-all ${
    hasError ? 'border-rose-400 focus:border-rose-400' : 'border-[#D5DCF0] focus:border-[#042C89]'
  }`;

const dobCls = (hasError) =>
  `w-full h-[54px] bg-white border-[1.2px] rounded-[14px] text-center text-[14px] font-bold text-[#282829] outline-none transition-all ${
    hasError ? 'border-rose-400' : 'border-[#C9D3F0] focus:border-[#042C89]'
  }`;

export function StepChildDetails({
  childIndex,
  totalChildren,
  childData,
  defaultLastName = '',
  updateChildData,
  onContinue,
  onBack
}) {
  const [firstName, setFirstName] = useState(childData?.firstName || '');
  const [lastName, setLastName] = useState(childData?.lastName || defaultLastName);
  const [dobDay, setDobDay] = useState(childData?.dobDay || '');
  const [dobMonth, setDobMonth] = useState(childData?.dobMonth || '');
  const [dobYear, setDobYear] = useState(childData?.dobYear || '');
  const [gender, setGender] = useState(childData?.gender || '');
  const [hasMedical, setHasMedical] = useState(childData?.hasMedical || '');
  const [medicalDetails, setMedicalDetails] = useState(childData?.medicalDetails || '');
  const [submitted, setSubmitted] = useState(false);

  const age = useMemo(() => calcAge(dobDay, dobMonth, dobYear), [dobDay, dobMonth, dobYear]);
  const group = useMemo(
    () => (age === null ? null : AGE_GROUPS.find((g) => age >= g.min && age <= g.max) || null),
    [age]
  );

  const nameDisplay = firstName.trim() || 'Your child';
  const pronoun = gender === 'Girl' ? 'her' : gender === 'Boy' ? 'him' : 'them';

  const errors = {
    firstName: !firstName.trim() ? 'Please enter a first name' : '',
    lastName: !lastName.trim() ? 'Please enter a last name' : '',
    dob:
      age === null
        ? 'Please enter a valid date of birth'
        : !group
        ? 'Sessions are for ages 4–12'
        : '',
    gender: !gender ? 'Please choose one' : '',
    hasMedical: !hasMedical ? 'Please choose one' : '',
    medicalDetails: hasMedical === 'Yes' && !medicalDetails.trim() ? 'Please add a few details' : ''
  };
  const isValid = Object.values(errors).every((e) => !e);
  const show = (key) => (submitted ? errors[key] : '');

  const updateRef = useRef(updateChildData);
  useEffect(() => {
    updateRef.current = updateChildData;
  }, [updateChildData]);

  useEffect(() => {
    updateRef.current?.(childIndex, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dobDay,
      dobMonth,
      dobYear,
      gender,
      hasMedical,
      medicalDetails: hasMedical === 'Yes' ? medicalDetails : '',
      age,
      ageGroup: group?.label || '',
      sessionTime: group?.time || '',
      ageGroupText: group ? `${group.label} · ${group.time}` : '',
      isValid
    });
  }, [
    childIndex,
    firstName,
    lastName,
    dobDay,
    dobMonth,
    dobYear,
    gender,
    hasMedical,
    medicalDetails,
    age,
    group,
    isValid
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    onContinue();
  };

  const isSecondChild = childIndex === 1;
  const headingPart1 = childIndex === 0 ? 'Tell us about' : 'And your';
  const headingPart2 =
    childIndex === 0
      ? 'your child.'
      : isSecondChild
      ? 'second child?'
      : `child ${childIndex + 1}?`;

  const isRightGroup = childIndex === 0 && (age === 4 || age === 5);
  const bannerPhrase = isRightGroup
    ? `${nameDisplay} is ${age}, so ${gender === 'Girl' ? "she's" : "he's"} in the right group`
    : `${nameDisplay} is ${age}, so we've placed ${pronoun} in`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 animate-badge-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold recline text-[#042C89] leading-[1]">
          {headingPart1} <br />
          <span className="relative text-[42px] sm:text-[46px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            {headingPart2}
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[12px] sm:text-[13px] mt-3">
          Child {childIndex + 1} of {totalChildren}
        </p>
      </div>

      {/* Names */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor={`child-${childIndex}-first`} className={labelCls}>
            First name
          </label>
          <input
            id={`child-${childIndex}-first`}
            type="text"
            autoComplete="off"
            placeholder={childIndex === 0 ? 'Leo' : 'Mia'}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputCls(show('firstName'))}
          />
          {show('firstName') && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor={`child-${childIndex}-last`} className={labelCls}>
            Last name
          </label>
          <input
            id={`child-${childIndex}-last`}
            type="text"
            autoComplete="off"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputCls(show('lastName'))}
          />
          {show('lastName') && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* DOB (left) + Age group banner (right) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 items-start">
        <div>
          <label className={labelCls}>Date of birth</label>
          <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2">
            {[
              { v: dobDay, set: setDobDay, ph: '14', max: 2, label: 'Day' },
              { v: dobMonth, set: setDobMonth, ph: '03', max: 2, label: 'Month' },
              { v: dobYear, set: setDobYear, ph: '2021', max: 4, label: 'Year' }
            ].map((f) => (
              <input
                key={f.label}
                type="text"
                inputMode="numeric"
                aria-label={f.label}
                placeholder={f.ph}
                maxLength={f.max}
                value={f.v}
                onChange={(e) => f.set(digitsOnly(e.target.value))}
                className={dobCls(show('dob'))}
              />
            ))}
          </div>
          {show('dob') && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.dob}</p>
          )}
        </div>

        {group && (
          <div className="sm:mt-[22px] bg-[#E7FAF2] rounded-[14px] px-3.5 py-2.5 min-h-[66px] flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0D7A4A] text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3.5]" />
            </span>
            <div className="min-w-0">
              <div className="font-bold text-[#067A4B] text-[12.5px] md:text-[13px] leading-tight">
                {bannerPhrase}
              </div>
              <div className="text-[#067A4B] font-normal text-[12.5px] md:text-[13px] mt-0.5 leading-tight">
                {group.label} · {group.time}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#E4E9F4]" />

      {/* Gender (left) + Medical (right) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 items-start">
        <div>
          <label className={labelCls}>{nameDisplay} is a...</label>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <OptionButton selected={gender === 'Boy'} onClick={() => setGender('Boy')}>
              Boy
            </OptionButton>
            <OptionButton selected={gender === 'Girl'} onClick={() => setGender('Girl')}>
              Girl
            </OptionButton>
          </div>
          {show('gender') && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Any medical or additional needs?</label>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <OptionButton selected={hasMedical === 'No'} onClick={() => setHasMedical('No')}>
              No
            </OptionButton>
            <OptionButton selected={hasMedical === 'Yes'} onClick={() => setHasMedical('Yes')}>
              Yes
            </OptionButton>
          </div>
          {show('hasMedical') && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.hasMedical}</p>
          )}

          {hasMedical === 'Yes' && (
            <div className="animate-badge-fade-in pt-2.5">
              <textarea
                rows={2}
                aria-label="Medical or additional needs details"
                placeholder="Mild asthma, has an inhaler."
                value={medicalDetails}
                onChange={(e) => setMedicalDetails(e.target.value)}
                className={`w-full min-h-[68px] resize-none bg-white border rounded-[14px] px-3.5 py-3 text-[13px] font-normal text-[#282829] outline-none transition-all ${
                  show('medicalDetails')
                    ? 'border-rose-400'
                    : 'border-[#D5DCF0] focus:border-[#042C89]'
                }`}
              />
              {show('medicalDetails') && (
                <p className="text-[11px] font-bold text-rose-500 mt-1">
                  {errors.medicalDetails}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#E4E9F4]" />

      {/* Footer: Back + Continue */}
      <div className="flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={onBack}
          className="hidden md:block text-[#042C89] hover:text-[#002B9A] font-bold text-[15px] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="flex-1 sm:flex-none w-full sm:w-[223px] h-[46px] bg-[#042C89] hover:bg-[#03236E] text-white font-bold text-[17px] rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </form>
  );
}

export default StepChildDetails;