import React, { useEffect, useState } from 'react';
import { supabase, type GameRow } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const defaultForm = {
  name: '',
  description: '',
  icon_url: '',
  badge: '',
  badge_color: 'bg-cyan-400',
  link: '',
};

export default function GamesEdit() {
  const [list, setList] = useState<GameRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GameRow | null>(null);
  const [form, setForm] = useState(defaultForm);

  const load = async () => {
    const { data, error } = await supabase
      .from('app_games')
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

  const openEdit = (row: GameRow) => {
    setEditing(row);
    setForm({
      name: row.name,
      description: row.description,
      icon_url: row.icon_url,
      badge: row.badge ?? '',
      badge_color: row.badge_color ?? 'bg-cyan-400',
      link: row.link ?? '',
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      icon_url: form.icon_url,
      badge: form.badge || null,
      badge_color: form.badge_color || null,
      link: form.link || null,
      updated_at: new Date().toISOString(),
    };
    if (editing) {
      await supabase.from('app_games').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('app_games').insert({
        ...payload,
        sort_order: list.length,
      });
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await supabase.from('app_games').delete().eq('id', id);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-page-title">游戏卡片</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openAdd}><Plus size={16} /> 添加</button>
      </div>
      <p className="admin-page-desc">首页/游戏页展示的游戏项，可编辑名称、描述、图标和链接。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
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
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.description}</p>
                {row.badge && <span style={{ display: 'inline-block', marginTop: 4, fontSize: 12, padding: '2px 8px', borderRadius: 4, background: 'rgba(24, 144, 255, 0.2)', color: '#69c0ff' }}>{row.badge}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-dialog-content" style={{ maxWidth: 420 }}>
          <DialogHeader><DialogTitle>{editing ? '编辑游戏' : '添加游戏'}</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">名称</label>
              <input className="admin-form-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="君临国际" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">描述</label>
              <input className="admin-form-input" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="NG通下载链接国际" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">图标地址</label>
              <input className="admin-form-input" value={form.icon_url} onChange={(e) => setForm((f) => ({ ...f, icon_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label className="admin-form-label">角标（如 HOT/NEW）</label>
                <input className="admin-form-input" value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} placeholder="HOT" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">角标样式</label>
                <input className="admin-form-input" value={form.badge_color} onChange={(e) => setForm((f) => ({ ...f, badge_color: e.target.value }))} placeholder="bg-cyan-400" />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">链接（可选）</label>
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
