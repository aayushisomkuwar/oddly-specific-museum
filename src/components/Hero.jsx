import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCw, ArrowRight } from 'lucide-react';
import { useExhibits, padNumber } from '../hooks/ExhibitsContext.jsx';
import SurpriseButton from './SurpriseButton.jsx';

export default function Hero() {
  const { exhibits } = useExhibits();
  const [index, setIndex] = useState(0);
  const current = exhibits[index % exhibits.length];

  return (
    <section className="hero">
      <div className="hero-copy">
        <h1 className="hero-title">Oddly specific. Permanently archived.</h1>
        <p className="hero-tag">A museum for things that probably didn't need preserving.</p>
        <div className="hero-actions">
          <Link to="/explore" className="btn btn-blue">Enter the galleries <ArrowRight size={18} aria-hidden="true" /></Link>
          <SurpriseButton />
        </div>
      </div>

      {/* Interactive preview: flip through exhibits without leaving the page */}
      <div className="hero-preview" aria-live="polite">
        <div className={`preview-card tone-${current.tone}`}>
          <span className="card-no">Now on view, No. {padNumber(current.number)}</span>
          <span className="preview-mark" aria-hidden="true">{current.mark}</span>
          <p className="preview-title">{current.title}</p>
        </div>
        <button type="button" className="btn btn-cream" onClick={() => setIndex((i) => i + 1)}>
          <RotateCw size={16} aria-hidden="true" /> Next exhibit
        </button>
        <Link to={`/exhibit/${current.id}`} className="preview-link">Read the label</Link>
      </div>
    </section>
  );
}
