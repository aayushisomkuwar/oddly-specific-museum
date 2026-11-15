import { CATEGORIES } from '../data/exhibits.js';

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter by category">
      {['All', ...CATEGORIES].map((c) => (
        <button
          key={c}
          type="button"
          className={`chip ${value === c ? 'is-on' : ''}`}
          aria-pressed={value === c}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
