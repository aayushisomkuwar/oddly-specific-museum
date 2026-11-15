import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-big">Thank you for visiting. Please take nothing, especially not the cables.</p>
      <div className="footer-row">
        <p>Oddly Specific Museum. Open all hours, staffed by no one.</p>
        <nav aria-label="Footer">
          <Link to="/explore">Explore</Link>
          <Link to="/submit">Submit</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}
