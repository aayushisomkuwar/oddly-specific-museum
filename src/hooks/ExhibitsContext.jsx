import { createContext, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { seedExhibits, TONES } from '../data/exhibits.js';
import useLocalStorage from './useLocalStorage.js';

const ExhibitsContext = createContext(null);

export function ExhibitsProvider({ children }) {
  const [submissions, setSubmissions] = useLocalStorage('osm.submissions', []);

  // Seed exhibits first, visitor submissions after
  const exhibits = useMemo(() => [...seedExhibits, ...submissions], [submissions]);

  const addExhibit = useCallback(
    ({ title, description, category, alias }) => {
      const number = seedExhibits.length + submissions.length + 1;
      const entry = {
        id: `visitor-${Date.now()}`,
        number,
        title,
        description,
        category,
        alias: alias || 'Anonymous visitor',
        archived: new Date().toISOString().slice(0, 10),
        tone: TONES[number % TONES.length],
        mark: title.charAt(0).toUpperCase(),
        fromVisitor: true,
        curatorNote: 'Accessioned from a visitor submission. Not yet verified. Probably never will be.',
      };
      setSubmissions((prev) => [...prev, entry]);
      return entry;
    },
    [submissions.length, setSubmissions]
  );

  return (
    <ExhibitsContext.Provider value={{ exhibits, submissions, addExhibit }}>
      {children}
    </ExhibitsContext.Provider>
  );
}

export const useExhibits = () => useContext(ExhibitsContext);

// Returns a function that jumps to a random exhibit (never the one you're on)
export function useSurprise(currentId) {
  const { exhibits } = useExhibits();
  const navigate = useNavigate();
  return useCallback(() => {
    const pool = exhibits.filter((e) => e.id !== currentId);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) navigate(`/exhibit/${pick.id}`);
  }, [exhibits, currentId, navigate]);
}

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const padNumber = (n) => String(n).padStart(3, '0');
