import React from 'react';
import useProjectCosts from '../../hooks/useProjectCosts';

function ProjectTypeSelector({ projectEntries, setProjectEntries }) {
  const { projectTypes, getInternalCost } = useProjectCosts();

  const handleChange = (index, field, value) => {
    const updated = [...projectEntries];
    updated[index][field] = field === 'quantity' ? parseInt(value) : value;
    setProjectEntries(updated);
  };

  const addEntry = () => {
    setProjectEntries([...projectEntries, { type: '', quantity: 1, details: '' }]);
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
        const billingRate = internalCost * 2; // Assuming billing rate is double the internal cost
        const totalBilling = billingRate * entry.quantity;

        return (
          <div className="row mb-4 align-items-end" key={index}>
            {/* Project Type */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={entry.type}
                onChange={(e) => handleChange(index, 'type', e.target.value)}
                required
              >
                <option value="">Select Project Type</option>
                {projectTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label}
                  </option>
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
                className="form-control"
                placeholder="Project details"
                value={entry.details || ''}
                onChange={(e) => handleChange(index, 'details', e.target.value)}
              />
            </div>

            {/* Cost Summary */}
            <div className="col-md-2 small">
              <div>Internal: <strong>${internalCost.toFixed(2)}</strong></div>
              <div>Billing: <strong>${billingRate.toFixed(2)}</strong></div>
              <div>Total: <strong>${totalBilling.toFixed(2)}</strong></div>
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
// This component allows users to select project types, enter quantities, and view cost summaries.