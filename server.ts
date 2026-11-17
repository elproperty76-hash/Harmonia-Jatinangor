import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import http from 'http';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocket, WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'el.property76@gmail.com';
const WHATSAPP_NUMBER = '082310433799';
const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

export type InquiryStatus = 'baru' | 'diproses' | 'direspon';

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  unitType: string;
  paymentScheme: string;
  message: string;
  targetEmail: string;
  status: InquiryStatus;
  read: boolean;
  emailDelivery: {
    attempted: boolean;
    delivered: boolean;
    method: 'smtp' | 'realtime_queue';
    detail: string;
  };
  createdAt: string;
}

function ensureDataStore(): InquiryRecord[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveInquiries(records: InquiryRecord[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

async function dispatchAdminEmail(inquiry: InquiryRecord): Promise<InquiryRecord['emailDelivery']> {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return {
      attempted: false,
      delivered: false,
      method: 'realtime_queue',
      detail: `Tersimpan di server & notifikasi real-time dikirim. Tujuan admin: ${ADMIN_EMAIL}`,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM || `Harmonia Student House <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: inquiry.email,
      subject: `[Pendaftaran Baru Harmonia] ${inquiry.unitType} - ${inquiry.name}`,
      text: [
        'Pendaftaran & Konsultasi Baru - Harmonia Student House Jatinangor',
        '----------------------------------------------------------------',
        `ID Tiket     : ${inquiry.id}`,
        `Nama         : ${inquiry.name}`,
        `No. WhatsApp : ${inquiry.phone}`,
        `Email        : ${inquiry.email}`,
        `Pilihan Unit : ${inquiry.unitType}`,
        `Skema Bayar  : ${inquiry.paymentScheme}`,
        `Pesan        : ${inquiry.message || '-'}`,
        `Waktu        : ${inquiry.createdAt}`,
      ].join('\n'),
    });

    return {
      attempted: true,
      delivered: true,
      method: 'smtp',
      detail: `Email berhasil dikirim langsung ke ${ADMIN_EMAIL}`,
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'SMTP error';
    return {
      attempted: true,
      delivered: false,
      method: 'realtime_queue',
      detail: `Notifikasi real-time aktif; pengiriman SMTP tertunda (${reason})`,
    };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  let inquiries: InquiryRecord[] = ensureDataStore();

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  function broadcast(payload: unknown) {
    const serialized = JSON.stringify(payload);
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    }
  }

  wss.on('connection', (ws) => {
    ws.send(
      JSON.stringify({
        type: 'init',
        inquiries: inquiries.slice(0, 50),
        adminEmail: ADMIN_EMAIL,
        whatsapp: WHATSAPP_NUMBER,
      })
    );
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      adminEmail: ADMIN_EMAIL,
      whatsapp: WHATSAPP_NUMBER,
      wsClients: wss.clients.size,
      totalInquiries: inquiries.length,
    });
  });

  app.get('/api/inquiries', (_req, res) => {
    res.json({
      inquiries: inquiries.slice(0, 50),
      unreadCount: inquiries.filter((item) => !item.read).length,
      adminEmail: ADMIN_EMAIL,
    });
  });

  app.post('/api/inquiries', async (req, res) => {
    const { name, phone, email, unitType, paymentScheme, message } = req.body ?? {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'Nama lengkap wajib diisi minimal 2 karakter.' });
      return;
    }

    const cleanedPhone = typeof phone === 'string' ? phone.replace(/[^\d+]/g, '') : '';
    if (cleanedPhone.length < 9) {
      res.status(400).json({ error: 'Nomor WhatsApp tidak valid.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Alamat email tidak valid.' });
      return;
    }

    const id = `HRM-${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();

    const draftInquiry: InquiryRecord = {
      id,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      unitType: typeof unitType === 'string' && unitType.trim() ? unitType.trim() : 'Apartkost 4 Kamar',
      paymentScheme:
        typeof paymentScheme === 'string' && paymentScheme.trim()
          ? paymentScheme.trim()
          : 'Cash Keras / Cicilan Syariah',
      message: typeof message === 'string' ? message.trim() : '',
      targetEmail: ADMIN_EMAIL,
      status: 'baru',
      read: false,
      emailDelivery: {
        attempted: false,
        delivered: false,
        method: 'realtime_queue',
        detail: 'Memproses notifikasi...',
      },
      createdAt,
    };

    const emailDelivery = await dispatchAdminEmail(draftInquiry);
    const savedInquiry: InquiryRecord = {
      ...draftInquiry,
      emailDelivery,
    };

    inquiries = [savedInquiry, ...inquiries].slice(0, 200);
    saveInquiries(inquiries);

    broadcast({
      type: 'inquiry:created',
      inquiry: savedInquiry,
    });

    res.status(201).json({
      inquiry: savedInquiry,
      adminEmail: ADMIN_EMAIL,
    });
  });

  app.patch('/api/inquiries/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body ?? {};
    const validStatuses: InquiryStatus[] = ['baru', 'diproses', 'direspon'];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Status tidak valid.' });
      return;
    }

    const targetIndex = inquiries.findIndex((item) => item.id === id);
    if (targetIndex === -1) {
      res.status(404).json({ error: 'Data pendaftaran tidak ditemukan.' });
      return;
    }

    const updated: InquiryRecord = {
      ...inquiries[targetIndex],
      status,
      read: true,
    };
    inquiries[targetIndex] = updated;
    saveInquiries(inquiries);

    broadcast({
      type: 'inquiry:updated',
      inquiry: updated,
    });

    res.json({ inquiry: updated });
  });

  app.post('/api/inquiries/mark-all-read', (_req, res) => {
    inquiries = inquiries.map((item) => ({ ...item, read: true }));
    saveInquiries(inquiries);
    broadcast({ type: 'notifications:read' });
    res.json({ ok: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { maxAge: '7d' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Harmonia server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
