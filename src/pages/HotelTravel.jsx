import "./HotelTravel.css";
// import { useEffect, useState } from "react";
import { trackEvent } from "../analytics";

function HotelTravel() {
  // const [showNotice, setShowNotice] = useState(true);

  // useEffect(() => {
  //   if (!showNotice) return undefined;
  //   const onKeyDown = (e) => {
  //     if (e.key === "Escape") setShowNotice(false);
  //   };
  //   window.addEventListener("keydown", onKeyDown);
  //   return () => window.removeEventListener("keydown", onKeyDown);
  // }, [showNotice]);

  return (
    <div className="hotel-travel-container">
      <div className="hotel-travel-page-content">
        <div className="page-hero">
          <span className="page-eyebrow">
            Notre Dame, Indiana · June&nbsp;26th&nbsp;2027
          </span>
          <h1 className="page-hero-title">
            Hotel <span className="page-hero-and symbol-fallback">&</span> Travel
          </h1>
          <div className="page-hero-divider" />
        </div>

        <div className="hotel-travel-content">
          <section className="hotel-section">
          <span className="section-eyebrow">Where to Stay</span>
          <h2 className="section-heading">Accommodations</h2>
          <p className="hotel-intro">
            We’ve reserved rooms at nearby hotels to make your stay easy. Each
            option is close to the wedding events—choose what works best for
            you! 
          </p>
          {/* <div className="hotel-room-block-banner" role="alert">
            <span className="hotel-room-block-banner-icon">!</span>
            <p>
              The Savannah Bananas are now playing at Notre Dame the same day as our wedding.  
              Unfortunately, our initial hotel room blocks have now been capped  
              to a limited number of rooms due to the game.  
              
              <br />
              Please bear with us as we work to accommodate everyone. We are actively
              finding other accomadations for our guests. There's also the option of 
              finding Airbnbs in the area.

              <br />
              Please contact Claire & Brian at (630) 648-9014 if you have any questions or 
              need assistance with accommodations.
            </p>
          </div> */}
          <div className="hotel-list">
            <div className="hotel-card">
              <h3 className="hotel-name">Wingate by Wyndham South Bend</h3>
              <a
                href="https://www.wyndhamhotels.com/wingate/south-bend-indiana/wingate-south-bend-notre-dame/overview?checkInDate=06/25/2027&checkOutDate=06/27/2027&groupCode=062527HKW"
                target="_blank"
                rel="noopener noreferrer"
                className="hotel-book-link"
                onClick={() => trackEvent("hotel_click", {
                  hotel_name: "Wingate by Wyndham South Bend",
                  link_url: "https://www.wyndhamhotels.com/wingate/south-bend-indiana/wingate-south-bend-notre-dame/overview?checkInDate=06/25/2027&checkOutDate=06/27/2027&groupCode=062527HKW",
                  link_type: "room_block",
                })}
              >
                Reserve Your Room
              </a>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 272-5220
                <br />
                <strong>Address:</strong> 52890 SR-933, South Bend, IN 46637
                <br />
                <strong>Distance:</strong> 5 minute drive from Saint Mary's and about 10 minutes from the reception.
              </p>
              <p className="hotel-description">
                <strong>$115 - $120 / night.</strong> Located right off the highway down the street from the ceremony! Indoor and outdoor pools 
                & great hotel restaurant! Parking and continental breakfast included. <br /> <strong>Last day to book: May 25th, 2027.</strong>
              </p>
            </div>
            <div className="hotel-card">
              <h3 className="hotel-name">Irish Lodge South Bend</h3>
              <a
                href="https://www.irishlodgesouthbend.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hotel-book-link"
                onClick={() => trackEvent("hotel_click", {
                  hotel_name: "Irish Lodge South Bend",
                  link_url: "https://www.irishlodgesouthbend.com/",
                  link_type: "room_block",
                })}
              >
                Irish Lodge Website
              </a>
              <p className="aloft-booking-notice">
                To book a room, please call the hotel directly and ask for the Holman-Kosch wedding block rate.
              </p>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 277-9373
                <br />
                <strong>Address:</strong> 52709 State Hwy 933, South Bend, IN 46637
                <br />
                <strong>Distance:</strong> 5 minute drive from Saint Mary's and about 10 minutes from the reception.
              </p>
              <p className="hotel-description">
                <strong>$189/night.</strong> Located right off the highway down the street from the ceremony!
                Parking and continental breakfast included. <br /> <strong>Last day to book: May 25th, 2027.</strong>
              </p>
            </div>
            <div className="hotel-card">
              <h3 className="hotel-name">Aloft by Marriott South Bend</h3>
              <a
                href="https://app.marriott.com/reslink?id=1778598509881&key=GRP&app=resvlink"
                target="_blank"
                rel="noopener noreferrer"
                className="hotel-book-link"
                onClick={() => trackEvent("hotel_click", {
                  hotel_name: "Aloft by Marriott South Bend",
                  link_url: "https://app.marriott.com/reslink?id=1778598509881&key=GRP&app=resvlink",
                  link_type: "room_block",
                })}
              >
                Reserve Your Room
              </a>
              <p className="aloft-booking-full">
                UPDATE! Aloft has been fully booked.
              </p>
              <p className="hotel-family-note">
                The Holman and Kosch immediate families are staying at the Aloft.
              </p>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 288-8000
                <br />
                <strong>Address:</strong> 111 N. Main St, South Bend, IN 46601
                <br />
                <strong>Distance:</strong> Short walk from the celebration—and
                even closer to the after party at NEWFS!
              </p>
              <p className="hotel-description">
                <strong>$149/night.</strong> Modern vibes with vibrant decor, a
                lively bar, a 24-hour cafe, and an indoor pool. On-site parking
                available is complimentary. <br /> <strong>Last day to book: May 25th, 2027.</strong>
              </p>
            </div>
            <div className="hotel-card">
              <h3 className="hotel-name">Courtyard by Marriott South Bend</h3>
              <a
                href="https://app.marriott.com/reslink?id=1779122616923&key=GRP&app=resvlink"
                target="_blank"
                rel="noopener noreferrer"
                className="hotel-book-link"
                onClick={() => trackEvent("hotel_click", {
                  hotel_name: "Courtyard by Marriott South Bend",
                  link_url: "https://app.marriott.com/reslink?id=1779122616923&key=GRP&app=resvlink",
                  link_type: "room_block",
                })}
              >
                Reserve Your Room
              </a>
              <p className="aloft-booking-full">
                UPDATE! Courtyard by Marriott has been fully booked.
              </p>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 237-7777
                <br />
                <strong>Address:</strong> 121 S. Doctor M.L.K. Jr Blvd, South
                Bend, IN 46601
                <br />
                <strong>Distance:</strong> Just a short stroll from our
                reception—perfect for a quick walk home!
              </p>
              <p className="hotel-description">
                <strong>$169/night.</strong> Classic comfort in the heart of
                downtown, with a gym and indoor pool. On-site parking available
                for $25/night. <br /> <strong>Last day to book: May 25th, 2027.</strong>
              </p>
            </div>
            <div className="hotel-card">
              <h3 className="hotel-name">Double Tree by Hilton South Bend</h3>
              <a
                href="https://www.hilton.com/en/hotels/sbnsbdt-doubletree-south-bend/"
                target="_blank"
                rel="noopener noreferrer"
                className="hotel-book-link"
                onClick={() => trackEvent("hotel_click", {
                  hotel_name: "Double Tree by Hilton South Bend",
                  link_url: "https://www.hilton.com/en/hotels/sbnsbdt-doubletree-south-bend/",
                  link_type: "room_block",
                })}
              >
                Reserve Your Room
              </a>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 234-2000
                <br />
                <strong>Address:</strong> 123 N. Doctor M.L.K. Jr Blvd, South
                Bend, IN 46601
                <br />
                <strong>Distance:</strong> Across the street from the reception, making it extremely convenient for guests.
              </p>
              <p className="hotel-description">
                <strong>Not a wedding room block!</strong> Wanted to include a Hilton option for those with points, 
                but unfortunately we do not have a room block here.<br />
              </p>
            </div>
          </div>
        </section>

        <section className="travel-section">
          <span className="section-eyebrow">Getting Here</span>
          <h2 className="section-heading">
            Directions <span className="page-hero-and symbol-fallback">&</span>{" "}
            Transport
          </h2>
          <div className="travel-grid">
            <div className="travel-info">
              <h3>Planes</h3>
              <p>
                <strong>South Bend International Airport (SBN)</strong> is the
                closest airport, approximately 15-20 minutes from the venue. You
                can arrange ground transportation via taxi, rideshare, or rental
                car. Five airlines currently fly into SBN: American, United,
                Delta, Allegiant and Breeze. You can also fly into{" "}
                <strong>Chicago O'Hare (ORD) </strong>
                or <strong>Chicago Midway (MDW)</strong>, which are about a 2 -
                2.5 hour drive from South Bend. Please keep in mind that South
                Bend is in Eastern Time, so plan accordingly!
              </p>
            </div>

            <div className="travel-info">
              <h3>Trains</h3>
              <p>
                The <strong>South Shore Line</strong> offers a convenient train
                service from Chicago to South Bend. The station is also at the
                South Bend International Airport, so approximately 15-20 minutes
                from the venue. You can arrange ground transportation via taxi,
                rideshare, or rental car.
              </p>
            </div>

            <div className="travel-info">
              <h3>Automobiles</h3>
              <p>
                If you are driving from Chicago, it's about a 2 - 2.5 hour
                drive. If you are taking the Indiana Toll Road (I-80/I-90), take 
                Exit 77 for the quickest route to Saint Mary's College.
                If you are renting a car, you might want to opt in for an iPass
                for the Toll Road. Please keep in mind that South Bend is in
                Eastern Time, so plan accordingly!
              </p>
            </div>

            <div className="travel-info">
              <h3>Parking at Hotels</h3>
              <p>
                Parking is complimentary at the Aloft and available at the Mariott for $25 per night. There is
                limited street parking that is free.
              </p>
            </div>

            <div className="travel-info">
              <h3>Parking at Saint Mary&rsquo;s</h3>
              <p>
                There is a circle in front of Le Mans Hall for drop-offs. Free
                parking at Saint Mary's College will be available at the
                <strong> Regina Lot</strong> or{" "}
                <strong>Student Center lot</strong>. Detailed parking lot
                information will be provided with your invitation. For those
                with accessibility needs, there will be designated parking spots
                available in the lot in front of O'Laughlin Theatre. Please 
                let us know if you require accessible parking
                when you RSVP so we can ensure accommodations are made for you.
              </p>
            </div>

            {/* <div className="travel-info">
              <h3>Parking at Howard Park Public House</h3>
              <p>
                There is free street parking available around Howard Park Public
                House, but it can be limited during busy times. We recommend
                arriving early to secure a spot, or consider using a rideshare
                service for convenience.
              </p>
            </div> */}
          </div>
        </section>
        </div>
      </div>

      {/* {showNotice && (
      <div
        className="hotel-travel-notice-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowNotice(false);
        }}
      >
        <div
          className="hotel-travel-notice-card"
          role="dialog"
          aria-modal="true"
          aria-label="Hotel room block notice"
        >
          <button
            type="button"
            className="hotel-travel-notice-close"
            aria-label="Close notice"
            onClick={() => setShowNotice(false)}
          >
            &times;
          </button>
          <p>
              The Savannah Bananas are now playing at Notre Dame the same day as our wedding.  
              Unfortunately, our initial hotel room blocks have been capped  
              to a limited number of rooms due to the game.  
              <br /> 
              <br />
              <strong>LUCKILY, we have secured additional accommodations for our guests.
               We encourage you to book as soon as possible to ensure availability.</strong>
              <br /> 
              <br />
              If you book other accommodations, please let us know so we can keep track of everyone. 
              There's been quite a few families choosing to do Airbnbs for the weekend as well. 
              <br /> 
              <br />
              Please contact Claire & Brian at (630) 648-9014 if you have any questions or 
              need assistance with accommodations.
              <br /> 
              <br />
              -Claire & Brian
          </p>
          <button
            type="button"
            className="hotel-travel-notice-dismiss"
            onClick={() => setShowNotice(false)}
          >
            Close
          </button>
        </div>
      </div>
      )} */}
    </div>
  );
}

export default HotelTravel;
