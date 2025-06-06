import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import QuoteForm from './components/QuoteForm/QuoteForm';
import QuotesList from './components/QuotesList/QuotesList'; // ✅ plural "Quotes"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<QuoteForm />} />
      <Route path="/quotes" element={<QuotesList />} /> 
    </Routes>
  );
}

export default App;

