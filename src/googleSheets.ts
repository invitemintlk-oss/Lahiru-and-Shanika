type SheetName = 'rsvp' | 'wishes';

type SheetPayload = Record<string, string | number>;

/**
 * Web App URL (ending in /exec) of the Apps Script attached to the Lahiru & Shanika spreadsheet:
 * https://docs.google.com/spreadsheets/d/1daNtGADlJ-ahcs39qrkvDXMwtt68kxMSS-PwAuu1H0s/edit
 *
 * Either paste it below, or set VITE_GOOGLE_SCRIPT_URL in Vercel → Settings → Environment Variables.
 * See google-apps-script/code.gs for setup steps.
 */
export const GOOGLE_SCRIPT_URL: string =
  (import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL || '';

export async function submitToGoogleSheet(sheet: SheetName, payload: SheetPayload): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('Google Sheets is not connected yet: set GOOGLE_SCRIPT_URL in src/googleSheets.ts');
  }

  const body = new URLSearchParams();
  body.append('sheet', sheet);
  body.append('payload', JSON.stringify(payload));

  // Apps Script web apps don't send CORS headers, so the response is opaque (no-cors).
  // The request is still delivered and the row is written.
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: body.toString(),
  });
}
