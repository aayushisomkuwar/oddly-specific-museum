import { Shuffle } from 'lucide-react';
import { useSurprise } from '../hooks/ExhibitsContext.jsx';

export default function SurpriseButton({ currentId, className = '' }) {
  const surprise = useSurprise(currentId);
  return (
    <button type="button" className={`btn btn-yellow ${className}`} onClick={surprise}>
      <Shuffle size={18} aria-hidden="true" /> Surprise me
    </button>
  );
}
