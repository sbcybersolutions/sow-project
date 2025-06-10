import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

      {/* Client search input */}
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
                    <strong>Date:</strong> {quote.quoteDate}<br />
                    <strong>Projects:</strong> {quote.projects.length}<br />
                    <strong>Total:</strong> $
                    {quote.projects.reduce((sum, p) => sum + (p.billingRate * p.quantity), 0).toFixed(2)}
                  </p>

                  <Link to={`/quotes/${idx}`} className="btn btn-sm btn-outline-primary mt-2">
                    View Details
                  </Link>
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
