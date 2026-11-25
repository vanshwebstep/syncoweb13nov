import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, Mail, Send } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const bgTexture = `${BASE}/birthday-party/what_happend_banner.png`;
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;
const ICON_BASE = `${BASE}/icons`;

const ENDPOINT = '/api/open/contact-us/create';

/* ====== CUSTOM ICON ====== */
// name = file ka naam (bina extension), e.g. 'cal' => /icons/cal.png
const Ico = ({ name, className = '' }) => (
  <img
    src={`${ICON_BASE}/${name}.png`}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={`object-contain select-none shrink-0 ${className}`}
  />
);

/* ====== DATA ====== */
// Links apne routes ke hisaab se badal lena
const TOPICS = [
  { icon: 'cal', tint: '#FFDE14', title: 'Book a FREE trial', desc: 'Find a class near you and book online.', cta: 'Find a class', to: '/find-a-class' },
  { icon: 'card', tint: '#E3F8EE', title: 'Memberships and payments', desc: 'Manage your plan, payments and kit in Samba Connect.', cta: 'Log in', to: '#' },
  { icon: 'sun', tint: '#E6F4FB', title: 'Holiday camps', desc: 'Dates, prices and booking for the next camp.', cta: 'See camps', to: '/holiday-camps' },
  { icon: 'cake', tint: '#FFF1E3', title: 'Birthday parties', desc: 'Plan a Samba party. We come to you.', cta: 'Enquire', to: '/birthday-party' },
  { icon: 'brief', tint: '#EEF2FA', title: 'Franchise', desc: 'Run Samba in your area.', cta: 'Find out more', to: '/franchise' },
  { icon: 'users', tint: '#FFF4C2', title: 'Work with us', desc: 'Coaching and venue manager roles.', cta: 'See jobs', to: '/coaches' },
];

const ABOUT_OPTIONS = ['Classes', 'Membership', 'Payments', 'Holiday camps', 'Parties', 'Something else'];

const SOCIALS = [
  { name: 'Facebook', icon: 'greenfacebook', href: 'https://facebook.com' },
  { name: 'Instagram', icon: 'greeninstagram', href: 'https://instagram.com' },
  { name: 'YouTube', icon: 'greenyoutube', href: 'https://youtube.com' },
  { name: 'LinkedIn', icon: 'greenlinkedin', href: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'greentwitter', href: 'https://twitter.com' },
];

const MAP_SRC = 'https://www.google.com/maps?q=60+St+Martin%27s+Lane+Covent+Garden+London+WC2N+4JS&output=embed';
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=60+St+Martin%27s+Lane+Covent+Garden+London+WC2N+4JS';

/* ====== STYLES ====== */
const labelCls = "poppins mb-2 flex items-center justify-between font-bold text-[#042C89] text-[13px] sm:text-[14px]";
const inputCls = (err) =>
  `poppins w-full h-[50px] sm:h-[52px] rounded-xl bg-[#F4F6FB] border px-4 text-[14px] sm:text-[15px] text-[#042C89] placeholder-[#94A3B8] outline-none transition-all ${
    err ? 'border-red-400 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#00A6E3] focus:bg-white'
  }`;

const Req = () => <span className="text-red-500 font-bold ms-1">*</span>;

export function LocationSection() {
  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    phone: '',
    email: '',
    child: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';

    const rawPhone = formData.phone.trim();
    if (!rawPhone) errs.phone = 'Phone is required';
    else {
      const digits = rawPhone.replace(/\D/g, '');
      if (!/^[0-9+\s-]+$/.test(rawPhone) || digits.length < 10 || digits.length > 15) errs.phone = 'Enter a valid number (10-15 digits)';
    }

    const em = formData.email.trim();
    if (!em) errs.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errs.email = 'Enter a valid email address';

    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://api.grabbite.com';
      const apiUrl = `${rawBase.replace(/\/+$/, '')}${ENDPOINT}`;

      // API me topic/child ka alag field nahi hai, isliye notes me jata hai
      const notes = [
        formData.topic ? `Topic: ${formData.topic}.` : '',
        formData.child.trim() ? `Child and venue: ${formData.child.trim()}.` : '',
        formData.message.trim(),
      ]
        .filter(Boolean)
        .join(' ');

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        notes: notes || 'Website contact inquiry',
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
        setSubmitted(true);
        setFormData({ topic: '', name: '', phone: '', email: '', child: '', message: '' });
        setErrors({});
        // Focus user on the success message
        const el = document.getElementById('contact-form');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const msg = data?.message || 'Something went wrong. Please try again.';
        setSubmitError(msg);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError('Something went wrong. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Err = ({ field }) =>
    errors[field] ? <p className="poppins mt-1.5 text-[12px] font-medium text-red-500">{errors[field]}</p> : null;

  return (
    <div id="location-section" className="w-full">
      {/* ================= 1. QUICKEST ANSWERS ================= */}
      <section
        className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
        style={{ backgroundImage: `url(${bgTexture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Container className="relative z-10">
          <div className="text-center">
            <p className="poppins font-semibold text-[#00A6E3] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
              Quickest answers
            </p>
            <h2 className="mt-3 leading-[1.1]">
              <span className="recline block font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[44px]">What can we</span>
              <span className="gasoek relative inline-block text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[54px] mt-1">
                help with?
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>
            <p className="poppins mt-8 font-medium text-[#042C89] text-[14px] lg:text-[17px]">
              Pick a topic and we’ll take you straight there. Or send us a message below.
            </p>
          </div>

          <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-[1100px] mx-auto">
            {TOPICS.map(({ icon, tint, title, desc, cta, to }) => (
              <div
                key={title}
                className="bg-white border border-[#E8ECF5] rounded-[22px] p-5 lg:p-6 flex flex-col min-h-[150px] lg:min-h-[160px] shadow-[0_2px_10px_rgba(4,44,137,0.03)]"
              >
                <div className="flex items-start gap-4">
                  <span className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: tint }}>
                    <Ico name={icon} className="w-[18px] h-[18px]" />
                  </span>
                  <div>
                    <h3 className="poppins font-bold text-[#042C89] text-[15px] lg:text-[17px] leading-tight">{title}</h3>
                    <p className="poppins mt-1.5 text-[#797A88] text-[12px] lg:text-[13.5px] leading-snug">{desc}</p>
                  </div>
                </div>
                <Link
                  to={to}
                  className="poppins mt-auto pt-4 ps-[60px] inline-flex items-center gap-1 font-bold text-[#00A6E3] text-[12px] lg:text-[13px] hover:underline"
                >
                  {cta} <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= 2. FORM + SIDEBAR ================= */}
      <section className="w-full bg-[#F6F8FC] pt-10 lg:pt-14 pb-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 max-w-[1100px] mx-auto items-start">
            {/* ===== Form ===== */}
            <div id="contact-form" className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-[#E9EFF8] shadow-[0_12px_40px_rgba(4,44,137,0.05)]">
              {submitted ? (
                <div className="py-10 sm:py-14 text-center poppins">
                  <div className="w-16 h-16 bg-[#0DD180] text-[#042C89] rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Check className="w-8 h-8 stroke-[3.5]" />
                  </div>
                  <h4 className="font-bold text-[22px] sm:text-[26px] text-[#042C89] mb-3">
                    Message Sent!
                  </h4>
                  <p className="text-[15px] sm:text-[16px] text-[#475569] max-w-md mx-auto leading-relaxed">
                    Thank you for your message. Our team will be in touch within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ topic: '', name: '', phone: '', email: '', child: '', message: '' });
                    }}
                    className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#042C89] hover:bg-[#061838] text-white font-bold text-[15px] transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="poppins font-bold text-[#042C89] text-[24px] sm:text-[28px] tracking-tight leading-tight">
                    Send us a message
                  </h3>
                  <p className="poppins mt-1.5 text-[#797A88] text-[14px] sm:text-[15px]">
                    We’ll get back to you by email or phone.
                  </p>

                  {/* Topic chips */}
                  <div className="mt-7 sm:mt-8">
                    <p className="poppins font-bold text-[#042C89] text-[13px] sm:text-[14px] mb-3">
                      What’s it about?
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {ABOUT_OPTIONS.map((o) => {
                        const active = formData.topic === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            onClick={() => set('topic', active ? '' : o)}
                            className={`poppins inline-flex items-center gap-1.5 rounded-full border px-4 sm:px-4.5 py-2 text-[13px] sm:text-[14px] cursor-pointer transition-all ${
                              active
                                ? 'bg-[#042C89] border-[#042C89] text-white font-bold shadow-xs'
                                : 'bg-white border-[#D0DBEA] text-[#042C89] font-medium hover:border-[#042C89]'
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5 text-[#FFDE14] stroke-[3.5]" />}
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form fields with generous open spacing */}
                  <div className="mt-7 sm:mt-8 space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className={labelCls}>
                          <span>Your name<Req /></span>
                        </label>
                        <input
                          type="text"
                          placeholder="Sarah Smith"
                          value={formData.name}
                          onChange={(e) => set('name', e.target.value)}
                          className={inputCls(errors.name)}
                        />
                        <Err field="name" />
                      </div>
                      <div>
                        <label className={labelCls}>
                          <span>Phone<Req /></span>
                        </label>
                        <input
                          type="tel"
                          placeholder="07.."
                          value={formData.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          className={inputCls(errors.phone)}
                        />
                        <Err field="phone" />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        <span>Email<Req /></span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8A95A5] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => set('email', e.target.value)}
                          className={`${inputCls(errors.email)} pl-11`}
                        />
                      </div>
                      <Err field="email" />
                    </div>

                    <div>
                      <label className={labelCls}>
                        <span>Child’s name and venue</span>
                        <span className="font-semibold text-[#8A95A5] text-[12px]">Optional</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leo, Chelsea Academy"
                        value={formData.child}
                        onChange={(e) => set('child', e.target.value)}
                        className={inputCls(false)}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>
                        <span>Message<Req /></span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={(e) => set('message', e.target.value)}
                        className={`${inputCls(errors.message)} min-h-[115px] sm:min-h-[125px] resize-none py-3.5`}
                      />
                      <Err field="message" />
                    </div>
                  </div>

                  {submitError && (
                    <div className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center poppins">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`poppins mt-7 w-full h-[52px] sm:h-[56px] inline-flex items-center justify-center gap-2 bg-[#0DD180] hover:bg-[#00c853] text-[#042C89] font-bold text-[16px] sm:text-[17px] rounded-full transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send className="w-4 h-4 text-[#042C89] fill-[#042C89]" />
                    <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
                  </button>

                  <p className="poppins mt-3.5 text-center text-[#797A88] text-[12px] sm:text-[13px]">
                    We’ll only use your details to reply to you.
                  </p>
                </form>
              )}
            </div>

            {/* ===== Sidebar ===== */}
        <div className="lg:col-span-5 space-y-5">
              {/* Prefer to talk */}
              <div
                className="relative overflow-hidden rounded-[24px] p-6 lg:p-7"
                style={{
                  backgroundImage: "url('https://webstepdev.com/demo/syncoWebsiteImages/contact/prefertotalkbg.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <h3 className="poppins relative z-10 font-bold text-white text-[18px] lg:text-[20px]">Prefer to talk?</h3>

                <ul className="relative z-10 mt-5 space-y-5">
                  <li className="flex items-center gap-4">
                    <span className="w-[40px] h-[40px] rounded-full bg-[#FFDE14] flex items-center justify-center shrink-0">
                      <Ico name="phone" className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="poppins text-white/80 text-[11px] lg:text-[12px]">Call us</p>
                      <a href="tel:02072052723" dir="ltr" className="poppins font-bold text-white text-[14px] lg:text-[16px] hover:underline">020 7205 2723</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-[40px] h-[40px] rounded-full bg-[#FFDE14] flex items-center justify-center shrink-0">
                      <Ico name="mail" className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="poppins text-white/80 text-[11px] lg:text-[12px]">Email us</p>
                      <a href="mailto:admin@sambasoccerschools.com" dir="ltr" className="poppins font-bold text-white text-[12.5px] lg:text-[14px] hover:underline break-all">
                        admin@sambasoccerschools.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-[40px] h-[40px] rounded-full bg-[#FFDE14] flex items-center justify-center shrink-0">
                      <Ico name="pin" className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="poppins text-white/80 text-[11px] lg:text-[12px]">Head office</p>
                      <p className="poppins font-bold text-white text-[12.5px] lg:text-[14px] leading-snug">
                        60 St Martin’s Lane, Covent Garden,
                        <br />
                        London WC2N 4JS
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#E8ECF5] bg-white h-[210px] lg:h-[230px]">
                <iframe
                  title="Samba Soccer Schools London"
                  src={MAP_SRC}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="poppins absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[11px] lg:text-[12.5px] px-5 py-2.5 rounded-full shadow-lg whitespace-nowrap transition-colors"
                >
                  <Ico name="pin" className="w-3.5 h-3.5 brightness-0 invert" /> Open in Google Maps
                </a>
              </div>

              {/* Let's be friends */}
              <div className="bg-white rounded-[24px] border border-[#E8ECF5] p-5 lg:p-6 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h4 className="poppins font-bold text-[#042C89] text-[14px] lg:text-[15px]">Let’s be friends</h4>
                  <p className="poppins mt-0.5 text-[#797A88] text-[11px] lg:text-[12px]">Follow the fun on social.</p>
                </div>
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ name, icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] rounded-full bg-[#F0F4FA] flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Ico name={icon} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= 3. LIVE CHAT + SHOP ================= */}
      <section className="w-full bg-[#F6F8FC] pb-12 lg:pb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-[1100px] mx-auto">
            {/* Live chat */}
            <div className="bg-[#FFDE14] rounded-[24px] p-6 lg:p-7 flex items-start gap-4">
              <span className="relative w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0">
                <Ico name="livechatblue" className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#0DD180] border-2 border-white" />
              </span>
              <div>
                <h3 className="poppins font-bold text-[#042C89] text-[16px] lg:text-[18px] leading-tight">Have a quick question?</h3>
                <p className="poppins mt-1 text-[#042C89] text-[12px] lg:text-[13.5px]">Message us on live chat. We’re online 9am–6pm.</p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-live-chat'))}
                  className="poppins mt-4 inline-flex items-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[12px] lg:text-[13.5px] px-6 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <Ico name="livechatwhite" className="w-3.5 h-3.5" /> Start a live chat
                </button>
              </div>
            </div>

            {/* Shop */}
            <div className="bg-[#0DD180] rounded-[24px] p-6 lg:p-7 flex items-start gap-4">
              <span className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0">
                <Ico name="bag" className="w-5 h-5" />
              </span>
              <div>
                <h3 className="poppins font-bold text-[#042C89] text-[16px] lg:text-[18px] leading-tight">Shop online</h3>
                <p className="poppins mt-1 text-[#042C89] text-[12px] lg:text-[13.5px]">Samba kit, balls and Skills Trackers.</p>
                <a
                  href="#"
                  className="poppins mt-4 inline-flex items-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[12px] lg:text-[13.5px] px-6 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95"
                >
                  Visit the shop <Ico name="arrowrightwhite" className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default LocationSection;