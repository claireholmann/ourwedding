// ─────────────────────────────────────────────────────────────
//  Claire & Brian Wedding RSVP — Google Apps Script Backend
//  HOUSEHOLD MODEL
// ─────────────────────────────────────────────────────────────
//
//  SETUP:
//  1. Open your Google Sheet → Extensions → Apps Script
//  2. Paste this entire file, replacing any existing code
//  3. Set SHEET_NAME to match your sheet tab name (bottom of screen)
//  4. Set NOTIFICATION_EMAIL to your email address
//  5. Click Deploy → New Deployment → Web App
//     - Execute as: Me
//     - Who has access: Anyone
//  6. Copy the Web App URL and paste it into RSVP.jsx as SCRIPT_URL
//
//  SHEET COLUMN ORDER (columns A–O, header row in row 1):
//  A  Name
//  B  Guest                 ← comma-separated household members for grouping: "Megan Becksmith, Adam Becksmith"
//  C  Search Aliases        ← alternate names/nicknames for matching: "joey, joe, joey-b"
//  D  Invited to Rehearsal? ← YES or NO
//  E  Rehearsal RSVP
//  F  Welcome Party RSVP
//  G  Ceremony RSVP
//  H  Reception RSVP
//  I  Meal Choice
//  J  Food Allergies
//  K  Invited to Brunch?    ← YES or NO
//  L  Brunch RSVP
//  M  Song Requests
//  N  Message to Couple
//  O  Submitted At
//
//  EXAMPLE FAMILY:
//  Megan Becksmith | Megan Becksmith, Adam Becksmith, Finlay Becksmith, Teagan Becksmith | joey, joey-b
//  Adam Becksmith  | Megan Becksmith, Adam Becksmith, Finlay Becksmith, Teagan Becksmith |
//  Finlay Becksmith| Megan Becksmith, Adam Becksmith, Finlay Becksmith, Teagan Becksmith |
//  Teagan Becksmith| Megan Becksmith, Adam Becksmith, Finlay Becksmith, Teagan Becksmith |
//
//  Search any member → Guest list determines household members → one submit updates all rows.
// ─────────────────────────────────────────────────────────────

const SHEET_NAME        = 'RSVP';            
const NOTIFICATION_EMAIL = 'thekoschs@gmail.com'; 
// Column indices (0-based)
const C = {
  NAME:                  0,
  GUEST:                 1,
  ALIASES:               2,
  INVITED_REHEARSAL:     3,
  REHEARSAL_RSVP:        4,
  WELCOME_RSVP:          5,
  CEREMONY_RSVP:         6,
  RECEPTION_RSVP:        7,
  MEAL:                  8,
  FOOD_ALLERGIES:        9,
  INVITED_BRUNCH:        10,
  BRUNCH_RSVP:           11,
  SONG_REQUESTS:         12,
  MESSAGE:               13,
  SUBMITTED_AT:          14,
};

// ─── Router ──────────────────────────────────────────────────

function doGet(e) {
  const action = e.parameter.action;
  let result;

  if (action === 'lookup') {
    result = lookup(e.parameter.q || '');
  } else if (action === 'submit') {
    result = submitRsvp(e.parameter);
  } else {
    result = { error: 'Unknown action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── Lookup ──────────────────────────────────────────────────

function lookup(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return { matches: [] };

  const normalizeNameKey = (value) => String(value || '')
    .toLowerCase()
    .replace(/[.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const isInvited = (value) => {
    const normalized = String(value || '').trim().toLowerCase();
    return normalized === 'yes' || normalized === 'true' || normalized === 'y' || normalized === '1';
  };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows  = sheet.getDataRange().getValues();

  // Build a fast name -> row index lookup once per request.
  const rowIndexByName = new Map();
  for (let i = 1; i < rows.length; i++) {
    const nameKey = normalizeNameKey(rows[i][C.NAME]);
    if (!nameKey || rowIndexByName.has(nameKey)) continue;
    rowIndexByName.set(nameKey, i);
  }

  // Find matching people by name/aliases
  const rankedMatches = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[C.NAME]) continue;

    const name    = String(row[C.NAME]).toLowerCase();
    const aliases = String(row[C.ALIASES] || '')
      .toLowerCase()
      .split(',')
      .map(a => a.trim())
      .filter(Boolean);

    const targets = [name, ...aliases];
    let score = 0;

    for (const t of targets) {
      if (!t) continue;
      if (t === q)            { score = Math.max(score, 10); break; }
      if (t.startsWith(q))   { score = Math.max(score, 7);  }
      else if (t.includes(q)){ score = Math.max(score, 5);  }
      else {
        const tWords = t.split(' ');
        const qWords = q.split(' ');
        if (qWords.some(qw => qw.length >= 2 && tWords.some(tw => tw.startsWith(qw)))) {
          score = Math.max(score, 3);
        }
      }
    }

    if (score > 0) {
      rankedMatches.push({ rowIndex: i, score });
    }
  }

  if (rankedMatches.length === 0) return { matches: [] };

  rankedMatches.sort((a, b) => b.score - a.score);

  // Keep all top-score matches (helps Sr/Jr/II variants), then fill up to 8.
  const topScore = rankedMatches[0].score;
  const topScoreMatches = rankedMatches.filter(m => m.score === topScore);
  const restMatches = rankedMatches.filter(m => m.score !== topScore);

  // Also prioritize direct name startsWith matches (e.g., multiple "Lisa ..." rows).
  const startsWithMatches = rankedMatches.filter(({ rowIndex }) => {
    const name = String(rows[rowIndex][C.NAME] || '').toLowerCase();
    return name.startsWith(q);
  });

  const topMatches = [];
  const seen = new Set();
  for (const m of [...topScoreMatches, ...startsWithMatches, ...restMatches]) {
    if (!seen.has(m.rowIndex)) {
      seen.add(m.rowIndex);
      topMatches.push(m);
    }
    if (topMatches.length >= 8) break;
  }

  const results = topMatches.map(({ rowIndex: matchRowIndex }) => {
    const matchedRow = rows[matchRowIndex];
    const matchedName = String(matchedRow[C.NAME]);
    const guestName = String(matchedRow[C.GUEST] || '').trim();
    const guestMembers = String(matchedRow[C.GUEST] || '')
      .split(',')
      .map(a => a.trim())
      .filter(Boolean);
    const aliasMembers = String(matchedRow[C.ALIASES] || '')
      .split(',')
      .map(a => a.trim())
      .filter(Boolean);

    // Prefer Guest whenever present (including a single plus-one), otherwise fallback to Aliases.
    const householdMembers = guestMembers.length > 0 ? guestMembers : aliasMembers;

    const familyMembers = [];
    const seenRowIndices = new Set();

    // Add the matched person first
    familyMembers.push({
      rowIndex:           matchRowIndex,
      name:               matchedName,
      invitedToRehearsal: isInvited(matchedRow[C.INVITED_REHEARSAL]),
      invitedToBrunch:    isInvited(matchedRow[C.INVITED_BRUNCH]),
      alreadySubmitted:   !!matchedRow[C.SUBMITTED_AT],
      existing: {
        rehearsalRsvp: String(matchedRow[C.REHEARSAL_RSVP] || ''),
        welcomeRsvp:   String(matchedRow[C.WELCOME_RSVP] || ''),
        ceremonyRsvp:  String(matchedRow[C.CEREMONY_RSVP] || ''),
        receptionRsvp: String(matchedRow[C.RECEPTION_RSVP] || ''),
        meal:          String(matchedRow[C.MEAL] || ''),
        foodAllergies: String(matchedRow[C.FOOD_ALLERGIES] || ''),
        brunchRsvp:    String(matchedRow[C.BRUNCH_RSVP] || ''),
      },
    });
    seenRowIndices.add(matchRowIndex);

    // Add household members from primary grouping source (Guest or Aliases fallback)
    for (const householdName of householdMembers) {
      const householdRowIndex = rowIndexByName.get(normalizeNameKey(householdName));
      if (householdRowIndex == null || seenRowIndices.has(householdRowIndex)) continue;

      const row = rows[householdRowIndex];
      if (!row || !row[C.NAME]) continue;

      familyMembers.push({
        rowIndex:           householdRowIndex,
        name:               String(row[C.NAME]),
        invitedToRehearsal: isInvited(row[C.INVITED_REHEARSAL]),
        invitedToBrunch:    isInvited(row[C.INVITED_BRUNCH]),
        alreadySubmitted:   !!row[C.SUBMITTED_AT],
        existing: {
          rehearsalRsvp: String(row[C.REHEARSAL_RSVP] || ''),
          welcomeRsvp:   String(row[C.WELCOME_RSVP] || ''),
          ceremonyRsvp:  String(row[C.CEREMONY_RSVP] || ''),
          receptionRsvp: String(row[C.RECEPTION_RSVP] || ''),
          meal:          String(row[C.MEAL] || ''),
          foodAllergies: String(row[C.FOOD_ALLERGIES] || ''),
          brunchRsvp:    String(row[C.BRUNCH_RSVP] || ''),
        },
      });
      seenRowIndices.add(householdRowIndex);
    }

    let sharedSongRequests = '';
    let sharedMessage = '';
    for (const member of familyMembers) {
      const sourceRow = rows[member.rowIndex] || [];
      const songValue = String(sourceRow[C.SONG_REQUESTS] || '').trim();
      const msgValue = String(sourceRow[C.MESSAGE] || '').trim();
      if (songValue || msgValue) {
        sharedSongRequests = songValue;
        sharedMessage = msgValue;
        break;
      }
    }

    return {
      members: familyMembers,
      matchedName,
      guestName,
      shared: {
        songRequests: sharedSongRequests,
        message: sharedMessage,
      },
    };
  });

  return {
    matches: results,
  };
}

// ─── Submit ──────────────────────────────────────────────────

function submitRsvp(p) {
  const sheet    = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

  const headerCheck = validateSheetHeaders(sheet);
  if (!headerCheck.ok) {
    return {
      success: false,
      error: `Sheet columns do not match expected layout. ${headerCheck.message}`,
    };
  }

  // p.members is an array like [{ rowIndex: 1, name: 'Sarah', ... }, { rowIndex: 2, name: 'Mike', ... }, ...]
  const members = JSON.parse(p.members);

  for (const member of members) {
    const mKey = `member_${member.rowIndex}`;
    writePersonRow(sheet, member.rowIndex, {
      rehearsalRsvp:  p[`${mKey}_rehearsalRsvp`]  || '',
      welcomeRsvp:    p[`${mKey}_welcomeRsvp`]    || '',
      ceremonyRsvp:   p[`${mKey}_ceremonyRsvp`]   || '',
      receptionRsvp:  p[`${mKey}_receptionRsvp`]  || '',
      meal:           p[`${mKey}_meal`]           || '',
      foodAllergies:  p[`${mKey}_foodAllergies`]  || '',
      brunchRsvp:     p[`${mKey}_brunchRsvp`]     || '',
      timestamp,
    });
  }

  // Write shared fields (song requests, message) to every selected member row
  for (const member of members) {
    const sheetRow = member.rowIndex + 1;
    sheet.getRange(sheetRow, C.SONG_REQUESTS + 1).setValue(p.songRequests || '');
    sheet.getRange(sheetRow, C.MESSAGE + 1).setValue(p.message || '');
  }

  sendNotificationEmail(p, members);
  sendGuestCopyEmail(p, members);
  return { success: true };
}

function writePersonRow(sheet, rowIndex, data) {
  const sheetRow = rowIndex + 1; // 0-based → 1-based

  const existingRow = sheet
    .getRange(sheetRow, 1, 1, C.SUBMITTED_AT + 1)
    .getValues()[0];

  const pick = (incoming, existingColIndex) => {
    const v = String(incoming == null ? '' : incoming).trim();
    if (v === '') return existingRow[existingColIndex] || '';
    return incoming;
  };

  const updates = [
    [C.REHEARSAL_RSVP + 1, pick(data.rehearsalRsvp, C.REHEARSAL_RSVP)],
    [C.WELCOME_RSVP   + 1, pick(data.welcomeRsvp, C.WELCOME_RSVP)    ],
    [C.CEREMONY_RSVP  + 1, pick(data.ceremonyRsvp, C.CEREMONY_RSVP)   ],
    [C.RECEPTION_RSVP + 1, pick(data.receptionRsvp, C.RECEPTION_RSVP) ],
    [C.MEAL           + 1, pick(data.meal, C.MEAL)                     ],
    [C.FOOD_ALLERGIES + 1, pick(data.foodAllergies, C.FOOD_ALLERGIES)  ],
    [C.BRUNCH_RSVP    + 1, pick(data.brunchRsvp, C.BRUNCH_RSVP)        ],
    [C.SUBMITTED_AT   + 1, data.timestamp     ],
  ];
  for (const [col, val] of updates) {
    sheet.getRange(sheetRow, col).setValue(val);
  }
}

function validateSheetHeaders(sheet) {
  const expectedHeaders = [
    'Name',
    'Guest',
    'Search Aliases',
    'Invited to Rehearsal?',
    'Rehearsal RSVP',
    'Welcome Party RSVP',
    'Ceremony RSVP',
    'Reception RSVP',
    'Meal Choice',
    'Food Allergies',
    'Invited to Brunch?',
    'Brunch RSVP',
    'Song Requests',
    'Message to Couple',
    'Submitted At',
  ];

  const headerRow = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
  const normalize = (v) => String(v || '').trim().toLowerCase();

  for (let i = 0; i < expectedHeaders.length; i++) {
    if (normalize(headerRow[i]) !== normalize(expectedHeaders[i])) {
      return {
        ok: false,
        message: `Column ${i + 1} expected "${expectedHeaders[i]}" but found "${headerRow[i] || '(blank)'}".`,
      };
    }
  }

  return { ok: true };
}

// ─── Household name formatter ────────────────────────────────

function formatHouseholdNames(members) {
  if (!members || members.length === 0) return '';
  if (members.length === 1) return members[0].name;

  const suffixes = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv', 'v']);

  const getFamilyLastName = (fullName) => {
    const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return '';
    const tail = parts[parts.length - 1].toLowerCase();
    const lastIdx = suffixes.has(tail) ? parts.length - 2 : parts.length - 1;
    return (parts[lastIdx] || '').toLowerCase();
  };

  const parsed = members.map(m => {
    const parts = m.name.trim().split(/\s+/);
    return {
      name: m.name,
      first: parts[0],
      familyLast: getFamilyLastName(m.name),
    };
  });

  const familyLastNames = parsed.map(p => p.familyLast).filter(Boolean);
  const allSameLastName = familyLastNames.length === parsed.length
    && familyLastNames.every(ln => ln === familyLastNames[0]);

  if (allSameLastName && familyLastNames[0]) {
    const displayLast = familyLastNames[0].charAt(0).toUpperCase() + familyLastNames[0].slice(1);
    if (parsed.length >= 3) return `The ${displayLast} Family`;
    const firstNames = parsed.map(p => p.first).join(' and ');
    return `${firstNames} ${displayLast}`;
  }

  return members.map(m => m.name).join(' and ');
}

// ─── Email Notification ──────────────────────────────────────

function sendNotificationEmail(p, members) {
  const householdNames = formatHouseholdNames(members);
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const htmlBody = buildRsvpHtmlEmail({
    headerLabel: 'New RSVP Received',
    subLabel: null,
    householdNames,
    timestamp,
    p,
    members,
    isGuestCopy: false,
  });

  MailApp.sendEmail({
    to:       NOTIFICATION_EMAIL,
    subject:  `RSVP: ${householdNames}`,
    body:     buildRsvpPlainText(householdNames, timestamp, p, members),
    htmlBody,
  });
}

function sendGuestCopyEmail(p, members) {
  const wantsCopy = String(p.sendCopy || '').trim().toLowerCase() === 'yes';
  const guestEmail = String(p.responseEmail || '').trim();
  if (!wantsCopy || !guestEmail) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(guestEmail)) return;

  const householdNames = formatHouseholdNames(members);
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const htmlBody = buildRsvpHtmlEmail({
    headerLabel: 'Your RSVP is confirmed',
    subLabel: 'We can\'t wait to celebrate with you in South Bend.',
    householdNames,
    timestamp,
    p,
    members,
    isGuestCopy: true,
  });

  MailApp.sendEmail({
    to:       guestEmail,
    subject:  `Your RSVP — Claire & Brian`,
    body:     buildRsvpPlainText(householdNames, timestamp, p, members),
    htmlBody,
  });
}

// ── Plain-text fallback ───────────────────────────────────────

function buildRsvpPlainText(householdNames, timestamp, p, members) {
  let eventDetails = '';
  for (const member of members) {
    const mKey = `member_${member.rowIndex}`;
    const rehearsalLine = member.invitedToRehearsal
      ? `  Rehearsal Dinner: ${p[`${mKey}_rehearsalRsvp`] || '—'}\n` : '';
    const brunchLine = member.invitedToBrunch
      ? `  Sunday Brunch: ${p[`${mKey}_brunchRsvp`] || '—'}\n` : '';
    eventDetails += `${member.name}:\n`;
    eventDetails += `${rehearsalLine}  Welcome Party: ${p[`${mKey}_welcomeRsvp`] || '—'}\n`;
    eventDetails += `  Ceremony: ${p[`${mKey}_ceremonyRsvp`] || '—'}\n`;
    eventDetails += `  Reception: ${p[`${mKey}_receptionRsvp`] || '—'}\n`;
    eventDetails += `${brunchLine}`;
    if (p[`${mKey}_meal`]) eventDetails += `  Meal: ${p[`${mKey}_meal`]}\n`;
    if (p[`${mKey}_foodAllergies`]) eventDetails += `  Allergies: ${p[`${mKey}_foodAllergies`]}\n`;
    eventDetails += '\n';
  }
  return `RSVP from ${householdNames}\nSubmitted: ${timestamp}\n\n${eventDetails}\nSong Requests: ${p.songRequests || 'None'}\nMessage: ${p.message || 'None'}`;
}

// ── HTML email builder ────────────────────────────────────────

function buildRsvpHtmlEmail({ headerLabel, subLabel, householdNames, timestamp, p, members, isGuestCopy }) {
  const rsvpBadge = (val) => {
    if (!val || val === '—') return '<span style="color:#9ca3af;">—</span>';
    const yes = val === 'Yes';
    const color = yes ? '#6c8b19' : '#b00020';
    const bg    = yes ? '#f0f5e8' : '#fdf2f2';
    return `<span style="display:inline-block;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:0.05em;background:${bg};color:${color};">${val}</span>`;
  };

  const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  let memberRows = '';
  for (const member of members) {
    const mKey = `member_${member.rowIndex}`;
    const rehearsalRow = member.invitedToRehearsal
      ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Rehearsal Dinner</td><td style="padding:6px 0;text-align:right;">${rsvpBadge(p[`${mKey}_rehearsalRsvp`])}</td></tr>` : '';
    const brunchRow = member.invitedToBrunch
      ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Sunday Brunch</td><td style="padding:6px 0;text-align:right;">${rsvpBadge(p[`${mKey}_brunchRsvp`])}</td></tr>` : '';
    const mealRow = p[`${mKey}_meal`]
      ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Meal</td><td style="padding:6px 0;text-align:right;color:#003256;font-size:13px;">${esc(p[`${mKey}_meal`])}</td></tr>` : '';
    const allergyRow = p[`${mKey}_foodAllergies`]
      ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Allergies</td><td style="padding:6px 0;text-align:right;color:#003256;font-size:13px;">${esc(p[`${mKey}_foodAllergies`])}</td></tr>` : '';

    memberRows += `
      <div style="margin-bottom:20px;">
        <div style="font-family:Georgia,serif;font-size:15px;font-weight:600;color:#003256;border-bottom:1px solid #e5e7eb;padding-bottom:6px;margin-bottom:8px;">${esc(member.name)}</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;">
          ${rehearsalRow}
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Welcome Party</td><td style="padding:6px 0;text-align:right;">${rsvpBadge(p[`${mKey}_welcomeRsvp`])}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Ceremony</td><td style="padding:6px 0;text-align:right;">${rsvpBadge(p[`${mKey}_ceremonyRsvp`])}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Reception</td><td style="padding:6px 0;text-align:right;">${rsvpBadge(p[`${mKey}_receptionRsvp`])}</td></tr>
          ${brunchRow}${mealRow}${allergyRow}
        </table>
      </div>`;
  }

  const notesSection = (p.songRequests || p.message) ? `
      <div style="margin-bottom:20px;">
        <div style="font-family:Georgia,serif;font-size:15px;font-weight:600;color:#003256;border-bottom:1px solid #e5e7eb;padding-bottom:6px;margin-bottom:8px;">Notes</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;">
          ${p.songRequests ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Song Request</td><td style="padding:6px 0;text-align:right;color:#003256;font-size:13px;">${esc(p.songRequests)}</td></tr>` : ''}
          ${p.message ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Message</td><td style="padding:6px 0;text-align:right;color:#003256;font-size:13px;">${esc(p.message)}</td></tr>` : ''}
        </table>
      </div>` : '';

  const subLabelHtml = subLabel
    ? `<p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#65b8d4;">${esc(subLabel)}</p>`
    : `<p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#9ca3af;">Submitted ${esc(timestamp)}</p>`;

  const footerNote = isGuestCopy
    ? 'Questions? Reach us at <a href="mailto:thekoschs@gmail.com" style="color:#65b8d4;">thekoschs@gmail.com</a>'
    : `Submitted: ${esc(timestamp)}`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 16px rgba(0,50,86,0.10);">

        <!-- Header -->
        <tr><td style="background:#003256;padding:32px 32px 24px;text-align:center;">
          <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#65b8d4;">Claire &amp; Brian · June 26th, 2027</p>
          <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:400;color:#ffffff;letter-spacing:0.05em;">${esc(headerLabel)}</h1>
          ${subLabelHtml}
        </td></tr>

        <!-- Household name band -->
        <tr><td style="background:#6c8b19;padding:10px 32px;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff;">${esc(householdNames)}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 32px 8px;">
          ${memberRows}
          ${notesSection}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px 28px;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;text-align:center;">${footerNote}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
