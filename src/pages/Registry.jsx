import { Link } from 'react-router-dom';
import './Registry.css';

function Registry() {
  return (
    <div className="registry-page">
      <nav className="back-nav">
        <Link to="/" className="back-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </nav>
      
      <div className="page-content">
        <h1 className="page-title">Gift Registry</h1>
        
        <div className="content-card">
          <p className="intro-text">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
            we've registered at the following stores:
          </p>
          
          <div className="registry-list">
            <a href="#" className="registry-link">
              <h3 className="registry-title">Amazon</h3>
              <p className="registry-description">View our Amazon registry</p>
            </a>
            
            <a href="#" className="registry-link">
              <h3 className="registry-title">Target</h3>
              <p className="registry-description">View our Target registry</p>
            </a>
            
            <a href="#" className="registry-link">
              <h3 className="registry-title">Crate & Barrel</h3>
              <p className="registry-description">View our Crate & Barrel registry</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registry;
