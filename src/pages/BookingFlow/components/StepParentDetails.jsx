import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Loader2, ChevronDown } from 'lucide-react';
import { checkParentEmail } from '../../../services/venueService';
import { COUNTRY_CODES } from '../../FindAClass/components/Book a Membership/SambaLoginModal';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

const RELATIONSHIPS = ['Mum', 'Dad', 'Guardian', 'Other'];

const SOURCES = [
  'Instagram / Facebook',
  'Google search',
  'Friend or family',
  'School or nursery',
  'Saw a session',
  'Other'
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidUkMobile = (v) => /^0?7\d{9}$/.test(v.replace(/[\s-]/g, ''));

const possessive = (name) => (/s$/i.test(name) ? `${name}'` : `${name}'s`);

const inputBase =
  'w-full bg-white border border-[#C9D3F0] rounded-[18px] px-4 py-3.5 text-[15px] sm:text-[16px] font-medium text-[#282829] outline-none transition-all';
const inputCls = (hasError) =>
  `${inputBase} ${
    hasError ? 'border-rose-400 focus:border-rose-400' : 'border-[#C9D3F0] focus:border-[#002B9A]'
  }`;

function ChoiceButton({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`py-3.5 px-3 rounded-[18px] font-bold text-[12px] sm:text-[14px] text-center border transition-all cursor-pointer ${
        selected
          ? 'bg-[#EBF7FC] border-2 border-[#002B9A] text-[#002B9A] shadow-xs'
          : 'bg-white border border-[#C9D3F0] text-[#282829] hover:border-slate-300'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function StepParentDetails({
  childrenData = [],
  parentData,
  updateParentData,
  onSubmit,
  onBack
}) {
  const [firstName, setFirstName] = useState(parentData?.firstName || '');
  const [lastName, setLastName] = useState(parentData?.lastName || '');
  const [email, setEmail] = useState(parentData?.email || '');
  const [dialCode, setDialCode] = useState(parentData?.dialCode || '44');
  const [phone, setPhone] = useState(parentData?.phone || '');
  const [relationship, setRelationship] = useState(parentData?.relationship || 'Mum');
  const [hearAbout, setHearAbout] = useState(parentData?.hearAbout || '');
  const [otherSource, setOtherSource] = useState(parentData?.otherSource || '');
  const [submitted, setSubmitted] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState('');
  const cachedEmailCheck = useRef(null);

  const childrenNames = childrenData.map((c) => c?.firstName?.trim()).filter(Boolean);

  let relationshipTitle = "You are the child's...";
  if (childrenNames.length === 1) {
    relationshipTitle = `You are ${possessive(childrenNames[0])}...`;
  } else if (childrenNames.length === 2) {
    relationshipTitle = `You are ${childrenNames[0]} & ${possessive(childrenNames[1])}...`;
  } else if (childrenNames.length > 2) {
    relationshipTitle = `You are ${childrenNames.slice(0, -1).join(', ')} & ${possessive(
      childrenNames[childrenNames.length - 1]
    )}...`;
  }

  const errors = {
    firstName: !firstName.trim() ? 'Please enter your first name' : '',
    lastName: !lastName.trim() ? 'Please enter your last name' : '',
    email: !EMAIL_RE.test(email.trim()) ? 'Please enter a valid email' : '',
    phone: !isValidUkMobile(phone) ? 'Please enter a valid UK mobile number' : '',
    relationship: !relationship ? 'Please choose one' : '',
    hearAbout: !hearAbout ? 'Please choose one' : ''
  };
  const isValid = Object.values(errors).every((e) => !e);
  const show = (key) => (submitted ? errors[key] : '');

  const handleEmailBlur = async () => {
    const trimmed = email.trim();
    if (EMAIL_RE.test(trimmed)) {
      if (cachedEmailCheck.current?.email === trimmed) return;
      try {
        const res = await checkParentEmail(trimmed);
        if (res) {
          cachedEmailCheck.current = { email: trimmed, result: res };
          if (res.exists && res.data) {
            if (!firstName && res.data.firstName) setFirstName(res.data.firstName);
            if (!lastName && res.data.lastName) setLastName(res.data.lastName);
          }
        }
      } catch (e) {
        // Silent background check
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid || isCheckingEmail) return;

    const trimmedEmail = email.trim();
    let emailResult = null;

    if (cachedEmailCheck.current?.email === trimmedEmail) {
      emailResult = cachedEmailCheck.current.result;
    } else {
      setIsCheckingEmail(true);
      setEmailCheckError('');
      try {
        emailResult = await checkParentEmail(trimmedEmail);
        cachedEmailCheck.current = { email: trimmedEmail, result: emailResult };
      } catch (err) {
        console.error('Email check failed during parent details:', err);
        setEmailCheckError(err.message || 'Unable to verify email. Please try again.');
        setIsCheckingEmail(false);
        return;
      }
      setIsCheckingEmail(false);
    }

    const updatedParent = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: trimmedEmail,
      dialCode,
      phone: phone.trim(),
      relationship,
      hearAbout,
      otherSource: hearAbout === 'Other' ? otherSource.trim() : ''
    };

    if (emailResult?.exists && emailResult?.data) {
      if (!updatedParent.firstName && emailResult.data.firstName) {
        updatedParent.firstName = emailResult.data.firstName;
      }
      if (!updatedParent.lastName && emailResult.data.lastName) {
        updatedParent.lastName = emailResult.data.lastName;
      }
    }

    updateParentData(updatedParent);

    onSubmit?.({
      checked: true,
      exists: Boolean(emailResult?.exists),
      email: trimmedEmail,
      parentInfo: emailResult?.data || null
    });
  };

  const Err = ({ k }) =>
    show(k) ? <p className="text-[11px] font-bold text-rose-500 mt-1">{errors[k]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Heading */}
      <div>
        <h1 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold recline text-[#282829] leading-[1]">
          Now a little <br />
          <span className="relative text-[42px] sm:text-[46px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            about you
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 object-fill pointer-events-none"
            />
          </span>
        </h1>
        <p className="text-[#797A88] font-bold text-[14px] sm:text-[16px] mt-3">
          So we can confirm the booking.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {/* Names: 2 columns side-by-side */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="parent-first" className="text-[13px] sm:text-[14px] text-[#042C89] font-bold block mb-1">
              First name
            </label>
            <input
              id="parent-first"
              type="text"
              autoComplete="given-name"
              placeholder="Sarah"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputCls(show('firstName'))}
            />
            <Err k="firstName" />
          </div>
          <div>
            <label htmlFor="parent-last" className="text-[13px] sm:text-[14px] text-[#042C89] font-bold block mb-1">
              Last name
            </label>
            <input
              id="parent-last"
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputCls(show('lastName'))}
            />
            <Err k="lastName" />
          </div>
        

        {/* Email */}
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="parent-email" className="text-[13px] sm:text-[14px] text-[#042C89] font-bold block mb-1">
            Email
          </label>
          <input
            id="parent-email"
            type="email"
            autoComplete="email"
            placeholder="sarah@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailCheckError) setEmailCheckError('');
            }}
            onBlur={handleEmailBlur}
            className={inputCls(show('email'))}
          />
          <Err k="email" />
          {emailCheckError && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{emailCheckError}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className='col-span-2 md:col-span-1'>
          <label htmlFor="parent-phone" className="text-[13px] sm:text-[14px] text-[#042C89] font-bold block mb-1">
            Mobile number
          </label>
          <div
            className={`flex rounded-[18px] border bg-white overflow-hidden transition-all ${
              show('phone') ? 'border-rose-400' : 'border-[#C9D3F0] focus-within:border-[#002B9A]'
            }`}
          >
            <div className="relative flex items-center border-r border-[#C9D3F0] px-3.5 py-3.5 bg-white shrink-0">
              <select
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                className="appearance-none bg-transparent pr-4 text-[14px] sm:text-[15px] font-bold text-[#282829] outline-none cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    +{c.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1 pointer-events-none" />
            </div>
            <input
              id="parent-phone"
              type="tel"
              autoComplete="tel-national"
              placeholder="07700 900123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3.5 text-[15px] font-medium text-[#282829] outline-none bg-transparent"
            />
          </div>
          <Err k="phone" />
        </div>
</div>
        {/* Relationship: 4-button pill row */}
        <div>
          <label className="text-[13px] sm:text-[14px] text-[#042C89] font-bold block mb-1.5">
            {relationshipTitle}
          </label>
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {RELATIONSHIPS.map((rel) => (
              <ChoiceButton
                key={rel}
                selected={relationship === rel}
                onClick={() => setRelationship(rel)}
              >
                {rel}
              </ChoiceButton>
            ))}
          </div>
          <Err k="relationship" />
        </div>

        {/* How did you hear about us: 2 columns */}
        <div>
          <label className="text-[13px] sm:text-[14px] text-[#042C89] font-bold block mb-1.5">
            How did you hear about us?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {SOURCES.map((src) => (
              <ChoiceButton
                key={src}
                selected={hearAbout === src}
                onClick={() => setHearAbout(src)}
              >
                {src}
              </ChoiceButton>
            ))}
          </div>
          <Err k="hearAbout" />
        </div>

        {/* If 'Other' is selected: Optional details */}
        {hearAbout === 'Other' && (
          <div className="animate-badge-fade-in pt-1">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="other-hear-about" className="text-[13px] font-bold text-[#042C89]">
                Where did you hear about us?
              </label>
              <span className="text-[12px] text-[#797A88] font-normal">Optional</span>
            </div>
            <input
              id="other-hear-about"
              type="text"
              placeholder="Leaflet at the library"
              value={otherSource}
              onChange={(e) => setOtherSource(e.target.value)}
              className="w-full bg-white border-2 border-[#002B9A] rounded-[18px] px-4 py-3.5 text-[15px] font-medium text-[#282829] outline-none"
            />
          </div>
        )}
      </div>

      {/* Desktop / Tablet Navigation Row */}
      <div className="hidden sm:flex items-center justify-between border-t border-[#E4E9F4] pt-6 sm:pt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={isCheckingEmail}
          className="text-[#042C89] hover:text-[#002B9A] font-bold text-[15px] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isCheckingEmail}
          className="bg-[#042C89] min-w-[280px] justify-center hover:bg-[#00227A] text-white font-bold text-[17px] py-3.5 px-10 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          {isCheckingEmail ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </>
          )}
        </button>
      </div>

      {/* Mobile Sticky / Full-width Button */}
      <div className="block sm:hidden pt-2">
        <button
          type="submit"
          disabled={isCheckingEmail}
          className="w-full h-[54px] rounded-full bg-[#002B9A] hover:bg-[#00227A] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer disabled:opacity-50"
        >
          {isCheckingEmail ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default StepParentDetails;
