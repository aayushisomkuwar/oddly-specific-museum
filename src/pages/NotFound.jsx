import { Link } from 'react-router-dom';

export default function NotFound({ message = 'This page wandered off, like a sock from the dryer.' }) {
  return (
    <div className="page narrow empty">
      <p className="empty-mark" aria-hidden="true">404</p>
      <h1 className="page-title">Not on display</h1>
      <p className="lede">{message}</p>
      <Link to="/explore" className="btn btn-blue">Back to the collection</Link>
    </div>
  );
}
