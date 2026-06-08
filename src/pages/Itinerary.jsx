// import { useState } from 'react';
import './Itinerary.css';

const ITINERARY_RSVP_STORAGE_KEY = 'bck_rsvp_itinerary';

function Itinerary() {
  // const [{ showRehearsalDetails, householdName }] = useState(() => {
  //   try {
  //     const raw = localStorage.getItem(ITINERARY_RSVP_STORAGE_KEY);
  //     if (!raw) return { showRehearsalDetails: false, householdName: '' };

  //     const parsed = JSON.parse(raw);
  //     return {
  //       showRehearsalDetails: !!parsed?.attendingRehearsalDinner,
  //       householdName: String(parsed?.householdName || '').trim(),
  //     };
  //   } catch {
  //     // Ignore storage/parse errors and keep default itinerary view.
  //     return { showRehearsalDetails: false, householdName: '' };
  //   }
  // });

  return (
    <div className="itinerary-container">
      <div className="page-hero">
        <span className="page-eyebrow">Wedding Weekend · Notre Dame, IN</span>
        <h1 className="page-hero-title">Itinerary</h1>
        <div className="page-hero-divider" />
      </div>
      <div className="itinerary-content">
        <div className="timeline">
          <p className="time-notice">Please keep in mind that South Bend is in Eastern Time Zone (EST).</p>
          <div className="timeline-day-label"><span className="timeline-day-week">Friday</span><span className="timeline-day-date">June 25th</span></div>

          {/* {showRehearsalDetails && (
            <div className="timeline-item left">
              <div className="timeline-time">For Your Group</div>
              <div className="timeline-content">
                <h3>Your Rehearsal Dinner Details</h3>
                <p>
                  {householdName ? `${householdName}, ` : ''}
                  we have you marked as attending the rehearsal dinner. Venue: Macri's Italian. Please arrive 10-15 minutes early and check in with the host stand on arrival.
                </p>
              </div>
            </div>
          )} */}

          <div className="timeline-item left">
            <div className="timeline-time">8:00 PM EST</div>
            <div className="timeline-content">
              <h3>Welcome Party</h3>
              <p className="timeline-description">
                All guests are invited! Join us for drinks and desserts at Howard Park Public House.
              </p>
              <p className="timeline-detail"><strong>Address</strong><br />602 E Jefferson Blvd<br />South Bend, IN 46617</p>
            </div>
          </div>

          <div className="timeline-line-break" />
          <div className="timeline-day-label"><span className="timeline-day-week">Saturday</span><span className="timeline-day-date">June 26th</span></div>
          <div className="timeline-line-break" />
          {/* <div className="timeline-item right">
            <div className="timeline-time">1:00 PM EST</div>
            <div className="timeline-content">
              <h3>Venue Opens</h3>
              <p className="timeline-description">
                Doors open at Holy Spirit Chapel in Le Mans Hall. Please reference the map for parking and directions to the Chapel.
              </p>
              <p className="timeline-detail"><strong>Address</strong><br />Le Mans Hall, Third Floor<br />Saint Mary's College<br />Notre Dame, IN 46556</p>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-time">1:30 PM EST</div>
            <div className="timeline-content">
              <h3>Please Be Seated</h3>
              <p>Guests should be in their seats and ready for the ceremony to begin. The chapel is located on the 3rd floor of Le Mans Hall. There are elevators available for those who need them. Please plan accordingly.</p>
            </div>
          </div> */}
          <div className="timeline-item right">
            <div className="timeline-time">2:00 PM EST</div>
            <div className="timeline-content">
              <h3>Ceremony</h3>
              <p>Join us as Claire and Brian say "I do"! Followed by photos with the immediate families in the chapel.</p>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-time">3:30 PM EST</div>
            <div className="timeline-content">
              <h3>Champagne Toast on The Island</h3>
              <p>Cheers to the happy couple with a champagne toast on The Island located on the southeast side of Le Mans Hall.</p>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-time">5:30 PM EST</div>
            <div className="timeline-content">
              <h3>Cocktail Hour</h3>
              <p className="timeline-description">
                Join us for cocktails and appetizers in the Morris Performing Arts Center Lobby attached to the Palais Royale. Please enter under the Marquee!
              </p>
              <p className="timeline-detail"><strong>Address</strong><br />211 N Michigan St<br />South Bend, IN 46601</p>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-time">6:30 PM EST</div>
            <div className="timeline-content">
              <h3>Dinner <span className="symbol-fallback">&</span> Dancing</h3>
              <p className="timeline-description">
                Celebrate with us at the reception located at the Palais Royale attached to the Morris Performing Arts Center!
              </p>
              <p className="timeline-detail"><strong>Address</strong><br />105 W Colfax Ave<br />South Bend, IN 46601</p>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-time">12:00 AM EST</div>
            <div className="timeline-content">
              <h3>After Party</h3>
              <p className="timeline-description">
                Continue the celebration at the greatest bar in South Bend - Newfs (Finnies Next Door)!
              </p>
              <p className="timeline-detail"><strong>Address</strong><br />233 S Main St<br />South Bend, IN 46601</p>
            </div>
          </div>

          <div className="timeline-line-break" />
          <div className="timeline-day-label"><span className="timeline-day-week">Sunday</span><span className="timeline-day-date">June 27th</span></div>
          <div className="timeline-line-break" />
          <div className="timeline-item left">
            <div className="timeline-time">10:00 AM EST</div>
            <div className="timeline-content">
              <h3>Farewell Brunch</h3>
              <p className="timeline-description">
                Before you head home, join us for a brunch at the Aloft Hotel.
              </p>
              <p className="timeline-detail"><strong>Address</strong><br />111 N Main St<br />South Bend, IN 46601</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
