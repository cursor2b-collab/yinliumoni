import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const KEYS: { key: string; label: string }[] = [
  { key: 'my_sites_title', label: '「我的网站」栏标题' },
  { key: 'tools_header', label: '工具页顶部标题' },
  { key: 'home_header', label: '首页顶部标题' },
  { key: 'games_header', label: '游戏页顶部标题' },
  { key: 'share_header', label: '发布页顶部标题' },
];

export default function PageTitlesEdit() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from('app_page_settings').select('key, value');
    const map: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: unknown }) => {
      map[row.key] =
        typeof row.value === 'string'
          ? row.value.replace(/^"|"$/g, '')
          : String(row.value ?? '');
    });
    KEYS.forEach(({ key }) => {
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
      .upsert(
        { key, value: JSON.stringify(v), updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );
    setSaving(null);
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <h2 className="admin-page-title">页面标题</h2>
      <p className="admin-page-desc">各页面顶部或区块的标题文字。</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {KEYS.map(({ key, label }) => (
          <div key={key} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">{label}</h3>
              <button type="button" className="admin-btn admin-btn-primary" onClick={() => save(key)} disabled={saving === key}>
                {saving === key ? '保存中...' : '保存'}
              </button>
            </div>
            <div className="admin-card-body">
              <input
                className="admin-form-input"
                value={values[key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                placeholder={label}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
