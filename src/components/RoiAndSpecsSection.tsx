import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  BUILDING_SPECS,
  formatRupiah,
  INTERIOR_ITEMS,
  OCCUPANCY_STRATEGIES,
  OPEX_INCLUDES,
  UNIT_TYPES,
} from '../data/harmoniaData';

interface RoiAndSpecsSectionProps {
  selectedUnitId: string;
  phonePreviewMode: boolean;
}

export function RoiAndSpecsSection({ selectedUnitId, phonePreviewMode }: RoiAndSpecsSectionProps) {
  const [managementMode, setManagementMode] = useState<'managed' | 'self'>('managed');
  const [specTab, setSpecTab] = useState<'bangunan' | 'interior'>('bangunan');

  return (
    <section id="roi" className="py-12 md:py-16 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* ROI Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
                03. Perhitungan ROI &amp; Jaminan Okupansi
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
                Simulasi Proyeksi Keuntungan &amp; Arus Kas Tahunan
              </h2>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start">
              <button
                type="button"
                onClick={() => setManagementMode('managed')}
                className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  managementMode === 'managed'
                    ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Kerja Sama Pengelolaan
              </button>
              <button
                type="button"
                onClick={() => setManagementMode('self')}
                className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  managementMode === 'self'
                    ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Tanpa Kerja Sama
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-[#16233B] text-white text-xs">
                    <th className="py-3.5 px-4 font-semibold">Uraian Operasional</th>
                    {UNIT_TYPES.map((unit) => (
                      <th
                        key={unit.id}
                        className={`py-3.5 px-4 font-semibold ${
                          unit.id === selectedUnitId ? 'bg-amber-500 text-slate-950' : ''
                        }`}
                      >
                        <div className="whitespace-nowrap">{unit.name}</div>
                        <div className="text-[11px] font-normal opacity-85">{unit.bedrooms} Kamar</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Nilai Investasi Awal</td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 font-semibold text-slate-950 dark:text-white tabular-nums whitespace-nowrap"
                      >
                        {unit.priceFormatted}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Pendapatan Sewa / Kamar</td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 text-slate-900 dark:text-slate-200 tabular-nums whitespace-nowrap"
                      >
                        {formatRupiah(unit.rentPerRoom)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Total Pendapatan / Bulan</td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 font-semibold text-slate-950 dark:text-white tabular-nums whitespace-nowrap"
                      >
                        {formatRupiah(unit.monthlyGross)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Biaya Ijaroh (Management Fee)
                    </td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 text-slate-700 dark:text-slate-300 tabular-nums whitespace-nowrap"
                      >
                        {managementMode === 'managed' ? formatRupiah(unit.monthlyOpex) : 'Rp 0 (Mandiri)'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-amber-50/70 dark:bg-amber-950/20">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Net Profit / Bulan
                    </td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 font-bold text-amber-700 dark:text-amber-400 tabular-nums whitespace-nowrap"
                      >
                        {formatRupiah(
                          managementMode === 'managed' ? unit.monthlyNet : unit.monthlyGross
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-emerald-50/70 dark:bg-emerald-950/20">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Net Profit / Tahun
                    </td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap"
                      >
                        {formatRupiah(
                          managementMode === 'managed' ? unit.yearlyNetManaged : unit.yearlyNetSelf
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      ROI Bisnis Kostan (Kerja Sama)
                    </td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums"
                      >
                        {unit.roiManaged}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Estimasi Capital Gain / Tahun
                    </td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300 tabular-nums"
                      >
                        {unit.capitalGain}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-950">
                    <td className="py-3.5 px-4 font-bold text-slate-950 dark:text-white">
                      Total ROI + Capital Gain
                    </td>
                    {UNIT_TYPES.map((unit) => (
                      <td
                        key={unit.id}
                        className="py-3.5 px-4 font-mono text-base font-bold text-amber-700 dark:text-amber-400 tabular-nums"
                      >
                        {unit.totalRoi}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Biaya Ijaroh sudah termasuk:
              </span>
              <span>{OPEX_INCLUDES.join(' · ')}</span>
            </div>
          </div>
        </motion.div>

        {/* Jaminan Okupansi + Spesifikasi Bangunan & Interior */}
        <div className={`grid gap-6 ${phonePreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
          {/* Occupancy Guarantee */}
          <div
            className={`${
              phonePreviewMode ? '' : 'lg:col-span-5'
            } p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5`}
          >
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                Manajemen Kost Sejak 2021
              </p>
              <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                Jaminan Okupansi Mendukung Target Hunian Hingga 100%
              </h3>
            </div>

            <div className="space-y-4">
              {OCCUPANCY_STRATEGIES.map((strategy) => (
                <div key={strategy.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {strategy.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {strategy.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Building & Interior Specs */}
          <div
            className={`${
              phonePreviewMode ? '' : 'lg:col-span-7'
            } p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                Spesifikasi Teknis &amp; Interior
              </h3>
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setSpecTab('bangunan')}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    specTab === 'bangunan'
                      ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Material Bangunan
                </button>
                <button
                  type="button"
                  onClick={() => setSpecTab('interior')}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    specTab === 'interior'
                      ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Interior Full Furnish (11 Item)
                </button>
              </div>
            </div>

            {specTab === 'bangunan' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {BUILDING_SPECS.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white pb-1.5 border-b border-slate-200 dark:border-slate-800">
                      {group.category}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                      <th className="py-2 pr-3 font-medium">Item</th>
                      <th className="py-2 pr-3 font-medium">Dimensi / Kapasitas</th>
                      <th className="py-2 font-medium">Spesifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {INTERIOR_ITEMS.map((row) => (
                      <tr key={row.no}>
                        <td className="py-2 pr-3 font-medium text-slate-900 dark:text-white">
                          {row.no}. {row.item}
                        </td>
                        <td className="py-2 pr-3 text-slate-600 dark:text-slate-300 tabular-nums">
                          {row.dim}
                        </td>
                        <td className="py-2 text-slate-600 dark:text-slate-300">{row.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
