import React, { useEffect, useState } from 'react';
import { supabase, type BottomNavRow } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Pencil } from 'lucide-react';

export default function BottomNavEdit() {
  const [list, setList] = useState<BottomNavRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BottomNavRow | null>(null);
  const [form, setForm] = useState({
    label: '',
    icon_default: '',
    icon_active: '',
    route_path: '',
  });

  const load = async () => {
    const { data, error } = await supabase
      .from('app_bottom_nav')
      .select('*')
      .order('sort_order');
    if (!error) setList(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (row: BottomNavRow) => {
    setEditing(row);
    setForm({
      label: row.label,
      icon_default: row.icon_default,
      icon_active: row.icon_active,
      route_path: row.route_path,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    await supabase
      .from('app_bottom_nav')
      .update({
        label: form.label,
        icon_default: form.icon_default,
        icon_active: form.icon_active,
        route_path: form.route_path,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editing.id);
    setOpen(false);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <h2 className="admin-page-title">底部导航</h2>
      <p className="admin-page-desc">底部导航每一项的文字、默认图标、选中图标和跳转路径。客服项路径为 /contact。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {list.map((row) => (
          <div key={row.id} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">{row.label}</h3>
              <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEdit(row)}><Pencil size={14} /> 编辑</button>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <img src={row.icon_default} alt="默认" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                <img src={row.icon_active} alt="选中" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.route_path}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-dialog-content">
          <DialogHeader><DialogTitle>编辑导航项</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">文字</label>
              <input className="admin-form-input" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="首页" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">默认图标地址</label>
              <input className="admin-form-input" value={form.icon_default} onChange={(e) => setForm((f) => ({ ...f, icon_default: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">选中时图标地址</label>
              <input className="admin-form-input" value={form.icon_active} onChange={(e) => setForm((f) => ({ ...f, icon_active: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">跳转路径</label>
              <input className="admin-form-input" value={form.route_path} onChange={(e) => setForm((f) => ({ ...f, route_path: e.target.value }))} placeholder="/ 或 /contact" />
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
