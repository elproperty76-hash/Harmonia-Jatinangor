import { CheckCircle2, Mail, MessageCircle, Send, AlertCircle, BellRing } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState, type FormEvent } from 'react';
import { buildWhatsAppUrl, CONTACT_CONFIG, UNIT_TYPES } from '../data/harmoniaData';
import type { InquiryRecord } from '../hooks/useRealtimeNotifications';

interface RegistrationSectionProps {
  preferredUnitName: string;
  inquiries: InquiryRecord[];
  wsConnected: boolean;
  onOpenNotifications: () => void;
  phonePreviewMode: boolean;
}

export function RegistrationSection({
  preferredUnitName,
  inquiries,
  wsConnected,
  onOpenNotifications,
  phonePreviewMode,
}: RegistrationSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [unitType, setUnitType] = useState(preferredUnitName || UNIT_TYPES[0].name);
  const [paymentScheme, setPaymentScheme] = useState('Cash Keras');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [fallbackRecord, setFallbackRecord] = useState<InquiryRecord | null>(null);

  useEffect(() => {
    if (preferredUnitName) {
      setUnitType(preferredUnitName);
    }
  }, [preferredUnitName]);

  const liveSubmittedRecord =
    inquiries.find((item) => item.id === submittedId) || fallbackRecord;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (name.trim().length < 2) {
      setErrorMsg('Mohon masukkan nama lengkap Anda.');
      return;
    }
    if (phone.replace(/[^\d+]/g, '').length < 9) {
      setErrorMsg('Mohon masukkan nomor WhatsApp yang aktif.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Mohon masukkan alamat email yang valid.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          unitType,
          paymentScheme,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal mengirim formulir. Silakan coba lagi.');
        return;
      }

      setSubmittedId(data.inquiry.id);
      setFallbackRecord(data.inquiry);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMsg('Koneksi terganggu. Anda dapat langsung menghubungi WhatsApp 0823-1043-3799.');
    } finally {
      setSubmitting(false);
    }
  };

  const buildMailtoLink = (record: InquiryRecord) => {
    const subject = `[Konsultasi Harmonia] ${record.unitType} - ${record.name} (${record.id})`;
    const body = [
      `Halo Admin Harmonia (${CONTACT_CONFIG.adminEmail}),`,
      '',
      `ID Tiket: ${record.id}`,
      `Nama: ${record.name}`,
      `No. WhatsApp: ${record.phone}`,
      `Email: ${record.email}`,
      `Pilihan Unit: ${record.unitType}`,
      `Skema Pembayaran: ${record.paymentScheme}`,
      `Pesan: ${record.message || '-'}`,
    ].join('\n');
    return `mailto:${CONTACT_CONFIG.adminEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="daftar" className="py-12 md:py-16 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`grid gap-8 items-start ${
            phonePreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* Left Info & Direct Channels */}
          <div className={`${phonePreviewMode ? '' : 'lg:col-span-5'} space-y-6`}>
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
                05. Pendaftaran &amp; Konsultasi Langsung
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
                Jadwalkan Survei Lokasi atau Konsultasi Hitungan ROI
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Setiap pesan dari formulir pendaftaran langsung dikirimkan ke email admin{' '}
                <span className="font-medium text-slate-900 dark:text-white">
                  {CONTACT_CONFIG.adminEmail}
                </span>{' '}
                dan dipicu melalui sistem notifikasi real-time agar tim kami merespon dengan cepat.
              </p>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="p-5 rounded-3xl bg-[#16233B] text-white space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-amber-300 font-medium">Konsultasi Cepat via WhatsApp</p>
                  <p className="font-display text-2xl font-bold tabular-nums mt-1">
                    {CONTACT_CONFIG.whatsappDisplay}
                  </p>
                </div>
                <MessageCircle className="w-6 h-6 text-emerald-400 shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dapatkan pricelist lengkap, ketersediaan blok unit C1–C8, B1–B3, A1–A2, D1–D3,
                serta simulasi cicilan syariah langsung bersama konsultan kami.
              </p>
              <a
                href={buildWhatsAppUrl(
                  `Halo Admin Harmonia Student House, saya tertarik konsultasi unit ${unitType}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp Sekarang</span>
              </a>
            </div>

            {/* Real-time System & Admin Email Channel */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Email Admin Terhubung</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {wsConnected ? 'Real-Time Aktif' : 'Menyambungkan...'}
                </span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {CONTACT_CONFIG.adminEmail}
              </p>
              <button
                type="button"
                onClick={onOpenNotifications}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BellRing className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Lihat Panel Notifikasi Real-Time ({inquiries.length} Pesan)</span>
              </button>
            </div>
          </div>

          {/* Right Responsive Registration Form */}
          <div className={phonePreviewMode ? '' : 'lg:col-span-7'}>
            <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {liveSubmittedRecord ? (
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                        Pendaftaran Berhasil Dikirim
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        Tiket <span className="font-mono font-semibold">{liveSubmittedRecord.id}</span>{' '}
                        untuk unit <span className="font-semibold">{liveSubmittedRecord.unitType}</span>{' '}
                        telah diteruskan melalui sistem notifikasi real-time.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Status Respon Real-Time</span>
                      <span className="font-semibold uppercase text-amber-700 dark:text-amber-400">
                        {liveSubmittedRecord.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500 dark:text-slate-400">Email Admin</span>
                      <span className="font-mono text-slate-900 dark:text-white">
                        {liveSubmittedRecord.targetEmail}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                      {liveSubmittedRecord.emailDelivery.detail}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={buildWhatsAppUrl(
                        `Halo Admin Harmonia, saya baru mendaftar dengan ID ${liveSubmittedRecord.id} (${liveSubmittedRecord.name}) untuk unit ${liveSubmittedRecord.unitType}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Konfirmasi via WhatsApp</span>
                    </a>

                    <a
                      href={buildMailtoLink(liveSubmittedRecord)}
                      className="min-h-[48px] px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Kirim Email Langsung</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedId(null);
                      setFallbackRecord(null);
                    }}
                    className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                  >
                    Kirim pendaftaran unit lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                      Formulir Pendaftaran &amp; Konsultasi Unit
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Lengkapi data di bawah ini untuk mendapatkan brosur PDF, denah detail, dan
                      jadwal survei lokasi.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="reg-name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="reg-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Ahmad Fauzi"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="reg-phone"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Nomor WhatsApp Aktif
                      </label>
                      <input
                        id="reg-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0812xxxxxxxx"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Alamat Email
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="reg-unit"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Pilihan Tipe Unit
                      </label>
                      <select
                        id="reg-unit"
                        value={unitType}
                        onChange={(e) => setUnitType(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {UNIT_TYPES.map((unit) => (
                          <option key={unit.id} value={unit.name}>
                            {unit.name} ({unit.priceFormatted})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="reg-scheme"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Skema Pembayaran Syariah
                      </label>
                      <select
                        id="reg-scheme"
                        value={paymentScheme}
                        onChange={(e) => setPaymentScheme(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Cash Keras">Cash Keras</option>
                        <option value="Cicilan Syariah (Tanpa Riba & Tanpa KPR Bank)">
                          Cicilan Syariah (Tanpa KPR Bank)
                        </option>
                        <option value="Konsultasi Skema Terlebih Dahulu">
                          Konsultasi Skema Terlebih Dahulu
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-message"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Pesan atau Rencana Jadwal Survei (Opsional)
                    </label>
                    <textarea
                      id="reg-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Contoh: Saya ingin survei lokasi hari Sabtu dan minta rincian cicilan syariah untuk Apartkost 4 Kamar."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#16233B] text-white dark:bg-amber-500 dark:text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#23395F] dark:hover:bg-amber-400 hover:scale-[1.015] active:scale-[0.985] hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100 transition-all duration-150 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Mengirim Pendaftaran...' : 'Kirim Pendaftaran & Notifikasi Admin'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
