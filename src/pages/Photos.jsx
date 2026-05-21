import './Photos.css';

function Photos() {
  return (
    <div className="photos-page">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian</span>
        <h1 className="page-hero-title">Our Story</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="photos-content">
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
  );
}

export default Photos;
