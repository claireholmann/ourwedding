import './Itinerary.css';

function Itinerary() {
  return (
    <div className="itinerary-container">
      <div className="page-hero">
        <span className="page-eyebrow">June 26, 2027 · Notre Dame</span>
        <h1 className="page-hero-title">Day Of</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="itinerary-content">
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-time">12:30 PM</div>
            <div className="timeline-content">
              <h3>Venue Opens</h3>
              <p>Doors open at Le Mans Chapel.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">1:00 PM</div>
            <div className="timeline-content">
              <h3>Please Be Seated</h3>
              <p>Guests should be in their seats and ready for the ceremony to begin. The chapel is located on the 4th floor of Le Mans Hall. There are elevators available for those who need them. Please plan accordingly.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">1:30 PM</div>
            <div className="timeline-content">
              <h3>Ceremony Begins</h3>
              <p>Join us as Claire and Brian say "I do"!</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">2:15 PM</div>
            <div className="timeline-content">
              <h3>Ceremony Ends</h3>
              <p>Followed by photos with the immediate families in the chapel.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">2:30 PM</div>
            <div className="timeline-content">
              <h3>Champagne Toast on The Island</h3>
              <p>Cheers the happy couple with a champagne toast on The Island located on the east side of Le Mans Hall.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">5:00 PM</div>
            <div className="timeline-content">
              <h3>Cocktail Hour</h3>
              <p>Join us for cocktails and appetizers in the Morris Theatre Lobby. Please enter under the Marquee!</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-time">6:00 PM</div>
            <div className="timeline-content">
              <h3>Dinner Begins</h3>
              <p>Join us for dinner and dancing at the reception venue.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
