import './FAQs.css';

function FAQs() {
  return (
    <div className="faqs-container">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian · June 2027</span>
        <h1 className="page-hero-title">FAQs</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="faqs-content">
        <div className="faq-item">
          <h3 className="faq-question">What time should I arrive?</h3>
          <p className="faq-answer">Please plan to arrive by 1:00 PM EST to be seated before the ceremony begins at 1:30 PM EST. Reference the available parking lots and take into consideration the walk and finding your way up to the 4th floor of Le Mans. Also, keep in mind South Bend is Eastern Time.  For all you Chicago folks, that's 12:00 PM CST.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What is the dress code?</h3>
          <p className="faq-answer">Black tie optional. Please see our Attire page for more some inspiration.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Will there be a reception?</h3>
          <p className="faq-answer">Yes! Cocktail hour and reception will follow immediately after the ceremony and champagne toast downtown South Bend.  It is a 10 minute drive.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Can I bring a guest?</h3>
          <p className="faq-answer">Please refer to your invitation. Only the name(s) listed on the invitation are allowed to attend.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Are children welcome?</h3>
          <p className="faq-answer">While we love your little ones, we kindly request an adults-only celebration.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Do you have a registry?</h3>
          <p className="faq-answer">Yes! Check out our Registry page for gift options.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What if I have dietary restrictions?</h3>
          <p className="faq-answer">Please indicate any dietary restrictions on your RSVP. We want to make sure everyone has a delicious meal!</p>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
