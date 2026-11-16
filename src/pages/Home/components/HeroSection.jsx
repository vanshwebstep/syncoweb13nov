import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
import heroFutsalImg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/HeroHome.png';
import map from 'https://webstepdev.com/demo/syncoWebsiteImages/Location2.png';

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

function AnimatedHeroWord() {
  const { selectedLanguage } = useLanguage();
  const lang = (selectedLanguage?.langCode || 'en').toLowerCase();
  const words = ANIMATED_WORDS_BY_LANG[lang] || ANIMATED_WORDS_BY_LANG.en;

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // When language switches, start with the first word of the new language
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
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
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

  return (
    <div className="home-hero-animated-word notranslate lg:h-[110px] h-[50px] flex items-center" translate="no">
      <span className="gasoek text-[#FFDE14] tracking-[2.5%] block lg:text-[111px] capitalize items-baseline shrink-0">
        <span>{displayedText || '\u00A0'}</span>
      </span>
    </div>
  );
}

export function HeroSection() {
  const { openModal } = useModal();

  return (
    <section id="home" className="relative w-full overflow-hidden">
      
      {/* Background Video with Fallback (Anchored to top to show more upper scene) */}
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
        <div className="home-hero-content md:space-y-4 pt-[30px] lg:pt-[40px] xl:pt-[30px] pb-[70px] lg:pb-[80px] xl:pb-[120px] text-left">
          
          {/* Rotating Headline: Kept on a single line on desktop and mobile with stable vertical height */}
          <div className="home-hero-title-box min-h-[38px] xs:min-h-[44px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[76px] xl:min-h-[92px] 2xl:min-h-[104px] flex items-center md:mb-0 mb-3">
            <h1 className="home-hero-heading whitespace-nowrap items-baseline leading-none text-[38px] min-[360px]:text-[40px] min-[390px]:text-[22px] sm:text-[34px] md:text-[42px] lg:text-[54px] xl:text-[64px]">
              <span className="home-hero-title-prefix recline text-white font-normal tracking-wide mr-1.5 sm:mr-3 shrink-0">
                Bring back the
              </span>
              <AnimatedHeroWord />
            </h1>
          </div>

          {/* Line 3: Subtitle */}
          <p className="home-hero-subtitle text-white text-[16px] sm:text-[18px] poppins lg:text-[18px] xl:text-[22px] font-semibold leading-relaxed pt-1 sm:pt-1">
            Brazilian-inspired football coaching for kids aged 4–12. Building the skills to master <br className="hidden lg:block" /> the ball, the confidence to try things and the freedom to play <br className="md:hidden block" />their own way.
          </p>

          {/* Line 4: Dual Action Buttons */}
          <div className="home-hero-buttons flex flex-wrap items-center gap-3 pt-4 sm:pt-5">
            {/* Dark Blue Pill Button */}
            <Link
              to="/find-a-class"
              className="home-hero-btn-find bg-[#042C89] poppins text-white w-full md:w-max font-bold sm:text-[20px] lg:text-[18px] xl:text-[24px] text-[18px] px-6 lg:px-6 xl:px-7 md:py-3.5 lg:py-3.5 xl:py-4 py-3.5 justify-center md:justify-normal rounded-full inline-flex items-center gap-2 border border-white/20 hover:scale-105 transition-all cursor-pointer"
            >
              <img src={map} alt="Futsal Session" className="w-[20px] me-1" />
              <span>Find your child’s class</span>
            </Link>

            {/* Solid Green Pill Button */}
            <Link
              to="/book-trial"
              className="home-hero-btn-book bg-[#0DD180] hover:bg-[#00c853] w-full md:w-max poppins text-white font-bold text-[18px] lg:text-[18px] xl:text-[20px] px-6 lg:px-6 xl:px-7 md:py-3.5 lg:py-3.5 xl:py-4 py-3.5 rounded-full hover:scale-105 transition-all cursor-pointer whitespace-nowrap text-center inline-block"
            >
              Book a FREE trial
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
