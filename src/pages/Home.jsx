import { Link } from 'react-router-dom';
import './Home.css';
import walk from '../assets/images/engagement/walk.JPG';

function Home() {

  return (
    <div className="home-container">
      {/* Title Section */}
      <section id="title" className="home-section title-section">
        <div className="title-content">
          <h1 className="title-name">CLAIRE</h1>
          <h3 className="title-and">and</h3>
          <h1 className="title-name">BRIAN</h1>
          <p className="title-subtitle">ARE GETTING MARRIED!</p>
        </div>
      </section>

      {/* Photo and Text Section */}
      <section id="photo-text" className="home-section photo-text-section">
        <div className="photo-text-container">
          <div className="photo-side">
            <img src={walk} alt="Claire and Brian" className="section-image" />
          </div>
          <div className="text-side">
            <h1 className="photo-title">Meet Us on The Avenue</h1>
            <h1 className="photo-date">June 26th, 2027</h1>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="home-section details-section">
        <h2 className="details-section-title">The Details</h2>
        <div className="details-content">
          <div className="detail-item">
            <h3 className="detail-heading">Date</h3>
            <p className="detail-text">Saturday, June 26, 2027</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-heading">Location</h3>
            <p className="detail-text">Le Mans Chapel</p>
            <p className="detail-subtext">Saint Mary's College, Notre Dame, Indiana</p>
          </div>
          <div className="detail-item">
            <h3 className="detail-heading">Time</h3>
            <p className="detail-text">Ceremony at 3:00 PM</p>
            <p className="detail-subtext">Reception to follow</p>
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section id="more" className="home-section more-section">
        <h2 className="more-section-title">Explore More</h2>
        <div className="cards-grid">
          <Link to="/registry" className="card">
            <div className="card-icon">🎁</div>
            <h3 className="card-title">Registry</h3>
            <p className="card-description">View our gift registry</p>
          </Link>
          
          <Link to="/photos" className="card">
            <div className="card-icon">📸</div>
            <h3 className="card-title">Photos</h3>
            <p className="card-description">See our story</p>
          </Link>
          
          <Link to="/bridal-party" className="card">
            <div className="card-icon">👰🤵</div>
            <h3 className="card-title">Bridal Party</h3>
            <p className="card-description">Meet the crew</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
