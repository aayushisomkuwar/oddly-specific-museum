import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/exhibits.js';
import { useExhibits } from '../hooks/ExhibitsContext.jsx';

const empty = { title: '', description: '', category: '', alias: '' };

function validate(v) {
  const errors = {};
  const title = v.title.trim();
  const description = v.description.trim();
  if (title.length < 5) errors.title = 'Give your exhibit a title of at least 5 characters.';
  else if (title.length > 80) errors.title = 'Keep the title under 80 characters.';
  if (description.length < 20) errors.description = 'Describe it in at least 20 characters.';
  else if (description.length > 400) errors.description = 'Keep the description under 400 characters.';
  if (!v.category) errors.category = 'Choose a category.';
  if (v.alias.trim().length > 24) errors.alias = 'Aliases can be at most 24 characters.';
  return errors;
}

export default function SubmitExhibitForm() {
  const { addExhibit } = useExhibits();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [added, setAdded] = useState(null);

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setAdded(null);
      return;
    }
    const entry = addExhibit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      alias: values.alias.trim(),
    });
    setAdded(entry);
    setValues(empty);
  };

  const aria = (id) => ({ 'aria-invalid': !!errors[id], 'aria-describedby': errors[id] ? `${id}-error` : undefined });
  const err = (id) => errors[id] && <p className="error" id={`${id}-error`} role="alert">{errors[id]}</p>;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {added && (
        <div className="success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <p>Accessioned as exhibit No. {added.number}. <Link to={`/exhibit/${added.id}`}>Visit it in the gallery</Link>.</p>
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <p className="error-summary" role="alert">Some details need another look. Check the highlighted fields.</p>
      )}

      <div className="field">
        <label htmlFor="title">Exhibit title</label>
        <input id="title" value={values.title} onChange={set('title')} maxLength={100} {...aria('title')} />
        {err('title')}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" rows={5} value={values.description} onChange={set('description')} {...aria('description')} />
        <p className="hint">{values.description.trim().length}/400</p>
        {err('description')}
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" value={values.category} onChange={set('category')} {...aria('category')}>
          <option value="">Choose a category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {err('category')}
      </div>
      <div className="field">
        <label htmlFor="alias">Your alias (optional)</label>
        <input id="alias" value={values.alias} onChange={set('alias')} {...aria('alias')} />
        <p className="hint">Shown on the exhibit label. Leave blank to stay anonymous.</p>
        {err('alias')}
      </div>

      <button type="submit" className="btn btn-blue"><Send size={18} aria-hidden="true" /> Submit exhibit</button>
    </form>
  );
}
