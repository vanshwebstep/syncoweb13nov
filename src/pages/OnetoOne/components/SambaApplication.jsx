import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useToast } from '../../../components/common/Toaster';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one';
const bookingBg = `${BASE}/bookingbg.png`;
const bookingCoach = `${BASE}/bookingcoach.png`;
const WHITELINE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png';

// id = backend ke package id (API se name match hone par wahi id use hoti hai)
const OPTIONS = [
  { id: 1, name: 'First session', price: '£45' },
  { id: 2, name: '5 sessions', price: '£275' },
  { id: 3, name: '10 sessions', price: '£500' },
];

const DAYS = ['Saturday', 'Sunday', 'Weekdays'];
const FOCUS = ['Ball control', '1v1 skills', 'Shooting', 'Weaker foot', 'Confidence', 'Fitness'];

const STEPS = [
  { n: 1, title: 'Tell us about your child', sub: 'About 2 minutes.', circle: 'bg-[#0DD180] text-white' },
  { n: 2, title: 'We match a coach and a time', sub: 'Within one working day.', circle: 'bg-[#00A6E3] text-white' },
  { n: 3, title: 'First session and feedback', sub: 'Then decide if you want more.', circle: 'bg-[#FFDE14] text-[#042C89]' },
];

const PACKAGES_ENDPOINT = '/api/open/one-to-one/packages';
const INQUIRY_ENDPOINT = '/api/open/one-to-one/inqury-create';

const normalize = (s = '') => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const EMPTY_FORM = {
  package: 'First session',
  name: '',
  phone: '',
  email: '',
  postcode: '',
  childName: '',
  childAge: '',
  days: [],
  focus: [],
  notes: '',
};

const labelCls = "block font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13.5px] mb-1.5";
const inputCls = (err) =>
  `w-full px-3.5 py-3 rounded-[10px] bg-[#F4F6FB] border text-[13px] lg:text-[14.5px] font-['Poppins',sans-serif] text-[#042C89] placeholder-[#9AA3B5] outline-none transition-all ${
    err ? 'border-red-500' : 'border-[#E8ECF5] focus:border-[#0DD180] focus:bg-white'
  }`;

export function SambaApplication() {
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [apiPackages, setApiPackages] = useState([]);
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
        if (isMounted && result?.status && Array.isArray(result?.data)) setApiPackages(result.data);
      })
      .catch((err) => console.warn('Could not load packages, using defaults:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const toggleIn = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));
    clearError(field);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name?.trim()) errs.name = 'Name is required';

    const phoneTrimmed = formData.phone?.trim() || '';
    if (!phoneTrimmed) errs.phone = 'Phone is required';
    else {
      const digits = phoneTrimmed.replace(/\D/g, '');
      if (!/^[0-9+\s-]+$/.test(phoneTrimmed) || digits.length < 10 || digits.length > 15)
        errs.phone = 'Enter a valid number (10-15 digits)';
    }

    const emailTrimmed = formData.email?.trim() || '';
    if (!emailTrimmed) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) errs.email = 'Enter a valid email address';

    const postcodeTrimmed = formData.postcode?.trim() || '';
    if (!postcodeTrimmed) errs.postcode = 'Postcode is required';
    else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(postcodeTrimmed))
      errs.postcode = 'Enter a valid UK postcode';

    if (!formData.childName?.trim()) errs.childName = 'Child name is required';

    const ageTrimmed = String(formData.childAge || '').trim();
    if (!ageTrimmed) errs.childAge = 'Age is required';
    else if (isNaN(Number(ageTrimmed)) || Number(ageTrimmed) <= 0) errs.childAge = 'Enter a valid age';

    if (formData.days.length === 0) errs.days = 'Select at least one day';
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

      const opt = OPTIONS.find((o) => o.name === formData.package) || OPTIONS[0];
      const matched = apiPackages.find((p) => normalize(p.packageName) === normalize(opt.name));
      const packageId = matched?.id || opt.id;

      const notes = [
        formData.focus.length ? `Work on: ${formData.focus.join(', ')}.` : '',
        formData.notes.trim(),
      ]
        .filter(Boolean)
        .join(' ');
      // Backend short day names expect karta hai (sample: "Sun")
      const DAY_MAP = { Saturday: 'Sat', Sunday: 'Sun', Weekdays: 'Weekdays' };

      const payload = {
        parentName: formData.name.trim(),
        childName: formData.childName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        age: Number(formData.childAge) || formData.childAge,
        postCode: formData.postcode.trim(),
        packageId,
        availability: formData.days.map((d) => DAY_MAP[d] || d),
        focusAreas: formData.focus,
        notes: notes,
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
        toast.success(data?.message || 'One-to-One inquiry submitted successfully!');
        setSubmitted(true);
        setFormData(EMPTY_FORM);
        setErrors({});
      } else {
        toast.error(data?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('One-to-One inquiry error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Err = ({ field }) =>
    errors[field] ? <p className="mt-1 text-[12px] text-red-500 font-['Poppins',sans-serif]">{errors[field]}</p> : null;

  const chipCls = (active, variant) =>
    `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-['Poppins',sans-serif] font-semibold text-[11.5px] lg:text-[12.5px] cursor-pointer transition-all ${
      active
        ? variant === 'dark'
          ? 'bg-[#042C89] border-[#042C89] text-white'
          : 'bg-[#E6F4FB] border-[#00A6E3] text-[#042C89]'
        : 'bg-white border-[#E8ECF5] text-[#042C89]'
    }`;

  return (
    <section
      id="samba-application"
      className="relative w-full overflow-hidden bg-[#042C89] py-14 lg:py-16"
      style={{
        backgroundImage: `url(${bookingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center lg:items-stretch justify-between max-w-[1300px] mx-auto">
          {/* ===== Left ===== */}
          <div className="w-full lg:max-w-[600px] flex flex-col text-left md:text-center lg:text-left">
            <div>
              <p className="font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
                Book their first session
              </p>

              <h2 className="mt-3 leading-[1.15]">
                <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[36px] lg:text-[40px]">
                  What could a little
                </span>
                <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[32px] sm:text-[42px] lg:text-[48px] mt-1">
                  attention bring out?
                  <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
                </span>
              </h2>

              <p className="mt-6 font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-relaxed">
                Tell us about your child and what you’d like them <br className /> to work on. We’ll match them with a coach and arrange a time.
              </p>

              <ul className="relative mt-8 space-y-6 text-left max-w-[400px] mx-auto lg:mx-0 before:content-[''] before:absolute before:left-[16px] before:top-[16px] before:bottom-[16px] before:w-px before:bg-white/70">
                {STEPS.map((s) => (
                  <li key={s.n} className="relative z-10 flex items-center gap-4">
                    <span className={`${s.circle} w-8 h-8 rounded-full flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[12px] shrink-0`}>
                      {s.n}
                    </span>
                    <div>
                      <p className="text-white font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[17px] leading-tight">{s.title}</p>
                      <p className="text-white/90 font-['Poppins',sans-serif] text-[12px] lg:text-[14px] mt-0.5">{s.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coach image */}
            <img
              src={bookingCoach}
              alt="Samba coach with child"
              className="hidden lg:block mt-auto pt-8 w-full h-auto object-contain object-bottom pointer-events-none select-none"
            />
          </div>

          {/* ===== Right: Form card ===== */}
          <div className="w-full max-w-[620px] bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#0DD180]/15 text-[#0DD180] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
                <h3 className="font-['Recline',sans-serif] text-2xl sm:text-3xl text-[#042C89] font-bold mb-2">Enquiry Received!</h3>
                <p className="font-['Poppins',sans-serif] text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
                  Thank you! A member of the Samba Soccer Schools team will be in touch shortly to help arrange your child's first session.
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
                <h3 className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[18px] lg:text-[22px] leading-tight">
                  Tell us about your child
                </h3>
                <p className="mt-1 font-['Poppins',sans-serif] text-[#797A88] text-[12px] lg:text-[13px]">
                  All fields are required unless marked optional.
                </p>

                {/* Option */}
                <p className="mt-5 mb-2 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13.5px]">Which option?</p>
                <div className="md:grid grid-cols-3 gap-2.5">
                  {OPTIONS.map((o) => {
                    const active = formData.package === o.name;
                    return (
                      <button
                        key={o.name}
                        type="button"
                        onClick={() => handleChange('package', o.name)}
                        className={`flex w-full md:w-auto items-center gap-2 text-left rounded-[14px] border-2 px-2.5 sm:px-3 py-3 transition-all cursor-pointer ${
                          active ? 'border-[#FFDE14] bg-[#FFF8D1]' : 'border-[#E8ECF5] bg-white hover:border-[#C9D3F0]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-[#042C89]' : 'border-[#C9D3F0]'}`}>
                          {active && <span className="w-2 h-2 rounded-full bg-[#042C89]" />}
                        </span>
                        <span>
                          <span className="block font-['Poppins',sans-serif] font-bold text-[#042C89] text-[11.5px] lg:text-[12.5px] leading-tight">{o.name}</span>
                          <span translate="no" className="notranslate block font-['Poppins',sans-serif] text-[#797A88] text-[10.5px] lg:text-[11.5px] mt-0.5">{o.price}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797A88] pointer-events-none" />
                        <input type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={`${inputCls(errors.email)} pl-10`} />
                      </div>
                      <Err field="email" />
                    </div>
                    <div>
                      <label className={labelCls}>London postcode</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797A88] pointer-events-none" />
                        <input type="text" placeholder="e.g. W3 7HD" value={formData.postcode} onChange={(e) => handleChange('postcode', e.target.value)} className={`${inputCls(errors.postcode)} pl-10`} />
                      </div>
                      <Err field="postcode" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Child’s name</label>
                      <input type="text" placeholder="First name" value={formData.childName} onChange={(e) => handleChange('childName', e.target.value)} className={inputCls(errors.childName)} />
                      <Err field="childName" />
                    </div>
                    <div>
                      <label className={labelCls}>Child’s age</label>
                      <input type="number" min="1" placeholder="e.g. 9" value={formData.childAge} onChange={(e) => handleChange('childAge', e.target.value)} className={inputCls(errors.childAge)} />
                      <Err field="childAge" />
                    </div>
                  </div>

                  {/* Days */}
                  <div>
                    <label className={labelCls}>When are they free?</label>
                    <div className="flex flex-wrap gap-2.5">
                      {DAYS.map((d) => {
                        const active = formData.days.includes(d);
                        return (
                          <button key={d} type="button" onClick={() => toggleIn('days', d)} className={chipCls(active, 'dark')}>
                            {active && <Check className="w-3.5 h-3.5 text-[#FFDE14] stroke-[3]" />}
                            {d}
                          </button>
                        );
                      })}
                    </div>
                    <Err field="days" />
                  </div>

                  {/* Focus */}
                  <div>
                    <label className={labelCls}>What would you like them to work on?</label>
                    <div className="flex flex-wrap gap-2.5">
                      {FOCUS.map((f) => {
                        const active = formData.focus.includes(f);
                        return (
                          <button key={f} type="button" onClick={() => toggleIn('focus', f)} className={chipCls(active, 'light')}>
                            {active && <Check className="w-3.5 h-3.5 text-[#00A6E3] stroke-[3]" />}
                            {f}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className={labelCls}>Anything else? (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. plays in an U10s team, wants to work on shooting"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className={`${inputCls(false)} resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-5 w-full inline-flex items-center justify-center gap-2 py-4 bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[16px] rounded-full transition-all cursor-pointer ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>

                <p className="mt-3 text-center font-['Poppins',sans-serif] text-[#797A88] text-[11px] lg:text-[12.5px]">
                  We’ll only use your details to arrange their sessions.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SambaApplication;