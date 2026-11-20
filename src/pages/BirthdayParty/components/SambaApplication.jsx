import React, { useState, useEffect } from 'react';
import { Phone, Mail, Send, Calendar, MapPin } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useToast } from '../../../components/common/Toaster';

const momentBanner = 'https://webstepdev.com/demo/syncoWebsiteImages/momentBanner.png';
const swoosh = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

const DEFAULT_PACKAGES = [
  { id: 1, packageName: 'Silver' },
  { id: 2, packageName: 'Gold' },
];

// API se sirf packageName aata hai, price/info yahan se
const PACKAGE_INFO = {
  silver: { price: '£175', meta: 'Up to 12 · 75 min' },
  gold: { price: '£310', meta: 'Up to 20 · 90 min' },
};

const STEPS = [
  { n: 1, title: 'Send your enquiry', sub: 'Takes about 2 minutes.', circle: 'bg-[#0DD180] text-white', titleColor: 'text-[#0DD180]' },
  { n: 2, title: 'We call or email you', sub: 'Within two working days.', circle: 'bg-[#00A6E3] text-white', titleColor: 'text-[#00A6E3]' },
  { n: 3, title: 'Confirm and pay to secure the booking', sub: 'We send the invitations.', circle: 'bg-[#FFDE14] text-[#042C89]', titleColor: 'text-[#FFDE14]' },
];

const PACKAGES_ENDPOINT = '/api/open/birthday-party/packages';
const INQUIRY_ENDPOINT = '/api/open/birthday-party/inqury-create';
const VENUE_OPTIONS = [
  { label: 'Yes, we’ve booked one', value: true },
  { label: 'Not yet, help me find one', value: false },
];
const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  childName: '',
  childAge: '',
  partyDate: '',
  postcode: '',
  package: 'Gold',
  venue: true,
  message: '',
};

const labelCls = "block font-['Poppins',sans-serif] font-bold text-[#042C89] text-[13px] md:text-[12.5px] lg:text-[13.5px] mb-1.5";
const inputCls = (err) =>
  `w-full px-3.5 py-2.5 md:py-3 rounded-[10px] bg-[#F4F6FB] border text-[14px] md:text-[13.5px] lg:text-[14.5px] font-['Poppins',sans-serif] text-[#042C89] placeholder-[#9AA3B5] outline-none transition-all ${
    err ? 'border-red-500' : 'border-[#E8ECF5] focus:border-[#0DD180] focus:bg-white'
  }`;

export function SambaApplication() {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    let isMounted = true;
    const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://api.grabbite.com';
    const apiUrl = `${rawBase.replace(/\/+$/, '')}${PACKAGES_ENDPOINT}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result?.status && Array.isArray(result?.data) && result.data.length > 0) {
          // Silver pehle, Gold baad me
          const sorted = [...result.data].sort((a, b) => (a.id || 0) - (b.id || 0));
          setPackages(sorted);
        }
      })
      .catch((err) => console.warn('Could not load birthday packages, using defaults:', err));

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
    if (!formData.name?.trim()) errs.name = 'Name is required';

    const phoneTrimmed = formData.phone?.trim() || '';
    if (!phoneTrimmed) {
      errs.phone = 'Phone is required';
    } else {
      const digits = phoneTrimmed.replace(/\D/g, '');
      if (!/^[0-9+\s-]+$/.test(phoneTrimmed) || digits.length < 10 || digits.length > 15) {
        errs.phone = 'Enter a valid number (10-15 digits)';
      }
    }

    const emailTrimmed = formData.email?.trim() || '';
    if (!emailTrimmed) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) errs.email = 'Enter a valid email address';

    if (!formData.childName?.trim()) errs.childName = 'Child name is required';

    const ageTrimmed = String(formData.childAge || '').trim();
    if (!ageTrimmed) errs.childAge = 'Age is required';
    else if (isNaN(Number(ageTrimmed)) || Number(ageTrimmed) <= 0) errs.childAge = 'Enter a valid age';

    if (!formData.partyDate) errs.partyDate = 'Date is required';

    const postcodeTrimmed = formData.postcode?.trim() || '';
    if (!postcodeTrimmed) errs.postcode = 'Postcode is required';
    else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(postcodeTrimmed)) errs.postcode = 'Enter a valid UK postcode';

    if (!formData.package) errs.package = 'Please select a package';
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
      const apiUrl = `${rawBase.replace(/\/+$/, '')}${INQUIRY_ENDPOINT}`;

      const matchedPkg = packages.find((p) => (typeof p === 'object' ? p.packageName : p) === formData.package);
      const packageId = matchedPkg?.id || (formData.package.toLowerCase() === 'gold' ? 2 : 1);

      let dayStr = 'sat';
      
    

 let availableDays = ['Saturday'];
      const d = new Date(formData.partyDate);
      if (!isNaN(d.getTime())) {
        availableDays = [
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()],
        ];
      }

       const payload = {
        parentName: formData.name.trim(),
        childName: formData.childName.trim(),
        age: Number(formData.childAge) || formData.childAge,
        partyDate: formData.partyDate,
        phoneNumber: formData.phone.trim(),
        email: formData.email.trim(),
        postCode: formData.postcode.trim(),
        packageId,
        doYouHaveVenue: formData.venue,
        availableDays,
        notes: formData.message.trim(),
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setFormData(EMPTY_FORM);
        setErrors({});
      } else {
        toast.error(data?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Birthday party inquiry error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Err = ({ field }) =>
    errors[field] ? <p className="mt-1 text-[12px] text-red-500 font-['Poppins',sans-serif]">{errors[field]}</p> : null;

  const ContactCard = ({ className = '' }) => (
    <div className={`bg-white rounded-[16px] px-5 md:px-6 py-4 text-left space-y-2.5 ${className}`}>
      <a href="tel:02072052723" className="flex items-center gap-3 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[15px] md:text-[14px] lg:text-[16px]">
        <Phone className="w-4 h-4 text-[#042C89] shrink-0" />
        020 7205 2723
      </a>
      <a href="mailto:admin@sambasoccerschools.com" className="flex items-center gap-3 font-['Poppins',sans-serif] font-bold text-[#34353B] text-[13px] md:text-[12.5px] lg:text-[14px]">
        <Mail className="w-4 h-4 text-[#00A6E3] shrink-0" />
        admin@sambasoccerschools.com
      </a>
    </div>
  );

  return (
    <section
      id="samba-application"
      className="relative w-full overflow-hidden pt-8 pb-10 md:py-16 lg:py-20"
      style={{
        backgroundImage: `url(${momentBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#042C89',
      }}
    >
      {/* Mobile green curve (bottom) */}
      <div className="md:hidden absolute -bottom-28 -right-24 w-[460px] h-[300px] rounded-full bg-[#0DD180] pointer-events-none z-0" />

      <Container className="relative z-10 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center lg:items-start justify-between max-w-[1200px] mx-auto">
          {/* ===== Left ===== */}
          <div className="w-full lg:max-w-[460px] text-left md:text-center lg:text-left lg:mt-[100px]">
            {/* Mobile eyebrow */}
            <p className="md:hidden font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[11px] tracking-[0.06em] uppercase mb-1">
              Enquire
            </p>

            <h2 className="leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-white text-[28px] md:text-[38px] lg:text-[44px]">
                Let’s plan their
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] md:text-[46px] lg:text-[54px] mt-1">
                Samba party.
                <img src={swoosh} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>

            <p className="mt-4 md:mt-6 font-['Poppins',sans-serif] text-white text-[14.5px] md:text-[14px] lg:text-[17px] leading-[1.5] md:leading-relaxed">
              Tell us a few details. We’ll reply within one working day with dates and a quote.
            </p>

            {/* Steps (desktop only) */}
            <ul className="hidden md:block relative mt-8 space-y-6 text-left before:content-[''] before:absolute before:left-[16px] before:top-[16px] before:bottom-[16px] before:w-px before:bg-white/70">
              {STEPS.map((s) => (
                <li key={s.n} className="relative z-10 flex items-center gap-4">
                  <span className={`${s.circle} w-8 h-8 rounded-full flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[12px] shrink-0`}>
                    {s.n}
                  </span>
                  <div>
                    <p className={`${s.titleColor} font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[17px] leading-tight`}>{s.title}</p>
                    <p className="text-white font-['Poppins',sans-serif] text-[12px] lg:text-[14px] mt-0.5">{s.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Contact card (desktop) */}
            <ContactCard className="mt-8 hidden md:inline-block" />
          </div>

          {/* ===== Right: Form card ===== */}
          <div className="w-full max-w-[620px] bg-white rounded-[20px] md:rounded-[28px] p-4 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#0DD180]/15 text-[#0DD180] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
                <h3 className="font-['Recline',sans-serif] text-2xl sm:text-3xl text-[#042C89] font-bold mb-2">Enquiry Received!</h3>
                <p className="font-['Poppins',sans-serif] text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
                  Thank you! A member of the Samba Soccer Schools team will be in touch shortly to help organise your child's party.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0DD180] hover:bg-[#0bb86f] text-white font-bold rounded-full text-[15px] font-['Poppins',sans-serif] transition-all cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="hidden md:block font-['Poppins',sans-serif] font-bold text-[#042C89] text-[18px] lg:text-[22px] leading-tight">Party enquiry</h3>
                <p className="hidden md:block mt-1 font-['Poppins',sans-serif] text-[#797A88] text-[12px] lg:text-[13px]">
                  All fields are required unless marked optional.
                </p>

                {/* Package */}
                <p className="md:mt-5 mb-2 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[13.5px] md:text-[13px] lg:text-[14px]">Which package?</p>
                <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                  {packages.map((pkg) => {
                    const name = typeof pkg === 'object' ? pkg.packageName : pkg;
                    const info = PACKAGE_INFO[name.toLowerCase()] || {};
                    const active = formData.package === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleChange('package', name)}
                        className={`flex items-center gap-2 md:gap-3 text-left rounded-[12px] md:rounded-[14px] border-[1.5px] md:border-2 px-3 md:px-3.5 py-3.5 md:py-3 transition-all cursor-pointer ${
                          active ? 'border-[#FFDE14] bg-[#FFF8D1]' : 'border-[#E8ECF5] bg-white hover:border-[#C9D3F0]'
                        }`}
                      >
                        <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-[#042C89]' : 'border-[#C9D3F0]'}`}>
                          {active && <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#042C89]" />}
                        </span>
                        <span>
                          <span className="block font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14.5px] md:text-[13px] lg:text-[15.5px] leading-tight whitespace-nowrap">
                            {name}{info.price ? ` · ${info.price}` : ''}
                          </span>
                          {info.meta && (
                            <span className="hidden md:block font-['Poppins',sans-serif] text-[#797A88] text-[11px] lg:text-[12.5px] mt-0.5">{info.meta}</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <Err field="package" />

                <div className="mt-4 space-y-3.5 md:space-y-4">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                    <div>
                      <label className={labelCls}>Your name</label>
                      <input type="text" placeholder="First and last name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={inputCls(errors.name)} />
                      <Err field="name" />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input type="tel" placeholder="07…" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className={inputCls(errors.phone)} />
                      <Err field="phone" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelCls}>Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-[#797A88] pointer-events-none" />
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`${inputCls(errors.email)} pl-10`}
                      />
                    </div>
                    <Err field="email" />
                  </div>

                  {/* Child name + age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                    <div>
                      <label className={labelCls}>Birthday child’s name</label>
                      <input type="text" placeholder="First name" value={formData.childName} onChange={(e) => handleChange('childName', e.target.value)} className={inputCls(errors.childName)} />
                      <Err field="childName" />
                    </div>
                    <div>
                      <label className={labelCls}>Age they’re turning</label>
                      <input type="number" min="1" placeholder="e.g. 7" value={formData.childAge} onChange={(e) => handleChange('childAge', e.target.value)} className={inputCls(errors.childAge)} />
                      <Err field="childAge" />
                    </div>
                  </div>

                  {/* Date + postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                    <div>
                      <label className={labelCls}>Party date</label>
                      <div className="relative">
                        <Calendar className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#797A88] pointer-events-none" />
                        <input
                          type="date"
                          value={formData.partyDate}
                          onChange={(e) => handleChange('partyDate', e.target.value)}
                          className={`${inputCls(errors.partyDate)} pl-10 md:pl-3.5 max-md:[&::-webkit-calendar-picker-indicator]:opacity-0 max-md:[&::-webkit-calendar-picker-indicator]:absolute max-md:[&::-webkit-calendar-picker-indicator]:inset-0 max-md:[&::-webkit-calendar-picker-indicator]:w-full`}
                        />
                      </div>
                      <Err field="partyDate" />
                    </div>
                    <div>
                      <label className={labelCls}>Party postcode</label>
                      <div className="relative">
                        <MapPin className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#797A88] pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. SW10 0AB"
                          value={formData.postcode}
                          onChange={(e) => handleChange('postcode', e.target.value)}
                          className={`${inputCls(errors.postcode)} pl-10 md:pl-3.5`}
                        />
                      </div>
                      <Err field="postcode" />
                    </div>
                  </div>

                  {/* Venue */}
                  <div>
                    <label className={labelCls}>Do you have a venue?</label>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-2.5">
                     {VENUE_OPTIONS.map((opt) => {
  const active = formData.venue === opt.value;
  return (
    <button
      key={opt.label}
      type="button"
      onClick={() => handleChange('venue', opt.value)}
      className={`w-full md:w-auto inline-flex items-center gap-2.5 rounded-full border px-4 py-3 md:py-2 font-['Poppins',sans-serif] font-semibold text-[13px] md:text-[12px] lg:text-[12.5px] cursor-pointer transition-all ${
        active ? 'bg-[#E6F4FB] border-[#00A6E3] text-[#042C89]' : 'bg-white border-[#E8ECF5] text-[#042C89]'
      }`}
    >
      <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-[#00A6E3]' : 'border-[#C9D3F0]'}`}>
        {active && <span className="w-1.5 h-1.5 rounded-full bg-[#00A6E3]" />}
      </span>
      {opt.label}
    </button>
  );
})}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelCls}>Anything else? (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Theme, number of guests, timings…"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`${inputCls(false)} resize-none`}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-5 w-full inline-flex items-center justify-center gap-2 py-3.5 md:py-4 bg-[#042C89] hover:bg-[#021840] text-white font-['Poppins',sans-serif] font-bold text-[15px] md:text-[14px] lg:text-[16px] rounded-full transition-all cursor-pointer ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send enquiry'}
                </button>

                <p className="hidden md:block mt-3 text-center font-['Poppins',sans-serif] text-[#797A88] text-[11px] lg:text-[12.5px]">
                  We’ll only use your details to reply about your party.
                </p>
              </form>
            )}
          </div>

          {/* Contact card (mobile, form ke neeche, full width) */}
          <ContactCard className="md:hidden w-full mt-1" />
        </div>
      </Container>
    </section>
  );
}

export default SambaApplication;