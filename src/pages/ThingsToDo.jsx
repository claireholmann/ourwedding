import './ThingsToDo.css';

function SymbolSafeText({ text }) {
  const parts = String(text).split(/([&'])/g);
  return (
    <>
      {parts.map((part, idx) => (
        part === '&' || part === '\''
          ? <span key={`${part}-${idx}`} className="page-hero-apostrophe">{part}</span>
          : <span key={`${part}-${idx}`}>{part}</span>
      ))}
    </>
  );
}

const ATTRACTIONS = [
  {
    name: "Saint Mary's College Campus",
    location: 'Notre Dame, IN',
    description: 'Historic campus grounds with walking paths, landmark architecture, and scenic lake views.',
    website: 'https://www.saintmarys.edu/',
  },
  {
    name: 'University of Notre Dame Campus',
    location: 'Notre Dame, IN',
    description: 'Iconic collegiate campus with public landmarks, museums, and easy self-guided walking routes.',
    website: 'https://www.nd.edu/',
  },
  {
    name: 'Golden Dome',
    location: 'Notre Dame, IN',
    description: 'The university’s most recognizable landmark and a quick stop while exploring campus.',
    website: 'https://www.nd.edu/golden-dome',
  },
  {
    name: 'The Grotto',
    location: 'Notre Dame, IN',
    description: 'A quiet prayer and reflection space with candles, gardens, and nearby walking paths.',
    website: 'https://www.nd.edu/grotto',
  },
  {
    name: 'Potawatomi Zoo',
    location: 'South Bend, IN',
    description: 'Small, walkable zoo with family-friendly exhibits and seasonal programming.',
    website: 'https://www.potawatomizoo.org/',
  },
  {
    name: 'Howard Park',
    location: 'South Bend, IN',
    description: 'Downtown riverfront park with trails, open green space, and weekend activity areas.',
    website: 'https://visitsouthbend.com/listing/howard-park/',
  },
];

const DINING = [
  {
    name: 'The Exchange',
    cuisine: 'Whiskey Bar',
    description: 'Downtown cocktail bar known for a deep whiskey list and polished classics.',
    website: 'https://theexchangebars.com/',
    menu: 'https://theexchangebars.com/menu/',
  },
  {
    name: "Fiddler's Hearth",
    cuisine: 'Irish Pub',
    description: 'Lively pub with Irish fare, pints, and regular live music nights.',
    website: 'https://fiddlershearth.com/',
    menu: 'https://fiddlershearth.com/menu',
  },
  {
    name: "O'Rourke's",
    cuisine: 'Irish Pub',
    description: 'Casual Eddy Street pub with comfort food, TVs, and easy pre-game energy.',
    website: 'https://orourkes.com/',
    menu: 'https://orourkes.com/menu/',
  },
  {
    name: 'Café Capri',
    cuisine: 'Italian',
    description: 'Neighborhood Italian spot with pasta, house specialties, and classic desserts.',
    website: 'https://cafecapri.com/',
    menu: 'https://cafecapri.com/menu/',
  },
  {
    name: 'The Lauber',
    cuisine: 'Pizza & American',
    description: 'Historic downtown space serving pizza, shareable starters, and cocktails.',
    website: 'https://thelauber.com/',
    menu: 'https://thelauber.com/',
  },
  {
    name: 'Jesus Latin Grill',
    cuisine: 'Mexican',
    description: 'Local favorite for tacos, burritos, and quick casual meals near downtown.',
    website: 'https://jesusmexican.com/',
    menu: 'https://jesusmexican.com/menu/',
  },
  {
    name: 'Simply Pressed',
    cuisine: 'Juice & Bowls',
    description: 'Light breakfast and lunch option with smoothies, juices, and acai bowls.',
    website: 'https://simplypressed.com/',
    menu: 'https://simplypressed.com/',
  },
  {
    name: 'PEGGS',
    cuisine: 'Breakfast',
    description: 'Classic brunch stop with omelets, skillets, and house-made breakfast staples.',
    website: 'https://peggs.com/',
    menu: 'https://peggs.com/',
  },
  {
    name: 'Uptown Kitchen',
    cuisine: 'Breakfast',
    description: 'Modern brunch menu with coffee, scratch-made plates, and weekend favorites.',
    website: 'https://uptownkitchen.com/',
    menu: 'https://uptownkitchen.com/',
  },
];

function ThingsToDo() {
  return (
    <div className="things-to-do-container">
      <div className="page-hero">
        <span className="page-eyebrow"><SymbolSafeText text="South Bend & Notre Dame" /></span>
        <h1 className="page-hero-title">Things To Do</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="things-to-do-content">
        <section className="activities-section">
          <span className="section-eyebrow">Explore the Area</span>
          <h2 className="section-heading">Nearby Attractions</h2>
          <div className="activities-grid">
            {ATTRACTIONS.map((item) => (
              <article key={item.name} className="activity-card">
                <h3 className="activity-name"><SymbolSafeText text={item.name} /></h3>
                <p className="activity-location">{item.location}</p>
                <p className="activity-description">{item.description}</p>
                <div className="card-links">
                  <a className="card-link" href={item.website} target="_blank" rel="noopener noreferrer">Website</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dining-section">
          <span className="section-eyebrow">Local Favorites</span>
          <h2 className="section-heading">Where to Eat <span className="symbol-fallback">&amp;</span> Drink</h2>
          <div className="restaurants-grid">
            {DINING.map((item) => (
              <article key={item.name} className="restaurant-card">
                <h3 className="restaurant-name"><SymbolSafeText text={item.name} /></h3>
                <p className="restaurant-cuisine"><SymbolSafeText text={item.cuisine} /></p>
                <p className="restaurant-info">{item.description}</p>
                <div className="card-links">
                  <a className="card-link" href={item.menu} target="_blank" rel="noopener noreferrer">Menu</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ThingsToDo;
