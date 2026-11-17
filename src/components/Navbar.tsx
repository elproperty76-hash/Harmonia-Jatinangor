import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { HarmoniaLogo } from './HarmoniaLogo';

interface NavbarProps {
  onSelectSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'unit', label: 'Tipe Unit' },
  { id: 'siteplan', label: 'Siteplan' },
  { id: 'roi', label: 'Simulasi ROI' },
  { id: 'legalitas', label: 'Legalitas' },
];

export function Navbar({ onSelectSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onSelectSection(id);
  };

  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B111E]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('beranda');
          }}
          className="flex items-center gap-2.5 text-slate-900 dark:text-white font-display font-bold text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
        >
          <HarmoniaLogo className="w-7 h-7 shrink-0" />
          <span>Harmonia</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="hover:text-slate-950 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-amber-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary CTA (Desktop) + Mobile Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('daftar')}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-[#16233B] text-white hover:bg-[#23395F] dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 hover:scale-[1.03] active:scale-[0.98] hover:shadow-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Daftar Minat
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Minimalist mobile dropdown navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-4 py-3 space-y-1 shadow-lg">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="w-full min-h-[44px] px-3 flex items-center justify-between text-left text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span>{link.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick('daftar')}
            className="w-full min-h-[44px] mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#16233B] text-white dark:bg-amber-500 dark:text-slate-950 transition-colors"
          >
            Daftar &amp; Konsultasi Unit
          </button>
        </div>
      )}
    </header>
  );
}
