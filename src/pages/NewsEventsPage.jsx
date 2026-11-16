import React from 'react';
import { Container } from '../components/common/Container';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

export function NewsEventsPage() {
  const articles = [
    {
      title: "Summer 2026 Pro Academy Scouting Trials Announced",
      date: "August 28, 2026",
      category: "Trials & Selection",
      summary: "Open trial sessions for U-12 to U-18 players to join our national competitive league teams.",
      img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "PlayPro U-14 Team Crowned Regional Turf Champions",
      date: "August 20, 2026",
      category: "Tournament Victory",
      summary: "An undefeated run in the Metropolitan Youth League brings home the championship trophy.",
      img: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "New Goalkeeper Masterclass Clinic Led By Ex-Pro Coaches",
      date: "August 12, 2026",
      category: "Specialist Clinic",
      summary: "Intensive 3-day workshop focusing on reflexes, distribution, aerial authority, and 1v1 saves.",
      img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="py-12 space-y-12">
      <section className="bg-brand-navy text-white py-14">
        <Container>
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30">
              News & Updates
            </span>
            <h1 className="gasoek  text-4xl text-white ">
              Latest News, Events & Selection Trials
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all p-6 space-y-4">
              <img src={art.img} alt={art.title} className="w-full h-44 object-cover rounded-2xl" />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="bg-brand-blue/10 text-brand-blue font-bold px-2.5 py-0.5 rounded-full">{art.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{art.date}</span>
              </div>
              <h3 className="gasoek font-bold text-lg text-slate-900 leading-snug">{art.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{art.summary}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
