import React from 'react';
import { Link } from 'react-router';
import { Image, Link2, Gamepad2, Sparkles, Wrench, Navigation, Type } from 'lucide-react';

const cards = [
  { to: '/admin/carousel', label: '首页轮播图', icon: Image },
  { to: '/admin/my-sites', label: '我的网站', icon: Link2 },
  { to: '/admin/games', label: '游戏卡片', icon: Gamepad2 },
  { to: '/admin/activities', label: '特色活动', icon: Sparkles },
  { to: '/admin/tools', label: '工具页', icon: Wrench },
  { to: '/admin/bottom-nav', label: '底部导航', icon: Navigation },
  { to: '/admin/page-titles', label: '页面标题', icon: Type },
];

export default function AdminDashboard() {
  return (
    <>
      <h2 className="admin-page-title">概览</h2>
      <p className="admin-page-desc">选择下方模块编辑前端展示的链接、图片和文字。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {cards.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 20,
              background: 'var(--admin-card-bg)',
              border: '1px solid var(--admin-card-border)',
              borderRadius: 12,
              boxShadow: 'var(--admin-card-shadow)',
              textDecoration: 'none',
              color: 'var(--admin-text)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--admin-primary)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 144, 255, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(24, 144, 255, 0.1)',
                color: 'var(--admin-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={24} />
            </div>
            <span style={{ fontWeight: 500, fontSize: 15 }}>{label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
