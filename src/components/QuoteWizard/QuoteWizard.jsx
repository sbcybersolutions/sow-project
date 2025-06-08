import React, { useState } from 'react';
import QuoteInfoStep from './QuoteInfoStep';
import QuoteBuilderStep from './QuoteBuilderStep';

function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    quoteDate: new Date().toISOString().split('T')[0],
  });

  return (
    <div className="container mt-4">
      {step === 1 && (
        <QuoteInfoStep
          formData={formData}
          setFormData={setFormData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <QuoteBuilderStep
          formData={formData}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
}

export default QuoteWizard;
