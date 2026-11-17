import { MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { ADVANTAGES, CAMPUS_ACCESS, FACILITY_ACCESS } from '../data/harmoniaData';

interface LocationAndSiteplanSectionProps {
  phonePreviewMode: boolean;
}

const GALLERY_STORIES = [
  {
    src: '/images/fasilitas-gate.webp',
    title: 'One Gate System',
    subtitle: 'Akses satu gerbang dengan pos security',
  },
  {
    src: '/images/fasilitas-3lantai.webp',
    title: 'Kawasan Modern 3 Lantai',
    subtitle: 'Unit Rukost 6 Kamar & koridor tertata',
  },
  {
    src: '/images/fasilitas-koridor.webp',
    title: 'Koridor & Pencahayaan',
    subtitle: 'Lingkungan bersih & nyaman untuk mahasiswa',
  },
  {
    src: '/images/fasilitas-parkir.webp',
    title: 'Area Parkir Umum Luas',
    subtitle: 'Mendukung penyewa mobil maupun motor',
  },
];

export function LocationAndSiteplanSection({ phonePreviewMode }: LocationAndSiteplanSectionProps) {
  return (
    <section
      id="siteplan"
      className="py-12 md:py-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Location & Campus Proximity */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`grid gap-8 items-stretch ${
            phonePreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          <div className={`${phonePreviewMode ? '' : 'lg:col-span-5'} flex flex-col justify-between space-y-6`}>
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
                02. Lokasi Strategis &amp; Siteplan
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
                Jantung Kawasan Pendidikan Jatinangor
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Terletak di Jl. Cikuda dengan akses hitungan menit menuju tiga kampus besar dan
                fasilitas harian mahasiswa. Permintaan hunian mahasiswa terus bertumbuh setiap
                tahun.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Akses Kampus Utama</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                {CAMPUS_ACCESS.map((campus) => (
                  <div
                    key={campus.name}
                    className="px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {campus.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{campus.note}</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400 tabular-nums whitespace-nowrap">
                      {campus.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Fasilitas Pendukung Sekitar Kawasan</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                {FACILITY_ACCESS.map((item) => (
                  <div
                    key={item.name}
                    className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                  >
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-950 dark:text-white tabular-nums shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map & Siteplan Panel */}
          <div className={`${phonePreviewMode ? '' : 'lg:col-span-7'} grid gap-4`}>
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Siteplan Harmonia Student House (16 Unit Eksklusif)
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Akses Masuk 3,2M · Jalan 4M
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src="/images/siteplan.webp"
                  alt="Siteplan Harmonia Student House Jatinangor unit C1-C8, B1-B3, A1-A2, D1-D3"
                  width={960}
                  height={666}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div>C1–C8 · 8 Unit Apartkost</div>
                <div>B1–B3 · 3 Unit Rukost 4K</div>
                <div>A1–A2 · 2 Unit Mezzanine</div>
                <div>D1–D3 · 3 Unit Rukost 6K</div>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-52 shrink-0 rounded-2xl overflow-hidden bg-white border border-slate-100 dark:border-slate-800">
                <img
                  src="/images/lokasi-map.webp"
                  alt="Peta lokasi Harmonia Student House Jl. Cikuda Jatinangor"
                  width={700}
                  height={816}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Keunggulan Kawasan Terpadu
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {ADVANTAGES.map((adv) => (
                    <div key={adv.title}>
                      <p className="font-semibold text-slate-900 dark:text-white">{adv.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 leading-snug">{adv.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kawasan & Interior Gallery */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
              Visual Kawasan &amp; Fasilitas Bersama
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              One Gate · Parkir Luas · CCTV 24 Jam
            </span>
          </div>

          <div
            className={`grid gap-4 ${
              phonePreviewMode
                ? 'grid-cols-2'
                : 'grid-cols-2 md:grid-cols-4'
            }`}
          >
            {GALLERY_STORIES.map((card) => (
              <div
                key={card.title}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <img
                  src={card.src}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent text-white">
                  <p className="text-xs sm:text-sm font-semibold leading-tight">{card.title}</p>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
