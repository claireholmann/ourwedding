import './Registry.css';

function Registry() {
  return (
    <div className="registry-page">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian · June 2027</span>
        <h1 className="page-hero-title">Registry</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="registry-content">
        <p className="registry-intro">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
          we've registered at the following stores:
        </p>
          
          <div className="registry-list">
            <a href="#" className="registry-link">
              <div>
                <h3 className="registry-title">Amazon</h3>
                <p className="registry-description">View our Amazon registry</p>
              </div>
              <span className="registry-arrow">→</span>
            </a>
            
            <a href="#" className="registry-link">
              <div>
                <h3 className="registry-title">Target</h3>
                <p className="registry-description">View our Target registry</p>
              </div>
              <span className="registry-arrow">→</span>
            </a>
            
            <a href="#" className="registry-link">
              <div>
                <h3 className="registry-title">Crate <span className="page-hero-and">&</span> Barrel</h3>
                <p className="registry-description">View our Crate & Barrel registry</p>
              </div>
              <span className="registry-arrow">→</span>
            </a>
          </div>
      </div>
    </div>
  );
}

export default Registry;
