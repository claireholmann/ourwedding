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
        <section className="attire-section">
          <h2 className="section-heading">Dress Code</h2>
          <p className="section-text">
            We'd love for you to dress up for this special occasion! Here is some inspiration to help you find the perfect outfit!
          </p>
        </section>

        <section className="attire-section">
          <h2 className="section-heading">For Women</h2>
          <ul className="attire-list">
            <li>Evening gown or longer cocktail dress</li>
            <li>Elegant separates</li>
            <li>Dressy pantsuit</li>
            <li>Avoid white (#whatclairewears)</li>
            <li>Comfortable heels or dressy flats</li>
          </ul>
        </section>

        <section className="attire-section">
          <h2 className="section-heading">For Men</h2>
          <ul className="attire-list">
            <li>Tuxedo or dark suit</li>
            <li>Dress shirt and tie</li>
            <li>Leather dress shoes</li>
            <li>Avoid jeans and gym shoes</li>
          </ul>
        </section>

        <section className="attire-section">
          <h2 className="section-heading">Additional Notes</h2>
          <ul className="attire-list">
            <li>The ceremony, cocktail hour and reception will be held indoors, so plan accordingly</li>
            <li>There is a brief champagne toast located in a more grassy area.</li>
            <li>Flip flops will be provided for dancing!</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Attire;
