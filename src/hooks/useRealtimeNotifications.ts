import { useCallback, useEffect, useRef, useState } from 'react';

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

export interface LiveToast {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

export function useRealtimeNotifications() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [connected, setConnected] = useState(false);
  const [toasts, setToasts] = useState<LiveToast[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);

  const pushToast = useCallback((toast: LiveToast) => {
    setToasts((prev) => [toast, ...prev.filter((t) => t.id !== toast.id)].slice(0, 3));
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 6000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchInitial = useCallback(async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.inquiries)) {
          setInquiries(data.inquiries);
        }
      }
    } catch {
      // Initial HTTP fallback fails silently; WS reconnect will sync
    }
  }, []);

  useEffect(() => {
    fetchInitial();

    let isUnmounted = false;

    const connect = () => {
      if (isUnmounted) return;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        if (!isUnmounted) setConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'init' && Array.isArray(payload.inquiries)) {
            setInquiries(payload.inquiries);
          } else if (payload.type === 'inquiry:created' && payload.inquiry) {
            const incoming: InquiryRecord = payload.inquiry;
            setInquiries((prev) => {
              if (prev.some((item) => item.id === incoming.id)) return prev;
              return [incoming, ...prev];
            });
            pushToast({
              id: `toast-${incoming.id}`,
              title: `Pesan Baru · ${incoming.unitType}`,
              description: `${incoming.name} (${incoming.phone}) — notifikasi ke ${incoming.targetEmail}`,
              timestamp: incoming.createdAt,
            });
          } else if (payload.type === 'inquiry:updated' && payload.inquiry) {
            const updated: InquiryRecord = payload.inquiry;
            setInquiries((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item))
            );
            pushToast({
              id: `update-${updated.id}-${updated.status}`,
              title: `Status Diperbarui: ${updated.status.toUpperCase()}`,
              description: `Tiket ${updated.id} (${updated.name})`,
              timestamp: new Date().toISOString(),
            });
          } else if (payload.type === 'notifications:read') {
            setInquiries((prev) => prev.map((item) => ({ ...item, read: true })));
          }
        } catch {
          // Ignore malformed WS packets
        }
      };

      socket.onclose = () => {
        if (!isUnmounted) {
          setConnected(false);
          reconnectTimerRef.current = window.setTimeout(connect, 2500);
        }
      };

      socket.onerror = () => {
        socket.close();
      };
    };

    connect();

    return () => {
      isUnmounted = true;
      if (reconnectTimerRef.current) {
        window.clearTimeout(reconnectTimerRef.current);
      }
      wsRef.current?.close();
    };
  }, [fetchInitial, pushToast]);

  const updateStatus = useCallback(async (id: string, status: InquiryStatus) => {
    const res = await fetch(`/api/inquiries/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.inquiry) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === data.inquiry.id ? data.inquiry : item))
        );
      }
    }
  }, []);

  const markAllRead = useCallback(async () => {
    await fetch('/api/inquiries/mark-all-read', { method: 'POST' });
    setInquiries((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const unreadCount = inquiries.filter((item) => !item.read).length;

  return {
    inquiries,
    unreadCount,
    connected,
    toasts,
    dismissToast,
    updateStatus,
    markAllRead,
  };
}
