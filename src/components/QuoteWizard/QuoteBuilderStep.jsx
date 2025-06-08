import React, { useState } from 'react';
import ProjectTypeSelector from '../QuoteForm/ProjectTypeSelector';
import { getInternalCost } from '../../data/ProjectCosts';

function QuoteBuilderStep({ formData, onBack }) {
  const [projectEntries, setProjectEntries] = useState([
    { type: '', quantity: 1, details: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullQuote = {
      ...formData,
      projects: projectEntries.map((entry) => {
        const internal = getInternalCost(entry.type);
        const billing = internal * 1.5;
        return {
          ...entry,
          internalCost: internal,
          billingRate: billing,
          total: billing * entry.quantity,
        };
      }),
    };

    const existing = JSON.parse(localStorage.getItem('sow_quotes') || '[]');
    localStorage.setItem('sow_quotes', JSON.stringify([...existing, fullQuote]));

    console.log('Quote saved:', fullQuote);
    alert('Quote saved successfully!');
  };

  const totalQuoteAmount = projectEntries.reduce((sum, entry) => {
    const cost = getInternalCost(entry.type);
    return sum + (cost * 1.5 * entry.quantity);
  }, 0);

  return (
    <form onSubmit={handleSubmit}>
      {/* Project info header */}
      <div className="mb-4">
        <h4 style={{ color: 'var(--primary-color)' }}>Quote for {formData.clientName}</h4>
        <p className="text-muted mb-1">Project: {formData.projectName}</p>
        <p className="text-muted">Date: {formData.quoteDate}</p>
      </div>

      {/* Quote Builder */}
      <ProjectTypeSelector
        projectEntries={projectEntries}
        setProjectEntries={setProjectEntries}
      />

      {/* Total */}
      <div className="mt-4 mb-3">
        <h5>Total Quote:</h5>
        <p><strong>${totalQuoteAmount.toFixed(2)}</strong></p>
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Save Quote
        </button>
      </div>
    </form>
  );
}

export default QuoteBuilderStep;
// This component allows users to build a quote by selecting project types, quantities, and details.
// It calculates the total quote amount based on internal costs and billing rates.