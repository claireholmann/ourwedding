import './Registry.css';
import { trackEvent } from '../analytics';

const registries = [
  {
    name: 'Zola',
    description: 'Our main registry that combines the following registrys into one convenient list. (Group gifts are visible only on the other registries.)',
    href: 'https://www.zola.com/registry/brianandclaire2027',
    featured: true,
  },
  {
    name: 'Anthropologie',
    href: 'https://www.anthropologie.com/registry/listing?registryId=0E105FCED8FA',
  },
  {
    name: 'Crate',
    accentName: 'Barrel',
    href: 'https://www.crateandbarrel.com/gift-registry/claire-holman-and-brian-kosch/r7579697',
  },
  {
    name: 'Pottery Barn',
    href: 'https://www.potterybarn.com/registry/kg6z8f2tj6/registry-list.html',
  },
  {
    name: 'West Elm',
    href: 'https://www.westelm.com/registry/kg6z8f2tj6/registry-list.html',
  },
  {
    name: 'Williams Sonoma',
    href: 'https://www.williams-sonoma.com/registry/kg6z8f2tj6/registry-list.html',
  },
];

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
          Your presence at our wedding is the greatest gift of all. If you’d like to celebrate with us another way, we’ve gathered a few registries below that make gifting easy.
        </p>

        <div className="registry-feature-card">
          <h2 className="registry-feature-title">Zola</h2>
          <p className="registry-feature-copy">
            Our primary registry where you can find all our gifts in one place. <br></br> 
            <span style={{ fontStyle: 'italic', fontSize: '13px' }}>Group gifts are only visible on the other registries.</span>
          </p>
          <a
            href="https://www.zola.com/registry/brianandclaire2027"
            target="_blank"
            rel="noopener noreferrer"
            className="registry-feature-link"
            onClick={() => trackEvent('registry_click', {
              registry_name: 'Zola',
              link_url: 'https://www.zola.com/registry/brianandclaire2027',
              link_position: 'featured',
            })}
          >
            View our Zola registry <span className="registry-arrow">→</span>
          </a>
          
        </div>

        <div className="registry-grid">
          {registries
            .filter((registry) => !registry.featured)
            .map((registry) => (
              <a
                key={registry.name}
                href={registry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="registry-card"
                onClick={() => trackEvent('registry_click', {
                  registry_name: registry.accentName ? `${registry.name} & ${registry.accentName}` : registry.name,
                  link_url: registry.href,
                  link_position: 'grid',
                })}
              >
                <div>
                  <h3 className="registry-card-title">
                    {registry.accentName ? (
                      <>
                        <span>{registry.name}</span>
                        <span className="registry-card-title-amp">&</span>
                        <span>{registry.accentName}</span>
                      </>
                    ) : (
                      registry.name
                    )}
                  </h3>
                  <p className="registry-card-description">{registry.description}</p>
                </div>
                <span className="registry-arrow">→</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Registry;
