import React, { useEffect, useState } from 'react';
import './QuotesList.css';

function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const [filterClient, setFilterClient] = useState('');

  useEffect(() => {
    const savedQuotes = JSON.parse(localStorage.getItem('sow_quotes') || '[]');
    setQuotes(savedQuotes);
  }, []);

  const filteredQuotes = quotes.filter((q) =>
    !filterClient ||
    q.clientName.toLowerCase().includes(filterClient.trim().toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 style={{ color: 'var(--primary-color)' }}>Saved Quotes</h2>

      <div className="mb-4">
        <label htmlFor="clientFilter" className="form-label">Search by Client</label>
        <input
          type="text"
          id="clientFilter"
          className="form-control"
          placeholder="Type client name..."
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        />
      </div>

      {filteredQuotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        <div className="row">
          {filteredQuotes.map((quote, idx) => (
            <div key={idx} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{quote.projectName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{quote.clientName}</h6>
                  <p className="card-text">
                    Date: {quote.quoteDate}<br />
                    Projects: {quote.projects.length}<br />
                    Total: $
                    {quote.projects.reduce((sum, p) => sum + (p.billingRate * p.quantity), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuotesList;
