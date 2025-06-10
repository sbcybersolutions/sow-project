import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function QuoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const savedQuotes = JSON.parse(localStorage.getItem('sow_quotes') || '[]');
    const selected = savedQuotes[parseInt(id)];
    if (!selected) {
      alert('Quote not found');
      navigate('/quotes');
    } else {
      setQuote(selected);
    }
  }, [id, navigate]);

  if (!quote) return null;

  return (
    <div className="container mt-4">
      <h2 style={{ color: 'var(--primary-color)' }}>Quote Details</h2>
      <p><strong>Client:</strong> {quote.clientName}</p>
      <p><strong>Project:</strong> {quote.projectName}</p>
      <p><strong>Date:</strong> {quote.quoteDate}</p>

      {quote.projects.map((proj, i) => (
        <div key={i} className="mb-4">
          <h5 className="mt-3">{proj.type}</h5>
          <p>
            <strong>Quantity:</strong> {proj.quantity} <br />
            <strong>Billing Rate:</strong> ${proj.billingRate} <br />
            <strong>Total:</strong> ${proj.total.toFixed(2)} <br />
            {proj.details && <strong>Notes:</strong>} {proj.details}
          </p>

          {proj.breakdown?.length > 0 && (
            <>
              <h6>Internal Breakdown:</h6>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Hours</th>
                    <th>Rate</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {proj.breakdown.map((item, j) => (
                    <tr key={j}>
                      <td>{item.role}</td>
                      <td>{item.hours}</td>
                      <td>${item.rate}</td>
                      <td>${(item.hours * item.rate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      ))}

      <h5 className="mt-4">
        Grand Total: $
        {quote.projects.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
      </h5>

      <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/quotes')}>
        ← Back to Quotes
      </button>
    </div>
  );
}

export default QuoteDetail;
// This component displays the details of a specific quote.
// It retrieves the quote from local storage based on the ID in the URL parameters.