import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, CONTACT_CONFIG } from '../data/harmoniaData';
import { HarmoniaLogo } from './HarmoniaLogo';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B111E] pt-10 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <HarmoniaLogo className="w-7 h-7" />
              <span className="font-display text-lg font-bold text-slate-950 dark:text-white">
                Harmonia Student House
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Diproduksi oleh {CONTACT_CONFIG.producer} · Dikembangkan oleh{' '}
              {CONTACT_CONFIG.developer}.
            </p>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-semibold text-slate-950 dark:text-white">Lokasi Kawasan</p>
            <p className="text-slate-600 dark:text-slate-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>{CONTACT_CONFIG.location} (Ring 1 UNPAD &amp; ITB)</span>
            </p>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-semibold text-slate-950 dark:text-white">Kontak Resmi &amp; Konsultasi</p>
            <div className="space-y-1.5">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {CONTACT_CONFIG.whatsappDisplay}</span>
              </a>
              <a
                href={`mailto:${CONTACT_CONFIG.adminEmail}`}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:underline"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{CONTACT_CONFIG.adminEmail}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Harmonia Student House Jatinangor. Seluruh hak cipta dilindungi.</p>
          <p>Investasi Rukost &amp; Apartkost Syariah · SHM · Full Furnish</p>
        </div>
      </div>
    </footer>
  );
}
