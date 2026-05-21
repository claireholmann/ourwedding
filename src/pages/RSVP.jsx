import { useState } from 'react';
import './RSVP.css';

const GUEST_INVITES = {
  'claire nelson': { displayName: 'Claire Nelson', maxGuests: 1, invitedToRehearsal: true },
  'brian kelly': { displayName: 'Brian Kelly', maxGuests: 1, invitedToRehearsal: true },
  'john smith': { displayName: 'John Smith', maxGuests: 2, invitedToRehearsal: false },
  'jane doe': { displayName: 'Jane Doe', maxGuests: 2, invitedToRehearsal: true },
  'emily johnson': { displayName: 'Emily Johnson', maxGuests: 1, invitedToRehearsal: false }
};

const BASE_EVENTS = [
  { key: 'welcomeParty', label: 'Welcome Party' },
  { key: 'champagneToast', label: 'Champagne Toast' },
  { key: 'ceremony', label: 'Ceremony' },
  { key: 'reception', label: 'Reception' }
];

function RSVP() {
  const [lookupName, setLookupName] = useState('');
  const [guestProfile, setGuestProfile] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    eventResponses: {},
    dietary: '',
    song: '',
    comments: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const availableEvents = guestProfile
    ? guestProfile.invitedToRehearsal
      ? [...BASE_EVENTS, { key: 'rehearsalDinner', label: 'Rehearsal Dinner' }]
      : BASE_EVENTS
    : [];

  const buildDefaultEventResponses = (events) =>
    events.reduce((acc, event) => {
      acc[event.key] = '';
      return acc;
    }, {});

  const findGuestProfile = (name) => {
    const normalized = name.trim().toLowerCase().replace(/\s+/g, ' ');
    return GUEST_INVITES[normalized] || null;
  };

  const handleLookup = (e) => {
    e.preventDefault();
    const guest = findGuestProfile(lookupName);

    if (!guest) {
      setGuestProfile(null);
      setLookupError('We could not find that name on the guest list. Please check spelling or contact Claire and Brian.');
      return;
    }

    const events = guest.invitedToRehearsal
      ? [...BASE_EVENTS, { key: 'rehearsalDinner', label: 'Rehearsal Dinner' }]
      : BASE_EVENTS;

    setLookupError('');
    setGuestProfile(guest);
    setFormData((prev) => ({
      ...prev,
      name: guest.displayName,
      guests: String(guest.maxGuests),
      eventResponses: buildDefaultEventResponses(events)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventResponse = (eventKey, value) => {
    setFormData((prev) => ({
      ...prev,
      eventResponses: {
        ...prev.eventResponses,
        [eventKey]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasUnansweredEvent = availableEvents.some(
      (event) => !formData.eventResponses[event.key]
    );

    if (hasUnansweredEvent) {
      return;
    }

    // Here you would send the form data to a server or email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setLookupName('');
      setGuestProfile(null);
      setLookupError('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: '1',
        eventResponses: {},
        dietary: '',
        song: '',
        comments: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="rsvp-container">
      <div className="page-hero">
        <span className="page-eyebrow">Claire & Brian · June 2027</span>
        <h1 className="page-hero-title">RSVP</h1>
        <div className="page-hero-divider" />
      </div>
      
      <div className="rsvp-content">
        <p className="rsvp-intro">
          We'd love to celebrate with you! Please RSVP by June 1st, 2027.
        </p>

        {!guestProfile && !submitted && (
          <form className="rsvp-lookup" onSubmit={handleLookup}>
            <div className="form-group">
              <label htmlFor="lookupName">Find Your Invitation</label>
              <input
                type="text"
                id="lookupName"
                value={lookupName}
                onChange={(e) => setLookupName(e.target.value)}
                required
                placeholder="Type your first and last name"
              />
            </div>
            {lookupError && <p className="lookup-error">{lookupError}</p>}
            <button type="submit" className="submit-button">Find My RSVP</button>
          </form>
        )}

        {submitted ? (
          <div className="success-message">
            <h2>Thank you for RSVPing! ✓</h2>
            <p>We've received your response and can't wait to see you on the big day!</p>
          </div>
        ) : guestProfile ? (
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="invite-summary">
              <p>
                Welcome, <strong>{guestProfile.displayName}</strong>
              </p>
              <p>
                You may RSVP for up to <strong>{guestProfile.maxGuests}</strong> guest
                {guestProfile.maxGuests > 1 ? 's' : ''}.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests *</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                {Array.from({ length: guestProfile.maxGuests }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={String(num)}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Event RSVP *</label>
              <div className="event-rsvp-list">
                {availableEvents.map((event) => (
                  <div key={event.key} className="event-rsvp-item">
                    <p className="event-name">{event.label}</p>
                    <div className="radio-group radio-inline">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={`event-${event.key}`}
                          value="yes"
                          checked={formData.eventResponses[event.key] === 'yes'}
                          onChange={() => handleEventResponse(event.key, 'yes')}
                          required
                        />
                        <span>Yes</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={`event-${event.key}`}
                          value="no"
                          checked={formData.eventResponses[event.key] === 'no'}
                          onChange={() => handleEventResponse(event.key, 'no')}
                          required
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dietary">Dietary Restrictions</label>
              <input
                type="text"
                id="dietary"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                placeholder="e.g., vegetarian, gluten-free, nut allergy"
              />
            </div>

            <div className="form-group">
              <label htmlFor="song">Favorite Song Request</label>
              <input
                type="text"
                id="song"
                name="song"
                value={formData.song}
                onChange={handleChange}
                placeholder="Song name and artist"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comments">Additional Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="4"
                placeholder="Any questions or messages for the newlyweds?"
              ></textarea>
            </div>

            <button type="submit" className="submit-button">Submit RSVP</button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default RSVP;
