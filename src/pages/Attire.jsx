import './Attire.css';

const attireInspo = new URL('../assets/images/attire/inspo.jpg', import.meta.url).href;

function Attire() {
  return (
    <div className="attire-container">
      <div className="page-hero">
        <span className="page-eyebrow">Dress Code</span>
        <h1 className="page-hero-title">Wedding Attire</h1>
        <p className="page-hero-subtitle">Black Tie Optional</p>
        <div className="page-hero-divider" />
      </div>
      
      <div className="attire-guidelines-wrapper">
        <div className="attire-content">
          <section className="attire-section attire-priority-card">
            <h2 className="section-heading">Dress Code At a Glance</h2>
            <p className="section-text">
              Black tie optional. Think elevated wedding attire that makes you feel <em>fancy</em>. We encourage you to add some bright summer color and personality! </p>
            <ul className="attire-key-points">
              <li>Ceremony, cocktail hour, and reception are indoors.</li>
              <li>There is a brief outdoor champagne toast on grass.</li>
              <li>Flip flops will be provided for dancing later in the evening.</li>
            </ul>
          </section>

          <section className="attire-section">
            <h2 className="section-heading">For Women</h2>
            <ul className="attire-list">
              <li>Bright summer colors and prints encouraged!</li>
              <li>Evening gown or longer cocktail dress</li>
              <li>Elegant separates or pant suits</li>
              <li>Comfortable heels or dressy flats</li>
              <li>Please avoid white or ivory (#whatclairewears)</li>
            </ul>
          </section>

          <section className="attire-section">
            <h2 className="section-heading">For Men</h2>
            <ul className="attire-list">
              <li>Tuxedo or dark suit</li>
              <li>Dress shirts</li>
              <li>Bow ties or neckties</li>
              <li>Leather dress shoes</li>
              <li>Please avoid jeans and athletic shoes</li>
            </ul>
          </section>
        </div>

        <div className="attire-inspo-image-container">
          <img src={attireInspo} alt="Wedding attire inspiration" className="attire-inspo-image" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default Attire;
