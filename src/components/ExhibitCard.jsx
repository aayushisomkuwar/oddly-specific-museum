import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { formatDate, padNumber } from '../hooks/ExhibitsContext.jsx';

// Tone + mark + one of four forms (number % 4) give each card its own look
export default function ExhibitCard({ exhibit }) {
  const form = exhibit.number % 4;
  return (
    <Link to={`/exhibit/${exhibit.id}`} className={`card tone-${exhibit.tone} form-${form}`}>
      <span className="card-no">No. {padNumber(exhibit.number)}</span>
      {exhibit.fromVisitor && <span className="stamp">Visitor</span>}
      <span className="card-mark" aria-hidden="true">{exhibit.mark}</span>
      <h3 className="card-title">{exhibit.title}</h3>
      <p className="card-desc">{exhibit.description}</p>
      <span className="card-foot">
        <span className="tag">{exhibit.category}</span>
        <span className="card-date">{formatDate(exhibit.archived)}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </span>
    </Link>
  );
}
