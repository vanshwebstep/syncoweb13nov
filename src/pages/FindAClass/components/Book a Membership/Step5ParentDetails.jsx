import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check, Loader2 } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';
const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Samba-Connect-logo.png';

const RELATIONSHIPS = ['Mum', 'Dad', 'Guardian', 'Other'];
const SOURCES = [
  'Instagram / Facebook',
  'Google search',
  'Friend or family',
  'School or nursery',
  'Saw a session',
  'Other'
];
const GOALS = [
  { id: 'confidence', label: 'Build confidence' },
  { id: 'skills', label: 'Improve skills' },
  { id: 'friends', label: 'Make friends' },
  { id: 'active', label: 'Get active' }
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelCls = 'block text-[14px] font-bold text-[#042C89] mb-1.5';
const inputBase =
  'w-full h-[54px] px-4 rounded-[16px] bg-white border text-[14px] sm:text-[15px] font-medium text-[#1E1E2E] placeholder:text-[#1E1E2E] outline-none transition-all';
const chipOn = 'bg-[#E6F5FC] border-2 border-[#002B9A] text-[#042C89]';
const chipOff = 'bg-white border border-[#C9D3F0] text-[#1E1E2E] hover:border-slate-300';

export function Step5ParentDetails({
  childrenData = [],
  parentData,
  updateParentData,
  onSubmit,
  onBack,
  isSubmitting,
  submitError
}) {
  const [firstName, setFirstName] = useState(parentData?.firstName || '');
  const [lastName, setLastName] = useState(parentData?.lastName || '');
  const [email, setEmail] = useState(parentData?.email || '');
  const [phone, setPhone] = useState(parentData?.phone || '');
  const [relationship, setRelationship] = useState(parentData?.relationship || 'Mum');
  const [hearAbout, setHearAbout] = useState(parentData?.hearAbout || 'Friend or family');
  const [goal, setGoal] = useState(parentData?.goal || 'confidence');
  const [password, setPassword] = useState(parentData?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const primaryChild = childrenData?.[0];
  const childName = primaryChild?.firstName?.trim() || 'your child';

  const errors = {
    firstName: !firstName.trim() ? 'Please enter first name' : '',
    lastName: !lastName.trim() ? 'Please enter last name' : '',
    email: !EMAIL_RE.test(email.trim()) ? 'Please enter a valid email address' : '',
    phone: !phone.trim() ? 'Please enter a phone number' : '',
    password: password.length < 8 ? 'Password must be at least 8 characters' : ''
  };

  const isValid = Object.values(errors).every((e) => !e);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      relationship,
      hearAbout,
      goal,
      password
    };

    updateParentData(payload);
    if (onSubmit) onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Step Heading */}
      <div className="pb-2">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          Now, a little <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            about you.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs sm:text-sm font-medium">
          {submitError}
        </div>
      )}

      {/* Row 1: First name & Last name */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="min-w-0">
          <label className={labelCls}>First name</label>
          <input
            type="text"
            value={firstName}
            placeholder="e.g. Sarah"
            onChange={(e) => setFirstName(e.target.value)}
            className={`${inputBase} ${
              submitted && errors.firstName
                ? 'border-red-400 focus:border-red-400'
                : 'border-[#C9D3F0] focus:border-[#042C89]'
            }`}
          />
          {submitted && errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className={labelCls}>Last name</label>
          <input
            type="text"
            value={lastName}
            placeholder="e.g. Smith"
            onChange={(e) => setLastName(e.target.value)}
            className={`${inputBase} ${
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

      {/* Row 2: Email & Mobile number */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="min-w-0">
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={email}
            placeholder="e.g. sarah@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputBase} ${
              submitted && errors.email
                ? 'border-red-400 focus:border-red-400'
                : 'border-[#C9D3F0] focus:border-[#042C89]'
            }`}
          />
          {submitted && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="min-w-0">
          <label className={labelCls}>Mobile number</label>
          <div
            className={`flex items-center h-[54px] rounded-[16px] bg-white border overflow-hidden transition-all ${
              submitted && errors.phone
                ? 'border-red-400'
                : 'border-[#C9D3F0] focus-within:border-[#042C89]'
            }`}
          >
            <div className="bg-white px-3.5 h-full flex items-center justify-center border-r border-[#C9D3F0] text-xs sm:text-[13px] font-bold text-[#042C89]">
              +44
            </div>
            <input
              type="tel"
              value={phone}
              placeholder="07700 900123"
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 min-w-0 h-full px-4 text-[14px] sm:text-[15px] font-medium text-[#1E1E2E] placeholder:text-[#1E1E2E] outline-none bg-transparent"
            />
          </div>
          {submitted && errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 3: You are {childName}'s... */}
      <div>
        <label className={`${labelCls} mb-2`}>You are {childName}’s...</label>
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {RELATIONSHIPS.map((rel) => (
            <button
              key={rel}
              type="button"
              onClick={() => setRelationship(rel)}
              className={`h-[48px] rounded-[16px] font-bold text-[13px] sm:text-[14px] transition-all cursor-pointer ${
                relationship === rel ? chipOn : chipOff
              }`}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: How did you hear about us? */}
      <div>
        <label className={`${labelCls} mb-2`}>How did you hear about us?</label>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {SOURCES.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setHearAbout(src)}
              className={`py-3 px-3 rounded-[16px] font-bold text-[12px] sm:text-[13px] text-center transition-all cursor-pointer ${
                hearAbout === src ? chipOn : chipOff
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Row 5: Goal */}
      <div>
        <label className={`${labelCls} mb-2`}>
          What’s the main thing you’d like for {childName}?
        </label>
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {GOALS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGoal(g.id)}
              className={`py-3 px-3 rounded-[16px] font-bold text-[12px] sm:text-[13px] text-center transition-all cursor-pointer ${
                goal === g.id ? chipOn : chipOff
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Samba Connect Login Card */}
      <div className="bg-white border border-[#E2E4EC] rounded-[22px] p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <img src={sssLogo2} alt="Samba Connect" className="h-8 w-auto object-contain shrink-0" />
          <div className="min-w-0">
            <h4 className="font-extrabold text-[15px] sm:text-[16px] text-[#042C89] leading-tight">
              Create your Samba Connect login
            </h4>
            <p className="text-[#797A88] text-[12px] sm:text-[13px] mt-0.5">
              Manage bookings, payments and progress in one place.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
          {/* Login email */}
          <div className="min-w-0">
            <label className={labelCls}>Login email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                readOnly
                placeholder="sarah@email.com"
                className="w-full h-[54px] px-4 pr-10 rounded-[16px] bg-[#EEF1F8] border border-[#E2E4EC] text-[14px] sm:text-[15px] font-medium text-[#1E1E2E] placeholder:text-[#1E1E2E] outline-none"
              />
              {EMAIL_RE.test(email.trim()) && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0DD180] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
              )}
            </div>
            <p className="text-[#797A88] text-[11px] sm:text-xs mt-1">
              Your email is your login
            </p>
          </div>

          {/* Create password */}
          <div className="min-w-0">
            <label className={labelCls}>Create a password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-[54px] px-4 pr-10 rounded-[16px] bg-white border text-[14px] sm:text-[15px] font-medium text-[#1E1E2E] outline-none transition-all ${
                  submitted && errors.password
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-[#C9D3F0] focus:border-2 focus:border-[#042C89]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797A88] hover:text-[#042C89] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {submitted && errors.password ? (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            ) : (
              <p className="text-[#797A88] text-[11px] sm:text-xs mt-1">
                At least 8 characters
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notice text */}
      <p className="text-[#0A9460] font-bold text-[13px] sm:text-[14px]">
        Next, you’ll go straight into Samba Connect to finish.
      </p>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[#E2E4EC]">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 text-[#002B9A] hover:underline font-bold text-xs sm:text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-xs sm:text-[14px] w-[220px] sm:w-[260px] py-3 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create login &amp; continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default Step5ParentDetails;