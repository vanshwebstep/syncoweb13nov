import React, { useState } from "react";
import { Container } from "../../../components/common/Container";
import { useToast } from "../../../components/common/Toaster";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const BG_IMAGE = `https://webstepdev.com/demo/syncoWebsiteImages/coaching.png`;
const BOOK_IMAGE = `${BASE}/prospectusmainpic.png`;

export function ReadProspectus() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agreeMarketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Prospectus is on its way to your inbox!");
      setFormData({ fullName: "", email: "", phone: "", agreeMarketing: false });
    }, 800);
  };

  const inputClass =
    "w-full lg:w-[225px] h-[54px] bg-white text-[#042C89] placeholder-[#7A8AA8] poppins text-[15px] px-5 rounded-[14px] outline-none focus:ring-2 focus:ring-[#0DD180]";

  return (
    <section
      id="prospectus"
      className="relative w-full py-16 md:py-20 bg-[#042C89] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Left Book Graphic */}
          <div className="w-full lg:w-[38%] flex justify-center">
            <img
              src={BOOK_IMAGE}
              alt="Samba Franchise Prospectus"
              className="w-full max-w-[420px] h-auto object-contain"
            />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-[58%] text-left">
            <span className="poppins block text-[#0DD180] font-semibold text-[14px] tracking-wide uppercase mb-3">
              Free download
            </span>

            <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] leading-[1.1] mb-5">
              <span className="recline text-white block">Read the</span>
              <span className="gasoek text-[#FFDE14] block">prospectus.</span>
            </h2>

            <p className="poppins text-[#C9D3F0] text-[16px] sm:text-[18px] mb-8">
              The full Samba opportunity, to read in your own time.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-3.5">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3 mt-5">
                <input
                  type="checkbox"
                  id="prospectusConsent"
                  checked={formData.agreeMarketing}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeMarketing: e.target.checked })
                  }
                  className="w-[18px] h-[18px] shrink-0 appearance-none rounded-[5px] border-2 border-[#C9D3F0] bg-transparent checked:bg-[#0DD180] checked:border-[#0DD180] cursor-pointer"
                />
                <label
                  htmlFor="prospectusConsent"
                  className="poppins text-[13px] text-[#C9D3F0] cursor-pointer select-none"
                >
                  I'm happy to receive updates about the Samba franchise opportunity.
                </label>
              </div>

              {/* Submit */}
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="poppins w-full md:w-max inline-flex items-center justify-center bg-[#0DD180] hover:bg-[#0bbb71] text-white font-bold text-[16px] px-10 h-[54px] rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send me the prospectus"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReadProspectus;