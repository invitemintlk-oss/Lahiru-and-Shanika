/**
 * Lahiru & Shanika – Wedding RSVP + Wishes → Google Sheets
 *
 * Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1daNtGADlJ-ahcs39qrkvDXMwtt68kxMSS-PwAuu1H0s/edit
 *
 * SETUP
 * 1. Open the spreadsheet → Extensions → Apps Script.
 * 2. Delete everything in Code.gs and paste this whole file. Save.
 * 3. (Optional) Run `setupSheets` once from the toolbar to create both tabs with headers now.
 *    Approve the permissions prompt the first time.
 * 4. Deploy → New deployment → type "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 *    → Deploy, then copy the Web app URL (ends with /exec).
 * 5. Paste that URL into GOOGLE_SCRIPT_URL in src/googleSheets.ts (or set VITE_GOOGLE_SCRIPT_URL
 *    in Vercel → Settings → Environment Variables) and redeploy the website.
 *
 * The "RSVP" and "Wishes" tabs are created automatically, with styled headers, on the first
 * submission (or when you run setupSheets). Missing headers are re-added if a tab is cleared.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit → Version: New version
 * so the same /exec URL picks up the change.
 */

const SPREADSHEET_ID = '1daNtGADlJ-ahcs39qrkvDXMwtt68kxMSS-PwAuu1H0s';
const TIMEZONE = 'Asia/Colombo';

// Each form gets its own tab, created automatically with these headers.
const SHEETS = {
  rsvp: {
    name: 'RSVP',
    headers: ['Timestamp', 'Name', 'Attendance', 'Guest Count', 'Message', 'Invited As', 'Submitted At (ISO)'],
    widths: [170, 200, 110, 100, 360, 200, 210],
    row: (p) => [
      now_(),
      clean_(p.name),
      clean_(p.status),
      Number(p.guestCount) || 0,
      clean_(p.message),
      clean_(p.invitedAs),
      clean_(p.submittedAt),
    ],
  },
  wishes: {
    name: 'Wishes',
    headers: ['Timestamp', 'Name', 'Wish', 'Invited As', 'Submitted At (ISO)'],
    widths: [170, 200, 460, 200, 210],
    row: (p) => [
      now_(),
      clean_(p.name),
      clean_(p.wish),
      clean_(p.invitedAs),
      clean_(p.submittedAt),
    ],
  },
};

const HEADER_BG = '#B5294E';   // lotus red
const HEADER_FG = '#FFFFFF';
const BAND_BG = '#FCEEF2';     // soft pink rows

/* ───────────────────────── Web app entry points ───────────────────────── */

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // prevent two submissions writing to the same row

    const params = (e && e.parameter) || {};
    const key = String(params.sheet || '').toLowerCase();
    const config = SHEETS[key];
    if (!config) {
      return json_({ ok: false, error: 'Invalid sheet. Use "rsvp" or "wishes".' });
    }

    let payload = {};
    try {
      payload = JSON.parse(params.payload || '{}');
    } catch (err) {
      return json_({ ok: false, error: 'Payload is not valid JSON.' });
    }

    if (!clean_(payload.name)) {
      return json_({ ok: false, error: 'Name is required.' });
    }

    const sheet = getOrCreateSheet_(config);
    sheet.appendRow(config.row(payload));

    return json_({ ok: true, sheet: config.name });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || '').toLowerCase();
  if (action === 'health') {
    return json_({ ok: true, service: 'lahiru-shanika-wedding-forms', time: new Date().toISOString() });
  }
  return json_({ ok: true, message: 'POST with sheet=rsvp|wishes and payload=<json>' });
}

/* ───────────────────────── Sheet helpers ───────────────────────── */

/** Run once manually (optional) to create both tabs with headers right away. */
function setupSheets() {
  Object.keys(SHEETS).forEach((key) => getOrCreateSheet_(SHEETS[key]));
}

function getOrCreateSheet_(config) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  ensureHeaders_(sheet, config);
  return sheet;
}

function ensureHeaders_(sheet, config) {
  const cols = config.headers.length;
  const current = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, cols).getValues()[0].map(String)
    : [];
  const matches = current.length === cols && current.every((v, i) => v === config.headers[i]);
  if (matches) return;

  // Sheet has data but no header row → insert one above it instead of overwriting.
  if (sheet.getLastRow() > 0 && current.join('') !== '' && current[0] !== 'Timestamp') {
    sheet.insertRowBefore(1);
  }

  const header = sheet.getRange(1, 1, 1, cols);
  header
    .setValues([config.headers])
    .setFontWeight('bold')
    .setFontColor(HEADER_FG)
    .setBackground(HEADER_BG)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 32);
  sheet.setFrozenRows(1);

  config.widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.getRange(1, 1, sheet.getMaxRows(), cols).setWrap(true).setVerticalAlignment('top');
  header.setVerticalAlignment('middle');

  if (sheet.getBandings().length === 0) {
    sheet.getRange(1, 1, sheet.getMaxRows(), cols)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false)
      .setHeaderRowColor(HEADER_BG)
      .setFirstRowColor('#FFFFFF')
      .setSecondRowColor(BAND_BG);
  }

  // Remove the default empty "Sheet1" once our tabs exist.
  const ss = sheet.getParent();
  const blank = ss.getSheetByName('Sheet1');
  if (blank && ss.getSheets().length > 1 && blank.getLastRow() === 0) {
    ss.deleteSheet(blank);
  }
}

/* ───────────────────────── Utilities ───────────────────────── */

function now_() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function clean_(value) {
  if (value === null || value === undefined) return '';
  let s = String(value).trim().slice(0, 1000);
  // Stop spreadsheet formula injection (=, +, -, @ at the start of a cell).
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
