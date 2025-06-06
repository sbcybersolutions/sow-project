import React from 'react';
import { PROJECT_COST_BREAKDOWN } from '../../data/ProjectCosts';
import { getInternalCost } from '../../data/ProjectCosts';

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
      {projectEntries.map((entry, index) => {
  const internalCost = getInternalCost(entry.type);
  const billingRate = internalCost * 1.5;
  const totalBilling = billingRate * entry.quantity;

  return (
    <div className="row mb-4 align-items-end" key={index}>
      {/* Project Type Selector */}
      <div className="col-md-3">
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

      {/* Quantity */}
      <div className="col-md-2">
        <input
          type="number"
          min="1"
          className="form-control"
          value={entry.quantity}
          onChange={(e) => handleChange(index, 'quantity', e.target.value)}
          required
        />
      </div>

      {/* Details */}
      <div className="col-md-3">
        <input
          type="text"
          placeholder="Project details or notes"
          className="form-control"
          value={entry.details || ''}
          onChange={(e) => handleChange(index, 'details', e.target.value)}
        />
      </div>

      {/* Cost Summary */}
      <div className="col-md-2">
        <div className="cost-summary small">
          <div>Internal: <strong>${internalCost}</strong></div>
          <div>Billing: <strong>${billingRate}</strong></div>
          <div>Total: <strong>${totalBilling}</strong></div>
        </div>
      </div>

      {/* Remove Button */}
      <div className="col-md-2">
        <button
          type="button"
          className="btn btn-outline-danger w-100"
          onClick={() => removeEntry(index)}
          disabled={projectEntries.length === 1}
        >
          Remove
        </button>
      </div>
    </div>
  );
})}


      <button type="button" className="btn btn-secondary mt-2" onClick={addEntry}>
        + Add Another
      </button>
    </div>
  );
}

export default ProjectTypeSelector;
