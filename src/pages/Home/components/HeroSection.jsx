import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
import heroFutsalImg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/HeroHome.png';
import map from 'https://webstepdev.com/demo/syncoWebsiteImages/Location2.png';
import { ArrowRight, MapPin } from 'lucide-react';

const ANIMATED_WORDS_BY_LANG = {
  en: ["passion", "skills", "flair", "beautiful game"],
  pt: ["paixão", "habilidades", "talento", "jogo bonito"],
  es: ["pasión", "habilidades", "estilo", "jogo bonito"],
  fr: ["passion", "compétences", "talent", "beau jeu"],
  ar: ["شغف", "مهارات", "إبداع", "اللعبة الجميلة"],
  ro: ["pasiune", "abilități", "talent", "fotbal frumos"],
  pl: ["pasja", "umiejętności", "błysk", "piękna gra"],
  bn: ["আবেগ", "দক্ষতা", "প্রতিভা", "সুন্দর খেলা"],
};

function AnimatedHeroWord({ mobile = false }) {
  const { selectedLanguage } = useLanguage();
  const lang = (selectedLanguage?.langCode || 'en').toLowerCase();
  const words = ANIMATED_WORDS_BY_LANG[lang] || ANIMATED_WORDS_BY_LANG.en;

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setWordIndex(0);
    setDisplayedText(words[0]);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const currentFullWord = words[wordIndex % words.length];
    let timer;

    if (!isDeleting) {
      if (displayedText.length < currentFullWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullWord.slice(0, displayedText.length + 1));
        }, 110);
      } else {
        const pauseTime = (wordIndex % words.length) === words.length - 1 ? 3200 : 1800;
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullWord.slice(0, displayedText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex, words]);

  // Mobile: chhota word = bada font (screenshot jesa), lamba word = chhota font taaki ek line me aaye
  if (mobile) {
    const fullWord = words[wordIndex % words.length];
    const sizeClass = fullWord.length <= 9 ? 'text-[62px]' : 'text-[36px]';
    return (
      <div className="home-hero-animated-word notranslate h-[72px] flex items-center" translate="no">
        <span className={`gasoek text-[#FFDE14] tracking-[2.5%] block ${sizeClass} leading-none capitalize whitespace-nowrap`}>
          {displayedText || '\u00A0'}
        </span>
      </div>
    );
  }

  return (
    <div className="home-hero-animated-word notranslate lg:h-[110px] h-[80px] flex items-center" translate="no">
      <span className="gasoek text-[#FFDE14] tracking-[2.5%] block text-[62px] lg:text-[88px] capitalize items-baseline shrink-0">
        <span>{displayedText || '\u00A0'}</span>
      </span>
    </div>
  );
}

export function HeroSection() {
  const { openModal } = useModal();

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroFutsalImg}
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-top"
        src="https://sambasoccerschools.com/wp-content/uploads/2025/01/desktop-1.mp4"
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroFutsalImg}
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-top"
        src="https://sambasoccerschools.com/wp-content/uploads/2025/01/Mobile-1.mp4"
      />

      {/* Hero Banner Content */}
      <Container className="home-hero-container relative z-10 lg:py-[80px] xl:py-[80px] 2xl:py-[120px] md:py-[80px] py-[50px] px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-0 my-auto">

               {/* ================= MOBILE ONLY ================= */}
        <div className="md:hidden pt-[40px] pb-[120px] text-left">
          <h1 className="leading-none">
            <span className="block recline text-white font-normal tracking-wide text-[33px] mb-2">
              Bring back the
            </span>
            <AnimatedHeroWord mobile />
          </h1>

          {/* Subtitle: exact 3 lines */}
          <p className="poppins text-white text-[15px] font-semibold leading-[1.45] mt-6">
            <span className="block whitespace-nowrap">Brazilian-inspired football coaching for</span>
            <span className="block whitespace-nowrap">kids aged 4–12. Building skills,</span>
            <span className="block whitespace-nowrap">confidence and freedom to play.</span>
          </p>

          <div className="flex flex-col gap-3.5 mt-7">
            <Link
              to="/find-a-class"
              className="w-full bg-[#0DD180] hover:bg-[#00c853] text-[#042C89] poppins font-bold text-[16px] py-[15px] rounded-full inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap"
            >
              Book a FREE trial
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>

            <button
              type="button"
              onClick={() => openModal('venue')}
              className="w-full bg-transparent border-[1.5px] border-white text-white poppins font-bold text-[16px] py-[15px] rounded-full inline-flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-[18px] h-[18px] shrink-0" />
              <span>Our venues</span>
            </button>
          </div>

          <p className="poppins text-white text-[12.5px] font-medium text-center mt-4">
            137 venues across the UK. First session free.
          </p>
        </div>

        {/* ================= DESKTOP / TABLET (unchanged) ================= */}
        <div className="hidden md:block home-hero-content md:space-y-4 pt-[30px] lg:pt-[40px] xl:pt-[30px] pb-[70px] lg:pb-[80px] xl:pb-[120px] text-left">
          <div className="home-hero-title-box md:min-h-[64px] lg:min-h-[76px] xl:min-h-[92px] 2xl:min-h-[104px] flex items-center">
            <h1 className="home-hero-heading whitespace-nowrap items-baseline leading-none md:text-[42px] lg:text-[54px] xl:text-[58px]">
              <span className="home-hero-title-prefix recline text-white font-normal tracking-wide mr-3 shrink-0">
                Bring back the
              </span>
              <AnimatedHeroWord />
            </h1>
          </div>

          <p className="home-hero-subtitle text-white text-[18px] poppins font-semibold leading-relaxed pt-1">
            Brazilian-inspired football coaching for kids aged 4–12. <br /> Building the skills to master the ball, the confidence to try <br className="hidden lg:block" /> things and the freedom to play their own way.
          </p>

          <div className="home-hero-buttons flex flex-wrap items-center gap-3 pt-5">
            <Link
              to="/find-a-class"
              className="home-hero-btn-find bg-[#0DD180] hover:bg-[#00c853] text-[#042C89] poppins w-max font-bold text-[16px] lg:text-[18px] px-6 lg:px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                Book a FREE trial
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => openModal('venue')}
              className="home-hero-btn-book bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/70 w-max poppins text-white font-bold text-[16px] lg:text-[18px] px-6 lg:px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-5 h-5 text-white shrink-0" />
              <span>Our venues</span>
            </button>
          </div>

          <p className="home-hero-subtitle text-white text-[14px] poppins font-medium leading-relaxed pt-1">
            137 venues across the UK. Try your first session free.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;