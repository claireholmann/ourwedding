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
        <div className="story-paragraphs">
          <p className="story-text">They met in May 2019 on the first day of their internship at Avanade: Brian, a data engineer and Claire, a software engineer. They became best friends almost immediately, and it continued that way for their senior years.</p>
          <p className="story-text">They graduated, Claire from Saint Mary's and Brian from Loyola in 2020. Brian decided to ask Claire to go on a walk where Claire proceeded to throw up from a mix of nerves and it being 100 degrees outside.  From that, Brian knew Claire was the one and they made it offical on September 1st, 2020.</p>
          <p className="story-text">Since then, they worked together for 4 more years, attended 32 concerts, visited 19 states, traveled to 2 countries, lived in a Lincoln Park apartment they loved, and now have a house in the burbs. </p>
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
