import { Bell, Building2, Calculator, MessageCircle, FileCheck } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/harmoniaData';

interface MobileBottomBarProps {
  onSelectSection: (id: string) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export function MobileBottomBar({
  onSelectSection,
  onOpenNotifications,
  unreadCount,
}: MobileBottomBarProps) {
  return (
    <nav
      aria-label="Navigasi cepat mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-[#0B111E]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2"
    >
      <div className="h-full grid grid-cols-5 items-center gap-1">
        <button
          type="button"
          onClick={() => onSelectSection('unit')}
          className="min-h-[44px] flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <Building2 className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">Unit</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectSection('roi')}
          className="min-h-[44px] flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">ROI</span>
        </button>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-2 flex flex-col items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => onSelectSection('legalitas')}
          className="min-h-[44px] flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <FileCheck className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">SHM</span>
        </button>

        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative min-h-[44px] flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
          aria-label="Buka notifikasi real-time"
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center tabular-nums">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5 whitespace-nowrap">Inbox</span>
        </button>
      </div>
    </nav>
  );
}
