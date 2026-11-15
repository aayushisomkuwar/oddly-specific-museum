import { Link } from 'react-router-dom';

const principles = [
  ['If you noticed it, it counts.', 'An exhibit needs only one witness. Two witnesses make it a movement.'],
  ['Smaller is better.', 'The more specific the observation, the more likely a stranger says "wait, me too".'],
  ['Nothing is ever deaccessioned.', 'We do not throw anything out. See: the drawer of cables.'],
  ['Preserve, do not fix.', 'We document the 47 tabs. We do not close them.'],
];

export default function About() {
  return (
    <div className="page narrow">
      <h1 className="page-title">About the museum</h1>
      <p className="lede">
        Oddly Specific Museum archives the tiny, strange, shared moments that never make it into a history book:
        the half-typed message, the chair of clothes, the song that only works at 2:17 AM. It is a museum for things
        that probably didn't need preserving, and we preserve them with total seriousness.
      </p>
      <h2 className="section-title">Our archival philosophy</h2>
      <ol className="principles">
        {principles.map(([title, text]) => (
          <li key={title}><strong>{title}</strong> <span>{text}</span></li>
        ))}
      </ol>
      <p className="more">Have one of your own? <Link to="/submit">Donate an exhibit</Link>.</p>
    </div>
  );
}
