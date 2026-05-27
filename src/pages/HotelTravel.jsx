import "./HotelTravel.css";

function HotelTravel() {
  return (
    <div className="hotel-travel-container">
      <div className="page-hero">
        <span className="page-eyebrow">Notre Dame, Indiana · June 2027</span>
        <h1 className="page-hero-title">
          Hotel <span className="page-hero-and">&</span> Travel
        </h1>
        <div className="page-hero-divider" />
      </div>

      <div className="hotel-travel-content">
        <section className="hotel-section">
          <span className="section-eyebrow">Where to Stay</span>
          <h2 className="section-heading">Accommodations</h2>
          <p className="hotel-intro">
            We’ve reserved rooms at our favorite local hotels so you can relax,
            celebrate, and make the most of our wedding weekend. Each spot is
            close to the festivities and full of charm—choose the one that feels
            right for your stay!
          </p>
          <div className="hotel-list">
            <div className="hotel-card">
              <h3 className="hotel-name">Aloft at Notre Dame</h3>
              <a
                href="https://app.marriott.com/reslink?id=1778598509881&key=GRP&app=resvlink" target="_blank"
                className="hotel-book-link"
              >
                Reserve Your Room
              </a>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 631-4000
                <br />
                <strong>Address:</strong> 1330 E. Ewing Ave, Notre Dame, IN
                46556
                <br />
                <strong>Distance:</strong> Steps from the celebration—and even
                closer to late-night snacks at NEWFS!
              </p>
              <p className="hotel-description">
                $149/night. Modern, playful vibes with vibrant decor, a lively
                bar, and an inviting indoor pool. On-site parking available
                ($25/night).
              </p>
            </div>
            <div className="hotel-card">
              <h3 className="hotel-name">Marriott South Bend</h3>
              <a
                href="https://app.marriott.com/reslink?id=1779122616923&key=GRP&app=resvlink" target="_blank"
                className="hotel-book-link"
              >
                Reserve Your Room
              </a>
              <p className="hotel-info">
                <strong>Phone:</strong> (574) 234-2000
                <br />
                <strong>Address:</strong> 123 W. Jefferson Blvd, South Bend, IN
                46601
                <br />
                <strong>Distance:</strong> Just a short stroll from our
                reception—perfect for a quick walk home after dancing the night
                away!
              </p>
              <p className="hotel-description">
                $169/night. Classic comfort in the heart of downtown, with a
                cozy bar and sparkling indoor pool. On-site parking available
                ($25/night).
              </p>
            </div>
          </div>
        </section>

        <section className="travel-section">
          <span className="section-eyebrow">Getting Here</span>
          <h2 className="section-heading">Directions <span className="page-hero-and">&</span> Transport</h2>
          <div className="travel-grid">
            <div className="travel-info">
              <h3>Planes</h3>
              <p>
                <strong>South Bend International Airport (SBN)</strong> is the
                closest airport, approximately 15-20 minutes from the venue. You
                can arrange ground transportation via taxi, rideshare, or rental
                car.
              </p>
            </div>

            <div className="travel-info">
              <h3>Trains</h3>
              <p>
                The <strong>South Shore Line</strong> offers a convenient train
                service from Chicago to South Bend. The station is approximately
                15-20 minutes from the venue. You can arrange ground
                transportation via taxi, rideshare, or rental car.
              </p>
            </div>

            <div className="travel-info">
              <h3>Automobiles</h3>
              <p>
                If you are driving from Chicago, it's about a 2 - 2.5 hour drive.
                Exit 77 for the quickest route to Saint Mary's College. Please
                keep in mind that South Bend is in Eastern Time, so plan
                accordingly!
              </p>
            </div>

            <div className="travel-info">
              <h3>Parking at Saint Mary's</h3>
              <p>
                Free parking at Saint Mary's College will also be available.
                Detailed parking lot information is available below and will be
                provided with your invitation.
              </p>
            </div>

            <div className="travel-info">
              <h3>Parking at Hotels</h3>
              <p>
                Parking is available at both hotels for $25 per night. There is
                limited street parking that is free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HotelTravel;
