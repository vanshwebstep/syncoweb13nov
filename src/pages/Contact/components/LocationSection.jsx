import React, { useState } from 'react';
import { Container } from '../../../components/common/Container';
import { useToast } from '../../../components/common/Toaster';

const IMAGE_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/contact';
const cardBg = `${IMAGE_BASE}/card_image.png`;
const mapPinIcon = `${IMAGE_BASE}/map.png`;
const mailIcon = `${IMAGE_BASE}/mail.png`;
const phoneIcon = `${IMAGE_BASE}/globe-01.png`;
const facebookIcon = `${IMAGE_BASE}/Facebook.png`;
const instagramIcon = `${IMAGE_BASE}/Instagram.png`;
const youtubeIcon = `${IMAGE_BASE}/YouTube.png`;
const linkedinIcon = `${IMAGE_BASE}/LinkendIn.png`;
const twitterIcon = `${IMAGE_BASE}/Twitter.png`;

const ENDPOINT = '/api/open/contact-us/create';

export function LocationSection() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    if (!formData.name?.trim()) {
      errs.name = 'Name is required';
    }

    const emailTrimmed = formData.email?.trim() || "";
    if (!emailTrimmed) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errs.email = 'Enter a valid email address';
    }

    const rawPhone = formData.telephone?.trim() || "";
    if (!rawPhone) {
      errs.telephone = 'Telephone number is required';
    } else {
      const digits = rawPhone.replace(/\D/g, '');
      const hasAllowedChars = /^[0-9+\s-]+$/.test(rawPhone);
      if (!hasAllowedChars || digits.length < 10 || digits.length > 15) {
        errs.telephone = 'Enter a valid telephone number (10-15 digits)';
      }
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    try {
      const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://api.grabbite.com';
      const baseUrl = rawBase.replace(/\/+$/, '');
      const apiUrl = `${baseUrl}${ENDPOINT}`;

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.telephone.trim(),
        notes: formData.message.trim() || 'Website contact inquiry',
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
        toast.success(data?.message || 'Thank you! Your message has been sent successfully.');
        setSubmitted(true);
        setFormData({ name: '', telephone: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const errorMsg = data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: facebookIcon, href: 'https://facebook.com' },
    { name: 'Instagram', icon: instagramIcon, href: 'https://instagram.com' },
    { name: 'YouTube', icon: youtubeIcon, href: 'https://youtube.com' },
    { name: 'LinkedIn', icon: linkedinIcon, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: twitterIcon, href: 'https://twitter.com' },
  ];

  return (
    <section id="location-section" className="w-full py-10 sm:py-14 lg:py-16 xl:py-20 bg-[#FAFBFC]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 xl:gap-10 items-stretch max-w-[680px] lg:max-w-none mx-auto">
          {/* Left Column: Contact & Office Info Card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-[20px] p-5 sm:p-7 lg:p-7 xl:p-10 flex flex-col justify-center gap-5 lg:gap-6 shadow-xl min-h-[460px] lg:min-h-[500px] xl:min-h-[540px]">
            {/* Background Texture & Wavy Graphics */}
            <img
              src={cardBg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none -z-0"
            />

            {/* Inner Content */}
            <div className="relative z-10 w-full space-y-4 sm:space-y-5 lg:space-y-6 pt-2 sm:pt-4 lg:pt-0">
              {/* Heading */}
              <h2 className="gasoek text-[32px] sm:text-[42px] lg:text-[46px] xl:text-[60px] text-white leading-none">
                Contact us
              </h2>

              {/* White Card with Contact Details */}
              <div className="bg-white rounded-[20px] p-4 sm:p-5 lg:p-5 xl:p-6 shadow-md divide-y divide-[#CBD4E1]">
                {/* Office Address */}
                <div className="flex items-center gap-3.5 sm:gap-4 pb-4 sm:pb-4.5 xl:pb-7">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 shrink-0 flex items-center justify-center pt-0.5">
                    <img
                      src={mapPinIcon}
                      alt="Location Pin"
                      className="w-[26px] sm:w-[28px] xl:w-[32px] object-contain"
                    />
                  </div>
                   
                  <p className="poppins text-[#042C89] font-semibold text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] leading-snug">
                    Samba Soccer Schools, 60 St Martins Lane, Covent Garden, Central London, WC2N 4JS
                  </p>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-3.5 sm:gap-4 py-4 sm:py-4.5 xl:py-7">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 shrink-0 flex items-center justify-center">
                    <img
                      src={mailIcon}
                      alt="Email Icon"
                      className="w-[28px] sm:w-[30px] xl:w-[36px] object-contain"
                    />
                  </div>
                 
                  <a
                    href="mailto:admin@sambasoccerschools.com"
                    dir="ltr"
                    className="poppins text-[#042C89] font-semibold text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] hover:underline inline-block break-all sm:break-normal"
                  >
                    admin@sambasoccerschools.com
                  </a>
                </div>

                {/* Telephone */}
                <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-4.5 xl:pt-7">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 shrink-0 flex items-center justify-center">
                    <img
                      src={phoneIcon}
                      alt="Phone Icon"
                      className="w-[34px] sm:w-[38px] xl:w-[47px] object-contain"
                    />
                  </div>
                  <a
                    href="tel:02072052723"
                    dir="ltr"
                    className="poppins text-[#042C89] font-semibold text-[13px] sm:text-[13.5px] lg:text-[14px] hover:underline inline-block"
                  >
                    020 7205 2723
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Pill */}
            <div className="relative z-10 bg-[#00A6E3] border-r-4 border-b-4 border-white shadow-2xl rounded-[20px] p-3.5 sm:p-4 lg:p-4 xl:p-6 flex items-center justify-around gap-2 w-full">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="hover:scale-110 transition-transform duration-150"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[38px] lg:h-[38px] xl:w-[47px] xl:h-[47px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Us Form */}
          <div
            id="contact-form"
            className="lg:col-span-7 bg-white rounded-[20px] p-5 sm:p-7 lg:p-7 xl:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#E1E2E6] flex flex-col justify-between"
          >
            <div>
              {submitted ? (
                <div className="bg-[#E8FBF2] border border-[#00D06C] text-[#042C89] rounded-2xl p-6 text-center my-8 poppins">
                  <div className="w-12 h-12 bg-[#00D06C] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                    ✓
                  </div>
                  <h4 className="font-bold text-lg mb-1">Message Sent!</h4>
                  <p className="text-sm text-gray-600">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-7">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block poppins text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#101014] mb-1"
                    >
                      Name*
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`w-full bg-[#F6F6F7] border rounded-[6px] px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white ${
                        errors.name
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#00D06C]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.name}</p>
                    )}
                  </div>

                  {/* Telephone */}
                  <div>
                    <label
                      htmlFor="contact-telephone"
                      className="block poppins text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#101014] mb-1"
                    >
                      Telephone*
                    </label>
                    <input
                      id="contact-telephone"
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="Telephone"
                      className={`w-full bg-[#F6F6F7] border rounded-[6px] px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white ${
                        errors.telephone
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#00D06C]'
                      }`}
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.telephone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block poppins text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#101014] mb-1"
                    >
                      Email Address*
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`w-full bg-[#F6F6F7] border rounded-[6px] px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white ${
                        errors.email
                          ? 'border-red-500 ring-1 ring-red-500/20'
                          : 'border-transparent focus:border-[#00D06C]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block poppins text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#101014] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter a message..."
                      className="w-full bg-[#F6F6F7] border border-transparent focus:border-[#00D06C] focus:bg-white rounded-[6px] px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-sm text-gray-800 placeholder-gray-400 outline-none resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#0DD180] hover:bg-[#00BA60] active:scale-[0.99] text-white font-bold text-[15px] sm:text-[16px] xl:text-[18px] py-2.5 sm:py-3.5 xl:py-4 rounded-full transition-all duration-200 cursor-pointer poppins shadow-sm ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
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

export default LocationSection;
