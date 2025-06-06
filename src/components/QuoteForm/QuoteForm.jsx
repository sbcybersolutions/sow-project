import React, { useState } from 'react';
import './QuoteForm.css';
import ProjectTypeSelector from './ProjectTypeSelector';

function QuoteForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    quoteDate: new Date().toISOString().split('T')[0],
  });

  const [projectEntries, setProjectEntries] = useState([
    { type: '', quantity: 1 }
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
      projects: projectEntries,
    };
    console.log('Submitted Quote:', fullQuote);
    // TODO: Pass to context / API
  };

  return (
    <div className="container mt-4 quote-form">
      <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>Build a Quote</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing fields */}
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

        {/* New project type selector */}
        <ProjectTypeSelector
          projectEntries={projectEntries}
          setProjectEntries={setProjectEntries}
        />

        <button type="submit" className="btn btn-primary">Next</button>
      </form>
    </div>
  );
}

export default QuoteForm;
// This component is the main form for building a quote in the SOW Cost Calculator application.
// It includes fields for client name, project name, quote date, and a dynamic project type selector.