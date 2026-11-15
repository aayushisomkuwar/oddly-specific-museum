import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import SurpriseButton from './SurpriseButton.jsx';

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/submit', label: 'Submit' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after navigating
  useEffect(() => {
  setOpen(false);
}, [pathname]);

  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="Oddly Specific Museum, home">
        <span className="logo-mark">O</span>
        <span className="logo-text">Oddly Specific<br />Museum</span>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav id="site-nav" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
        <SurpriseButton />
      </nav>
    </header>
  );
}
