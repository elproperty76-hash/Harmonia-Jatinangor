import { Bell, Check, Clock, Mail, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { buildWhatsAppUrl, CONTACT_CONFIG } from '../data/harmoniaData';
import type { InquiryRecord, InquiryStatus, LiveToast } from '../hooks/useRealtimeNotifications';

interface RealtimeNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: InquiryRecord[];
  connected: boolean;
  toasts: LiveToast[];
  onDismissToast: (id: string) => void;
  onUpdateStatus: (id: string, status: InquiryStatus) => Promise<void>;
  onMarkAllRead: () => Promise<void>;
}

const STATUS_LABELS: Record<InquiryStatus, string> = {
  baru: 'Baru Masuk',
  diproses: 'Sedang Diproses',
  direspon: 'Sudah Direspon',
};

export function RealtimeNotificationDrawer({
  isOpen,
  onClose,
  inquiries,
  connected,
  toasts,
  onDismissToast,
  onUpdateStatus,
  onMarkAllRead,
}: RealtimeNotificationDrawerProps) {
  return (
    <>
      {/* Real-time Toast Alerts */}
      <div
        aria-live="polite"
        className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto p-3.5 rounded-2xl bg-[#16233B] text-white border border-slate-700 shadow-xl flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <Bell className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{toast.title}</p>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {toast.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDismissToast(toast.id)}
                aria-label="Tutup notifikasi"
                className="p-1 rounded-md text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Slide-over Real-Time Inbox Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Pusat Notifikasi Real-Time Admin"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl"
            >
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-950 dark:text-white">
                    Notifikasi Real-Time Admin
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {connected ? 'Terhubung WebSocket' : 'Menyambungkan ulang...'} ·{' '}
                    {CONTACT_CONFIG.adminEmail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup panel notifikasi"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
                <span className="text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                  {inquiries.length} Pesan Masuk
                </span>
                {inquiries.some((i) => !i.read) && (
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Tandai Semua Dibaca
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {inquiries.length === 0 ? (
                  <div className="py-16 text-center space-y-2">
                    <Bell className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Belum ada pesan pendaftaran masuk
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Saat calon investor mengirim formulir pendaftaran, pesan akan muncul secara
                      real-time di sini dan diteruskan ke {CONTACT_CONFIG.adminEmail}.
                    </p>
                  </div>
                ) : (
                  inquiries.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-colors space-y-2.5 ${
                        item.read
                          ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                          : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-950 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.unitType} · {item.paymentScheme}
                          </p>
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                          {STATUS_LABELS[item.status]}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        <p>
                          WhatsApp: <span className="font-mono">{item.phone}</span> · Email:{' '}
                          <span className="font-mono">{item.email}</span>
                        </p>
                        {item.message && (
                          <p className="text-slate-700 dark:text-slate-200 pt-1">
                            &ldquo;{item.message}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={`mailto:${CONTACT_CONFIG.adminEmail}?subject=${encodeURIComponent(
                              `[Follow Up ${item.id}] ${item.unitType} - ${item.name}`
                            )}`}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Teruskan ke email admin"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={buildWhatsAppUrl(
                              `Halo ${item.name}, kami dari Harmonia Student House menindaklanjuti pendaftaran Anda (${item.id}) untuk ${item.unitType}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                            title="Hubungi via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          {item.status !== 'direspon' && (
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateStatus(
                                  item.id,
                                  item.status === 'baru' ? 'diproses' : 'direspon'
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-[#16233B] text-white dark:bg-amber-500 dark:text-slate-950 font-medium inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>{item.status === 'baru' ? 'Proses' : 'Selesai'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
