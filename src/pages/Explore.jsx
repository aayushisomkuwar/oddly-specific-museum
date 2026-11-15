import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useExhibits } from '../hooks/ExhibitsContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ExhibitGrid from '../components/ExhibitGrid.jsx';
import SurpriseButton from '../components/SurpriseButton.jsx';

export default function Explore() {
  const { exhibits } = useExhibits();
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const query = params.get('q') || '';
  const category = params.get('category') || 'All';

  // Short "unpacking the archive" moment on first visit
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exhibits.filter((e) => {
      const matchesCategory = category === 'All' || e.category === category;
      const matchesText = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      return matchesCategory && matchesText;
    });
  }, [exhibits, query, category]);

  const filtersActive = query || category !== 'All';

  return (
    <div className="page">
      <h1 className="page-title">The collection</h1>

      <div className="toolbar">
        <SearchBar value={query} onChange={(v) => update('q', v, '')} />
        <CategoryFilter value={category} onChange={(v) => update('category', v, 'All')} />
        <div className="toolbar-actions">
          {filtersActive && (
            <button type="button" className="btn btn-cream" onClick={() => setParams({}, { replace: true })}>
              <X size={16} aria-hidden="true" /> Clear filters
            </button>
          )}
          <SurpriseButton />
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {loading ? 'Unpacking the archive...' : `${results.length} ${results.length === 1 ? 'exhibit' : 'exhibits'} found`}
      </p>

      {loading ? (
        <div className="grid" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="card skeleton" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="empty">
          <p className="empty-mark" aria-hidden="true">0</p>
          <h2>Nothing in the archive matches that.</h2>
          <p>Try a shorter word or clear the filters. Or <Link to="/submit">donate the missing exhibit</Link>.</p>
        </div>
      ) : (
        <ExhibitGrid exhibits={results} />
      )}
    </div>
  );
}
