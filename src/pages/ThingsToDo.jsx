import './ThingsToDo.css';

function ThingsToDo() {
  return (
    <div className="things-to-do-container">
      <div className="page-hero">
        <span className="page-eyebrow">South Bend & Notre Dame</span>
        <h1 className="page-hero-title">Things To Do</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="things-to-do-content">
        <section className="activities-section">
          <span className="section-eyebrow">Explore the Area</span>
          <h2 className="section-heading">Nearby Attractions</h2>
          <div className="activities-grid">
            <a className="activity-card activity-card-link" href="https://www.saintmarys.edu/" target="_blank" rel="noopener noreferrer" aria-label="Open Saint Mary's College website in a new tab">
              <h3 className="activity-name">Saint Mary<span className="page-hero-apostrophe">'</span>s College Campus</h3>
              <p className="activity-location">Notre Dame, IN</p>
              <p className="activity-description">
                Explore THE most beautiful college campus in America. Le Mans Hall is officially 150 years old!
              </p>
            </a>

            <a className="activity-card activity-card-link" href="https://www.nd.edu/" target="_blank" rel="noopener noreferrer" aria-label="Open University of Notre Dame website in a new tab">
              <h3 className="activity-name">University of Notre Dame Stadium Tour</h3>
              <p className="activity-location">Notre Dame, IN</p>
              <p className="activity-description">
                Explore the second most beautiful college campus in America. The Golden Dome is iconic and light a candle at the Grotto.
              </p>
            </a>

            <a className="activity-card activity-card-link" href="https://www.nd.edu/golden-dome" target="_blank" rel="noopener noreferrer" aria-label="Open Golden Dome website in a new tab">
              <h3 className="activity-name">Golden Dome</h3>
              <p className="activity-location">Notre Dame, IN</p>
              <p className="activity-description">
                Iconic landmark of the University of Notre Dame. Visitors can admire its stunning architecture and learn about its history.
              </p>
            </a>

            <a className="activity-card activity-card-link" href="https://www.nd.edu/grotto" target="_blank" rel="noopener noreferrer" aria-label="Open The Grotto website in a new tab">
              <h3 className="activity-name">The Grotto</h3>
              <p className="activity-location">Notre Dame, IN</p>
              <p className="activity-description">
                Iconic landmark of the University of Notre Dame. Visitors can light a candle and enjoy the peaceful atmosphere of this sacred site.
              </p>
            </a>

            <a className="activity-card activity-card-link" href="https://www.potawatomizoo.org/" target="_blank" rel="noopener noreferrer" aria-label="Open Potawatomi Zoo website in a new tab">
              <h3 className="activity-name">Potawatomi Zoo</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Home to over 500 animals from around the world. Perfect for families visiting the area.
              </p>
            </a>

            <a className="activity-card activity-card-link" href="https://www.hudsongardens.org/" target="_blank" rel="noopener noreferrer" aria-label="Open Hudson Gardens website in a new tab">
              <h3 className="activity-name">Hudson Gardens</h3>
              <p className="activity-location">South Bend, IN</p>
              <p className="activity-description">
                Beautiful lakeside gardens perfect for peaceful walks and nature photography.
              </p>
            </a>
          </div>
        </section>

        <section className="dining-section">
          <span className="section-eyebrow">Local Favorites</span>
          <h2 className="section-heading">Where to Eat & Drink</h2>
          <div className="restaurants-grid">
            <a
              className="restaurant-card restaurant-card-link"
              href="https://theexchangebars.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open The Exchange website in a new tab"
            >
              <h3 className="restaurant-name">The Exchange</h3>
              <p className="restaurant-cuisine">Whiskey Bar</p>
              <p className="restaurant-info">Enjoy a wide selection of whiskeys and craft cocktails in a cozy, upscale setting.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://fiddlershearth.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Fiddler's Hearth website in a new tab">
              <h3 className="restaurant-name">Fiddler<span className="page-hero-apostrophe">'</span>s Hearth</h3>
              <p className="restaurant-cuisine">Irish Pub</p>
              <p className="restaurant-info">Cozy Irish pub with traditional dishes and a wide selection of beers.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://orourkes.com/" target="_blank" rel="noopener noreferrer" aria-label="Open O'Rourke's website in a new tab">
              <h3 className="restaurant-name">O<span className="page-hero-apostrophe">'</span>Rourke<span className="page-hero-apostrophe">'</span>s</h3>
              <p className="restaurant-cuisine">Irish Pub</p>
              <p className="restaurant-info">Cozy Irish pub with traditional dishes and a wide selection of beers located on Eddy Street next to other bars, fast food and the Notre Dame Bookstore.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://cafecapri.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Café Capri website in a new tab">
              <h3 className="restaurant-name">Café Capri</h3>
              <p className="restaurant-cuisine">Italian</p>
              <p className="restaurant-info">Charming café offering a variety of Italian dishes and desserts.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://thelauber.com/" target="_blank" rel="noopener noreferrer" aria-label="Open The Lauber website in a new tab">
              <h3 className="restaurant-name">The Lauber</h3>
              <p className="restaurant-cuisine">Italian/Pizza</p>
              <p className="restaurant-info">Charming café offering a variety of Italian dishes and desserts.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://jesusmexican.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Jesus Mexican website in a new tab">
              <h3 className="restaurant-name">Jesus</h3>
              <p className="restaurant-cuisine">Mexican</p>
              <p className="restaurant-info">Charming café offering a variety of Italian dishes and desserts.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://simplypressed.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Simply Pressed website in a new tab">
              <h3 className="restaurant-name">Simply Pressed</h3>
              <p className="restaurant-cuisine">Acai Bowls</p>
              <p className="restaurant-info">Fresh and healthy acai bowls with a variety of toppings.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://peggs.com/" target="_blank" rel="noopener noreferrer" aria-label="Open PEGGS website in a new tab">
              <h3 className="restaurant-name">PEGGS</h3>
              <p className="restaurant-cuisine">Breakfast</p>
              <p className="restaurant-info">Delicious breakfast options with a variety of fresh ingredients.</p>
            </a>

            <a className="restaurant-card restaurant-card-link" href="https://uptownkitchen.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Uptown Kitchen website in a new tab">
              <h3 className="restaurant-name">Uptown Kitchen</h3>
              <p className="restaurant-cuisine">Breakfast</p>
              <p className="restaurant-info">Delicious breakfast options with a variety of fresh ingredients.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ThingsToDo;
