import { FileCheck2, ShieldCheck, Landmark, X, ZoomIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface LegalitySectionProps {
  phonePreviewMode: boolean;
}

export function LegalitySection({ phonePreviewMode }: LegalitySectionProps) {
  const [activeDoc, setActiveDoc] = useState<{ src: string; title: string } | null>(null);

  return (
    <section
      id="legalitas"
      className="py-12 md:py-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
            04. Legalitas &amp; Sistem Kepemilikan Syariah
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Transparansi Dokumen SHM, Proses PBG &amp; Akad Tanpa Riba
          </h2>
        </div>

        {/* 3 Ownership Principles */}
        <div className={`grid gap-4 ${phonePreviewMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <FileCheck2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Sertifikat Hak Milik (SHM)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Kepemilikan unit berupa Sertifikat Hak Milik (SHM) atas sebidang tanah dan bangunan
              untuk seluruh opsi unit (Apartkost 4K, Rukost 4K, Mezzanine 4K, maupun Rukost 6K).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Skema Pembayaran Syariah
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Tersedia pembayaran Cash Keras maupun Cicilan dengan skema prinsip syariah: tanpa
              riba, tanpa KPR bank, dan tanpa gharar.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Legalitas Hukum &amp; PBG
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Persetujuan Bangunan Gedung (PBG) dalam pengurusan resmi di DPMPTSP Kab. Sumedang
              (Nomor Berkas: PTSP26081930756 — Data &amp; Berkas Sudah Diverifikasi).
            </p>
          </div>
        </div>

        {/* Transparent Document Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`grid gap-6 ${phonePreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}
        >
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                  Bukti Sertifikat Hak Milik (6 Bidang SHM)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ketuk gambar untuk memperbesar verifikasi dokumen
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveDoc({
                    src: '/images/legalitas-shm.webp',
                    title: 'Dokumen SHM Harmonia Student House Jatinangor',
                  })
                }
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Perbesar</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                setActiveDoc({
                  src: '/images/legalitas-shm.webp',
                  title: 'Dokumen SHM Harmonia Student House Jatinangor',
                })
              }
              className="w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 cursor-zoom-in"
            >
              <img
                src="/images/legalitas-shm.webp"
                alt="6 Dokumen Sertifikat Hak Milik Harmonia Student House Jatinangor"
                width={960}
                height={940}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover"
              />
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                  Resi Penerimaan Berkas PBG DPMPTSP Sumedang
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No. PTSP26081930756 · Verifikasi Data &amp; Berkas Selesai
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveDoc({
                    src: '/images/legalitas-pbg.webp',
                    title: 'Penerimaan Berkas PBG DPMPTSP Kab. Sumedang',
                  })
                }
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Perbesar</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                setActiveDoc({
                  src: '/images/legalitas-pbg.webp',
                  title: 'Penerimaan Berkas PBG DPMPTSP Kab. Sumedang',
                })
              }
              className="w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex justify-center cursor-zoom-in"
            >
              <img
                src="/images/legalitas-pbg.webp"
                alt="Penerimaan Berkas PBG DPMPTSP Kabupaten Sumedang"
                width={900}
                height={1171}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-64 sm:h-72 w-auto object-contain"
              />
            </button>
          </div>
        </motion.div>
      </div>

      {activeDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeDoc.title}
          onClick={() => setActiveDoc(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{activeDoc.title}</p>
              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                aria-label="Tutup pratinjau dokumen"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 max-h-[82vh] overflow-auto">
              <img
                src={activeDoc.src}
                alt={activeDoc.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
