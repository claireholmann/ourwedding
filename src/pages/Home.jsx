import { Link } from 'react-router-dom';
import './Home.css';

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
          <div className="text-side">
            <span className="text-label">Save the Date</span>
            <h1 className="photo-title">Meet Us on<br />The Avenue</h1>
            <p className="photo-intro">Wedding Ceremony</p>
            <div className="event-detail-grid" role="list" aria-label="Wedding details">
              <div className="event-detail" role="listitem">
                <span className="event-detail-label">Date</span>
                <p className="event-detail-value">Saturday, June 26th, 2027</p>
              </div>
              <div className="event-detail" role="listitem">
                <span className="event-detail-label">Time</span>
                <p className="event-detail-value">1:30 PM EST</p>
              </div>
              <div className="event-detail" role="listitem">
                <span className="event-detail-label">Location</span>
                <p className="event-detail-value">Le Mans Chapel<br />Saint Mary's College</p>
              </div>
            </div>
            <div className="event-actions">
              <Link to="/itinerary" className="event-action-link">View Itinerary</Link>
              {/* RSVP button hidden for now
              <Link to="/rsvp" className="event-action-link event-action-link-primary">RSVP</Link>
              */}
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
          <Link to="/itinerary" className="card">
            <span className="card-accent" />
            <h3 className="card-title">Itinerary</h3>
            <p className="card-description">View the schedule of events</p>
            <span className="card-arrow">→</span>
          </Link>
          <Link to="/hotel-travel" className="card">
            <span className="card-accent" />
            <h3 className="card-title">Hotel <span className="symbol-fallback">&amp;</span> Travel</h3>
            <p className="card-description">View accommodation and travel details</p>
            <span className="card-arrow">→</span>
          </Link>
        </div>
        <p className="home-footer-note">Designed &amp; built by Claire</p>
      </section>
    </div>
  );
}

export default Home;
