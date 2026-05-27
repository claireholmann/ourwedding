import './BridalParty.css';

function BridalParty() {
  const brideSideAvatar = new URL('../assets/images/engagement/soft-smile-hug.JPG', import.meta.url).href;
  const groomSideAvatar = new URL('../assets/images/engagement/straight-on.JPG', import.meta.url).href;
  const ringBearerAvatar = new URL('../assets/images/engagement/look-closeup.JPG', import.meta.url).href;
  const profileModules = import.meta.glob('../assets/images/profiles/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
    eager: true,
    import: 'default',
  });

  const profileImages = Object.fromEntries(
    Object.entries(profileModules).map(([path, url]) => {
      const fileName = path.split('/').pop() || '';
      const key = fileName.replace(/\.[^/.]+$/, '').toLowerCase();
      return [key, url];
    })
  );

  const getProfileImage = (photoKey, fallback) => profileImages[photoKey] || fallback;

  // Helper function to convert name to kebab-case for use as class name
  const getNameClass = (name) => name.toLowerCase().replace(/\s+/g, '-');

  const bridesmaids = [
    { name: 'Caitlyn Holman', role: 'Sister of the Bride', image: getProfileImage('caitlyn', brideSideAvatar) },
    { name: 'Megan Holman', role: 'Sister-in-law of the Bride', image: getProfileImage('pattymegan', brideSideAvatar) },
    { name: 'Shannon Kosch', role: 'Sister of the Groom', image: getProfileImage('shannon', brideSideAvatar) },
    { name: 'Samantha Ray', role: 'Childhood Neighbor', image: getProfileImage('sam', brideSideAvatar) },
    { name: 'Emily Cripe', role: 'Childhood Neighbor', image: getProfileImage('emily1', brideSideAvatar) },
    { name: 'Claire Schutta', role: 'College Roommate', image: getProfileImage('hanny', brideSideAvatar) },
    { name: 'Kelsey Kavanagh', role: 'College Roommate', image: getProfileImage('kelsey', brideSideAvatar) },
    { name: 'Anna Zappa', role: 'College Roommate', image: getProfileImage('anna', brideSideAvatar) },
  ];

  const groomsmen = [
    { name: 'Tyler Gillespie', role: 'College Roommate', image: getProfileImage('tyler', groomSideAvatar) },
    { name: 'Patrick Holman', role: 'Brother of the Bride', image: getProfileImage('pattymegan', groomSideAvatar) },
    { name: 'Danny Freitag', role: 'Brother-in-law of the Groom', image: getProfileImage('danny', groomSideAvatar) },
    { name: 'Joseph Roscetti', role: 'Childhood Friend', image: getProfileImage('boys', groomSideAvatar) },
    { name: 'Michael Mullan', role: 'Childhood Friend', image: getProfileImage('mike', groomSideAvatar) },
    { name: 'Christopher Prattos', role: 'Coworker of Bride and Groom', image: getProfileImage('chris', groomSideAvatar) },
    { name: 'Austin Straley', role: 'Coworker of Bride and Groom', image: getProfileImage('austin', groomSideAvatar) },
    { name: 'Dan Broderick', role: 'Cousin of the Groom', image: getProfileImage('dan', groomSideAvatar) },
  ];

  const ushers = [
    { name: 'Griffin Holman', role: 'Cousin of the Bride', image: getProfileImage('griff', groomSideAvatar) },
    { name: 'Ryan Morgan', role: 'Childhood Friend of the Groom', image: getProfileImage('boys', groomSideAvatar) },
    { name: 'Joe Alberts', role: 'Childhood Friend of the Groom', image: getProfileImage('boys', groomSideAvatar) },
    { name: 'Billy Jacoby', role: 'Childhood Friend of the Groom', image: getProfileImage('billy2', groomSideAvatar) },
  ];

  const ringBearer = [
    { name: 'Levi Freitag', role: 'Nephew/Godson of the Groom', image: getProfileImage('levi', ringBearerAvatar) },
  ];

  return (
    <div className="bridal-party-page">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian · June 2027</span>
        <h1 className="page-hero-title">Our Bridal Party</h1>
        <div className="page-hero-divider" />
      </div>

      <div className="page-content">
        <div className="party-section">
          <span className="section-eyebrow">Standing With Her</span>
          <h2 className="section-title">Bridesmaids</h2>
          <div className="party-grid-three">
            {bridesmaids.map((person, i) => (
              <div key={i} className={`party-member ${getNameClass(person.name)}`}>
                <div className="member-avatar">
                  <img src={person.image} alt={person.name} loading="lazy" />
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Groomsmen */}
        <div className="party-section">
          <span className="section-eyebrow">Standing With Him</span>
          <h2 className="section-title">Groomsmen</h2>
          <div className="party-grid-three">
            {groomsmen.map((person, i) => (
              <div key={i} className={`party-member ${getNameClass(person.name)}`}>
                <div className="member-avatar">
                  <img src={person.image} alt={person.name} loading="lazy" />
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="party-section">
          <span className="section-eyebrow">Leading the Way</span>
          <h2 className="section-title">Ushers</h2>
          <div className="party-grid-two">
            {ushers.map((person, i) => (
              <div key={i} className={`party-member ${getNameClass(person.name)}`}>
                <div className="member-avatar">
                  <img src={person.image} alt={person.name} loading="lazy" />
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="party-section">
          <span className="section-eyebrow">Special Role</span>
          <h2 className="section-title">Ring Bearer</h2>
          <div className="party-grid party-grid-single">
            {ringBearer.map((person, i) => (
              <div key={i} className={`party-member ${getNameClass(person.name)}`}>
                <div className="member-avatar">
                  <img className="ring-bearer-avatar" src={person.image} alt={person.name} loading="lazy" />
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BridalParty;
