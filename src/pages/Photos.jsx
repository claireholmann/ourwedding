import "./Photos.css";

// Edit this array to reorder photos. Use the filename without extension (lowercase).
// Any file not listed here will appear after the listed ones, alphabetically.

const getNameClass = (PHOTO_ORDER) => PHOTO_ORDER.map((p) => p.toLowerCase().replace(/\s+/g, '-'));

const PHOTO_ORDER = [
  "armhold",
  "lemans-pose",
  "bridge",

  "proposal",
  "engaged",
  "house",

  "canada",
  "hawaii",
  "banff",

  "nd",
  "cubbies",
  "bulls",

  "joe-geneva",
  "megan-nd",
  "mary",

  "karaoke",
  "karoake",
  "pattys",

  "hella mega",
  "sunset",
  "rodeo",

  "boston",
  "vegas",
  "seattle",

  "first",
  "tybee",
  "woodhaven",

  "fishing",
  "goggles",
  "covid",

  "workfirst",
  "avanade",
  "work",
];

const PHOTO_CAPTIONS = {
  // ── Save The Dates ──
  armhold: "Saint Mary's College",
  "lemans-pose": "Le Mans Hall",
  bridge: "Save the Dates",

  // ── Engagement ──
  proposal: "The Proposal",
  engaged: "Engagement Party",
  house: "Our Home",

  // ── Travel ──
  canada: "Moraine Lake, Canada",
  hawaii: "Diamond Head, Hawaii",
  banff: "Lake Louise, Canada",

  // ── Sports ──
  nd: "Go Irish",
  cubbies: "Go Cubs",
  bulls: "Go Bulls",

  // ── Weddings ──
  "joe-geneva": "Illinois Wedding",
  "megan-nd": "South Bend Wedding",
  mary: "Wisconsin Wedding",

  // ── Nights Out ──
  karaoke: "Howl at the Moon",
  karoake: "Karaoke Night",
  pattys: "St. Patty's Day",

  // ── Concerts ──
  "hella mega": "Pop Punk Concerts",
  sunset: "Country Concerts",
  rodeo: "Rodeo Night",

  // ── Trips ──
  boston: "Boston Trip",
  vegas: "Vegas Trip",
  seattle: "Seattle Trip",

  // ── Anniversaries & Getaways ──
  first: "Our First Anniversary",
  tybee: "Boating at Tybee Island",
  woodhaven: "Camping at Woodhaven",

  // ── Outdoors ──
  fishing: "Fishing in Florida",
  goggles: "Our First Ski Trip",
  covid: "Covid in Colorado",

  // ── Avanade / How We Met ──
  work: "Last Day at Avanade Together",
  avanade: "Internship Trip to LA",
  workfirst: "First Day at Avanade",
};

function Photos() {
  const ourStoryPhotos = Object.entries(
    import.meta.glob(
      "../assets/images/{engagement,ourstory}/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}",
      {
        eager: true,
        import: "default",
      },
    ),
  )
    .map(([path, src]) => {
      const fileName = path.split("/").pop() || "";
      const key = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
      const label = fileName
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();
      const altText = label
        ? label.charAt(0).toUpperCase() + label.slice(1)
        : "Our story photo";
      const caption = PHOTO_CAPTIONS[key] || "A little moment we love";
      return { src, alt: altText, caption, key };
    })
    .filter((photo) => PHOTO_ORDER.includes(photo.key))
    .sort((a, b) => {
      const ai = PHOTO_ORDER.indexOf(a.key);
      const bi = PHOTO_ORDER.indexOf(b.key);
      const aPos = ai === -1 ? Infinity : ai;
      const bPos = bi === -1 ? Infinity : bi;
      if (aPos !== bPos) return aPos - bPos;
      return a.key.localeCompare(b.key);
    });

  return (
    <div className="photos-page">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian</span>
        <h1 className="page-hero-title">Our Story</h1>
        <div className="page-hero-divider" />
      </div>

      <div className="photos-content">
        <div className="story-paragraphs">
          <p className="story-text">
            Claire and Brian met in May 2019 on the first day of their
            internship at Avanade: Brian, a data engineer and Claire, a software
            engineer. They became best friends almost immediately, and it
            continued that way for their senior year of college.
          </p>
          <p className="story-text">
            They graduated in the sadness of 2020, Claire from Saint Mary's
            College and Brian from Loyola University Chicago. That summer, Brian
            decided to ask Claire to go on a walk where Claire proceeded to
            throw up from a mix of nerves and it being 100 degrees outside. From
            that moment, Brian knew Claire was the one and made it official on
            September 1st, 2020.
          </p>
          <p className="story-text">
            Since that day, they worked together for 4 more years, attended 42
            concerts, 31 weddings, visited 19 states, enjoyed 6 rodeos, traveled
            to 5 countries, lived in a Lincoln Park apartment they loved, and
            now have a house in the burbs.
          </p>
          <p className="story-text">
            In February 2025, Brian asked Claire's parents for their blessing in
            the Holy Spirit Chapel, where they will soon be married. Later that
            year, Brian proposed to Claire at the exact spot where they first
            took their walk. And here we are!
          </p>
        </div>

        <div className="photo-grid">
          {ourStoryPhotos.map((photo, index) => (
            <div key={`${photo.alt}-${index}`} className="photo-card">
              <div className="photo-image-wrap">
                <img
                  className={`story-photo ${getNameClass(PHOTO_ORDER).includes(photo.key) ? photo.key : ""}`}
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                />
              </div>
              <p className="photo-caption">{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Photos;
