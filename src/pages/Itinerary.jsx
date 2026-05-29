import './Itinerary.css';

function Itinerary() {
  return (
    <div className="itinerary-container">
      <div className="page-hero">
        <span className="page-eyebrow">Wedding Weekend · Notre Dame</span>
        <h1 className="page-hero-title">Itinerary</h1>
        <div className="page-hero-divider" />
      </div>
      <div className="itinerary-content">
        <div className="timeline">
          <div className="timeline-day-label">Friday, June 25th</div>
          <div className="timeline-item left">
            <div className="timeline-time">8:00 PM EST</div>
            <div className="timeline-content">
              <h3>Welcome Party</h3>
              <p>All guests are invited! Join us for drinks and desserts at Public House South Bend.</p>
            </div>
          </div>

          <div className="timeline-line-break" />
          <div className="timeline-day-label">Saturday, June 26th</div>
          <div className="timeline-line-break" />
          <div className="timeline-item right">
            <div className="timeline-time">12:30 PM EST</div>
            <div className="timeline-content">
              <h3>Venue Opens</h3>
              <p>Doors open at Le Mans Chapel.</p>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-time">1:00 PM EST</div>
            <div className="timeline-content">
              <h3>Please Be Seated</h3>
              <p>Guests should be in their seats and ready for the ceremony to begin. The chapel is located on the 4th floor of Le Mans Hall. There are elevators available for those who need them. Please plan accordingly.</p>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-time">1:30 PM EST</div>
            <div className="timeline-content">
              <h3>Ceremony</h3>
              <p>Join us as Claire and Brian say "I do"! Followed by photos with the immediate families in the chapel.</p>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-time">2:30 PM EST</div>
            <div className="timeline-content">
              <h3>Champagne Toast on The Island</h3>
              <p>Cheers the happy couple with a champagne toast on The Island located on the east side of Le Mans Hall.</p>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-time">5:00 PM EST</div>
            <div className="timeline-content">
              <h3>Cocktail Hour</h3>
              <p>Join us for cocktails and appetizers in the Morris Theatre Lobby. Please enter under the Marquee!</p>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-time">6:00 PM EST</div>
            <div className="timeline-content">
              <h3>Dinner <span className="symbol-fallback">&</span> Dancing</h3>
              <p>Celebrate with us at the reception - dinner, dancing and lots of love.</p>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-time">12:00 AM EST</div>
            <div className="timeline-content">
              <h3>After Party</h3>
              <p>Continue the celebration at the greatest bar in South Bend - Newfs!</p>
            </div>
          </div>

          <div className="timeline-line-break" />
          <div className="timeline-day-label">Sunday, June 27th</div>
          <div className="timeline-line-break" />
          <div className="timeline-item left">
            <div className="timeline-time">10:00 AM EST</div>
            <div className="timeline-content">
              <h3>Farewell Brunch</h3>
              <p>Before you head home, join us for a brunch at the Aloft Hotel.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
