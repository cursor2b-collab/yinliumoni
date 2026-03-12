import React, { useState, useEffect } from 'react';
import { useAppContentContext } from '../context/AppContentContext';

const SESSION_KEY = 'announcement_modal_closed';

export function AnnouncementModal() {
  const { data } = useAppContentContext();
  const [visible, setVisible] = useState(false);

  const title = data?.pageSettings?.announcement_modal_title ?? '重要公告';
  const content = (data?.pageSettings?.announcement_modal_content ?? '').trim();

  useEffect(() => {
    if (!content) {
      setVisible(false);
      return;
    }
    try {
      const closed = sessionStorage.getItem(SESSION_KEY);
      setVisible(closed !== '1');
    } catch {
      setVisible(true);
    }
  }, [content]);

  const close = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}
    setVisible(false);
  };

  if (!visible || !content) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        boxSizing: 'border-box',
      }}
    >
      {/* 遮罩 */}
      <div
        onClick={close}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />
      {/* 弹窗 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 360,
          maxHeight: '80vh',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 头部：标题 + 关闭 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 16px 12px',
            borderBottom: '1px solid #eee',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #5b73e8, #8656c9)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              i
            </span>
            <span
              id="announcement-modal-title"
              style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}
            >
              {title}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="关闭"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: 'none',
              background: '#f0f0f0',
              color: '#666',
              fontSize: 18,
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
        {/* 内容区 */}
        <div
          style={{
            padding: 16,
            overflow: 'auto',
            flex: 1,
            fontSize: 14,
            lineHeight: 1.7,
            color: '#333',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
