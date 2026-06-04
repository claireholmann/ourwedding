import { Link } from 'react-router-dom';
import './FAQs.css';

function FAQs() {
  return (
    <div className="faqs-container">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian · June 26th, 2027</span>
        <h1 className="page-hero-title">FAQs</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="faqs-content">
        <div className="faq-item">
          <h3 className="faq-question">What time should I arrive?</h3>
          <p className="faq-answer">Please plan to arrive by 1:30 PM EST to navigate Saint Mary's campus and be seated before the ceremony begins at 2:00 PM EST. Reference the available parking lots and take into consideration the walk and finding your way up to the 3rd floor of Le Mans Hall. Also, keep in mind South Bend is Eastern Time.  For all you Chicago folks, that's a 1:00 PM CST start time.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What is the dress code?</h3>
          <p className="faq-answer">
            Black tie optional. For some outfit inspiration, visit our{' '}
            <Link className="faq-inline-link" to="/attire">Attire page</Link>{' '}
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Will there be a reception?</h3>
          <p className="faq-answer">Yes! Cocktail hour and reception will follow immediately after the ceremony and champagne toast downtown South Bend at the Morris Performing Arts Center Lobby and Palais Royale.  It is a 10 minute drive from Saint Mary's.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Can I bring a guest?</h3>
          <p className="faq-answer">
            Please refer to your invitation. Attendance is limited to the name(s)
            listed there, and guest substitutions are not available.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Are children welcome?</h3>
          <p className="faq-answer">While we love your little ones, we kindly request an adults-only celebration.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Do you have a registry?</h3>
          <p className="faq-answer">
            Yes. You can view gift options on our{' '}
            <Link className="faq-inline-link" to="/registry">Registry page</Link>.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What if I have dietary restrictions?</h3>
          <p className="faq-answer">
            Please include dietary needs on your RSVP. You can update your response any time before June 1st on the{' '}
            <Link className="faq-inline-link" to="/rsvp">RSVP page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
