import "./HotelTravel.css";

function HotelTravel() {
  return (
    <div className="hotel-travel-container">
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
          <div className="hotel-list">
            <div className="hotel-card">
              <h3 className="hotel-name">Aloft by Marriott South Bend</h3>
              <a
                href="https://app.marriott.com/reslink?id=1778598509881&key=GRP&app=resvlink"
                target="_blank"
                className="hotel-book-link"
              >
                Reserve Your Room
              </a>
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
                className="hotel-book-link"
              >
                Reserve Your Room
              </a>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 237-7777
                <br />
                <strong>Address:</strong> 121 S. Doctor M.L.K. Jr Blvd, South
                Bend, IN 46601
                <br />
                <strong>Distance:</strong> Just a short stroll from our
                reception—perfect for a quick walk home after dancing the night
                away!
              </p>
              <p className="hotel-description">
                <strong>$169/night.</strong> Classic comfort in the heart of
                downtown, with a gym and indoor pool. On-site parking available
                for $25/night. <br /> <strong>Last day to book: May 25th, 2027.</strong>
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

            <div className="travel-info">
              <h3>Parking at Howard Park Public House</h3>
              <p>
                There is free street parking available around Howard Park Public
                House, but it can be limited during busy times. We recommend
                arriving early to secure a spot, or consider using a rideshare
                service for convenience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HotelTravel;
