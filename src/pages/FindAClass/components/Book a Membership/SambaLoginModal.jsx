import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, CheckCircle2, Loader2, Eye, EyeOff, ChevronDown, KeyRound } from 'lucide-react';
import {
  loginParent,
  sendParentLoginCode,
  verifyParentLoginCode,
  requestPasswordReset,
  resetParentPassword
} from '../../../../services/venueService';

const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Samba-Connect-logo.png';

export const COUNTRY_CODES = [
  { code: '44', label: '+44 (UK)' },
  { code: '91', label: '+91 (India)' },
  { code: '1', label: '+1 (US/CA)' },
  { code: '61', label: '+61 (Australia)' },
  { code: '353', label: '+353 (Ireland)' },
  { code: '971', label: '+971 (UAE)' },
  { code: '34', label: '+34 (Spain)' },
  { code: '49', label: '+49 (Germany)' },
  { code: '33', label: '+33 (France)' },
  { code: '39', label: '+39 (Italy)' },
  { code: '31', label: '+31 (Netherlands)' },
  { code: '351', label: '+351 (Portugal)' },
  { code: '27', label: '+27 (South Africa)' },
  { code: '64', label: '+64 (New Zealand)' },
];

export function SambaLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('password'); // 'password' | 'sms' | 'otp' | 'forgot'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dialCode, setDialCode] = useState('44');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [resendCountdown, setResendCountdown] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Password reset states
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasTokenMode, setHasTokenMode] = useState(false);
  const [showResetNewPassword, setShowResetNewPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (activeTab === 'otp' && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, resendCountdown]);

  if (!isOpen) return null;

  const resetForm = () => {
    setStatusMessage({ type: '', text: '' });
    setOtpCode(['', '', '', '', '', '']);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  // Mask phone for OTP display (e.g. +44 7700 ••• 482)
  const getMaskedPhone = () => {
    const raw = phone.replace(/\D/g, '');
    let clean = raw.startsWith('0') ? raw.slice(1) : raw;
    if (clean.startsWith(dialCode) && clean.length > dialCode.length + 5) {
      clean = clean.slice(dialCode.length);
    }
    if (clean.length >= 7) {
      const first4 = clean.slice(0, 4);
      const last3 = clean.slice(-3);
      return `+${dialCode} ${first4} ••• ${last3}`;
    }
    return `+${dialCode} 7700 ••• 482`;
  };

  // 1. Password Login Handler
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setStatusMessage({
        type: 'error',
        text: "That email and password don't match. Try again."
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await loginParent(email, password);
      setStatusMessage({ type: 'success', text: 'Logged in successfully! Loading your details...' });
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            email,
            firstName: res?.data?.firstName || email.split('@')[0],
            lastName: res?.data?.lastName || '',
            phone: res?.data?.phone || '',
            children: res?.data?.children || []
          });
        }
        onClose();
      }, 700);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || "That email and password don't match. Try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. SMS Code Request Handler
  const handleSendSmsCode = async (e) => {
    e?.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (!digits || digits.length < 8) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid mobile number.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const fullPhone = dialCode
        ? `+${dialCode}${digits.startsWith('0') ? digits.slice(1) : digits}`
        : digits;
      const res = await sendParentLoginCode(fullPhone);

      setActiveTab('otp');
      setResendCountdown(res?.data?.expiresInSeconds ? Math.min(res.data.expiresInSeconds, 60) : 30);
      setOtpCode(['', '', '', '', '', '']);
      setStatusMessage({
        type: 'success',
        text: res?.message || `Login code sent successfully to ${getMaskedPhone()}.`
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to send login code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code handler
  const handleResendCode = async () => {
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const digits = phone.replace(/\D/g, '');
      const fullPhone = dialCode
        ? `+${dialCode}${digits.startsWith('0') ? digits.slice(1) : digits}`
        : digits;
      const res = await sendParentLoginCode(fullPhone);
      setResendCountdown(30);
      setStatusMessage({
        type: 'success',
        text: res?.message || `New 6-digit code sent to ${getMaskedPhone()}.`
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to resend code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Box change handler
  const handleOtpChange = (index, val) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = digit;
    setOtpCode(newOtp);

    // Auto focus next input
    if (digit && index < 5) {
      const nextInput = document.getElementById(`samba-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // OTP key down (for backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`samba-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // OTP paste handler
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otpCode];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtpCode(newOtp);
    const lastIdx = Math.min(pasted.length, 5);
    const targetInput = document.getElementById(`samba-otp-${lastIdx}`);
    if (targetInput) targetInput.focus();
  };

  // OTP Submit Handler
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    const code = otpCode.join('');
    if (code.length < 6) {
      setStatusMessage({ type: 'error', text: 'Please enter all 6 digits of the code.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const digits = phone.replace(/\D/g, '');
      const fullPhone = dialCode
        ? `+${dialCode}${digits.startsWith('0') ? digits.slice(1) : digits}`
        : digits;
      const res = await verifyParentLoginCode(fullPhone, code);

      setStatusMessage({ type: 'success', text: 'Verified successfully! Logging you in...' });
      setTimeout(() => {
        if (onLoginSuccess) {
          const userData = res?.data || res?.user || {};
          onLoginSuccess({
            phone: fullPhone,
            dialCode,
            firstName: userData.firstName || 'Parent',
            lastName: userData.lastName || '',
            email: userData.email || '',
            children: userData.children || []
          });
        }
        onClose();
      }, 700);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Invalid login code. Please check and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Forgot Password Handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await requestPasswordReset(email);
      setStatusMessage({
        type: 'success',
        text: res?.message || `Reset link sent successfully to ${email}. Check your inbox for the token.`
      });
      setHasTokenMode(true);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to send reset link. Please check the email address and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Reset Password with Token Handler
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter the reset token.' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      await resetParentPassword(resetToken, newPassword, confirmPassword);
      setStatusMessage({
        type: 'success',
        text: 'Password updated successfully! You can now log in.'
      });
      setTimeout(() => {
        setHasTokenMode(false);
        setActiveTab('password');
      }, 1500);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Password reset failed. The link or token may have expired.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otpCode.join('').length === 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-[28px] sm:rounded-[32px] max-w-[460px] w-full p-6 sm:p-7 shadow-2xl z-10 animate-scaleUp">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <img
            src={sssLogo2}
            alt="Samba CONNECT"
            className="h-8 sm:h-9 w-auto object-contain shrink-0 select-none"
          />

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200/90 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#112B84]  stroke-[2.2]" />
          </button>
        </div>

        {/* View 1: OTP Code View */}
        {activeTab === 'otp' ? (
          <div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('sms');
                setStatusMessage({ type: '', text: '' });
              }}
              className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-[#0B2A8A] hover:underline cursor-pointer mb-2.5"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Change number</span>
            </button>

            <h2 className="text-[26px] sm:text-[28px] font-extrabold text-[#0B2A8A] font-serif leading-tight tracking-tight">
              Enter your code
            </h2>
            <p className="text-slate-500 text-[13px] sm:text-[13.5px] mt-1 font-normal leading-snug">
              We sent a 6-digit code to {getMaskedPhone()}.
            </p>

            {/* Status Message */}
            {statusMessage.text && (
              <div
                className={`my-3 p-3 rounded-2xl text-[13px] font-semibold flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-[#EBF7FC] text-[#002B9A] border border-[#BAE6FD]'
                    : 'bg-[#FEECEC] text-[#B91C1C] border border-[#FCA5A5]'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#0DD180] shrink-0" />
                ) : (
                  <div className="w-4 h-4 bg-[#C53030] text-white rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">
                    !
                  </div>
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              {/* 6 Digit OTP Inputs */}
              <div className="flex justify-between gap-1.5 sm:gap-2 my-5">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`samba-otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-11 sm:w-12 h-13 sm:h-15 text-center text-[22px] sm:text-[24px] font-bold text-[#0B2A8A] rounded-[18px] border-2 border-slate-300 focus:border-[#0B2A8A] outline-none transition-all bg-white shadow-2xs"
                  />
                ))}
              </div>

              {/* Resend Countdown */}
              <div className="text-center text-[13px] text-slate-500 mb-5">
                <span>Didn't get it? </span>
                {resendCountdown > 0 ? (
                  <span className="font-bold text-[#0B2A8A]">
                    Resend in 0:{resendCountdown < 10 ? `0${resendCountdown}` : resendCountdown}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="font-bold text-[#0B2A8A] hover:underline cursor-pointer"
                  >
                    Resend code
                  </button>
                )}
              </div>

              {/* Verify and continue button */}
              <button
                type="submit"
                disabled={isLoading || !isOtpComplete}
                className={`w-full h-[48px] font-bold text-[15px] rounded-full flex items-center justify-center transition-all shadow-sm ${
                  isOtpComplete && !isLoading
                    ? 'bg-[#0B2A8A] hover:bg-[#081e66] text-white cursor-pointer active:scale-[0.99]'
                    : 'bg-[#B9C6E8] text-white cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  'Verify and continue'
                )}
              </button>

              {/* Use password link */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('password');
                  setStatusMessage({ type: '', text: '' });
                }}
                className="text-[13px] sm:text-[14px] font-bold text-[#0B2A8A] text-center hover:underline cursor-pointer block mx-auto mt-4"
              >
                Use my password instead
              </button>

              {/* Expiry note */}
              <p className="text-[12px] text-slate-400 text-center mt-3">
                The code expires in 10 minutes.
              </p>
            </form>
          </div>
        ) : activeTab === 'forgot' ? (
          /* View 2: Forgot Password */
          <div>
            <button
              type="button"
              onClick={() => handleTabChange('password')}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0B2A8A] hover:underline cursor-pointer mb-2.5"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to log in</span>
            </button>

            <h2 className="text-[24px] sm:text-[26px] font-extrabold text-[#0B2A8A] font-serif leading-tight">
              {hasTokenMode ? 'Set new password' : 'Reset your password'}
            </h2>
            <p className="text-slate-500 text-[13px] mt-1 mb-4 leading-snug">
              {hasTokenMode
                ? 'Enter your reset token and your new password below.'
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>

            {statusMessage.text && (
              <div
                className={`mb-4 p-3 rounded-2xl text-[13px] font-semibold flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-[#EBF7FC] text-[#002B9A] border border-[#BAE6FD]'
                    : 'bg-[#FEECEC] text-[#B91C1C] border border-[#FCA5A5]'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#0DD180] shrink-0" />
                ) : (
                  <div className="w-4 h-4 bg-[#C53030] text-white rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">
                    !
                  </div>
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {hasTokenMode ? (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-slate-600 mb-1">
                    Reset Token
                  </label>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Paste token from email"
                    className="w-full h-11 sm:h-12 px-4 rounded-2xl border border-slate-300 text-slate-800 text-[14px] sm:text-[15px] font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-slate-600 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showResetNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-2xl border border-slate-300 text-slate-800 text-[14px] sm:text-[15px] font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetNewPassword(!showResetNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showResetNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-slate-600 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showResetConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-2xl border border-slate-300 text-slate-800 text-[14px] sm:text-[15px] font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showResetConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[48px] mt-2 bg-[#0B2A8A] hover:bg-[#081e66] text-white font-bold text-[15px] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Updating password...</span>
                    </>
                  ) : (
                    'Reset password'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setHasTokenMode(false)}
                  className="text-[12px] sm:text-[13px] font-bold text-[#0B2A8A] text-center hover:underline cursor-pointer block mx-auto pt-2"
                >
                  Request a new reset link instead
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-slate-600 mb-1">
                    Account email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full h-11 sm:h-12 px-4 rounded-2xl border border-slate-300 text-slate-800 text-[14px] sm:text-[15px] font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[48px] bg-[#0B2A8A] hover:bg-[#081e66] text-white font-bold text-[15px] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Sending link...</span>
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setHasTokenMode(true)}
                  className="text-[12px] sm:text-[13px] font-bold text-[#0B2A8A] text-center hover:underline cursor-pointer block mx-auto pt-2"
                >
                  Already have a reset token? Enter it here
                </button>
              </form>
            )}
          </div>
        ) : (
          /* View 3: Main Modal (Password & SMS code tabs) */
          <div>
            <h2 className="text-[28px] sm:text-[30px] font-extrabold text-[#0B2A8A] font-serif leading-tight tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 text-[13px] sm:text-[13.5px] mt-1 font-normal leading-snug">
              Log in and we'll fill in your details and children for you.
            </p>

            {/* Segmented Pill Tabs */}
            <div className="bg-[#F1F5F9] p-1 rounded-full flex gap-1 mt-5 mb-4">
              <button
                type="button"
                onClick={() => handleTabChange('password')}
                className={`flex-1 py-2 rounded-full text-[13px] sm:text-[14px] transition-all cursor-pointer text-center ${
                  activeTab === 'password'
                    ? 'bg-white text-[#0B2A8A] font-bold shadow-xs'
                    : 'text-[#64748B] font-medium hover:text-[#0B2A8A]'
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('sms')}
                className={`flex-1 py-2 rounded-full text-[13px] sm:text-[14px] transition-all cursor-pointer text-center ${
                  activeTab === 'sms'
                    ? 'bg-white text-[#0B2A8A] font-bold shadow-xs'
                    : 'text-[#64748B] font-medium hover:text-[#0B2A8A]'
                }`}
              >
                SMS code
              </button>
            </div>

            {/* Error Banner (matching Screenshot 4) */}
            {statusMessage.type === 'error' && (
              <div className="mb-4 p-3 sm:p-3.5 rounded-2xl bg-[#FEECEC] border border-[#FCA5A5] flex items-center gap-2.5 text-[#B91C1C]">
                <div className="w-5 h-5 bg-[#C53030] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none">
                  !
                </div>
                <span className="text-[13px] font-bold leading-tight">
                  {statusMessage.text || "That email and password don't match. Try again."}
                </span>
              </div>
            )}

            {/* Success Banner */}
            {statusMessage.type === 'success' && (
              <div className="mb-4 p-3 sm:p-3.5 rounded-2xl bg-[#EBF7FC] border border-[#BAE6FD] flex items-center gap-2.5 text-[#002B9A]">
                <CheckCircle2 className="w-4 h-4 text-[#0DD180] shrink-0" />
                <span className="text-[13px] font-semibold leading-tight">
                  {statusMessage.text}
                </span>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordLogin}>
                <div className="mb-3.5">
                  <label className="block text-[12px] sm:text-[12.5px] font-medium text-slate-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (statusMessage.type) setStatusMessage({ type: '', text: '' });
                    }}
                    placeholder="nadiahusain2978@gmail.com"
                    className="w-full h-11 sm:h-12 px-4 rounded-2xl border border-slate-300 text-slate-800 text-[14px] sm:text-[15px] font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-[12px] sm:text-[12.5px] font-medium text-slate-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (statusMessage.type) setStatusMessage({ type: '', text: '' });
                      }}
                      placeholder="••••••••"
                      className={`w-full h-11 sm:h-12 pl-4 pr-11 rounded-2xl border ${
                        statusMessage.type === 'error'
                          ? 'border-[#E53E3E] ring-1 ring-[#E53E3E]'
                          : 'border-slate-300'
                      } text-slate-800 text-[14px] sm:text-[15px] font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => handleTabChange('forgot')}
                    className="text-[12px] sm:text-[13px] font-bold text-[#0B2A8A] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[48px] bg-[#0B2A8A] hover:bg-[#081e66] text-white font-bold text-[15px] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    'Log in'
                  )}
                </button>

                {/* <button
                  type="button"
                  onClick={() => handleTabChange('sms')}
                  className="text-[13px] sm:text-[14px] font-bold text-[#0B2A8A] hover:underline cursor-pointer block mx-auto mt-4"
                >
                  Or get a code by SMS instead
                </button> */}

                <div className="text-center text-[13px] text-slate-400 leading-snug mt-6">
                  <p>New to Samba? Close this and carry on.</p>
                  <p>We'll create your account as you book.</p>
                </div>
              </form>
            )}

            {/* SMS code Tab with Changeable Country Code */}
            {activeTab === 'sms' && (
              <form onSubmit={handleSendSmsCode}>
                <div className="mb-2">
                  <label className="block text-[12px] sm:text-[13px] font-medium text-slate-600 mb-1">
                    Mobile number
                  </label>
                  <div className="flex items-center h-11 sm:h-12 rounded-2xl border border-slate-300 px-3 focus-within:border-[#0B2A8A] focus-within:ring-1 focus-within:ring-[#0B2A8A] transition-all bg-white">
                    <div className="relative flex items-center shrink-0 w-fit">
                      <select
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        className="appearance-none bg-transparent pr-4 text-[13px] sm:text-[14px] font-bold text-[#677489] outline-none cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#0B2A8A] absolute right-0 pointer-events-none" />
                    </div>
                    <div className="w-[1px] h-5 bg-slate-200 mx-2.5 shrink-0" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (statusMessage.type) setStatusMessage({ type: '', text: '' });
                      }}
                      placeholder="7700 900482"
                      className="flex-1 text-[14px] sm:text-[15px] text-slate-800 font-medium outline-none bg-transparent placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <p className="text-[12px] sm:text-[13px] text-slate-500 mt-2 mb-6 leading-snug">
                  We'll text a 6-digit code to the mobile on your account.
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[48px] bg-[#0B2A8A] hover:bg-[#081e66] text-white font-bold text-[15px] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Sending code...</span>
                    </>
                  ) : (
                    'Text me a code'
                  )}
                </button>

                <div className="text-center text-[12px] text-slate-400 leading-snug mt-6">
                  <p>New to Samba? Close this and carry on.</p>
                  <p>We'll create your account as you book.</p>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SambaLoginModal;
