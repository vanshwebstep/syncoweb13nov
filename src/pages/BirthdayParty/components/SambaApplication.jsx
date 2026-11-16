import React, { useState, useEffect } from 'react';
import { Container } from '../../../components/common/Container';
import { useToast } from '../../../components/common/Toaster';

// Background & Splatter
const momentBanner = 'https://webstepdev.com/demo/syncoWebsiteImages/momentBanner.png';
const greenSplatter = 'https://webstepdev.com/demo/syncoWebsiteImages/Frame.png';
const greenSplatter2 = 'https://webstepdev.com/demo/syncoWebsiteImages/Frame_2.png';

const DEFAULT_PACKAGES = [
  { id: 2, packageName: 'Gold' },
  { id: 1, packageName: 'Silver' },
];

const PACKAGES_ENDPOINT = '/api/open/birthday-party/packages';
const INQUIRY_ENDPOINT = '/api/open/birthday-party/inqury-create';

export function SambaApplication() {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    postcode: '',
    childName: '',
    childAge: '',
    partyDate: '',
    package: 'Gold',
    message: '',
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
        console.warn('Could not load birthday packages, using defaults:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.firstName?.trim()) {
      errs.firstName = 'First name is required';
    }

    if (!formData.surname?.trim()) {
      errs.surname = 'Surname is required';
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
      errs.postcode = 'Postcode is required';
    } else {
      const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
      if (!ukPostcodeRegex.test(postcodeTrimmed)) {
        errs.postcode = 'Enter a valid UK postcode (e.g. SW1A 1AA)';
      }
    }

    if (!formData.childName?.trim()) {
      errs.childName = 'Child name is required';
    }

    const ageTrimmed = String(formData.childAge || '').trim();
    if (!ageTrimmed) {
      errs.childAge = 'Age of child is required';
    } else if (isNaN(Number(ageTrimmed)) || Number(ageTrimmed) <= 0) {
      errs.childAge = 'Enter a valid age';
    }

    if (!formData.partyDate) {
      errs.partyDate = 'Date of party is required';
    }

    if (!formData.package) {
      errs.package = 'Please select a package';
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

      // Compute available days from partyDate if available
      let dayStr = 'sat';
      if (formData.partyDate) {
        const d = new Date(formData.partyDate);
        if (!isNaN(d.getTime())) {
          const daysArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
          dayStr = daysArr[d.getDay()];
        }
      }

      const parentFullName = `${formData.firstName.trim()} ${formData.surname.trim()}`.trim();

      const payload = {
        parentName: parentFullName,
        childName: formData.childName.trim(),
        age: Number(formData.childAge) || formData.childAge,
        partyDate: formData.partyDate,
        packageInterest: formData.package,
        packageId: packageId,
        phoneNumber: formData.phone.trim(),
        email: formData.email.trim(),
        postCode: formData.postcode.trim(),
        availableDays: dayStr,
        notes: formData.message.trim(),
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
        toast.success(data?.message || 'Birthday Party inquiry submitted successfully!');
        setSubmitted(true);
        setFormData({
          firstName: '',
          surname: '',
          email: '',
          phone: '',
          postcode: '',
          childName: '',
          childAge: '',
          partyDate: '',
          package: 'Gold',
          message: '',
        });
        setErrors({});
      } else {
        const errorMsg = data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Birthday party inquiry error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="samba-application"
      className="relative w-full overflow-hidden md:py-14 py-20"
      style={{
        backgroundImage: `url(${momentBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="relative z-10">
        <div className="lg:grid grid-cols-1 grid md:flex lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-[1200px] m-auto">
          
          {/* Left Column: Heading & Intro Copy */}
          <div className="lg:col-span-5 text-center md:text-left lg:mt-[120px] max-w-[650px] md:max-w-[40%] lg:max-w-none mx-auto lg:mx-0">
            <h2 className="leading-[1]">
              <span className="recline text-white text-[38px] xs:text-[44px] sm:text-[54px] md:text-[48px] lg:text-[64px] font-bold block">
                Let's plan their
              </span>
              <span className="gasoek text-[#0DD180] text-[42px] xs:text-[48px] sm:text-[58px] md:text-[50px] lg:text-[64px] block mt-1">
                Samba Party
              </span>
            </h2>

            <p className="poppins text-white text-[18px] lg:text-[20px] md:leading-[30px] lg:leading-[34px] font-normal mt-4 lg:mt-6">
              Tell us a few details about the <br className="block md:hidden" /> big day and we'll be in touch to help get everything organised.
            </p>
          </div>

          {/* Right Column: White Form Card with Green Splatter */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            <img
              src={greenSplatter2}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-[5%] -rotate-[20deg] left-[-14%] md:left-[-8%] lg:left-[-14%] w-[40%] md:w-[32%] lg:w-[40%] object-contain pointer-events-none select-none hidden sm:block"
            />
            <img
              src={greenSplatter}
              alt=""
              aria-hidden="true"
              className="absolute -top-[38px] right-[-18%] md:right-[-8%] lg:right-[-18%] w-[66%] md:w-[48%] lg:w-[66%] object-contain pointer-events-none select-none hidden sm:block"
            />

            {/* White Form Card */}
            <div className="relative z-10 bg-white rounded-[20px] p-6 sm:p-8 lg:p-10 shadow-2xl w-full max-w-[650px]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#0DD180]/15 text-[#0DD180] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="recline text-2xl sm:text-3xl text-[#042C89] font-bold mb-2">
                    Enquiry Received!
                  </h3>
                  <p className="poppins text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
                    Thank you! A member of the Samba Soccer Schools team will be in touch shortly to help organise your child's party.
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
                <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.firstName
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Surname */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Surname
                    </label>
                    <input
                      type="text"
                      placeholder="Surname"
                      value={formData.surname}
                      onChange={(e) => handleChange('surname', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.surname
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.surname && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.surname}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.email
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.email}</p>
                    )}
                  </div>

                  {/* Telephone Number */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Telephone Number"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.phone
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.phone}</p>
                    )}
                  </div>

                  {/* Postcode */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={(e) => handleChange('postcode', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.postcode
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.postcode}</p>
                    )}
                  </div>

                  {/* Name of child */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Name of child
                    </label>
                    <input
                      type="text"
                      placeholder="Name of child"
                      value={formData.childName}
                      onChange={(e) => handleChange('childName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.childName
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.childName && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.childName}</p>
                    )}
                  </div>

                  {/* Age of child */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Age of child
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Age of child"
                      value={formData.childAge}
                      onChange={(e) => handleChange('childAge', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.childAge
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.childAge && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.childAge}</p>
                    )}
                  </div>

                  {/* Date of party */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Date of party
                    </label>
                    <input
                      type="date"
                      value={formData.partyDate}
                      onChange={(e) => handleChange('partyDate', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[5px] bg-[#F6F6F7] border focus:bg-white text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                        errors.partyDate
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#0DD180]'
                      }`}
                    />
                    {errors.partyDate && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.partyDate}</p>
                    )}
                  </div>

                  {/* Which package are you interested in? */}
                  <div className="text-left pt-1">
                    <label className="block text-[16px] font-normal text-[#101014] mb-2.5 poppins">
                      Which package are you interested in?
                    </label>
                    <div className="flex items-center gap-8 flex-wrap">
                      {packages.map((pkg) => {
                        const name = typeof pkg === 'object' ? pkg.packageName : pkg;
                        const active = formData.package === name;
                        return (
                          <label key={name} className="flex items-center gap-2.5 cursor-pointer">
                            <span
                              className={`relative w-5 h-5 flex items-center justify-center rounded-full border-2 shrink-0 ${
                                active ? 'border-[#0DD180]' : 'border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="package"
                                value={name}
                                checked={active}
                                onChange={() => handleChange('package', name)}
                                className="absolute inset-0 opacity-0 cursor-pointer peer"
                              />
                              <span
                                className={`w-2.5 h-2.5 rounded-full bg-[#0DD180] transition-transform ${
                                  active ? 'scale-100' : 'scale-0'
                                }`}
                              />
                            </span>
                            <span className="text-[16px] text-slate-700 poppins">{name}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.package && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.package}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[16px] font-normal text-[#101014] mb-1 poppins text-left">
                      Message
                    </label>
                    <textarea
                      placeholder="Message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0DD180] focus:ring-1 focus:ring-[#0DD180] text-sm text-slate-800 placeholder-slate-400 outline-none resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 bg-[#0DD180] hover:bg-[#00c853] text-white font-bold rounded-full text-base poppins transition-all cursor-pointer ${
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
