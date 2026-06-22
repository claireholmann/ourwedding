import "./ThingsToDo.css";

function SymbolSafeText({ text }) {
  const parts = String(text).split(/([&'])/g);
  return (
    <>
      {parts.map((part, idx) =>
        part === "&" || part === "'" ? (
          <span key={`${part}-${idx}`} className="page-hero-apostrophe">
            {part}
          </span>
        ) : (
          <span key={`${part}-${idx}`}>{part}</span>
        ),
      )}
    </>
  );
}

const ATTRACTIONS = [
  {
    name: "Saint Mary's College Campus",
    location: "Notre Dame, IN",
    description: "Take a tour of the prettiest college in the country!",
    website: "https://www.saintmarys.edu/",
  },
  {
    name: "University of Notre Dame Campus",
    location: "Notre Dame, IN",
    description:
      "Take a tour of the iconic Notre Dame campus, including the Basilica, Golden Dome, Hesburgh Library and Grotto.",
    website: "https://my.nd.edu/page/eck-visitors-center",
  },
  {
    name: "Golden Dome",
    location: "Notre Dame, IN",
    description:
      "The university’s most recognizable landmark and a quick stop while exploring campus.",
    website: "https://tour.nd.edu/locations/main-building/",
  },
  {
    name: "The Grotto",
    location: "Notre Dame, IN",
    description:
      "A quiet prayer and reflection space with candles, gardens, and nearby walking paths.",
    website: "https://tour.nd.edu/locations/grotto-of-our-lady-of-lourdes/",
  },
  {
    name: "Hammes Notre Dame Bookstore",
    location: "Notre Dame, IN",
    description:
      "Campus bookstore offering a wide selection of Notre Dame merchandise and gifts.",
    website: "https://www.nd.bncollege.com/",
  },
  {
    name: "Eddy Street Commons",
    location: "South Bend, IN",
    description:
      "Main street with shops, restaurants, ice cream and bar options. The second Notre Dame bookstore is located here.  Across the street from Notre Dame's main entrance.",
    website: "https://www.eddycommons.com/",
  },
  {
    name: "Potawatomi Zoo",
    location: "South Bend, IN",
    description:
      "Small, walkable zoo with family-friendly exhibits and seasonal programming.",
    website: "https://www.potawatomizoo.org/",
  },
  {
    name: "South Bend Farmer's Market",
    location: "South Bend, IN",
    description:
      "Local farmers market with fresh produce and artisan goods. Open on Saturdays from 7am - 3pm.",
    website: "https://www.southbendfarmersmarket.com/",
  },
  {
    name: "New Buffalo",
    location: "New Buffalo, MI",
    description:
      "Beach town on Lake Michigan with shops, restaurants like The Stray Dog, and wineries. About a 40 minute drive from South Bend.",
    website: "https://www.newbuffalo.com/",
  },
];

const DINING = [
  {
    name: "Fiddler's Hearth",
    cuisine: "Irish Pub",
    description:
      "Lively pub with Irish food, pints, and regular live music nights.",
    menu: "https://fiddlershearth.com/kitchen/",
    reserve:
      "https://tables.toasttab.com/restaurants/a619ed6b-6b8a-476e-9418-92e165407510/reserve",
  },
  {
    name: "Legends of Notre Dame",
    cuisine: "Irish Pub",
    description:
      "Famous bar and restaurant located on Notre Dame's campus next to the football stadium.",
    menu: "https://legends.nd.edu/menu/",
  },
  {
    name: "O'Rourke's",
    cuisine: "Irish Pub",
    description: "Casual Eddy Street pub with comfort food and game watching.",
    menu: "https://www.orourkessouthbend.com/menus",
    reserve:
      "https://www.opentable.com/r/orourkes-public-house-south-bend?avt=eyJ2ljoyLCJtljoxLCJwljowLCJzl-jowlLCJuljowfQ&corrid=36da376e-3eee-4ded-8ae6-a464970a86d9&originId=36da376e-3eee-4ded-8ae6-a464970a86d9",
  },
  {
    name: "The Exchange",
    cuisine: "Whiskey Bar",
    description:
      "Moody downtown cocktail bar known for a deep whiskey list and polished classics.",
    menu: "https://theexchangebars.com/menu/",
  },
  {
    name: "The Lauber",
    cuisine: "American",
    description:
      "Historic downtown space serving pizza, shareable starters, and cocktails.",
    menu: "https://thelauber.com/menu",
    reserve:
      "https://tables.toasttab.com/restaurants/c04d2d43-e0fb-4c05-a153-3171109a33a4/reserve",
  },
  {
    name: "Jesus Latin Grill",
    cuisine: "Latin",
    description:
      "Blend of Latin American flavors with tacos, enchiladas, and margaritas.",
    menu: "https://jesus-latin-grill.com/menu/",
  },
  {
    name: "Carmela's",
    cuisine: "Italian",
    description:
      "Family-owned Italian spot with pasta, house specialties, and classic desserts.",
    menu: "https://www.carmelassouthbend.com/s/order",
    reserve: "https://www.carmelassouthbend.com/reservations",
  },
  {
    name: "Cafe Navarre",
    cuisine: "Italian",
    description:
      "Modern Italian spot with pasta, fresh seafood, and romantic atmosphere.",
    menu: "https://www.cafenavarre.co/eat",
    reserve: "https://www.cafenavarre.co/visit",
  },
  {
    name: "Ritter's Frozen Custard",
    cuisine: "Dessert",
    description:
      "Local favorite for frozen custard and sweet treats in Mishawaka.",
    menu: "https://www.ritters.com/menu.php",
  },
  {
    name: "Purely Pressed",
    cuisine: "Juice & Bowls",
    description:
      "Light breakfast and lunch option with smoothies, juices, and acai bowls.",
    menu: "https://www.purelypressedorganic.com/",
  },
  {
    name: "PEGGS",
    cuisine: "Breakfast",
    description:
      "Classic brunch stop with omelets, skillets, and house-made breakfast staples.",
    menu: "https://www.peggssouthbend.com/menu",
  },
  {
    name: "Uptown Kitchen",
    cuisine: "Brunch",
    description:
      "Modern brunch menu with coffee, scratch-made plates, and weekend favorites.",
    menu: "https://www.theuptownkitchen.com/menu.html",
    reserve: "https://www.theuptownkitchen.com/reservations.html",
  },
];

function ThingsToDo() {
  return (
    <div className="things-to-do-container">
      <div className="page-hero">
        <span className="page-eyebrow">
          <SymbolSafeText text="South Bend & Notre Dame" />
        </span>
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
                <h3 className="activity-name">
                  <SymbolSafeText text={item.name} />
                </h3>
                <p className="activity-location">{item.location}</p>
                <p className="activity-description">{item.description}</p>
                <div className="card-links">
                  <a
                    className="card-link"
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dining-section">
          <span className="section-eyebrow">Local Favorites</span>
          <h2 className="section-heading">
            Where to Eat <span className="symbol-fallback">&amp;</span> Drink
          </h2>
          <div className="restaurants-grid">
            {DINING.map((item) => (
              <article key={item.name} className="restaurant-card">
                <h3 className="restaurant-name">
                  <SymbolSafeText text={item.name} />
                </h3>
                <p className="restaurant-cuisine">
                  <SymbolSafeText text={item.cuisine} />
                </p>
                <p className="restaurant-info">{item.description}</p>
                <div className="card-links">
                  <a
                    className="card-link"
                    href={item.menu}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Menu
                  </a>
                  <a
                    className="card-link"
                    href={item.reserve}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: item.reserve ? "inline" : "none" }}
                  >
                    Reserve
                  </a>
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
