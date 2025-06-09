import React, { useState } from 'react';
import ProjectTypeSelector from '../QuoteForm/ProjectTypeSelector';
import { getInternalCost } from '../../data/ProjectCosts';
import { exportQuoteToExcel } from '../../utils/exportToExcel';

function QuoteBuilderStep({ formData, onBack }) {
  const [projectEntries, setProjectEntries] = useState([
    { type: '', quantity: 1, details: '' },
  ]);

  const [savedQuote, setSavedQuote] = useState(null);

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

    setSavedQuote(fullQuote);
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
      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBack}
        >
          Back
        </button>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Save Quote
        </button>

        {savedQuote && (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => exportQuoteToExcel(savedQuote)}
          >
            Export to Excel
          </button>
        )}
      </div>
    </form>
  );
}

export default QuoteBuilderStep;
// This component allows users to build a quote by selecting project types, entering quantities, and viewing the total cost.
// It calculates internal costs based on predefined rates, allows saving the quote to local storage, and provides an option to export the quote to Excel.