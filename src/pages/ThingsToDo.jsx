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
    description: 'Take a tour of the prettiest college in the country!',
    website: 'https://www.saintmarys.edu/',
  },
  {
    name: 'University of Notre Dame Campus',
    location: 'Notre Dame, IN',
    description: 'Take a tour of the iconic Notre Dame campus, including the Basilica, Golden Dome, and Grotto.',
    website: 'https://my.nd.edu/page/eck-visitors-center',
  },
  {
    name: 'Golden Dome',
    location: 'Notre Dame, IN',
    description: 'The university’s most recognizable landmark and a quick stop while exploring campus.',
    website: 'https://tour.nd.edu/locations/main-building/',
  },
  {
    name: 'The Grotto',
    location: 'Notre Dame, IN',
    description: 'A quiet prayer and reflection space with candles, gardens, and nearby walking paths.',
    website: 'https://tour.nd.edu/locations/grotto-of-our-lady-of-lourdes/',
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
    website: 'https://visithowardpark.com/',
  },
];

const DINING = [
  {
    name: 'The Exchange',
    cuisine: 'Whiskey Bar',
    description: 'Downtown cocktail bar known for a deep whiskey list and polished classics.',
    menu: 'https://theexchangebars.com/menu/',
  },
  {
    name: "Fiddler's Hearth",
    cuisine: 'Irish Pub',
    description: 'Lively pub with Irish fare, pints, and regular live music nights.',
    menu: 'https://fiddlershearth.com/kitchen/',
  },
  {
    name: "O'Rourke's",
    cuisine: 'Irish Pub',
    description: 'Casual Eddy Street pub with comfort food, TVs, and easy pre-game energy.',
    menu: 'https://www.orourkessouthbend.com/menus',
  },
  {
    name: "Carmela's",
    cuisine: 'Italian',
    description: 'Neighborhood Italian spot with pasta, house specialties, and classic desserts.',
    menu: 'https://www.carmelassouthbend.com/s/order',
  },
  {
    name: 'The Lauber',
    cuisine: 'Pizza & American',
    description: 'Historic downtown space serving pizza, shareable starters, and cocktails.',
    menu: 'https://thelauber.com/menu',
  },
  {
    name: 'Jesus Latin Grill',
    cuisine: 'Mexican',
    description: 'Local favorite for tacos, burritos, and quick casual meals near downtown.',
    menu: 'https://jesus-latin-grill.com/menu/',
  },
  {
    name: 'Purely Pressed',
    cuisine: 'Juice & Bowls',
    description: 'Light breakfast and lunch option with smoothies, juices, and acai bowls.',
    menu: 'https://www.purelypressedorganic.com/menu',
  },
  {
    name: 'PEGGS',
    cuisine: 'Breakfast',
    description: 'Classic brunch stop with omelets, skillets, and house-made breakfast staples.',
    menu: 'https://www.peggssouthbend.com/menu',
  },
  {
    name: 'Uptown Kitchen',
    cuisine: 'Breakfast',
    description: 'Modern brunch menu with coffee, scratch-made plates, and weekend favorites.',
    menu: 'https://www.theuptownkitchen.com/uploads/1/2/6/0/126073318/uk-breakfast-menu_f26p8-web.pdf',
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
