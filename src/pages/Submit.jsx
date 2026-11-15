import SubmitExhibitForm from '../components/SubmitExhibitForm.jsx';
import { useExhibits } from '../hooks/ExhibitsContext.jsx';

export default function Submit() {
  const { submissions } = useExhibits();
  return (
    <div className="page narrow">
      <h1 className="page-title">Donate an exhibit</h1>
      <p className="lede">
        Describe something oddly specific. It is filed in the gallery straight away and kept in this browser.
        {submissions.length > 0 && ` You have donated ${submissions.length} so far.`}
      </p>
      <SubmitExhibitForm />
    </div>
  );
}
