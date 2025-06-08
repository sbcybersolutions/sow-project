import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import QuoteForm from './components/QuoteForm/QuoteForm';
import QuotesList from './components/QuotesList/QuotesList'; // ✅ plural "Quotes"
import QuoteWizard from './components/QuoteWizard/QuoteWizard';
import Navbar from './components/Layout/Navbar';



function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<QuoteWizard />} />
          <Route path="/quotes" element={<QuotesList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

