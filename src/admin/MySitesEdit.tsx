import React, { useEffect, useState } from 'react';
import { supabase, type MySiteItemRow } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function MySitesEdit() {
  const [list, setList] = useState<MySiteItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MySiteItemRow | null>(null);
  const [form, setForm] = useState({ label: '', image_url: '', link: '' });

  const load = async () => {
    const { data, error } = await supabase
      .from('app_my_site_items')
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
    setForm({ label: '', image_url: '', link: '' });
    setOpen(true);
  };

  const openEdit = (row: MySiteItemRow) => {
    setEditing(row);
    setForm({ label: row.label, image_url: row.image_url, link: row.link });
    setOpen(true);
  };

  const save = async () => {
    if (editing) {
      await supabase
        .from('app_my_site_items')
        .update({
          label: form.label,
          image_url: form.image_url,
          link: form.link,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editing.id);
    } else {
      await supabase.from('app_my_site_items').insert({
        label: form.label,
        image_url: form.image_url,
        link: form.link,
        sort_order: list.length,
      });
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await supabase.from('app_my_site_items').delete().eq('id', id);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-page-title">我的网站</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openAdd}><Plus size={16} /> 添加</button>
      </div>
      <p className="admin-page-desc">首页「我的网站」栏中的链接项，可编辑文字、图片和跳转链接。</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {list.map((row) => (
          <div key={row.id} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">{row.label}</h3>
              <div className="admin-actions">
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEdit(row)}><Pencil size={14} /> 编辑</button>
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => remove(row.id)} style={{ color: '#ff7875', borderColor: '#ff4d4f' }}><Trash2 size={14} /> 删除</button>
              </div>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src={row.image_url} alt={row.label} style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 500, margin: 0 }}>{row.label}</p>
                <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: '4px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.link}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-dialog-content">
          <DialogHeader><DialogTitle>{editing ? '编辑项' : '添加项'}</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">文字</label>
              <input className="admin-form-input" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="如：澳队体育" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">图片地址</label>
              <input className="admin-form-input" value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">链接</label>
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
