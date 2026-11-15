import ExhibitCard from './ExhibitCard.jsx';

export default function ExhibitGrid({ exhibits }) {
  return (
    <div className="grid">
      {exhibits.map((e) => (
        <ExhibitCard key={e.id} exhibit={e} />
      ))}
    </div>
  );
}
