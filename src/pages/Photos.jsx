import './Photos.css';

// Edit this array to reorder photos. Use the filename without extension (lowercase).
// Any file not listed here will appear after the listed ones, alphabetically.
const PHOTO_ORDER = [
  'proposal',
  'engaged',
  'house',

  'canada',
  'hawaii',
  'banff',

  'nd',
  'cubbies',
  'bulls',

  'joe',
  'megan',
  'mary',

  'karaoke',
  'karoake',
  'pattys',

  'hella mega',
  'sunset',
  'rodeo',

  'boston',
  'vegas',
  'seattle',

  'first',
  'tybee',
  'woodhaven',

  'fishing',
  'goggles',
  'covid',

  'work',
  'avanade',
  'workfirst',
];

const PHOTO_CAPTIONS = {
  // ── Engagement ──
  proposal: 'The Proposal',
  engaged: 'Engagement Party',
  house: 'Our Home',

  // ── Travel ──
  canada: 'Moraine Lake, Canada',
  hawaii: 'Diamond Head, Hawaii',
  banff: 'Lake Louise, Canada',

  // ── Sports ──
  nd: 'Go Irish',
  cubbies: 'Go Cubs',
  bulls: 'Go Bulls',

  // ── Weddings ──
  joe: 'Illinois Wedding',
  megan: 'South Bend Wedding',
  mary: 'Wisconsin Wedding',

  // ── Nights Out ──
  karaoke: 'Howl at the Moon',
  karoake: 'Karaoke Night',
  pattys: "St. Patty's Day",

  // ── Concerts ──
  'hella mega': 'Pop Punk Concerts',
  sunset: 'Country Concerts',
  rodeo: 'Rodeo Night',

  // ── Trips ──
  boston: 'Boston Trip',
  vegas: 'Vegas Trip',
  seattle: 'Seattle Trip',

  // ── Anniversaries & Getaways ──
  first: 'Our First Anniversary',
  tybee: 'Boating at Tybee Island',
  woodhaven: 'Camping at Woodhaven',

  // ── Outdoors ──
  fishing: 'Fishing in Florida',
  goggles: 'Our First Ski Trip',
  covid: 'Covid in Colorado',

  // ── Avanade / How We Met ──
  work: 'Last Day at Avanade Together',
  avanade: 'Internship Trip to LA',
  workfirst: 'First Day at Avanade Together',
};

function Photos() {
  const ourStoryPhotos = Object.entries(
    import.meta.glob('../assets/images/ourstory/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
      eager: true,
      import: 'default',
    })
  )
    .map(([path, src]) => {
      const fileName = path.split('/').pop() || '';
      const key = fileName.replace(/\.[^/.]+$/, '').toLowerCase();
      const label = fileName
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .trim();
      const altText = label
        ? label.charAt(0).toUpperCase() + label.slice(1)
        : 'Our story photo';
      const caption = PHOTO_CAPTIONS[key] || 'A little moment we love';
      return { src, alt: altText, caption, key };
    })
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
          <p className="story-text">We met in May 2019 on the first day of our internship at Avanade: Brian, a data engineer and Claire, a software engineer. We became best friends almost immediately, and it continued that way for our senior years.</p>
          <p className="story-text">We graduated, Claire from Saint Mary's and Brian from Loyola in 2020. That summer, Brian decided to ask Claire to go on a walk where Claire proceeded to throw up from a mix of nerves and it being 100 degrees outside.  From that, Brian knew Claire was the one and we made it official on September 1st, 2020.</p>
          <p className="story-text">Since then, we worked together for 4 more years, attended 42 concerts, 31 weddings, visited 19 states, enjoyed 6 rodeos, traveled to 2 countries, lived in a Lincoln Park apartment we loved, and now have a house in the burbs. </p>
        </div>
          
        <div className="photo-grid">
          {ourStoryPhotos.map((photo, index) => (
            <div key={`${photo.alt}-${index}`} className="photo-card">
              <div className="photo-image-wrap">
                <img className="story-photo" src={photo.src} alt={photo.alt} loading="lazy" />
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
