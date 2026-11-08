type SheetName = 'rsvp' | 'wishes';

type SheetPayload = Record<string, string | number>;

/**
 * Paste the Web App URL (ending in /exec) from your Apps Script deployment here.
 * See google-apps-script/code.gs for setup steps.
 */
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyXQAg_TqPIHHO2UQEWMs1hCQgiZwmAoPhFxCJYjbi-pXaB3YhA5ZtdDTOBeW_pfslk3A/exec';

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
