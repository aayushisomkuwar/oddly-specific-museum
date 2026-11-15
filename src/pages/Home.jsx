import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import ExhibitCard from '../components/ExhibitCard.jsx';
import { useExhibits } from '../hooks/ExhibitsContext.jsx';
import { CATEGORIES } from '../data/exhibits.js';

const FEATURED_IDS = ['songs-at-217', 'forty-seven-tabs', 'emotional-support-bottle'];

export default function Home() {
  const { exhibits, submissions } = useExhibits();
  const featured = FEATURED_IDS.map((id) => exhibits.find((e) => e.id === id)).filter(Boolean);
  const countIn = (c) => exhibits.filter((e) => e.category === c).length;

  const stats = [
    { value: exhibits.length, label: 'exhibits on view' },
    { value: CATEGORIES.length, label: 'collections' },
    { value: submissions.length, label: 'donated by visitors' },
    { value: 0, label: 'that needed preserving' },
  ];

  return (
    <>
      <Hero />

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <span key={i}>Now showing: the last 3% of battery &nbsp;•&nbsp; the chair that became a wardrobe &nbsp;•&nbsp; 47 open tabs &nbsp;•&nbsp; a drawer of cables &nbsp;•&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      <section className="section" aria-labelledby="featured-h">
        <h2 id="featured-h" className="section-title">Featured exhibits</h2>
        <div className="featured">
          {featured.map((e) => <ExhibitCard key={e.id} exhibit={e} />)}
        </div>
      </section>

      <section className="section" aria-labelledby="collections-h">
        <h2 id="collections-h" className="section-title">Browse collections</h2>
        <ul className="collection-list">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link to={`/explore?category=${encodeURIComponent(c)}`}>
                <span>{c}</span>
                <span className="collection-count">{countIn(c)} on view</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section stats" aria-label="Museum statistics">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="cta">
        <h2>Got something oddly specific?</h2>
        <p>Donate an observation, an object or a thought. We accept anything and judge nothing aloud.</p>
        <Link to="/submit" className="btn btn-yellow">Submit an exhibit <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </>
  );
}
