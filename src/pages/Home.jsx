import { Link } from 'react-router-dom';
import './Home.css';
import walk from '../assets/images/engagement/walk.JPG';

function Home() {

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section id="title" className="home-section title-section">
        <div className="hero-overlay" />
        <div className="title-content">
          <p className="title-eyebrow">June 26th, 2027 · Notre Dame, Indiana</p>
          <h1 className="title-name">CLAIRE</h1>
          <h3 className="title-and">and</h3>
          <h1 className="title-name">BRIAN</h1>
          <div className="title-divider" />
          <p className="title-subtitle">ARE GETTING MARRIED</p>
        </div>
      </section>

      {/* Photo and Text Section */}
      <section id="photo-text" className="home-section photo-text-section">
        <div className="photo-text-container">
          <div className="photo-side">
            <img src={walk} alt="Claire and Brian" className="section-image" />
          </div>
          <div className="text-side">
            <span className="text-label">Save the Date</span>
            <h1 className="photo-title">Meet Us on<br />The Avenue</h1>
            <div className="photo-info-block">
              <p className="photo-date">June 26th, 2027</p>
              <div className="photo-info-divider" />
              <p className="photo-time">1:30 PM EST</p>
              <p className="photo-location">Le Mans Chapel · Saint Mary's College</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="home-section details-section">
        <div className="details-inner">
          <h2 className="details-section-title">The Details</h2>
          <div className="details-content">
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <p className="detail-text">Saturday, June 26th, 2027</p>
            </div>
            <div className="detail-divider" />
            <div className="detail-item">
              <span className="detail-label">Ceremony</span>
              <p className="detail-text">Le Mans Chapel</p>
              <p className="detail-subtext">Saint Mary's College, Notre Dame, Indiana</p>
            </div>
            <div className="detail-divider" />
            <div className="detail-item">
              <span className="detail-label">Time</span>
              <p className="detail-text">1:30 PM</p>
              <p className="detail-subtext">Reception to follow</p>
            </div>
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section id="more" className="home-section more-section">
        <h2 className="more-section-title">Explore More</h2>
        <div className="cards-grid">
          <Link to="/registry" className="card">
            <span className="card-accent" />
            <h3 className="card-title">Registry</h3>
            <p className="card-description">View our gift registry</p>
            <span className="card-arrow">→</span>
          </Link>
          <Link to="/photos" className="card">
            <span className="card-accent" />
            <h3 className="card-title">Photos</h3>
            <p className="card-description">See our story</p>
            <span className="card-arrow">→</span>
          </Link>
          <Link to="/bridal-party" className="card">
            <span className="card-accent" />
            <h3 className="card-title">Bridal Party</h3>
            <p className="card-description">Meet the crew</p>
            <span className="card-arrow">→</span>
          </Link>
        </div>
        <p className="home-footer-note">Designed &amp; built by Claire</p>
      </section>
    </div>
  );
}

export default Home;
