import { useRef, useState } from 'react';
import './RSVP.css';
import { trackEvent } from '../analytics';

// Google Apps Script deployment
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbws1dIH4rJjXmJ3cf3aMj2doO6GPhnANN3xzVqsnr5SzMZgfdUqlGmSciuRlRqJiUUvBg/exec';
const ITINERARY_RSVP_STORAGE_KEY = 'bck_rsvp_itinerary';
const RSVP_LOOKUP_CACHE = new Map();
const RSVP_SESSION_CACHE_KEY = 'bck_rsvp_lookup_cache_v2';
const SEARCH_RESULTS_PAGE_SIZE = 3;

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
    date: 'Friday, June 25th, 2027',
    time: '6:00 PM EST',
    location: "Macri's Italian",
    conditional: (member) => member.invitedToRehearsal,
  },
  {
    key: 'welcomeRsvp',
    title: 'Welcome Party',
    date: 'Friday, June 25th, 2027',
    time: '8:00 PM EST',
    location: 'Howard Park Public House',
    conditional: () => true,
  },
  {
    key: 'ceremonyRsvp',
    title: 'Ceremony',
    date: 'Saturday, June 26th, 2027',
    time: '2:00 PM EST',
    location: "Holy Spirit Chapel, Saint Mary's College",
    conditional: () => true,
  },
  {
    key: 'receptionRsvp',
    title: 'Reception',
    date: 'Saturday, June 26th, 2027',
    time: '5:30 PM EST',
    location: 'Palais Royale, South Bend',
    conditional: () => true,
  },
  {
    key: 'brunchRsvp',
    title: 'Sunday Brunch',
    date: 'Sunday, June 27th, 2027',
    time: '10:00 AM EST',
    location: 'Aloft South Bend',
    conditional: (member) => member.invitedToBrunch,
  },
];

async function lookupInvitations(query) {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  if (RSVP_LOOKUP_CACHE.size === 0) {
    try {
      const rawCache = sessionStorage.getItem(RSVP_SESSION_CACHE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        if (parsed && typeof parsed === 'object') {
          Object.entries(parsed).forEach(([key, value]) => {
            if (Array.isArray(value)) RSVP_LOOKUP_CACHE.set(key, value);
          });
        }
      }
    } catch {
      // Ignore cache hydration errors.
    }
  }

  if (RSVP_LOOKUP_CACHE.has(normalized)) {
    return RSVP_LOOKUP_CACHE.get(normalized);
  }

  const url = `${SCRIPT_URL}?action=lookup&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Lookup failed (${res.status}).`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('Lookup endpoint did not return JSON. Check Apps Script deployment URL and access settings.');
  }

  const data = await res.json();
  if (data?.error) {
    throw new Error(String(data.error));
  }

  const matches = Array.isArray(data.matches) ? data.matches : [];
  if (matches.length > 0) {
    RSVP_LOOKUP_CACHE.set(normalized, matches);
  }

  try {
    const serialized = Object.fromEntries(RSVP_LOOKUP_CACHE.entries());
    sessionStorage.setItem(RSVP_SESSION_CACHE_KEY, JSON.stringify(serialized));
  } catch {
    // Ignore cache persistence errors.
  }

  return matches;
}

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
        <div className="event-section-meta">
          {event.date && <p className="event-section-desc"><strong>Date:</strong> {event.date}</p>}
          {event.time && <p className="event-section-desc"><strong>Time:</strong> {event.time}</p>}
          {event.location && <p className="event-section-desc"><strong>Location:</strong> {event.location}</p>}
        </div>
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

  const hasGuest = members.some((member) => hasGuestInName(member.name));
  const partner = members.find((member) => !hasGuestInName(member.name));

  if (hasGuest && partner && members.length === 2) {
    const partnerName = formatGuestDisplayName(partner.name);
    return `${partnerName} and Guest`;
  }

  const displayMembers = members.map((member) => ({
    ...member,
    displayName: formatGuestDisplayName(member.name),
  }));

  if (displayMembers.length === 1) return displayMembers[0].displayName;

  const suffixes = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv', 'v']);
  const getFamilyLastName = (fullName) => {
    const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return '';
    const tail = parts[parts.length - 1].toLowerCase();
    const lastIdx = suffixes.has(tail) ? parts.length - 2 : parts.length - 1;
    return String(parts[lastIdx] || '').toLowerCase();
  };

  const parsed = displayMembers.map((member) => {
    const parts = member.displayName.trim().split(/\s+/);
    return {
      full: member.displayName,
      first: parts[0],
      last: parts.slice(1).join(' '),
      familyLast: getFamilyLastName(member.displayName),
    };
  });

  const familyLastNames = parsed.map((p) => p.familyLast).filter(Boolean);
  const allSameLastName = familyLastNames.length === parsed.length
    && familyLastNames.every((ln) => ln === familyLastNames[0]);

  if (allSameLastName && familyLastNames[0]) {
    if (parsed.length >= 3) {
      const displayLast = familyLastNames[0].charAt(0).toUpperCase() + familyLastNames[0].slice(1);
      return `The ${displayLast} Family`;
    }

    const firstNames = parsed.map((p) => p.first).join(' and ');
    const displayLast = familyLastNames[0].charAt(0).toUpperCase() + familyLastNames[0].slice(1);
    return `${firstNames} ${displayLast}`;
  }

  const displayNames = displayMembers.map((member) => member.displayName);
  const joiner = ' and ';
  return displayNames.join(joiner);
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function isSimilarToken(queryToken, targetToken) {
  if (!queryToken || !targetToken) return false;
  if (queryToken === targetToken) return true;
  if (targetToken.startsWith(queryToken) || queryToken.startsWith(targetToken)) return true;
  if (Math.abs(queryToken.length - targetToken.length) > 1) return false;

  let edits = 0;
  let i = 0;
  let j = 0;
  while (i < queryToken.length && j < targetToken.length) {
    if (queryToken[i] === targetToken[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (queryToken.length > targetToken.length) {
      i += 1;
    } else if (queryToken.length < targetToken.length) {
      j += 1;
    } else {
      i += 1;
      j += 1;
    }
  }

  return edits + Math.abs(queryToken.length - targetToken.length) <= 1;
}

function hasGuestInName(name) {
  return /\bguest\b/i.test(String(name || '').trim());
}

function formatGuestDisplayName(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return '';

  if (hasGuestInName(trimmed)) {
    return 'Guest';
  }

  return trimmed;
}

function includesAllQueryWords(name, queryWords) {
  const targetWords = normalizeText(name).split(/\s+/).filter(Boolean);
  return queryWords.every((word) =>
    targetWords.some((candidate) => isSimilarToken(word, candidate))
  );
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
    .split(/\s*(?:,|;|\band\b|&|\+)\s*/i)
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

  const byName = new Map();
  matches.forEach((match, idx) => {
    const candidateNames = [
      match.matchedName,
      ...(match.members || []).map((m) => m.name),
    ];
    for (const candidate of candidateNames) {
      const key = normalizeText(candidate);
      if (!key) continue;
      const existing = byName.get(key) || [];
      existing.push(idx);
      byName.set(key, existing);
    }
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
        const linkedIndices = byName.get(guestKey) || [];
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
  if (queryWords.length === 0) return matches;

  return matches.filter((match) => {
    if (includesAllQueryWords(match.matchedName, queryWords)) return true;
    if (includesAllQueryWords(match.guestName, queryWords)) return true;
    return (match.members || []).some((m) => includesAllQueryWords(m.name, queryWords));
  });
}

function preferFilteredMatches(matches, query) {
  const filtered = filterMatchesByQuery(matches, query);
  // Keep backend-ranked results when client-side filtering is too strict (e.g., alias-only searches).
  return filtered.length > 0 ? filtered : matches;
}

function mergeUniqueMatches(primary, secondary) {
  const merged = [];
  const seen = new Set();

  for (const match of [...primary, ...secondary]) {
    const key = getMatchKey(match);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(match);
    }
  }

  return merged;
}

function RSVP() {
  const [searchQuery,   setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [visibleResultsCount, setVisibleResultsCount] = useState(SEARCH_RESULTS_PAGE_SIZE);
  const [searching,     setSearching]     = useState(false);
  const [household,     setHousehold]     = useState(null);
  const [submitting,    setSubmitting]    = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [formError,     setFormError]     = useState('');
  const [lookupError,   setLookupError]   = useState('');
  const latestSearchRequestRef = useRef(0);

  // Form state: { members: [{ rowIndex, name, ..., form: { rehearsalRsvp, ..., meal, foodAllergies } }], shared: { songRequests, message } }
  const [form, setForm] = useState(null);

  // ── Search ────────────────────────────────────────────────
  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const requestId = latestSearchRequestRef.current + 1;
    latestSearchRequestRef.current = requestId;

    setSearching(true);
    setLookupError('');
    setSearchResults(null);
    setVisibleResultsCount(SEARCH_RESULTS_PAGE_SIZE);
    trackEvent('rsvp_lookup_started');

    try {
      const queryWords = normalizeText(query).split(/\s+/).filter(Boolean);

      // Phase 1: exact lookup first for fastest perceived response.
      let finalMatches = await lookupInvitations(query);

      // Phase 2: fallback lookups only when exact lookup returns no matches.
      if (finalMatches.length === 0 && queryWords.length >= 2) {
        const fallbackQueries = [
          `${queryWords[0]} ${queryWords[queryWords.length - 1]}`,
        ];

        const baseName = `${queryWords[0]} ${queryWords[1]}`;
        for (const suffix of NAME_SUFFIX_TERMS) {
          fallbackQueries.push(`${baseName} ${suffix}`);
        }

        const uniqueFallbacks = [...new Set(fallbackQueries.map((q) => q.trim()).filter(Boolean))]
          .filter((q) => normalizeText(q) !== normalizeText(query));

        const fallbackMatchesLists = await Promise.all(uniqueFallbacks.map((candidate) => lookupInvitations(candidate)));
        for (const matches of fallbackMatchesLists) {
          finalMatches = mergeUniqueMatches(finalMatches, matches);
        }
      }

      const initialMatches = preferFilteredMatches(linkRelatedMatches(finalMatches), query);

      // Render immediately from sheet-backed household data.
      if (latestSearchRequestRef.current === requestId) {
        setSearchResults(initialMatches.length > 0 ? initialMatches : []);
        trackEvent('rsvp_lookup_completed', {
          match_count: initialMatches.length,
          lookup_status: initialMatches.length > 0 ? 'matched' : 'no_match',
        });
      }
    } catch (error) {
      setLookupError(error instanceof Error ? error.message : 'Lookup failed. Please try again.');
      setSearchResults([]);
      trackEvent('rsvp_lookup_failed');
    } finally {
      if (latestSearchRequestRef.current === requestId) {
        setSearching(false);
      }
    }
  };

  const initializeHousehold = (match) => {
    const memberForms = match.members.map((m) => ({
      rowIndex:          m.rowIndex,
      name:              formatGuestDisplayName(m.name),
      hasGuest:          hasGuestInName(m.name),
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
        guestName:    '',
        guestRsvp:    '',
        sendCopy:     false,
        responseEmail:'',
      },
    });
    setSearchResults(null);
  };

  const handleSelectResult = (match) => {
    initializeHousehold(match);
    setFormError('');
    trackEvent('rsvp_household_selected', {
      household_size: Array.isArray(match.members) ? match.members.length : 0,
    });
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
    if (err) {
      setFormError(err);
      trackEvent('rsvp_validation_failed');
      return;
    }

    setSubmitting(true);
    setFormError('');
    trackEvent('rsvp_submit_started', {
      household_size: form.members.length,
      attending_count: form.members.filter((member) =>
        ['welcomeRsvp', 'ceremonyRsvp', 'receptionRsvp', 'brunchRsvp', 'rehearsalRsvp'].some(
          (eventKey) => member.form[eventKey] === 'Yes'
        )
      ).length,
    });
    try {
      const params = new URLSearchParams();
      params.append('action', 'submit');
      params.append('members', JSON.stringify(form.members.map(m => ({ rowIndex: m.rowIndex, name: m.name, invitedToRehearsal: m.invitedToRehearsal, invitedToBrunch: m.invitedToBrunch }))));
      params.append('songRequests', form.shared.songRequests);
      params.append('message', form.shared.message);
      params.append('guestName', form.shared.guestName || '');
      params.append('guestRsvp', form.shared.guestRsvp || '');
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
        const attendingRehearsalDinner = form.members.some(
          (member) => member.invitedToRehearsal && member.form.rehearsalRsvp === 'Yes'
        );
        const householdName = formatHouseholdNames(form.members.map((member) => ({ name: member.name })));

        try {
          localStorage.setItem(
            ITINERARY_RSVP_STORAGE_KEY,
            JSON.stringify({
              attendingRehearsalDinner,
              householdName,
              updatedAt: new Date().toISOString(),
            })
          );
        } catch {
          // Ignore storage errors (for example, private browsing restrictions).
        }

        // Clear lookup cache so returning guests see their fresh submitted responses.
        RSVP_LOOKUP_CACHE.clear();
        try { sessionStorage.removeItem(RSVP_SESSION_CACHE_KEY); } catch { /* ignore */ }

        setSubmitted(true);
        trackEvent('rsvp_submit_completed', {
          household_size: form.members.length,
        });
      } else {
        setFormError('Something went wrong. Please try again or contact us directly.');
        trackEvent('rsvp_submit_failed', {
          failure_type: 'api_response',
        });
      }
    } catch {
      setFormError('Something went wrong. Please try again or contact us directly.');
      trackEvent('rsvp_submit_failed', {
        failure_type: 'network_or_parse',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="rsvp-container">
        <div className="page-hero">
          <span className="page-eyebrow">Claire <span className="amp-symbol">&</span> Brian · June 26th, 2027</span>
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
            <h2>Thank You<span className="success-message-character">!</span></h2>
            <p>Your RSVP is in. We cannot wait to celebrate with you in South Bend!</p>
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
        <span className="page-eyebrow">Claire & Brian · June 26th, 2027</span>
        <h1 className="page-hero-title">RSVP</h1>
        <div className="page-hero-divider" />
      </div>

      <div className="rsvp-content">
        <p className="rsvp-intro">
          Please reply by <strong>June 1st, 2027</strong>. Enter any household member name to find your invitation and submit your selections.
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
                    placeholder="Enter first and last name"
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
                {lookupError || "We couldn't find that name. Please double-check your spelling or contact us directly."}
              </p>
            )}

            {searchResults && searchResults.length > 0 && (
              <div className="search-results">
                <p className="search-results-label">Select your invitation:</p>
                {searchResults.slice(0, visibleResultsCount).map((result, idx) => {
                  const displayName = formatHouseholdNames(result.members) || formatGuestDisplayName(result.matchedName);
                  return (
                    <button
                      key={`${result.matchedName}-${idx}`}
                      className="result-card"
                      onClick={() => handleSelectResult(result)}
                      type="button"
                    >
                      <span className="result-name">{displayName}</span>
                    </button>
                  );
                })}
                {searchResults.length > visibleResultsCount && (
                  <button
                    type="button"
                    className="result-more-button"
                    onClick={() => setVisibleResultsCount((count) => count + SEARCH_RESULTS_PAGE_SIZE)}
                  >
                    Show More Results
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Form ── */}
        {household && form && (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="invite-summary">
              <p>
                Welcome, <strong>{householdNames}</strong>.
              </p>
              <button
                type="button"
                className="change-name-btn"
                onClick={() => {
                  setHousehold(null);
                  setForm(null);
                  setSearchQuery('');
                  setVisibleResultsCount(SEARCH_RESULTS_PAGE_SIZE);
                }}
              >
                Search Again
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

            {/* Guest name input — only show for household members who are guests */}
            {form.members.some(m => m.hasGuest) && (
              <div className="event-section">
                <div className="event-section-header">
                  <h3 className="event-section-title">Guest Information</h3>
                </div>
                <div className="guest-info-section">
                  {form.members
                    .filter(m => m.hasGuest)
                    .map((member) => (
                      <div key={member.rowIndex} className="form-group guest-entry-group">
                        <label htmlFor={`guestName_${member.rowIndex}`}>{member.name}&apos;s Name</label>
                        <input
                          type="text"
                          id={`guestName_${member.rowIndex}`}
                          value={form.shared.guestName || ''}
                          onChange={(e) => setSharedField('guestName', e.target.value)}
                          placeholder="Enter the guest's name"
                          autoComplete="name"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

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
