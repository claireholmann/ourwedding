import { Link } from "react-router-dom";
import "./Home.css";

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
            <h1 className="photo-title">
              Meet Us on <br />
              The Avenue
            </h1>

            <p className="events-date">Saturday, June 26th, 2027</p>

            <div className="events-timeline">
              {/* Ceremony */}
              <div className="timeline-event">
                <div className="timeline-time">2:00 PM EST</div>
                <div className="timeline-event-content">
                  <h3 className="timeline-event-title">Ceremony</h3>
                  <p className="timeline-event-location">
                    <strong>Holy Spirit Chapel</strong>
                  </p>
                  <p className="timeline-event-address">
                    Le Mans Hall, Third Floor<br />
                    Saint Mary's College<br />
                    Notre Dame, Indiana 46556
                  </p>
                </div>
              </div>

              {/* Reception */}
              <div className="timeline-event">
                <div className="timeline-time">5:30 PM EST</div>
                <div className="timeline-event-content">
                  <h3 className="timeline-event-title">Reception</h3>
                  <p className="timeline-event-location">
                    <strong>Palais Royale</strong>
                  </p>
                  <p className="timeline-event-address">
                    105 W Colfax Ave<br />
                    South Bend, Indiana 46601
                  </p>
                </div>
              </div>
            </div>

            <div className="event-actions">
              <Link to="/itinerary" className="event-action-link">
                View Full Itinerary
              </Link>
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
          <Link to="/hotel-travel" className="card">
            <span className="card-accent" />
            <h3 className="card-title">
              Hotel <span className="symbol-fallback">&amp;</span> Travel
            </h3>
            <p className="card-description">
              View accommodation and travel details
            </p>
            <span className="card-arrow">→</span>
          </Link>
          <Link to="/things-to-do" className="card">
            <span className="card-accent" />
            <h3 className="card-title">Things to Do</h3>
            <p className="card-description">View South Bend's finest</p>
            <span className="card-arrow">→</span>
          </Link>
        </div>
        <p className="home-footer-note">Designed &amp; built by Claire</p>
      </section>
    </div>
  );
}

export default Home;
