import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

const IFRAME_SRC = 'https://24x.my/crypto';

export default function CryptoPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#eef0fa', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          background: 'white',
          borderBottom: '1px solid #eee',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            border: 'none',
            background: 'transparent',
            color: '#6478b1',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>虚拟币教程</span>
        <div style={{ width: 36 }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, paddingBottom: 60 }}>
        <iframe
          title="虚拟币教程"
          src={IFRAME_SRC}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 'calc(100vh - 108px)',
            border: 'none',
            display: 'block',
          }}
        />
      </div>
      <BottomNav currentPage="home" />
    </div>
  );
}
