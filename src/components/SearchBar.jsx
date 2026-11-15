import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="exhibit-search">Search the collection</label>
      <div className="search-field">
        <Search size={20} aria-hidden="true" />
        <input
          id="exhibit-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Try "fridge" or "battery"'
        />
      </div>
    </div>
  );
}
