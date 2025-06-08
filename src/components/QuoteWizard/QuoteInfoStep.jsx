function QuoteInfoStep({ formData, setFormData, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: 'var(--primary-color)' }}>Project Information</h2>

      <div className="mb-3">
        <label className="form-label">Client Name</label>
        <input
          type="text"
          className="form-control"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Quote Date</label>
        <input
          type="date"
          className="form-control"
          name="quoteDate"
          value={formData.quoteDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  );
}

export default QuoteInfoStep;
// This component collects basic project information from the user.
// It includes fields for client name, project name, and quote date.