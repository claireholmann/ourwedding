import { useState } from 'react';
import './RSVP.css';

// Google Apps Script deployment
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBjMME5HxmYM1Vf0URJe1ZL6_TAW23nJI3w5NsP1MtxRojnIv4b-DRlKA9xdY0o-Cc/exec';

const MEAL_OPTIONS = [
  { value: '',           label: 'Select a meal…' },
  { value: 'Chicken',    label: 'Chicken' },
  { value: 'Short Rib',  label: 'Short Rib' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: "Kids' Meal", label: "Kids' Meal" },
];

const NAME_SUFFIX_TERMS = ['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv'];

const EVENTS = [
  {
    key: 'rehearsalRsvp',
    title: 'Rehearsal Dinner',
    description: 'Friday, June 25th, 2027',
    conditional: (member) => member.invitedToRehearsal,
  },
  {
    key: 'welcomeRsvp',
    title: 'Welcome Party',
    description: 'Friday, June 25th, 2027 · Following the rehearsal dinner',
    conditional: () => true,
  },
  {
    key: 'ceremonyRsvp',
    title: 'Ceremony',
    description: 'Saturday, June 26th, 2027 · 1:30 PM · Le Mans Chapel, Saint Mary\'s College',
    conditional: () => true,
  },
  {
    key: 'receptionRsvp',
    title: 'Reception',
    description: 'Saturday, June 26th, 2027 · Following the ceremony',
    conditional: () => true,
  },
  {
    key: 'brunchRsvp',
    title: 'Sunday Brunch',
    description: 'Sunday, June 27th, 2027',
    conditional: (member) => member.invitedToBrunch,
  },
];

// ── Reusable Yes / No toggle ──────────────────────────────────
function YesNo({ value, onChange }) {
  return (
    <div className="yes-no-group">
      <label className={`yn-option${value === 'Yes' ? ' yn-selected' : ''}`}>
        <input type="radio" value="Yes" checked={value === 'Yes'} onChange={() => onChange('Yes')} />
        Yes
      </label>
      <label className={`yn-option${value === 'No' ? ' yn-selected' : ''}`}>
        <input type="radio" value="No" checked={value === 'No'} onChange={() => onChange('No')} />
        No
      </label>
    </div>
  );
}

// ── Event card with all household members ──────────────────────
function EventCard({ event, members, setMemberField }) {
  return (
    <div className="event-section">
      <div className="event-section-header">
        <h3 className="event-section-title">{event.title}</h3>
        {event.description && <p className="event-section-desc">{event.description}</p>}
      </div>
      <div className="event-attendees">
        {members.map((member) => (
          event.conditional(member) && (
            <div key={member.rowIndex} className="attendee-row">
              <span className="attendee-name">{member.name}</span>
              <YesNo 
                value={member.form[event.key]} 
                onChange={(v) => setMemberField(member.rowIndex, event.key, v)} 
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
}

// ── Helper to format household names with consolidated last names ──
function formatHouseholdNames(members) {
  if (members.length === 0) return '';
  if (members.length === 1) return members[0].name;

  const suffixes = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv', 'v']);
  const getFamilyLastName = (fullName) => {
    const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return '';
    const tail = parts[parts.length - 1].toLowerCase();
    const lastIdx = suffixes.has(tail) ? parts.length - 2 : parts.length - 1;
    return String(parts[lastIdx] || '').toLowerCase();
  };
  
  // Extract first and last names
  const parsed = members.map(m => {
    const parts = m.name.trim().split(/\s+/);
    return {
      full: m.name,
      first: parts[0],
      last: parts.slice(1).join(' '),
      familyLast: getFamilyLastName(m.name),
    };
  });
  
  // Check if all have the same last name
  const familyLastNames = parsed.map(p => p.familyLast).filter(Boolean);
  const allSameLastName = familyLastNames.length === parsed.length
    && familyLastNames.every(ln => ln === familyLastNames[0]);
  
  if (allSameLastName && familyLastNames[0]) {
    if (parsed.length >= 3) {
      const displayLast = familyLastNames[0].charAt(0).toUpperCase() + familyLastNames[0].slice(1);
      return `The ${displayLast} Family`;
    }
    // "Claire and Brian Holman"
    const firstNames = parsed.map(p => p.first).join(' and ');
    const displayLast = familyLastNames[0].charAt(0).toUpperCase() + familyLastNames[0].slice(1);
    return `${firstNames} ${displayLast}`;
  } else {
    // "Claire Holman and Brian Smith"
    return members.map(m => m.name).join(' and ');
  }
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function includesAllQueryWords(name, queryWords) {
  const target = normalizeText(name);
  return queryWords.every((word) => target.includes(word));
}

function getMatchKey(match) {
  const memberKey = (match.members || [])
    .map((m) => String(m.rowIndex))
    .sort()
    .join('|');
  return memberKey || normalizeText(match.matchedName);
}

function splitGuestNames(guestName) {
  return String(guestName || '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
}

function chooseSharedData(matches) {
  for (const match of matches) {
    const songRequests = String(match?.shared?.songRequests || '').trim();
    const message = String(match?.shared?.message || '').trim();
    if (songRequests || message) {
      return { songRequests, message };
    }
  }
  return { songRequests: '', message: '' };
}

function linkRelatedMatches(matches) {
  if (!Array.isArray(matches) || matches.length === 0) return [];

  const byMatchedName = new Map();
  matches.forEach((match, idx) => {
    const key = normalizeText(match.matchedName);
    if (!key) return;
    const existing = byMatchedName.get(key) || [];
    existing.push(idx);
    byMatchedName.set(key, existing);
  });

  const seen = new Set();
  const linked = [];

  for (let i = 0; i < matches.length; i += 1) {
    if (seen.has(i)) continue;

    const queue = [i];
    const group = [];

    while (queue.length > 0) {
      const currentIdx = queue.shift();
      if (seen.has(currentIdx)) continue;
      seen.add(currentIdx);
      group.push(matches[currentIdx]);

      const guestNames = splitGuestNames(matches[currentIdx].guestName);
      for (const guest of guestNames) {
        const guestKey = normalizeText(guest);
        const linkedIndices = byMatchedName.get(guestKey) || [];
        for (const linkedIdx of linkedIndices) {
          if (!seen.has(linkedIdx)) queue.push(linkedIdx);
        }
      }
    }

    const mergedMembers = [];
    const memberSeen = new Set();
    for (const match of group) {
      for (const member of match.members || []) {
        const memberKey = String(member.rowIndex);
        if (memberSeen.has(memberKey)) continue;
        memberSeen.add(memberKey);
        mergedMembers.push(member);
      }
    }

    const shared = chooseSharedData(group);
    const primary = group[0];
    linked.push({
      ...primary,
      members: mergedMembers,
      shared,
    });
  }

  return linked;
}

function filterMatchesByQuery(matches, query) {
  const queryWords = normalizeText(query).split(/\s+/).filter(Boolean);
  if (queryWords.length < 2) return matches;

  return matches.filter((match) => {
    if (includesAllQueryWords(match.matchedName, queryWords)) return true;
    return (match.members || []).some((m) => includesAllQueryWords(m.name, queryWords));
  });
}

function mergeUniqueMatches(primary, secondary, query) {
  const merged = [];
  const seen = new Set();

  for (const match of [...primary, ...secondary]) {
    const key = getMatchKey(match);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(match);
    }
  }

  return filterMatchesByQuery(merged, query);
}

function RSVP() {
  const [searchQuery,   setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching,     setSearching]     = useState(false);
  const [household,     setHousehold]     = useState(null);
  const [submitting,    setSubmitting]    = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [formError,     setFormError]     = useState('');

  // Form state: { members: [{ rowIndex, name, ..., form: { rehearsalRsvp, ..., meal, foodAllergies } }], shared: { songRequests, message } }
  const [form, setForm] = useState(null);

  // ── Search ────────────────────────────────────────────────
  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setSearching(true);
    setSearchResults(null);

    const lookup = async (q) => {
      const url = `${SCRIPT_URL}?action=lookup&q=${encodeURIComponent(q)}`;
      const res = await fetch(url, { redirect: 'follow' });
      const data = await res.json();
      return Array.isArray(data.matches) ? data.matches : [];
    };

    try {
      const queryWords = normalizeText(query).split(/\s+/).filter(Boolean);

      // Frontend-only fallback strategy:
      // 1) full query, 2) first token, 3) last token, 4) first+last
      // then dedupe and filter back down to intended full-name matches.
      const candidateQueries = [query];
      if (queryWords.length >= 2) {
        candidateQueries.push(queryWords[0]);
        candidateQueries.push(queryWords[queryWords.length - 1]);
        candidateQueries.push(`${queryWords[0]} ${queryWords[queryWords.length - 1]}`);

        const baseName = `${queryWords[0]} ${queryWords[1]}`;
        for (const suffix of NAME_SUFFIX_TERMS) {
          candidateQueries.push(`${baseName} ${suffix}`);
        }
      }

      const uniqueCandidates = [...new Set(candidateQueries.map(q => q.trim()).filter(Boolean))];

      const allMatchLists = await Promise.all(uniqueCandidates.map((candidate) => lookup(candidate)));
      let finalMatches = [];
      for (const matches of allMatchLists) {
        finalMatches = mergeUniqueMatches(finalMatches, matches, query);
      }

      // If a matched row references a guest name, resolve that guest too and then
      // merge linked households so plus-ones appear in the same invitation card.
      const knownQueries = new Set(uniqueCandidates.map((q) => normalizeText(q)));
      const guestQueries = [...new Set(
        finalMatches
          .flatMap((match) => splitGuestNames(match.guestName))
          .map((name) => name.trim())
          .filter((name) => name && !knownQueries.has(normalizeText(name)))
      )];

      if (guestQueries.length > 0) {
        const guestMatchLists = await Promise.all(guestQueries.slice(0, 8).map((guest) => lookup(guest)));
        for (const guestMatches of guestMatchLists) {
          finalMatches = mergeUniqueMatches(finalMatches, guestMatches, query);
        }
      }

      finalMatches = linkRelatedMatches(finalMatches);

      setSearchResults(finalMatches.length > 0 ? finalMatches : []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const initializeHousehold = (match) => {
    const memberForms = match.members.map(m => ({
      rowIndex:          m.rowIndex,
      name:              m.name,
      invitedToRehearsal: !!m.invitedToRehearsal,
      invitedToBrunch:    !!m.invitedToBrunch,
      alreadySubmitted:   m.alreadySubmitted,
      form: {
        rehearsalRsvp:  m.existing?.rehearsalRsvp || '',
        welcomeRsvp:    m.existing?.welcomeRsvp || '',
        ceremonyRsvp:   m.existing?.ceremonyRsvp || '',
        receptionRsvp:  m.existing?.receptionRsvp || '',
        meal:           m.existing?.meal || '',
        foodAllergies:  m.existing?.foodAllergies || '',
        brunchRsvp:     m.existing?.brunchRsvp || '',
      },
    }));
    setHousehold({
      members:      memberForms,
      matchedName:  match.matchedName,
    });
    setForm({
      members: memberForms,
      shared: {
        songRequests: match.shared?.songRequests || '',
        message:      match.shared?.message || '',
        sendCopy:     false,
        responseEmail:'',
      },
    });
    setSearchResults(null);
  };

  const handleSelectResult = (match) => {
    initializeHousehold(match);
    setFormError('');
  };

  // ── Member form helpers ──────────────────────────────────────
  const setMemberField = (memberRowIndex, field, value) => {
    setForm(prev => ({
      ...prev,
      members: prev.members.map(m =>
        m.rowIndex === memberRowIndex
          ? { ...m, form: { ...m.form, [field]: value } }
          : m
      ),
    }));
  };

  const setSharedField = (field, value) => {
    setForm(prev => ({
      ...prev,
      shared: { ...prev.shared, [field]: value },
    }));
  };

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    for (const member of form.members) {
      const m = member.form;
      if (!m.welcomeRsvp)   return `Please answer Welcome Party for ${member.name}.`;
      if (!m.ceremonyRsvp)  return `Please answer Ceremony for ${member.name}.`;
      if (!m.receptionRsvp) return `Please answer Reception for ${member.name}.`;
      if (member.invitedToRehearsal && !m.rehearsalRsvp)
        return `Please answer Rehearsal Dinner for ${member.name}.`;
      if (member.invitedToBrunch && !m.brunchRsvp)
        return `Please answer Sunday Brunch for ${member.name}.`;
      if (m.receptionRsvp === 'Yes' && !m.meal)
        return `Please select a meal for ${member.name}.`;
    }

    if (form.shared.sendCopy) {
      const email = String(form.shared.responseEmail || '').trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) return 'Please enter an email address to receive your copy.';
      if (!emailPattern.test(email)) return 'Please enter a valid email address.';
    }

    return null;
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setFormError(err); return; }

    setSubmitting(true);
    setFormError('');
    try {
      const params = new URLSearchParams();
      params.append('action', 'submit');
      params.append('members', JSON.stringify(form.members.map(m => ({ rowIndex: m.rowIndex, name: m.name, invitedToRehearsal: m.invitedToRehearsal, invitedToBrunch: m.invitedToBrunch }))));
      params.append('songRequests', form.shared.songRequests);
      params.append('message', form.shared.message);
      params.append('sendCopy', form.shared.sendCopy ? 'Yes' : 'No');
      params.append('responseEmail', form.shared.responseEmail);

      for (const member of form.members) {
        const mKey = `member_${member.rowIndex}`;
        params.append(`${mKey}_rehearsalRsvp`, member.form.rehearsalRsvp);
        params.append(`${mKey}_welcomeRsvp`, member.form.welcomeRsvp);
        params.append(`${mKey}_ceremonyRsvp`, member.form.ceremonyRsvp);
        params.append(`${mKey}_receptionRsvp`, member.form.receptionRsvp);
        params.append(`${mKey}_meal`, member.form.meal);
        params.append(`${mKey}_foodAllergies`, member.form.foodAllergies);
        params.append(`${mKey}_brunchRsvp`, member.form.brunchRsvp);
      }

      const res  = await fetch(`${SCRIPT_URL}?${params.toString()}`, { redirect: 'follow' });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setFormError('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setFormError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="rsvp-container">
        <div className="page-hero">
          <span className="page-eyebrow">Claire <span className="amp-symbol">&</span> Brian · June 2027</span>
          <h1 className="page-hero-title">RSVP</h1>
          <div className="page-hero-divider" />
        </div>
        <div className="rsvp-content">
          <div className="success-message">
            <div className="success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12.8 9.1 17l9.9-9.9" />
              </svg>
              <span className="success-icon-fallback">✓</span>
            </div>
            <h2>Thank You!</h2>
            <p>We've received your RSVP and can't wait to celebrate with you all.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────
  const householdNames = household ? formatHouseholdNames(household.members) : '';

  return (
    <div className="rsvp-container">
      <div className="page-hero">
        <span className="page-eyebrow">Claire <span className="amp-symbol">&</span> Brian · June 2027</span>
        <h1 className="page-hero-title">RSVP</h1>
        <div className="page-hero-divider" />
      </div>

      <div className="rsvp-content">
        <p className="rsvp-intro">
          Please RSVP by <strong>June 1st, 2027</strong>. Enter any family member's name to find your invitation.
        </p>

        {/* ── Step 1: Search ── */}
        {!household && (
          <div className="rsvp-lookup">
            <form onSubmit={handleSearch}>
              <div className="form-group">
                <label htmlFor="searchQuery">Find Your Invitation</label>
                <div className="search-input-row">
                  <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="First and last name"
                    autoComplete="off"
                  />
                  <button type="submit" className="search-button" disabled={searching}>
                    {searching ? '…' : 'Search'}
                  </button>
                </div>
              </div>
            </form>

            {searching && (
              <div className="search-loading" role="status" aria-live="polite">
                <span className="loading-spinner" />
                <span>Searching invitations…</span>
              </div>
            )}

            {searchResults !== null && searchResults.length === 0 && (
              <p className="lookup-error">
                We couldn't find that name. Please double-check your spelling or contact us directly.
              </p>
            )}

            {searchResults && searchResults.length > 0 && (
              <div className="search-results">
                <p className="search-results-label">Select your invitation:</p>
                {searchResults.map((result, idx) => {
                  const displayName = formatHouseholdNames(result.members) || result.matchedName;
                  return (
                    <button
                      key={`${result.matchedName}-${idx}`}
                      className="result-card"
                      onClick={() => handleSelectResult(result)}
                      type="button"
                    >
                      <span className="result-name">{displayName}</span>
                      {result.members?.some(m => m.alreadySubmitted) && (
                        <span className="result-badge">Already submitted - click to update</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Form ── */}
        {household && form && (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="invite-summary">
              <p>
                Welcome, <strong>{householdNames}</strong>!
              </p>
              <button
                type="button"
                className="change-name-btn"
                onClick={() => { setHousehold(null); setForm(null); setSearchQuery(''); }}
              >
                Not your group?
              </button>
            </div>

            {/* Show each event with all invited members */}
            {EVENTS
              .filter((event) => form.members.some((member) => event.conditional(member)))
              .map((event) => (
                <EventCard
                  key={event.key}
                  event={event}
                  members={form.members}
                  setMemberField={setMemberField}
                />
              ))}

            {/* Meal selection — only show for attendees who said Yes to reception */}
            {form.members.some(m => m.form.receptionRsvp === 'Yes') && (
              <div className="event-section">
                <div className="event-section-header">
                  <h3 className="event-section-title">Meal Selection</h3>
                </div>
                <div className="meal-selections">
                  {form.members
                    .filter(member => member.form.receptionRsvp === 'Yes')
                    .map((member) => (
                      <div key={member.rowIndex} className="form-group meal-group">
                        <label htmlFor={`meal_${member.rowIndex}`}>Meal for {member.name}</label>
                        <select
                          id={`meal_${member.rowIndex}`}
                          value={member.form.meal}
                          onChange={(e) => setMemberField(member.rowIndex, 'meal', e.target.value)}
                        >
                          {MEAL_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Food Allergies */}
            <div className="event-section">
              <div className="event-section-header">
                <h3 className="event-section-title">Food Allergies or Dietary Restrictions</h3>
              </div>
              <div className="allergies-section">
                {form.members.map((member) => (
                  <div key={member.rowIndex} className="form-group meal-group">
                    <label htmlFor={`allergies_${member.rowIndex}`}>{member.name}</label>
                    <input
                      type="text"
                      id={`allergies_${member.rowIndex}`}
                      value={member.form.foodAllergies}
                      onChange={(e) => setMemberField(member.rowIndex, 'foodAllergies', e.target.value)}
                      placeholder="Leave blank if none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shared details */}
            <div className="event-section">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="songRequests">Song Requests</label>
                <input
                  type="text"
                  id="songRequests"
                  value={form.shared.songRequests}
                  onChange={(e) => setSharedField('songRequests', e.target.value)}
                  placeholder="What song would get everyone on the dance floor?"
                />
              </div>
            </div>

            <div className="event-section">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="message">Message to Claire <span className="amp-symbol">&</span> Brian</label>
                <textarea
                  id="message"
                  value={form.shared.message}
                  onChange={(e) => setSharedField('message', e.target.value)}
                  rows="4"
                  placeholder="Share a note, a wish, or anything you'd like us to know…"
                />
              </div>
            </div>

            <div className="event-section">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="checkbox-label" htmlFor="sendCopy">
                  <input
                    id="sendCopy"
                    type="checkbox"
                    checked={!!form.shared.sendCopy}
                    onChange={(e) => setSharedField('sendCopy', e.target.checked)}
                  />
                  <span className="checkbox-label-text">Email me a copy of my responses</span>
                </label>
                {form.shared.sendCopy && (
                  <input
                    type="email"
                    id="responseEmail"
                    value={form.shared.responseEmail}
                    onChange={(e) => setSharedField('responseEmail', e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                )}
              </div>
            </div>

            {formError && <p className="lookup-error">{formError}</p>}

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit RSVP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RSVP;
