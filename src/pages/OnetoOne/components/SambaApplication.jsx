import React, { useState, useEffect } from 'react';
import { Container } from '../../../components/common/Container';
import { useToast } from '../../../components/common/Toaster';

// Background & Splatter
const momentBanner = 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';
const greenSplatter = 'https://webstepdev.com/demo/syncoWebsiteImages/Frame.png';
const greenSplatter2 = 'https://webstepdev.com/demo/syncoWebsiteImages/Frame_2.png';

const DEFAULT_PACKAGES = [
  { id: 2, packageName: 'Gold' },
  { id: 1, packageName: 'Silver' },
];
const DAYS = ['Sat', 'Sun', 'Mon-Fri'];

const PACKAGES_ENDPOINT = '/api/open/one-to-one/packages';
const INQUIRY_ENDPOINT = '/api/open/one-to-one/inqury-create';

const inputClass =
  'w-full px-3 py-2 sm:px-3.5 sm:py-2.5 sm:rounded-[5px] bg-[#F6F6F7] border border-transparent focus:border-[#0DD180] focus:bg-white text-[14px] sm:text-[16px] text-slate-800 placeholder:text-[#9E9FAA] mb-1 outline-none transition-all poppins';

const labelClass =
  'block text-[13px] sm:text-[16px] font-normal text-[#101014] mb-1 poppins text-left';

export function SambaApplication() {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    postcode: '',
    childName: '',
    childAge: '',
    package: '',
    day: 'Sat',
    notes: '',
  });

  // Fetch dynamic packages from API
  useEffect(() => {
    let isMounted = true;
    const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://api.grabbite.com';
    const baseUrl = rawBase.replace(/\/+$/, '');
    const apiUrl = `${baseUrl}${PACKAGES_ENDPOINT}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result?.status && Array.isArray(result?.data) && result.data.length > 0) {
          setPackages(result.data);
        }
      })
      .catch((err) => {
        console.warn('Could not load dynamic packages, using defaults:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const update = (key) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.parentName?.trim()) {
      errs.parentName = 'Parent full name is required';
    }

    const emailTrimmed = formData.email?.trim() || '';
    if (!emailTrimmed) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errs.email = 'Enter a valid email address';
    }

    const phoneTrimmed = formData.phone?.trim() || '';
    if (!phoneTrimmed) {
      errs.phone = 'Telephone number is required';
    } else {
      const digits = phoneTrimmed.replace(/\D/g, '');
      const hasAllowedChars = /^[0-9+\s-]+$/.test(phoneTrimmed);
      if (!hasAllowedChars || digits.length < 10 || digits.length > 15) {
        errs.phone = 'Enter a valid telephone number (10-15 digits)';
      }
    }

    const postcodeTrimmed = formData.postcode?.trim() || '';
    if (!postcodeTrimmed) {
      errs.postcode = 'London Postcode is required';
    } else {
      const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
      if (!ukPostcodeRegex.test(postcodeTrimmed)) {
        errs.postcode = 'Enter a valid UK postcode (e.g. SW1A 1AA)';
      }
    }

    if (!formData.childName?.trim()) {
      errs.childName = 'Child full name is required';
    }

    const ageTrimmed = String(formData.childAge || '').trim();
    if (!ageTrimmed) {
      errs.childAge = 'Age of child is required';
    } else if (isNaN(Number(ageTrimmed)) || Number(ageTrimmed) <= 0) {
      errs.childAge = 'Enter a valid age';
    }

    if (!formData.package) {
      errs.package = 'Please choose a package';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    try {
      const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://api.grabbite.com';
      const baseUrl = rawBase.replace(/\/+$/, '');
      const apiUrl = `${baseUrl}${INQUIRY_ENDPOINT}`;

      // Resolve package ID
      const matchedPkg = packages.find(
        (p) => (typeof p === 'object' ? p.packageName : p) === formData.package
      );
      const packageId =
        matchedPkg?.id || (formData.package.toLowerCase() === 'gold' ? 2 : 1);

      const payload = {
        parentName: formData.parentName.trim(),
        childName: formData.childName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.childAge) || formData.childAge,
        postcode: formData.postcode.trim(),
        packageInterest: formData.package,
        packageId: packageId,
        availability: formData.day,
        notes: formData.notes.trim(),
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response
      }

      if (response.ok && data?.status !== false) {
        toast.success(data?.message || 'One-to-One inquiry submitted successfully!');
        setSubmitted(true);
        setFormData({
          parentName: '',
          email: '',
          phone: '',
          postcode: '',
          childName: '',
          childAge: '',
          package: '',
          day: 'Sat',
          notes: '',
        });
        setErrors({});
      } else {
        const errorMsg = data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('One-to-One inquiry error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="samba-application"
      className="relative w-full md:px-0 px-3 overflow-hidden py-10 xs:py-12 md:py-16 lg:py-[120px]"
      style={{
        backgroundImage: `url(${momentBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="relative z-10">
        <div className="lg:grid grid-cols-1 md:flex lg:grid-cols-12 gap-6 lg:gap-12 items-start max-w-[1200px] m-auto">
          {/* Left Column: Heading & Intro Copy */}
          <div className="lg:col-span-5 text-center md:text-left md:max-w-[688px] md:mx-auto lg:mx-0 lg:max-w-none md:mt-0 lg:mt-[40px] md:mb-6 lg:mb-0 mb-10">
            <h2 className="leading-[1]">
              <span className="recline text-white text-[46px] sm:text-[54px] md:text-[52px] lg:text-[64px] font-bold block">
                Tell us about
              </span>
              <span className="gasoek text-[#0DD180] text-[46px] xs:text-[38px] sm:text-[58px] md:text-[52px] lg:text-[64px] block mt-0.5">
                your child
              </span>
            </h2>

            <p className="poppins text-white text-[18px] md:text-[19px] lg:text-[22px] md:leading-[32px] lg:leading-[36px] font-normal mt-4 md:mt-5 lg:mt-8 mx-auto md:mx-0">
              Fill in a few details and we'll <br className="md:hidden block" /> help <br className="hidden md:block" /> arrange their first session.
            </p>
          </div>

          {/* Right Column: White Form Card with Green Splatter */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            <img
              src={greenSplatter2}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-[50px] xs:-bottom-[70px] sm:-bottom-[5%] left-1/2 -translate-x-1/2 sm:left-[-45%] md:left-[-20%] lg:left-[-15%] xl:left-[-45%] sm:translate-x-0 w-[220px] xs:w-[260px] sm:w-[63%] md:w-[45%] lg:w-[48%] xl:w-[63%] sm:-rotate-[20deg] object-contain pointer-events-none select-none z-0"
            />
            <img
              src={greenSplatter}
              alt=""
              aria-hidden="true"
              className="absolute top-[28%] sm:-top-[38px] -right-[20px] sm:right-[-26%] md:right-[-6%] lg:right-[-2%] xl:right-[-26%] w-[100px] sm:w-[66%] md:w-[40%] lg:w-[42%] xl:w-[66%] object-contain pointer-events-none select-none z-0 opacity-80 sm:opacity-100"
            />

            {/* White Form Card */}
            <div className="relative z-10 bg-white w-full max-w-[688px] rounded-[20px] p-6 xs:p-5 sm:p-10 md:p-8 lg:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#0DD180]/15 text-[#0DD180] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="recline text-2xl sm:text-3xl text-[#042C89] font-bold mb-2">
                    Enquiry Received!
                  </h3>
                  <p className="poppins text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
                    Thank you! A member of the Samba Soccer Schools team will be
                    in touch shortly to help arrange your child's first session.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#0DD180] hover:bg-[#00c853] text-white font-bold rounded-full text-[15px] poppins transition-all cursor-pointer shadow-sm"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-2.5 xs:space-y-3 sm:space-y-4">
                  {/* Parent Full Name */}
                  <div>
                    <label className={labelClass}>Parent Full Name</label>
                    <input
                      type="text"
                      placeholder="Parent Full Name"
                      value={formData.parentName}
                      onChange={update('parentName')}
                      className={`${inputClass} ${
                        errors.parentName ? 'border-red-500 ring-1 ring-red-500/20' : ''
                      }`}
                    />
                    {errors.parentName && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.parentName}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={update('email')}
                      className={`${inputClass} ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500/20' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Telephone Number */}
                  <div>
                    <label className={labelClass}>Telephone Number</label>
                    <input
                      type="tel"
                      placeholder="Telephone Number"
                      value={formData.phone}
                      onChange={update('phone')}
                      className={`${inputClass} ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500/20' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* London Postcode */}
                  <div>
                    <label className={labelClass}>London Postcode</label>
                    <input
                      type="text"
                      placeholder="London Postcode"
                      value={formData.postcode}
                      onChange={update('postcode')}
                      className={`${inputClass} ${
                        errors.postcode ? 'border-red-500 ring-1 ring-red-500/20' : ''
                      }`}
                    />
                    {errors.postcode && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.postcode}</p>
                    )}
                  </div>

                  {/* Child Full Name */}
                  <div>
                    <label className={labelClass}>Child Full Name</label>
                    <input
                      type="text"
                      placeholder="Child Full Name"
                      value={formData.childName}
                      onChange={update('childName')}
                      className={`${inputClass} ${
                        errors.childName ? 'border-red-500 ring-1 ring-red-500/20' : ''
                      }`}
                    />
                    {errors.childName && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.childName}</p>
                    )}
                  </div>

                  {/* Age of child */}
                  <div>
                    <label className={labelClass}>Age of child</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Age of child"
                      value={formData.childAge}
                      onChange={update('childAge')}
                      className={`${inputClass} ${
                        errors.childAge ? 'border-red-500 ring-1 ring-red-500/20' : ''
                      }`}
                    />
                    {errors.childAge && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.childAge}</p>
                    )}
                  </div>

                  {/* Package dropdown */}
                  <div>
                    <label className={labelClass}>
                      Which package are you interested in?
                    </label>
                    <div className="relative">
                      <select
                        value={formData.package}
                        onChange={update('package')}
                        className={`${inputClass} appearance-none pr-8 cursor-pointer ${
                          formData.package === '' ? 'text-slate-400/80' : 'text-slate-800'
                        } ${errors.package ? 'border-red-500 ring-1 ring-red-500/20' : ''}`}
                      >
                        <option value="" disabled>
                          Choose package
                        </option>
                        {packages.map((p) => {
                          const val = typeof p === 'string' ? p : p.packageName;
                          const key = typeof p === 'string' ? p : p.id;
                          return (
                            <option key={key} value={val} className="text-[#5F5F6D]">
                              {val}
                            </option>
                          );
                        })}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    {errors.package && (
                      <p className="text-[12px] text-red-500 poppins pb-1">{errors.package}</p>
                    )}
                  </div>

                  {/* Days available */}
                  <div className="text-left">
                    <label className={`${labelClass} mb-1.5`}>
                      Select which day(s) you are available for lessons
                    </label>
                    <div className="flex items-center gap-4 xs:gap-5 mt-0.5">
                      {DAYS.map((d) => {
                        const active = formData.day === d;
                        return (
                          <label
                            key={d}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <span
                              className={`relative w-3.5 h-3.5 flex items-center justify-center rounded-full border shrink-0 ${
                                active ? 'border-[#0DD180]' : 'border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="day"
                                value={d}
                                checked={active}
                                onChange={() => setFormData({ ...formData, day: d })}
                                className="absolute inset-0 opacity-0 cursor-pointer peer"
                              />
                              <span
                                className={`w-1.5 h-1.5 rounded-full bg-[#0DD180] ${
                                  active ? 'scale-100' : 'scale-0'
                                } transition-transform`}
                              />
                            </span>
                            <span className="text-[13px] md:text-[16px] text-[#5F5F6D] poppins">
                              {d}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description / Notes */}
                  <div className="pt-3">
                    <label className={labelClass}>Notes</label>
                    <textarea
                      placeholder="Any areas you would like your child to improve on?"
                      rows={4}
                      value={formData.notes}
                      onChange={update('notes')}
                      className="w-full px-3 py-2 sm:px-3.5 shadow sm:py-2.5 rounded-[6px] xs:rounded-[8px] sm:rounded-[8px] bg-white border border-slate-200 focus:border-[#0DD180] focus:ring-1 focus:ring-[#0DD180] text-[11px] xs:text-[12px] sm:text-[16px] text-slate-800 placeholder:text-[#5F5F6D] outline-none resize-none transition-all poppins"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-0.5 sm:pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 bg-[#0DD180] hover:bg-[#00c853] text-white font-bold rounded-full text-[18px] poppins transition-all cursor-pointer shadow-sm ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SambaApplication;