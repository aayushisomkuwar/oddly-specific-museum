import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useExhibits, formatDate, padNumber } from '../hooks/ExhibitsContext.jsx';
import ExhibitCard from '../components/ExhibitCard.jsx';
import SurpriseButton from '../components/SurpriseButton.jsx';
import NotFound from './NotFound.jsx';

export default function ExhibitDetail() {
  const { id } = useParams();
  const { exhibits } = useExhibits();
  const navigate = useNavigate();
  const exhibit = exhibits.find((e) => e.id === id);

  if (!exhibit) return <NotFound message="That exhibit isn't in the archive." />;

  // Same category first, then fill up with other exhibits
  const others = exhibits.filter((e) => e.id !== exhibit.id);
  const related = [
    ...others.filter((e) => e.category === exhibit.category),
    ...others.filter((e) => e.category !== exhibit.category),
  ].slice(0, 3);

  // Go back if we came from inside the site, otherwise to the gallery
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/explore'));

  return (
    <article className="page detail">
      <button type="button" className="back" onClick={goBack}>
        <ArrowLeft size={18} aria-hidden="true" /> Back
      </button>

      <div className="detail-layout">
        <div className={`detail-plate tone-${exhibit.tone}`} aria-hidden="true">
          <span>{exhibit.mark}</span>
        </div>

        <div className="detail-body">
          <p className="card-no">Exhibit No. {padNumber(exhibit.number)}</p>
          <h1 className="detail-title">{exhibit.title}</h1>
          <p className="detail-desc">{exhibit.description}</p>
          <p className="curator"><em>Curator's note:</em> {exhibit.curatorNote}</p>

          <dl className="meta">
            <div><dt>Category</dt><dd>{exhibit.category}</dd></div>
            <div><dt>Archived</dt><dd>{formatDate(exhibit.archived)}</dd></div>
            <div><dt>Donated by</dt><dd>{exhibit.alias || 'The Museum'}</dd></div>
            <div><dt>Accession</dt><dd>OSM-{padNumber(exhibit.number)}</dd></div>
          </dl>

          <SurpriseButton currentId={exhibit.id} />
        </div>
      </div>

      <section className="section" aria-labelledby="related-h">
        <h2 id="related-h" className="section-title">Related exhibits</h2>
        <div className="featured">
          {related.map((e) => <ExhibitCard key={e.id} exhibit={e} />)}
        </div>
        <p className="more"><Link to="/explore">See the whole collection</Link></p>
      </section>
    </article>
  );
}
