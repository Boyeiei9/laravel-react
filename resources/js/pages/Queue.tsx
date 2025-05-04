import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Queue() {
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(180); // 3 นาที = 180 วินาที

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (queueNumber !== null && status === 'waiting') {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus('expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [queueNumber, status]);

  const requestQueue = async () => {
    const response = await axios.post('/queue/request');
    setQueueNumber(response.data.queue_number);
    setStatus('waiting');
    setRemainingTime(180);
  };

  const cancelQueue = async () => {
    await axios.post('/queue/cancel');
    setStatus('cancelled');
  };

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'waiting':
        return <span className="badge bg-primary">รอเรียก</span>;
      case 'cancelled':
        return <span className="badge bg-danger">ยกเลิกแล้ว</span>;
      case 'expired':
        return <span className="badge bg-secondary">หมดเวลา</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Queue System" />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4">📋 ระบบจัดการคิว</h2>

          {!queueNumber ? (
            <div className="d-grid gap-2">
              <button className="btn btn-success btn-lg" onClick={requestQueue}>
                ✅ ขอรับคิว
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h4>หมายเลขคิวของคุณคือ</h4>
              <div className="display-4 fw-bold my-2 text-success">{queueNumber}</div>
              <div className="mb-3">สถานะ: {getStatusBadge(status)}</div>

              {status === 'waiting' && (
                <>
                  <p>
                    ⏳ เวลาที่เหลือ: <strong>{formatTime(remainingTime)}</strong>
                  </p>
                  <button className="btn btn-outline-danger mt-2" onClick={cancelQueue}>
                    ❌ ยกเลิกคิว
                  </button>
                </>
              )}

              {status !== 'waiting' && (
                <button className="btn btn-secondary mt-3" onClick={() => location.reload()}>
                  🔄 เริ่มใหม่
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
