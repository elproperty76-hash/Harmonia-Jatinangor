import { ArrowRight, BedDouble, Bath, Maximize, Layers, X, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { formatRupiah, UNIT_TYPES, type UnitType } from '../data/harmoniaData';

interface UnitShowcaseSectionProps {
  selectedUnitId: string;
  onSelectUnit: (unit: UnitType) => void;
  onConsultUnit: (unit: UnitType) => void;
  phonePreviewMode: boolean;
}

export function UnitShowcaseSection({
  selectedUnitId,
  onSelectUnit,
  onConsultUnit,
  phonePreviewMode,
}: UnitShowcaseSectionProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<'foto' | 'denah'>('foto');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  const activeUnit = UNIT_TYPES.find((u) => u.id === selectedUnitId) || UNIT_TYPES[0];

  return (
    <section id="unit" className="py-12 md:py-16 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
              01. Pilihan Unit Produktif
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
              Empat Tipe Apartkost &amp; Rumah Kost Sesuai Kebutuhan Investasi
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Seluruh unit dilengkapi Sertifikat Hak Milik (SHM) dan paket Full Furnish 11 item siap huni.
          </p>
        </div>

        {/* Segmented Unit Tabs */}
        <div
          role="tablist"
          aria-label="Pilih tipe unit Harmonia"
          className="flex overflow-x-auto gap-2 pb-2 mb-6 no-scrollbar"
        >
          {UNIT_TYPES.map((unit) => {
            const isActive = unit.id === activeUnit.id;
            return (
              <button
                key={unit.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onSelectUnit(unit)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#16233B] text-white border-[#16233B] dark:bg-amber-500 dark:text-slate-950 dark:border-amber-500'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {unit.name}
              </button>
            );
          })}
        </div>

        {/* Smooth AnimatePresence transition between unit specs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUnit.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`grid gap-6 items-stretch ${
              phonePreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            {/* Visual Media Frame */}
            <div className={phonePreviewMode ? '' : 'lg:col-span-7'}>
              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span>{activeUnit.code}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{activeUnit.unitCount}</span>
                  </div>

                  <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab('foto')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        activeMediaTab === 'foto'
                          ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Eksterior &amp; Kamar
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab('denah')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        activeMediaTab === 'denah'
                          ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Denah Tata Ruang
                    </button>
                  </div>
                </div>

                {activeMediaTab === 'foto' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
                    <button
                      type="button"
                      onClick={() =>
                        setZoomImage({
                          src: activeUnit.exteriorImage,
                          title: `Eksterior ${activeUnit.name}`,
                        })
                      }
                      className="sm:col-span-7 relative aspect-[3/4] sm:aspect-auto sm:min-h-[340px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group cursor-zoom-in"
                    >
                      <img
                        src={activeUnit.exteriorImage}
                        alt={`Eksterior ${activeUnit.name} Harmonia Jatinangor`}
                        width={600}
                        height={803}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/65 text-white backdrop-blur-sm">
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </button>

                    <div className="sm:col-span-5 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setZoomImage({
                            src: activeUnit.roomImage,
                            title: `Interior Kamar ${activeUnit.name}`,
                          })
                        }
                        className="relative flex-1 min-h-[160px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group cursor-zoom-in"
                      >
                        <img
                          src={activeUnit.roomImage}
                          alt={`Interior kamar ${activeUnit.name}`}
                          width={600}
                          height={401}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/70 text-white text-[11px] font-medium">
                          Interior Full Furnish
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setZoomImage({
                            src: '/images/unit-apartkost-bath.webp',
                            title: `Kamar Mandi Modern ${activeUnit.name}`,
                          })
                        }
                        className="relative flex-1 min-h-[160px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group cursor-zoom-in"
                      >
                        <img
                          src="/images/unit-apartkost-bath.webp"
                          alt={`Kamar mandi dalam ${activeUnit.name}`}
                          width={600}
                          height={401}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/70 text-white text-[11px] font-medium">
                          Kamar Mandi Dalam + Water Heater
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setZoomImage({
                        src: activeUnit.floorplanImage,
                        title: `Denah ${activeUnit.name}`,
                      })
                    }
                    className="relative w-full min-h-[340px] max-h-[440px] rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-3 group cursor-zoom-in"
                  >
                    <img
                      src={activeUnit.floorplanImage}
                      alt={`Denah lantai ${activeUnit.name}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="max-h-[400px] w-auto object-contain"
                    />
                    <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-950/75 text-white text-xs font-medium inline-flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5" />
                      Perbesar Denah
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Unit Specs & Investment Summary Card */}
            <div className={phonePreviewMode ? '' : 'lg:col-span-5'}>
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                        {activeUnit.name}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
                        {activeUnit.unitCodes}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {activeUnit.description}
                    </p>
                  </div>

                  {/* Key Physical Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 text-sm">
                      <Maximize className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Luas Tanah / Bangunan</p>
                        <p className="font-semibold text-slate-900 dark:text-white tabular-nums">
                          {activeUnit.landArea} / {activeUnit.buildingArea}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm">
                      <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Struktur Lantai</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {activeUnit.floors}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm">
                      <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Kamar Tidur</p>
                        <p className="font-semibold text-slate-900 dark:text-white tabular-nums">
                          {activeUnit.bedrooms} Kamar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm">
                      <Bath className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Kamar Mandi</p>
                        <p className="font-semibold text-slate-900 dark:text-white tabular-nums">
                          {activeUnit.bathrooms} Kamar
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clean typographic extras */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Termasuk: {activeUnit.extras.join(' · ')}
                  </p>

                  {/* Financial Highlights */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Nilai Investasi Awal</span>
                      <span className="font-display text-xl font-bold text-slate-950 dark:text-white tabular-nums">
                        {activeUnit.priceFormatted}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Estimasi Sewa / Kamar</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                        {formatRupiah(activeUnit.rentPerRoom)} / bln
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Net Profit / Bulan (Kerja Sama)</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
                        {formatRupiah(activeUnit.monthlyNet)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Total ROI + Capital Gain / Tahun
                      </span>
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                        {activeUnit.totalRoi}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => onConsultUnit(activeUnit)}
                    className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#16233B] text-white dark:bg-amber-500 dark:text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1E3152] dark:hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    <span>Konsultasi &amp; Booking {activeUnit.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal for Floorplan / Image Inspection */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomImage.title}
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{zoomImage.title}</p>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                aria-label="Tutup pratinjau gambar"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 max-h-[80vh] overflow-auto">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
