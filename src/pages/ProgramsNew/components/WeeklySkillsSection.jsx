import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

// Skill card images - using existing images from the project
import skill1 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill.png';
import skill2 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill2.png';
import skill3 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill3.png';
import skill4 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill4.png';
import coachKids from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching-session-kids-alt.png';
import coachTeam from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching-coaches-team.png';
import everyWeekImg from 'https://webstepdev.com/demo/syncoWebsiteImages/every-week.png';
import yellowVector from 'https://webstepdev.com/demo/syncoWebsiteImages/yellowlayer.png';
import vector3 from 'https://webstepdev.com/demo/syncoWebsiteImages/Vector-3.png';

const WEEKLY_SKILLS = [
  {
    week: 'Week 1',
    skill: 'Inside Cut',
    desc: 'Master the sharp inside foot cut to beat defenders with ease.',
    img: coachKids,
    tag: 'Ball Mastery',
    tagColor: '#0DD180',
  },
  {
    week: 'Week 2',
    skill: 'The Ronaldo Chop',
    desc: 'A deceptive body-feint chop that leaves opponents going the wrong way.',
    img: coachTeam,
    tag: 'Skill Move',
    tagColor: '#00A6E3',
  },
  {
    week: 'Week 3',
    skill: 'Sole Roll Combo',
    desc: 'Combine sole-of-foot rolls into fluid combinations with both feet.',
    img: everyWeekImg,
    tag: 'Combination',
    tagColor: '#FFDE14',
  },
];

const FEATURES = [
  {
    icon: '⚽',
    title: '40+ Unique Skills',
    desc: 'A new skill introduced every week keeps sessions fresh and exciting.',
  },
  {
    icon: '🎵',
    title: 'Samba Music',
    desc: 'Brazilian beats set the rhythm for ball mastery exercises.',
  },
  {
    icon: '📊',
    title: 'Skills Tracker',
    desc: 'Kids earn stickers as they master each skill on their Road to Rio.',
  },
  {
    icon: '🏆',
    title: '4 Ability Levels',
    desc: 'From Samba Babies to Samba Pro — the right challenge for every child.',
  },
];

export function WeeklySkillsSection() {
  const { openModal } = useModal();

  return (
    <section className="bg-white py-14 md:py-20 overflow-hidden">
      <Container>

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="poppins text-[#0DD180] font-bold text-sm md:text-base uppercase tracking-widest mb-3">
            Our Programme
          </p>
          <h2 className="recline text-[40px] sm:text-[58px] md:text-[70px] text-[#042C89] leading-[1.05]">
            Every week a new{' '}
            <span className="gasoek text-[#0DD180] relative inline-block">
              skill to master
              <img
                src={vector3}
                alt=""
                aria-hidden="true"
                className="absolute -bottom-4 left-0 w-full h-4 md:h-5"
              />
            </span>
          </h2>
          <p className="poppins text-[#64748B] text-[16px] md:text-[20px] font-medium leading-relaxed mt-6 md:mt-8">
            Every Samba session introduces a brand new ball mastery skill — so
            there's always something to look forward to, practise at home, and
            show off at the next class.
          </p>
        </div>

        {/* ── 3 Skill Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-20">
          {WEEKLY_SKILLS.map((card, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 bg-white flex flex-col"
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={card.img}
                  alt={card.skill}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Tag badge */}
                <span
                  className="absolute top-3 left-3 poppins font-bold text-xs px-3 py-1 rounded-full text-white shadow"
                  style={{ backgroundColor: card.tagColor }}
                >
                  {card.tag}
                </span>
                {/* Week badge */}
                <span className="absolute top-3 right-3 poppins font-bold text-xs px-3 py-1 rounded-full bg-[#042C89] text-white shadow">
                  {card.week}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="gasoek text-[22px] md:text-[26px] text-[#042C89] leading-tight tracking-wide mb-2">
                  {card.skill}
                </h3>
                <p className="poppins text-[#64748B] text-[14px] md:text-[15px] font-medium leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: card.tagColor }}
                  />
                  <span className="poppins text-xs text-[#64748B] font-semibold">
                    Included in all levels
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 4 Feature Highlights ── */}
        <div className="bg-[#042C89] rounded-3xl md:rounded-[40px] px-6 py-10 md:px-12 md:py-14">
          <h3 className="recline text-white text-[30px] md:text-[44px] text-center mb-8 md:mb-10 leading-tight">
            Why kids love coming back{' '}
            <span className="gasoek text-[#0DD180]">every week</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, idx) => (
              <div
                key={idx}
                className="text-center space-y-3 group"
              >
                <div className="text-4xl md:text-5xl mb-2">{feat.icon}</div>
                <h4 className="poppins font-bold text-white text-[16px] md:text-[18px]">
                  {feat.title}
                </h4>
                <p className="poppins text-white/70 text-[13px] md:text-[15px] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA inside dark card */}
          <div className="mt-10 text-center">
            <Link
              to="/book-trial"
              className="bg-[#0DD180] hover:bg-[#00c853] poppins text-white font-bold text-[16px] md:text-[18px] px-8 py-4 rounded-full hover:scale-105 transition-all cursor-pointer shadow-lg whitespace-nowrap inline-block"
            >
              Book a FREE trial session
            </Link>
            <p className="poppins text-white/50 text-xs mt-3">
              No commitment · Cancel anytime
            </p>
          </div>
        </div>

      </Container>
    </section>
  );
}

export default WeeklySkillsSection;
