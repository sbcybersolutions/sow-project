import React, { useState } from 'react';
import './QuoteForm.css';

function QuoteForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    quoteDate: new Date().toISOString().split('T')[0], // default to today
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form:', formData);
    // Move to next step or save to context/state
  };

  return (
    <div className="container mt-4 quote-form">
      <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>Build a Quote</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary">Next</button>
      </form>
    </div>
  );
}

export default QuoteForm;
