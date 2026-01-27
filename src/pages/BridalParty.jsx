import { Link } from 'react-router-dom';
import './BridalParty.css';

function BridalParty() {
  const bridesmaids = [
    { name: 'Caitlyn Holman', role: 'Sister of the Bride' },
    { name: 'Megan Holman', role: 'Sister-in-law of the Bride' },
    { name: 'Shannon Kosch', role: 'Sister of the Groom' },
    { name: 'Samantha Ray', role: 'Childhood Neighbor' },
    { name: 'Emily Cripe', role: 'Childhood Neighbor' },
    { name: 'Claire Schutta', role: 'College Roommate' },
    { name: 'Kelsey Kavanagh', role: 'College Roommate' },
    { name: 'Anna Zappa', role: 'College Roommate' },
  ];

  const groomsmen = [
    { name: 'Tyler Gillespie', role: 'College Roommate' },
    { name: 'Patrick Holman', role: 'Brother of the Bride' },
    { name: 'Danny Freitag', role: 'Brother-in-law of the Groom' },
    { name: 'Joseph Roscetti', role: 'Childhood Friend' },
    { name: 'Michael Mullan', role: 'Childhood Friend' },
    { name: 'Christopher Prattos', role: 'Coworker' },
    { name: 'Austin Straley', role: 'Coworker' },
    { name: 'Dan Broderick', role: 'Cousin of the Groom' },
  ];

    const ushers = [
    { name: 'Griffin Holman', role: 'Cousin of the Bride' },
    { name: 'Ryan Morgan', role: 'Childhood Friend of the Groom' },
    { name: 'Joe Alberts', role: 'Childhood Friend of the Groom' },
    { name: 'Billy Jacoby', role: 'Childhood Friend of the Groom' },
  ];

    const ringBearer = [
    { name: 'Levi Freitag', role: 'Nephew/Godson of the Groom' },
  ];

  return (
    <div className="bridal-party-page">
      <nav className="back-nav">
        <Link to="/" className="back-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </nav>
      
      <div className="page-content">
        <h1 className="page-title">Our Bridal Party</h1>
        
        {/* Bridesmaids */}
        <div className="party-section">
          <h2 className="section-title">Bridesmaids</h2>
          <div className="party-grid">
            {bridesmaids.map((person, i) => (
              <div key={i} className="party-member">
                <div className="member-avatar">
                  <span>👰</span>
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Groomsmen */}
        <div className="party-section">
          <h2 className="section-title">Groomsmen</h2>
          <div className="party-grid">
            {groomsmen.map((person, i) => (
              <div key={i} className="party-member">
                <div className="member-avatar">
                  <span>🤵</span>
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ushers */}
        <div className="party-section">
          <h2 className="section-title">Ushers</h2>
          <div className="party-grid">
            {ushers.map((person, i) => (
              <div key={i} className="party-member">
                <div className="member-avatar">
                  <span>🤵</span>
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ring Bearer */}
        <div className="party-section">
          <h2 className="section-title">Ring Bearer</h2>
          <div className="party-grid">
            {ringBearer.map((person, i) => (
              <div key={i} className="party-member">
                <div className="member-avatar">
                  <span>🤵</span>
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
