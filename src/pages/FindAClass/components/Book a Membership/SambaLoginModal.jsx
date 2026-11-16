import React, { useState } from 'react';
import { X, Lock, Phone, Mail, ArrowRight, CheckCircle2, RotateCcw, Loader2, KeyRound } from 'lucide-react';
import { loginParent } from '../../../../services/venueService';

const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Samba-Connect-logo.png';

export function SambaLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('password'); // 'password' | 'sms' | 'forgot' | 'reactivate'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  if (!isOpen) return null;

  const resetForm = () => {
    setStatusMessage({ type: '', text: '' });
    setOtpSent(false);
    setOtpCode(['', '', '', '', '', '']);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  // 1. Password Login Handler
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setStatusMessage({ type: 'error', text: 'Please enter both your email and password.' });
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
        text: err?.message || 'Login failed. Please check your credentials or try SMS login.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. SMS Code Request Handler
  const handleSendSmsCode = (e) => {
    e.preventDefault();
    if (!phone.trim() || phone.trim().length < 8) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid UK mobile number.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setStatusMessage({
        type: 'success',
        text: `6-digit login code sent via SMS to +44 ${phone.trim()}`
      });
    }, 600);
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

  // OTP Submit Handler
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otpCode.join('');
    if (code.length < 6) {
      setStatusMessage({ type: 'error', text: 'Please enter all 6 digits of the SMS code.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({ type: 'success', text: 'Verified successfully! Logging you in...' });
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            phone,
            firstName: 'Parent',
            email: 'parent@sambaconnect.com'
          });
        }
        onClose();
      }, 700);
    }, 600);
  };

  // 3. Forgot Password Handler
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: `Password reset link has been emailed to ${email}. Check your inbox.`
      });
    }, 700);
  };

  // 4. Reactivate Account Handler
  const handleReactivate = (e) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) {
      setStatusMessage({ type: 'error', text: 'Enter your previous account email or phone.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: 'Previous account found! Your children details have been restored.'
      });
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            email: email || 'returning.member@gmail.com',
            firstName: 'Sarah',
            lastName: 'Smith',
            phone: phone || '07700900123',
            children: [{ firstName: 'Leo', lastName: 'Smith', age: 5 }]
          });
        }
        onClose();
      }, 900);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-[28px] max-w-[480px] w-full p-6 sm:p-7 shadow-2xl z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={sssLogo2} alt="Samba Connect" className="h-8 w-auto object-contain shrink-0" />
            <div>
              <h3 className="text-[18px] sm:text-[20px] font-black text-[#042C89] leading-tight">
                Samba Connect
              </h3>
              <p className="text-[12px] text-[#64748B]">Sign in to skip form filling</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#042C89] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#F1F5F9] rounded-xl mb-4 text-[11px] sm:text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => handleTabChange('password')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'password'
                ? 'bg-white text-[#042C89] shadow-xs'
                : 'text-[#64748B] hover:text-[#042C89]'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('sms')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'sms'
                ? 'bg-white text-[#042C89] shadow-xs'
                : 'text-[#64748B] hover:text-[#042C89]'
            }`}
          >
            SMS Code
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('forgot')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'forgot'
                ? 'bg-white text-[#042C89] shadow-xs'
                : 'text-[#64748B] hover:text-[#042C89]'
            }`}
          >
            Forgot
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('reactivate')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'reactivate'
                ? 'bg-white text-[#042C89] shadow-xs'
                : 'text-[#64748B] hover:text-[#042C89]'
            }`}
          >
            Reactivate
          </button>
        </div>

        {/* Feedback message banner */}
        {statusMessage.text && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs font-semibold flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-[#EBF7FC] text-[#002B9A] border border-[#BAE6FD]'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#00D084]" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab 1: Email + Password Login */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#042C89] mb-1">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#042C89]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#042C89]">Password</label>
                <button
                  type="button"
                  onClick={() => handleTabChange('forgot')}
                  className="text-[11px] font-bold text-[#00A3E0] hover:underline cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#042C89]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] mt-2 bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in &amp; auto-fill</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: SMS Login Code */}
        {activeTab === 'sms' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendSmsCode} className="space-y-3.5">
                <p className="text-xs text-[#64748B]">
                  We will send a one-time 6-digit verification code to your mobile phone.
                </p>
                <div>
                  <label className="block text-xs font-bold text-[#042C89] mb-1">Mobile number</label>
                  <div className="flex items-center h-11 rounded-xl border border-[#CBD5E1] overflow-hidden focus-within:border-[#042C89]">
                    <span className="px-3 bg-slate-50 border-r border-[#CBD5E1] text-xs font-bold text-[#042C89]">
                      +44
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07700 900123"
                      className="flex-1 px-3 text-sm font-medium outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[46px] mt-2 bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending code...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      <span>Send login code</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                <p className="text-xs text-[#64748B]">
                  Enter the 6-digit code sent to your phone:
                </p>

                <div className="flex justify-between gap-2 my-3">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`samba-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-[#CBD5E1] outline-none focus:border-[#042C89] bg-white"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[46px] bg-[#00D084] hover:bg-[#00b875] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Sign in'}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs font-bold text-[#00A3E0] hover:underline pt-1 cursor-pointer"
                >
                  Change mobile number
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Forgot Password */}
        {activeTab === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-3.5">
            <p className="text-xs text-[#64748B]">
              Enter your email and we’ll send a link to securely reset your password.
            </p>
            <div>
              <label className="block text-xs font-bold text-[#042C89] mb-1">Account email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#042C89]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] mt-2 bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoading ? 'Sending link...' : 'Send reset link'}
            </button>
          </form>
        )}

        {/* Tab 4: Reactivate Account */}
        {activeTab === 'reactivate' && (
          <form onSubmit={handleReactivate} className="space-y-3.5">
            <p className="text-xs text-[#64748B]">
              Previously with Samba? Look up your previous membership record to restore your child’s details.
            </p>

            <div>
              <label className="block text-xs font-bold text-[#042C89] mb-1">Previous email or phone</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sarah@email.com or 07700..."
                className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#042C89]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] mt-2 bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching records...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Find &amp; Reactivate</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SambaLoginModal;
