import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const FIELDS: { key: string; label: string; placeholder: string; multiline?: boolean }[] = [
  {
    key: 'home_top_image_url',
    label: '首页顶部主图地址',
    placeholder: 'https://ik.imagekit.io/avrxcbzni/20260204_img_69824d158e725.jpg',
  },
  {
    key: 'announcement_card_content',
    label: '首页公告卡片文案',
    placeholder: '南宫旗下ww6.pw，24x.my，所有的平台充1000返688…',
    multiline: true,
  },
  {
    key: 'vpn_tab_content',
    label: 'VPN 标签页内容',
    placeholder: 'VPN 说明或占位文字',
    multiline: true,
  },
  {
    key: 'footer_title',
    label: '底部联系区红色标题',
    placeholder: '官方客服 · 精品游戏 · 全网最低！',
  },
];

export default function HomeCopyEdit() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const keys = FIELDS.map((f) => f.key);
    const { data } = await supabase.from('app_page_settings').select('key, value').in('key', keys);
    const map: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: unknown }) => {
      const v = row.value;
      map[row.key] = typeof v === 'string' ? v.replace(/^"|"$/g, '') : String(v ?? '');
    });
    FIELDS.forEach(({ key }) => {
      if (!(key in map)) map[key] = '';
    });
    setValues(map);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (key: string) => {
    const v = values[key] ?? '';
    setSaving(key);
    await supabase
      .from('app_page_settings')
      .upsert({ key, value: JSON.stringify(v), updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setSaving(null);
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <h2 className="admin-page-title">首页文案</h2>
      <p className="admin-page-desc">设置首页蓝色公告卡片、VPN 标签页、底部联系区的展示文字。</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {FIELDS.map(({ key, label, placeholder, multiline }) => (
          <div key={key} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">{label}</h3>
              <button type="button" className="admin-btn admin-btn-primary" onClick={() => save(key)} disabled={saving === key}>
                {saving === key ? '保存中...' : '保存'}
              </button>
            </div>
            <div className="admin-card-body">
              {multiline ? (
                <textarea
                  className="admin-form-input"
                  value={values[key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  placeholder={placeholder}
                  rows={4}
                  style={{ resize: 'vertical', minHeight: 80 }}
                />
              ) : (
                <input
                  className="admin-form-input"
                  value={values[key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  placeholder={placeholder}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
