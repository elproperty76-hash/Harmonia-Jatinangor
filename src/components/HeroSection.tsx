import { ArrowDownRight, Bell, MessageCircle, Moon, Smartphone, Sun, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { buildWhatsAppUrl, CONTACT_CONFIG } from '../data/harmoniaData';
import type { ThemeMode } from '../hooks/useTheme';

interface HeroSectionProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onGoToForm: () => void;
  onGoToUnits: () => void;
  phonePreviewMode: boolean;
  onTogglePhonePreview: () => void;
}

const KPI_STRIP = [
  { value: '55.000+', label: 'Mahasiswa Aktif di Jatinangor' },
  { value: '7.000+', label: 'Mahasiswa Baru Setiap Tahun' },
  { value: '± 5 Menit', label: 'Akses ke UNPAD & ITB' },
  { value: '14,41%', label: 'Proyeksi Total ROI + Capital Gain' },
];

export function HeroSection({
  theme,
  onToggleTheme,
  unreadCount,
  onOpenNotifications,
  onGoToForm,
  onGoToUnits,
  phonePreviewMode,
  onTogglePhonePreview,
}: HeroSectionProps) {
  return (
    <section id="beranda" className="relative pt-4 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Clean workspace utility strip below header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Harmonia Student House Jatinangor
            </span>
            <span aria-hidden="true">·</span>
            <span>Ring 1 UNPAD &amp; ITB</span>
            <span aria-hidden="true">·</span>
            <span>{CONTACT_CONFIG.developer}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTogglePhonePreview}
              className="hidden lg:inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Beralih antara tampilan layar penuh desktop dan pratinjau rasio smartphone 9:16"
            >
              {phonePreviewMode ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Tampilan Penuh</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Pratinjau 9:16</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Mode Gelap</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label="Buka pusat notifikasi real-time"
              className="min-h-[40px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Notifikasi</span>
              {unreadCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold leading-none tabular-nums">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile 9:16 Smartphone Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={phonePreviewMode ? 'block' : 'lg:hidden'}
        >
          <div className="relative w-full aspect-[9/16] max-h-[82svh] rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200/70 dark:border-slate-800">
            <img
              src="/images/hero-portrait.webp"
              alt="Fasad Modern Tropical Minimalist Harmonia Student House Jatinangor"
              width={720}
              height={1280}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/15" />

            <div className="relative h-full flex flex-col justify-between p-5 sm:p-7 text-white">
              <div className="flex items-center justify-between text-xs text-slate-200/90">
                <span>Rukost &amp; Apartkost Modern</span>
                <span>SHM · Syariah</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-3xl sm:text-4xl font-bold leading-[1.12] tracking-tight text-balance">
                  Peluang Investasi Aset Produktif di Jatinangor
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-md">
                  Hunian mahasiswa Full Furnish berkonsep Tropical Minimalist di Ring 1 UNPAD &amp;
                  ITB, dengan proyeksi total ROI hingga 14,41% per tahun.
                </p>

                <div className="flex flex-col gap-2.5 pt-1">
                  <motion.button
                    type="button"
                    onClick={onGoToForm}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="group w-full min-h-[48px] px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 transition-colors duration-150 cursor-pointer shadow-md"
                  >
                    <span>Daftar &amp; Konsultasi Unit</span>
                    <ArrowDownRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/25 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp {CONTACT_CONFIG.whatsappDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Responsive Split Layout */}
        {!phonePreviewMode && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:grid lg:grid-cols-12 gap-10 items-stretch"
          >
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div className="space-y-6">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400 tracking-wide">
                  Rukost &amp; Apartkost Modern · Jl. Cikuda, Jatinangor
                </p>

                <h1 className="font-display text-5xl xl:text-[54px] font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white text-balance max-w-2xl">
                  Peluang Investasi Aset Produktif di Jatinangor
                </h1>

                <p className="text-base xl:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Harmonia Student House Jatinangor menghadirkan hunian investasi modern minimalis
                  di pusat kawasan pendidikan terkemuka. Legalitas SHM, skema syariah tanpa riba,
                  full furnish siap huni, dan dikelola tim manajemen kost berpengalaman sejak 2021.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <motion.button
                    type="button"
                    onClick={onGoToForm}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="group min-h-[48px] px-6 py-3 rounded-xl bg-[#16233B] text-white dark:bg-amber-500 dark:text-slate-950 font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#23395F] dark:hover:bg-amber-400 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-amber-500/25 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Daftar &amp; Konsultasi Unit</span>
                    <ArrowDownRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium text-sm inline-flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>WhatsApp {CONTACT_CONFIG.whatsappDisplay}</span>
                  </a>

                  <button
                    type="button"
                    onClick={onGoToUnits}
                    className="min-h-[48px] px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Lihat 4 Pilihan Unit
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Desain Tropical Minimalist</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Estetika modern dengan pencahayaan alami &amp; tata ruang fungsional.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Skema Kepemilikan Syariah</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Cash keras atau cicilan syariah tanpa riba, tanpa KPR bank, tanpa gharar.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Pengelolaan Profesional</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Didukung manajemen kost sejak 2021 dengan target okupansi hingga 100%.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 columns: Authentic 9:16 portrait render */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="relative w-full max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <img
                  src="/images/hero-portrait.webp"
                  alt="Eksterior Harmonia Student House Jatinangor saat senja"
                  width={720}
                  height={1280}
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-white">
                  <p className="text-xs text-amber-300 font-medium">
                    Unit C1–C8 · B1–B3 · A1–A2 · D1–D3
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Mulai Rp 666 Juta · Full Furnish &amp; SHM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Full-width 4-Column KPI Strip below Hero Split */}
        <div
          id="tentang"
          className={`mt-8 md:mt-12 grid gap-4 ${
            phonePreviewMode ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {KPI_STRIP.map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tabular-nums tracking-tight">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
