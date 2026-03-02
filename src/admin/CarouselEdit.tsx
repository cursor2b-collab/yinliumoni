import React, { useEffect, useState } from 'react';
import { supabase, type CarouselRow } from '../lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function CarouselEdit() {
  const [list, setList] = useState<CarouselRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CarouselRow | null>(null);
  const [form, setForm] = useState({ image_url: '', link: '', alt: 'Carousel' });

  const load = async () => {
    const { data, error } = await supabase
      .from('app_carousel')
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
    setForm({ image_url: '', link: '', alt: 'Carousel' });
    setOpen(true);
  };

  const openEdit = (row: CarouselRow) => {
    setEditing(row);
    setForm({
      image_url: row.image_url,
      link: row.link ?? '',
      alt: row.alt ?? 'Carousel',
    });
    setOpen(true);
  };

  const save = async () => {
    if (editing) {
      await supabase
        .from('app_carousel')
        .update({
          image_url: form.image_url,
          link: form.link || null,
          alt: form.alt || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editing.id);
    } else {
      await supabase.from('app_carousel').insert({
        image_url: form.image_url,
        link: form.link || null,
        alt: form.alt || null,
        sort_order: list.length,
      });
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('确定删除这条轮播图？')) return;
    await supabase.from('app_carousel').delete().eq('id', id);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-page-title">首页轮播图</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openAdd}>
          <Plus size={16} /> 添加
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {list.map((row) => (
          <div key={row.id} className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">图片</h3>
              <div className="admin-actions">
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEdit(row)}>
                  <Pencil size={14} /> 编辑
                </button>
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => remove(row.id)} style={{ color: '#ff7875', borderColor: '#ff4d4f' }}>
                  <Trash2 size={14} /> 删除
                </button>
              </div>
            </div>
            <div className="admin-card-body">
              <img
                src={row.image_url}
                alt={row.alt ?? 'Carousel'}
                style={{ height: 160, width: '100%', objectFit: 'contain', borderRadius: 8, background: 'rgba(255,255,255,0.04)' }}
              />
              {row.link && <p style={{ marginTop: 8, fontSize: 13, color: 'var(--admin-text-secondary)' }}>链接: {row.link}</p>}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-dialog-content">
          <DialogHeader>
            <DialogTitle>{editing ? '编辑轮播图' : '添加轮播图'}</DialogTitle>
          </DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">图片地址</label>
              <input
                className="admin-form-input"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">链接（可选）</label>
              <input
                className="admin-form-input"
                value={form.link}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Alt 文字</label>
              <input
                className="admin-form-input"
                value={form.alt}
                onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                placeholder="Carousel"
              />
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
