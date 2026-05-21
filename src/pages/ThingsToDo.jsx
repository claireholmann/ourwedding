import './ThingsToDo.css';

function ThingsToDo() {
  return (
    <div className="things-to-do-container">
      <div className="page-hero">
        <span className="page-eyebrow">South Bend & Notre Dame</span>
        <h1 className="page-hero-title">Things To Do</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="things-to-do-content">
        <section className="activities-section">
          <span className="section-eyebrow">Explore the Area</span>
          <h2 className="section-heading">Nearby Attractions</h2>
          <div className="activities-grid">
            <div className="activity-card">
              <h3 className="activity-name">Saint Mary<span className="page-hero-apostrophe">'</span>s College Campus Tour</h3>
              <p className="activity-location">Notre Dame, IN</p>
              <p className="activity-description">
                Explore THE most beautiful college campus in America. Le Mans Hall is officially 150 years old!
              </p>
            </div>

            <div className="activity-card">
              <h3 className="activity-name">University of Notre Dame Campus Tour</h3>
              <p className="activity-location">Notre Dame, IN</p>
              <p className="activity-description">
                Explore the second most beautiful college campus in America. The Golden Dome is iconic and light a candle at the Grotto.
              </p>
            </div>

            <div className="activity-card">
              <h3 className="activity-name">South Bend Museum of Art</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Enjoy contemporary and traditional art exhibits. A great cultural experience with rotating collections.
              </p>
            </div>

            <div className="activity-card">
              <h3 className="activity-name">Potawatomi Zoo</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Home to over 500 animals from around the world. Perfect for families visiting the area.
              </p>
            </div>

            <div className="activity-card">
              <h3 className="activity-name">Chocolate Lounge</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Indulge in artisanal chocolates and desserts. A sweet treat for chocolate lovers!
              </p>
            </div>

            <div className="activity-card">
              <h3 className="activity-name">Healing Wellness Center</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Relax with spa services and wellness treatments. Perfect for destressing before the wedding.
              </p>
            </div>

            <div className="activity-card">
              <h3 className="activity-name">Hudson Gardens</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Beautiful lakeside gardens perfect for peaceful walks and nature photography.
              </p>
            </div>
          </div>
        </section>

        <section className="dining-section">
          <span className="section-eyebrow">Local Favorites</span>
          <h2 className="section-heading">Where to Eat</h2>
          <div className="restaurants-grid">
            <div className="restaurant-card">
              <h3 className="restaurant-name">Café Navarre</h3>
              <p className="restaurant-cuisine">French/Contemporary</p>
              <p className="restaurant-info">Upscale dining with locally-sourced ingredients and an elegant atmosphere.</p>
            </div>

            <div className="restaurant-card">
              <h3 className="restaurant-name">LaSalle Grill</h3>
              <p className="restaurant-cuisine">Fine Dining</p>
              <p className="restaurant-info">Award-winning restaurant featuring steaks, seafood, and an extensive wine list.</p>
            </div>

            <div className="restaurant-card">
              <h3 className="restaurant-name">Café Graffiti</h3>
              <p className="restaurant-cuisine">Italian</p>
              <p className="restaurant-info">Cozy Italian spot with homemade pasta and traditional recipes.</p>
            </div>

            <div className="restaurant-card">
              <h3 className="restaurant-name">Café Capri</h3>
              <p className="restaurant-cuisine">Italian</p>
              <p className="restaurant-info">Family-owned Italian restaurant with a warm, welcoming atmosphere.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ThingsToDo;
