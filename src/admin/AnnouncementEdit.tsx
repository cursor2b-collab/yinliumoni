import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const TITLE_KEY = 'announcement_modal_title';
const CONTENT_KEY = 'announcement_modal_content';

const DEFAULT_TITLE = '重要公告';
const DEFAULT_CONTENT = '南宫旗下十年老平台,百万出款无忧,充满1000返688,达标加旺旺客服:846983525,分享此网站24x.my给朋友截图找旺旺客服领18.88';

export default function AnnouncementEdit() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('app_page_settings').select('key, value').in('key', [TITLE_KEY, CONTENT_KEY]);
    const map: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: unknown }) => {
      const v = row.value;
      map[row.key] = typeof v === 'string' ? v.replace(/^"|"$/g, '') : String(v ?? '');
    });
    setTitle(map[TITLE_KEY] ?? DEFAULT_TITLE);
    setContent(map[CONTENT_KEY] ?? '');
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    await Promise.all([
      supabase.from('app_page_settings').upsert(
        { key: TITLE_KEY, value: JSON.stringify(title), updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      ),
      supabase.from('app_page_settings').upsert(
        { key: CONTENT_KEY, value: JSON.stringify(content), updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      ),
    ]);
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <h2 className="admin-page-title">公告弹窗</h2>
      <p className="admin-page-desc">设置用户端首次进入时显示的「重要公告」弹窗标题与正文。留空正文则不显示弹窗。</p>
      <div className="admin-card" style={{ maxWidth: 560 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title">弹窗标题</h3>
        </div>
        <div className="admin-card-body">
          <input
            className="admin-form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例如：重要公告"
          />
        </div>
      </div>
      <div className="admin-card" style={{ maxWidth: 560, marginTop: 16 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title">弹窗正文</h3>
          <button type="button" className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
        <div className="admin-card-body">
          <textarea
            className="admin-form-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="输入公告内容，支持换行。留空则不显示弹窗。"
            rows={6}
            style={{ resize: 'vertical', minHeight: 120 }}
          />
          <p style={{ marginTop: 8, fontSize: 13, color: 'var(--admin-text-secondary)' }}>
            示例：南宫旗下十年老平台,百万出款无忧,充满1000返688,达标加旺旺客服:846983525,分享此网站24x.my给朋友截图找旺旺客服领18.88
          </p>
        </div>
      </div>
    </div>
  );
}
