import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

const ADULT_ITEMS = [
  { name: '君临国际', promo: '充1000 秒返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '胜天国际', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '新时代', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '星耀国际', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '逐梦国际', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '巅峰国际', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '征途国际', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '凯旋娱乐', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '超凡国际', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
  { name: '非凡娱乐', promo: '充1000 返688', icon: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png' },
];

function AdultCard({ name, promo, icon }: { name: string; promo: string; icon: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 6px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: '10px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)',
        }}
      >
        <img
          src={icon}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a1a', textAlign: 'center' }}>
        {name}
      </span>
      <span
        style={{
          fontSize: '10px',
          fontWeight: 700,
          background: 'linear-gradient(90deg, #e53e3e, #dd6b20, #d69e2e, #38a169, #3182ce, #805ad5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
        }}
      >
        ({promo})
      </span>
    </div>
  );
}

export default function AdultPage() {
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
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>成人影片</span>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ flex: 1, padding: '14px 12px 80px', overflow: 'auto' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '16px',
            padding: '14px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
            }}
          >
            {ADULT_ITEMS.map((item, idx) => (
              <AdultCard key={idx} name={item.name} promo={item.promo} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav currentPage="home" />
    </div>
  );
}
