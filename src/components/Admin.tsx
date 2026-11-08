import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, Link as LinkIcon, Sparkles } from 'lucide-react';
import { GUEST_PREFIXES, WEDDING, getGuestDisplayName } from '../weddingConfig';

type Generated = {
  displayName: string;
  link: string;
  message: string;
};

function buildLink(prefix: string, guestName: string): string {
  const baseUrl = window.location.origin;
  // /{guestName}?prefix={prefix} – both parts URL-encoded so spaces, "&", "/" etc. are safe.
  return `${baseUrl}/${encodeURIComponent(guestName.trim())}?prefix=${encodeURIComponent(prefix)}`;
}

function buildMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for browsers/contexts where the Clipboard API is unavailable.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (text: string) => {
    setToast(text);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  };

  // Editing the inputs invalidates the previous link, so a stale link can't be copied.
  const onPrefixChange = (value: string) => {
    setPrefix(value);
    setGenerated(null);
  };
  const onNameChange = (value: string) => {
    setGuestName(value);
    setGenerated(null);
    setError(null);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guestName.trim()) {
      setError('Please enter a guest name.');
      return;
    }
    const displayName = getGuestDisplayName(prefix, guestName);
    const link = buildLink(prefix, guestName);
    setGenerated({ displayName, link, message: buildMessage(displayName, link) });
    setError(null);
  };

  const handleCopyLink = async () => {
    if (!generated) return;
    await copyText(generated.link);
    showToast('Link copied!');
  };

  const handleCopyMessage = async () => {
    if (!generated) return;
    await copyText(generated.message);
    showToast('Message copied!');
  };

  const fieldClass =
    'w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:border-[#B5294E] focus:ring-1 focus:ring-[#B5294E] outline-none transition-all';

  return (
    <div className="min-h-screen bg-[#FFFAF2] text-stone-800 px-4 py-10 md:p-12 font-sans flex items-start md:items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#B5294E]/20">
        <h1 className="text-2xl sm:text-3xl font-serif text-center mb-2 text-[#1F3D2B]">Wedding Invitation Link Generator</h1>
        <p className="text-center text-sm text-stone-500 mb-8">
          {WEDDING.brideName} &amp; {WEDDING.groomName}
        </p>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label htmlFor="prefix" className="text-xs font-medium text-stone-600 uppercase tracking-widest">Prefix</label>
              <select id="prefix" value={prefix} onChange={(e) => onPrefixChange(e.target.value)} className={fieldClass}>
                {GUEST_PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label htmlFor="guestName" className="text-xs font-medium text-stone-600 uppercase tracking-widest">Guest Name</label>
              <input
                id="guestName"
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => onNameChange(e.target.value)}
                className={fieldClass}
                autoComplete="off"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full h-12 flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#163024] text-white rounded-xl font-medium transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Generate Link
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-stone-100 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-600 uppercase tracking-widest">Invitation Preview</span>
            <div className="rounded-xl border border-[#B5294E]/20 bg-[#FCEEF2]/50 p-4 text-center">
              {generated ? (
                <p className="font-serif text-stone-700">
                  We cordially invite <span className="text-[#B5294E] font-semibold">{generated.displayName}</span> to celebrate our special day with us.
                </p>
              ) : (
                <p className="text-sm text-stone-400">Enter a name and click Generate Link to see the preview.</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-600 uppercase tracking-widest">Generated Link</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                readOnly
                value={generated?.link ?? ''}
                placeholder="Your link will appear here"
                onFocus={(e) => e.currentTarget.select()}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                disabled={!generated}
                className="h-12 px-6 flex items-center justify-center gap-2 bg-stone-800 hover:bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-medium transition-all sm:min-w-[160px]"
              >
                <LinkIcon className="w-4 h-4" />
                Copy Link Only
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-600 uppercase tracking-widest">Full Message</span>
            <textarea
              readOnly
              value={generated?.message ?? ''}
              placeholder="The personalised WhatsApp message will appear here"
              rows={13}
              className="w-full p-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-sm outline-none resize-none"
            />
            <button
              type="button"
              onClick={handleCopyMessage}
              disabled={!generated}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#B5294E] hover:bg-[#9A2142] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-lg transition-all"
            >
              <Copy className="w-5 h-5" />
              Copy Full Message
            </button>
          </div>
        </div>
      </div>

      {/* Copy confirmation */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-full bg-[#1F3D2B] text-white text-sm shadow-xl transition-all duration-300 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Check className="w-4 h-4" />
        {toast}
      </div>
    </div>
  );
};

export default Admin;
