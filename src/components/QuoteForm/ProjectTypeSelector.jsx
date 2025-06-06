import React from 'react';

const PROJECT_TYPES = [
  { label: 'Course', value: 'course' },
  { label: 'Video', value: 'video' },
  { label: 'Webinar', value: 'webinar' },
];


function ProjectTypeSelector({ projectEntries, setProjectEntries }) {
  const handleChange = (index, field, value) => {
    const updated = [...projectEntries];
    updated[index][field] = value;
    setProjectEntries(updated);
  };

  const addEntry = () => {
    setProjectEntries([...projectEntries, { type: '', quantity: 1 }]);
  };

  const removeEntry = (index) => {
    const updated = [...projectEntries];
    updated.splice(index, 1);
    setProjectEntries(updated);
  };

  return (
    <div className="mb-4">
      <h5 style={{ color: 'var(--primary-color)' }}>Project Types</h5>
      {projectEntries.map((entry, index) => (
        <div className="row mb-3" key={index}>
          <div className="col-md-6">
            <select
              className="form-select"
              value={entry.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              required
            >
              <option value="">Select Project Type</option>
              {PROJECT_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              min="1"
              className="form-control"
              value={entry.quantity}
              onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeEntry(index)}
              disabled={projectEntries.length === 1}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="btn btn-secondary mt-2" onClick={addEntry}>
        + Add Another
      </button>
    </div>
  );
}

export default ProjectTypeSelector;
