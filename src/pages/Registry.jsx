import './Registry.css';

function Registry() {
  return (
    <div className="registry-page">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian · June 26th, 2027</span>
        <h1 className="page-hero-title">Registry</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="registry-content">
        <p className="registry-intro">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
          we've registered at the following stores:
        </p>
          
          <div className="registry-list">
            <a href="https://www.zola.com/registry/brianandclaire2027" target="_blank" rel="noopener noreferrer" className="registry-link">
              <div>
                <h3 className="registry-title">Zola</h3>
                <p className="registry-description">View our Zola registry</p>
              </div>
              <span className="registry-arrow">→</span>
            </a>

            <a href="https://www.anthropologie.com/registry/listing?registryId=0E105FCED8FA" target="_blank" rel="noopener noreferrer" className="registry-link">
              <div>
                <h3 className="registry-title">Anthropologie</h3>
                <p className="registry-description">View our Anthropologie registry</p>
              </div>
              <span className="registry-arrow">→</span>
            </a>

            <a href="https://www.crateandbarrel.com/gift-registry/claire-holman-and-brian-kosch/r7579697" target="_blank" rel="noopener noreferrer" className="registry-link">
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
