import './Attire.css';

function Attire() {
  return (
    <div className="attire-container">
      <div className="page-hero">
        <span className="page-eyebrow">Dress Code</span>
        <h1 className="page-hero-title">Wedding Attire</h1>
        <p className="page-hero-subtitle">Black Tie Optional</p>
        <div className="page-hero-divider" />
      </div>
      
      <div className="attire-content">
        <section className="attire-section attire-priority-card">
          <h2 className="section-heading">Dress Code At a Glance</h2>
          <p className="section-text">
            Black tie optional. Think elevated wedding attire that feels polished and comfortable for an evening celebration.
          </p>
          <ul className="attire-key-points">
            <li>Ceremony, cocktail hour, and reception are indoors.</li>
            <li>There is a brief outdoor champagne toast on grass.</li>
            <li>Flip flops will be provided for dancing later in the evening.</li>
          </ul>
        </section>

        <section className="attire-section">
          <h2 className="section-heading">For Women</h2>
          <ul className="attire-list">
            <li>Evening gown or longer cocktail dress</li>
            <li>Elegant separates</li>
            <li>Dressy pantsuit</li>
            <li>Please avoid white or ivory (#whatclairewears)</li>
            <li>Comfortable heels or dressy flats</li>
          </ul>
        </section>

        <section className="attire-section">
          <h2 className="section-heading">For Men</h2>
          <ul className="attire-list">
            <li>Tuxedo or dark suit</li>
            <li>Dress shirt and tie</li>
            <li>Leather dress shoes</li>
            <li>Please avoid jeans and athletic shoes</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

export default Attire;
