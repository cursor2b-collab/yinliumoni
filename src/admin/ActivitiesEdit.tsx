import React, { useEffect, useState } from 'react';
import { supabase, type ActivityRow } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const defaultForm = {
  title: '',
  subtitle: '',
  icon_url: '',
  link: '',
};

export default function ActivitiesEdit() {
  const [list, setList] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ActivityRow | null>(null);
  const [form, setForm] = useState(defaultForm);

  const load = async () => {
    const { data, error } = await supabase
      .from('app_activities')
      .select('*')
      .order('sort_order');
    if (!error) setList(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setOpen(true);
  };

  const openEdit = (row: ActivityRow) => {
    setEditing(row);
    setForm({
      title: row.title,
      subtitle: row.subtitle,
      icon_url: row.icon_url,
      link: row.link ?? '',
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      title: form.title,
      subtitle: form.subtitle,
      icon_url: form.icon_url,
      link: form.link || null,
      updated_at: new Date().toISOString(),
    };
    if (editing) {
      await supabase.from('app_activities').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('app_activities').insert({
        ...payload,
        sort_order: list.length,
      });
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await supabase.from('app_activities').delete().eq('id', id);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-page-title">特色活动</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openAdd}><Plus size={16} /> 添加</button>
      </div>
      <p className="admin-page-desc">模拟器页「特色活动」选项卡下的卡片，可编辑头像、标题、简介和点击打开的链接。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {list.map((row) => (
          <div key={row.id} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">{row.title}</h3>
              <div className="admin-actions">
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEdit(row)}><Pencil size={14} /> 编辑</button>
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => remove(row.id)} style={{ color: '#ff7875', borderColor: '#ff4d4f' }}><Trash2 size={14} /> 删除</button>
              </div>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={row.icon_url} alt={row.title} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.subtitle}</p>
                {row.link && <p style={{ fontSize: 12, color: 'var(--admin-primary)', margin: '4px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>链接: {row.link}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-dialog-content" style={{ maxWidth: 420 }}>
          <DialogHeader><DialogTitle>{editing ? '编辑活动' : '添加活动'}</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">标题</label>
              <input className="admin-form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="PG模拟器" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">简介</label>
              <input className="admin-form-input" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} placeholder="打开即玩" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">头像/图标地址</label>
              <input className="admin-form-input" value={form.icon_url} onChange={(e) => setForm((f) => ({ ...f, icon_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">链接（可选，点击卡片打开的地址）</label>
              <input className="admin-form-input" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <button type="button" className="admin-btn admin-btn-default" onClick={() => setOpen(false)}>取消</button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={save}>保存</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
