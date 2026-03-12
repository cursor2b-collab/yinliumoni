import React, { useEffect, useState } from 'react';
import { supabase, type AdultItemRow } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const defaultForm = { name: '', icon_url: '', link: '' };

export default function AdultItemsEdit() {
  const [list, setList] = useState<AdultItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdultItemRow | null>(null);
  const [form, setForm] = useState(defaultForm);

  const load = async () => {
    const { data, error } = await supabase.from('app_adult_items').select('*').order('sort_order');
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

  const openEdit = (row: AdultItemRow) => {
    setEditing(row);
    setForm({ name: row.name, icon_url: row.icon_url, link: row.link ?? '' });
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      name: form.name,
      icon_url: form.icon_url,
      link: form.link || null,
      updated_at: new Date().toISOString(),
    };
    if (editing) {
      await supabase.from('app_adult_items').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('app_adult_items').insert({ ...payload, sort_order: list.length });
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await supabase.from('app_adult_items').delete().eq('id', id);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-page-title">成人影片</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openAdd}><Plus size={16} /> 添加</button>
      </div>
      <p className="admin-page-desc">首页「成人影片」Tab 下的每个按钮：可编辑文字、图片、点击打开的链接。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {list.map((row) => (
          <div key={row.id} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">{row.name}</h3>
              <div className="admin-actions">
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEdit(row)}><Pencil size={14} /> 编辑</button>
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => remove(row.id)} style={{ color: '#ff7875', borderColor: '#ff4d4f' }}><Trash2 size={14} /> 删除</button>
              </div>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={row.icon_url} alt={row.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.link || '未设置链接'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-dialog-content" style={{ maxWidth: 420 }}>
          <DialogHeader><DialogTitle>{editing ? '编辑按钮' : '添加按钮'}</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">文字</label>
              <input className="admin-form-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="君临国际" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">图片地址</label>
              <input className="admin-form-input" value={form.icon_url} onChange={(e) => setForm((f) => ({ ...f, icon_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">点击打开的链接（可选）</label>
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
