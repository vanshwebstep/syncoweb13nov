import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, ArrowRight, ArrowLeft, Loader2, User, MapPin } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Step6AccountCreation({
  parentData = {},
  parentEmail = '',
  accountStatus = null,
  venue = null,
  selectedDate = null,
  childrenData = [],
  onSubmit,
  onBack,
  onEditTrial,
  isSubmitting = false,
  apiError = ''
}) {
  // Mode: 'login' | 'register'
  const [mode, setMode] = useState(() => {
    if (accountStatus?.checked) {
      return accountStatus.exists ? 'login' : 'register';
    }
    return 'register';
  });

  // Form field state
  const [email, setEmail] = useState(accountStatus?.email || parentEmail || parentData?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  // Sync email and mode when parentEmail / accountStatus changes
  useEffect(() => {
    const targetEmail = (accountStatus?.email || parentEmail || parentData?.email || '').trim();
    if (targetEmail) {
      setEmail(targetEmail);
    }
    if (accountStatus?.checked) {
      setMode(accountStatus.exists ? 'login' : 'register');
    }
  }, [accountStatus, parentEmail, parentData?.email]);

  const handleFormSubmit = async (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (mode === 'register' && password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy');
      return;
    }

    setError('');

    await onSubmit?.({
      email: email.trim(),
      password,
      confirmPassword: password,
      firstName: parentData?.firstName || 'Parent',
      lastName: parentData?.lastName || 'Guardian',
      isExistingAccount: mode === 'login'
    });
  };

  const formattedDate = selectedDate?.fullDate || 'Saturday 24 October';
  const venueLocation = venue?.address || venue?.name || 'Chelsea Academy, Lots Road';

  return (
    <form onSubmit={handleFormSubmit} noValidate className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Step Heading */}
      <div>
        <h1 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold recline text-[#042C89] leading-[1]">
          Last step: <br />
          <span className="relative text-[42px] sm:text-[46px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            book it.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 object-fill pointer-events-none"
            />
          </span>
        </h1>
        <p className="text-[#797A88] text-[15px] font-bold mt-3 hidden lg:block">
          Check your booking on the right, then create your account.
        </p>
      </div>

      {/* Summary Card (Dark Navy Card - Mobile Only) */}
      <div className="bg-[#042C89] text-white rounded-[24px] p-5 shadow-sm lg:hidden">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[#FFDE14] text-[11px] font-bold uppercase ">
            YOUR FREE TRIAL
          </span>
          <button
            type="button"
            onClick={onEditTrial || onBack}
            className="text-white hover:text-white/80 font-bold text-[13px] sm:text-[14px] cursor-pointer"
          >
            Edit
          </button>
        </div>

        <h3 className="text-white font-bold text-[17px] leading-tight">
          {formattedDate}
        </h3>

        <div className="flex items-center gap-1.5 text-[#C9D3F0] text-[13px] mt-1">
          <MapPin className="w-3.5 h-3.5 text-[#C9D3F0] shrink-0" />
          <span className="truncate">{venueLocation}</span>
        </div>

        {/* Divider */}
        <div className="border-b border-white/15 my-3.5" />

        {/* Children List */}
        <div className="space-y-2">
          {childrenData.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-white font-normal">
              <User className="w-3.5 h-3.5 text-[#FFF] shrink-0 stroke-[3]" />
              <span>
                {c?.firstName || `Child ${i + 1}`} · {c?.ageGroup || '4–5 Years'} · {c?.sessionTime ? c.sessionTime.replace('Sat ', '') : '7:15 – 8:15am'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Form Section */}
      <div className="space-y-4 md:pb-4">
        <div>
          <h2 className="text-[17px] sm:text-[18px] font-bold text-[#042C89] leading-tight">
            {mode === 'login' ? 'Log in to your Samba account' : 'Create your Samba account'}
          </h2>
          <p className="text-[#797A88] text-[14px] font-normal mt-0.5">
            Manage bookings and see their progress.
          </p>
        </div>

        {/* Two Fields Grid (Email & Password side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Field */}
          <div>
            <label htmlFor="acc-email" className="text-[13px] sm:text-[14px] font-bold text-[#042C89] block mb-1">
              Account email
            </label>
            <input
              id="acc-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="sarah@email.com"
              className="w-full bg-white border border-[#C9D3F0] rounded-[18px] px-4 py-3.5 text-[15px] sm:text-[16px] font-medium text-[#282829] outline-none focus:border-[#002B9A] transition-all"
            />
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
                setPassword('');
              }}
              className="text-[#00A3E0] hover:underline font-bold text-[12px] mt-2 block cursor-pointer"
            >
              {mode === 'login' ? 'Need to create account?' : 'Have an account? Log in'}
            </button>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="acc-password" className="text-[13px] sm:text-[14px] font-bold text-[#042C89] block mb-1">
              {mode === 'login' ? 'Password' : 'Create a password'}
            </label>
            <div className="relative">
              <input
                id="acc-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                className="w-full bg-white border border-[#C9D3F0] rounded-[18px] px-4 py-3.5 pr-11 text-[15px] sm:text-[16px] font-medium text-[#282829] outline-none focus:border-[#002B9A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#042C89] transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {mode === 'register' ? (
              <p className="text-[#94A3B8] font-normal text-xs mt-1.5">
                At least 8 characters
              </p>
            ) : (
              <a
                href="https://parent-dash.netlify.app/auth/forgot-password"
                target="_blank"
                rel="noreferrer"
                className="text-[#00A3E0] hover:underline font-bold text-[11px] mt-1.5 inline-block"
              >
                Forgot password?
              </a>
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only"
            />
            <span
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                agreed ? 'bg-[#00D084] text-white shadow-xs' : 'border-2 border-[#CBD5E1] bg-white'
              }`}
            >
              {agreed && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
            </span>
            <span className="text-[13px] sm:text-[14px] text-[#282829] font-medium leading-tight">
              I agree to the{' '}
              <a href="/terms" target="_blank" className="font-bold text-[#00A3E0] hover:underline">
                Terms &amp; Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" className="font-bold text-[#00A3E0] hover:underline">
                Privacy Policy.
              </a>
            </span>
          </label>
        </div>

        {(error || apiError) && (
          <p className="text-xs font-bold text-rose-500 pt-1">
            {error || apiError}
          </p>
        )}
      </div>

      {/* Desktop / Tablet Navigation Row */}
      <div className="hidden sm:flex items-center justify-between border-t border-[#E4E9F4] pt-6 sm:pt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-[#042C89] hover:text-[#002B9A] font-bold text-[14px] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00D084] hover:bg-[#00BD77] text-[#042C89] font-bold text-[16px] py-3.5 px-10 rounded-full flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Book FREE trial</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>

      {/* Mobile Sticky / Full-width Button */}
      <div className="block sm:hidden pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[54px] rounded-full bg-[#00D084] hover:bg-[#00BD77] text-[#042C89] font-bold text-[17px] flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Book FREE trial</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default Step6AccountCreation;
