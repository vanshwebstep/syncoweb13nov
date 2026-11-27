import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, Loader2, ArrowLeft, Lock } from 'lucide-react';
import { resetParentPassword } from '../../services/venueService';

const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Samba-Connect-logo.png';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlToken = searchParams.get('token') || '';
  const [token, setToken] = useState(urlToken);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token.trim()) {
      setErrorMessage('Reset token is required. Please check the link from your email.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.');
      return;
    }

    setIsLoading(true);
    try {
      await resetParentPassword(token, newPassword, confirmPassword);
      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(err?.message || 'Password reset failed. The link may have expired or is invalid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src={sssLogo2}
              alt="Samba CONNECT"
              className="h-10 w-auto object-contain select-none"
            />
          </Link>
        </div>

        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-[28px] border border-slate-100">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-[#EBF7FC] rounded-full flex items-center justify-center mx-auto text-[#002B9A]">
                <CheckCircle2 className="w-8 h-8 text-[#0DD180]" />
              </div>

              <h2 className="text-2xl font-extrabold text-[#0B2A8A] font-serif">
                Password updated!
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Your password has been reset successfully. You can now log in with your new password.
              </p>

              <div className="pt-2">
                <Link
                  to="/find-a-class"
                  className="w-full inline-flex justify-center items-center h-12 bg-[#0B2A8A] hover:bg-[#081e66] text-white font-bold text-sm rounded-full shadow-sm transition-all"
                >
                  Go to Find A Class &amp; Log In
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <Link
                  to="/find-a-class"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A8A] hover:underline mb-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Find A Class</span>
                </Link>

                <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0B2A8A] font-serif leading-tight">
                  Set new password
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug">
                  Choose a secure password with at least 6 characters.
                </p>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-2xl bg-[#FEECEC] border border-[#FCA5A5] flex items-start gap-2.5 text-[#B91C1C]">
                  <div className="w-5 h-5 bg-[#C53030] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 select-none">
                    !
                  </div>
                  <span className="text-xs sm:text-sm font-bold leading-tight">
                    {errorMessage}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Token field if not in URL */}
                {!urlToken && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Reset Token
                    </label>
                    <input
                      type="text"
                      required
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Paste your reset token from email"
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 text-slate-800 text-sm font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                    />
                  </div>
                )}

                {/* New Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-4 pr-11 rounded-xl border border-slate-300 text-slate-800 text-sm font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-4 pr-11 rounded-xl border border-slate-300 text-slate-800 text-sm font-medium outline-none focus:border-[#0B2A8A] focus:ring-1 focus:ring-[#0B2A8A] transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 mt-2 bg-[#0B2A8A] hover:bg-[#081e66] text-white font-bold text-sm rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60"
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
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
