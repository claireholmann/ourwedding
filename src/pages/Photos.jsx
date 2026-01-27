import { Link } from 'react-router-dom';
import './Photos.css';

function Photos() {
  return (
    <div className="photos-page">
      <nav className="back-nav">
        <Link to="/" className="back-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </nav>
      
      <div className="page-content">
        <h1 className="page-title">Our Story</h1>
        
        <div className="content-card">
          <div className="story-section">
            <h2 className="story-title">How We Met</h2>
            <p className="story-text">
              Add your story here - how you met, your first date, the proposal...
            </p>
          </div>
          
          <div className="photo-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="photo-placeholder">
                <p>Photo {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photos;
