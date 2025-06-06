import { Link } from 'react-router-dom';
<Link to="/build" className="btn btn-primary">Build a Quote</Link>

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 style={{ color: 'var(--primary-color)' }}>Home Page</h1>
      <p>This is your SOW Cost Calculator homepage.</p>
    </div>
  );
}

export default Home;
// This is a simple Home component that serves as the landing page for the SOW Cost Calculator application.
// It displays a welcome message and can be expanded with more features in the future.