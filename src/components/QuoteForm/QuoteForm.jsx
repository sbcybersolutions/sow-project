import React, { useState } from 'react';
import './QuoteForm.css';
import ProjectTypeSelector from './ProjectTypeSelector';
import { getInternalCost } from '../../data/ProjectCosts';

function QuoteForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    quoteDate: new Date().toISOString().split('T')[0],
  });

  const [projectEntries, setProjectEntries] = useState([
    { type: '', quantity: 1, details: '' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    console.log('Submitted Quote:', fullQuote);
    // TODO: Save or export
  };

  const totalQuoteAmount = projectEntries.reduce((sum, entry) => {
    const internal = getInternalCost(entry.type);
    const billing = internal * 1.5;
    return sum + billing * entry.quantity;
  }, 0);

  return (
    <div className="container mt-4 quote-form">
      <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>Build a Quote</h2>
      <form onSubmit={handleSubmit}>
        {/* Client Name */}
        <div className="mb-3">
          <label htmlFor="clientName" className="form-label">Client Name</label>
          <input
            type="text"
            className="form-control"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Name */}
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quote Date */}
        <div className="mb-3">
          <label htmlFor="quoteDate" className="form-label">Quote Date</label>
          <input
            type="date"
            className="form-control"
            id="quoteDate"
            name="quoteDate"
            value={formData.quoteDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Type Selector */}
        <ProjectTypeSelector
          projectEntries={projectEntries}
          setProjectEntries={setProjectEntries}
        />

        {/* Total Quote */}
        <div className="mt-4 mb-3">
          <h5>Total Quote:</h5>
          <p>
            <strong>${totalQuoteAmount.toFixed(2)}</strong>
          </p>
        </div>

        <button type="submit" className="btn btn-primary">Submit Quote</button>
      </form>
    </div>
  );
}

export default QuoteForm;
