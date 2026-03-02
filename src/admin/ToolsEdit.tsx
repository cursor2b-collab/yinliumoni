import React, { useEffect, useState } from 'react';
import { supabase, type ToolSectionRow, type ToolCardRow } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Pencil, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

const defaultCardForm = {
  icon_url: '',
  title: '',
  subtitle: '',
  bg_color: 'bg-gradient-to-br from-blue-600 to-blue-700',
  link: '',
};

export default function ToolsEdit() {
  const [sections, setSections] = useState<(ToolSectionRow & { cards?: ToolCardRow[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ToolSectionRow | null>(null);
  const [editingCard, setEditingCard] = useState<ToolCardRow | null>(null);
  const [sectionForm, setSectionForm] = useState({ title: '' });
  const [cardForm, setCardForm] = useState(defaultCardForm);
  const [cardSectionId, setCardSectionId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    const { data: secData } = await supabase
      .from('app_tool_sections')
      .select('*')
      .order('sort_order');
    const { data: cardData } = await supabase
      .from('app_tool_cards')
      .select('*')
      .order('sort_order');
    const secList = secData ?? [];
    const cards = cardData ?? [];
    setSections(
      secList.map((s) => ({
        ...s,
        cards: cards.filter((c) => c.section_id === s.id),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAddSection = () => {
    setEditingSection(null);
    setSectionForm({ title: '' });
    setSectionOpen(true);
  };

  const openEditSection = (row: ToolSectionRow) => {
    setEditingSection(row);
    setSectionForm({ title: row.title });
    setSectionOpen(true);
  };

  const saveSection = async () => {
    if (editingSection) {
      await supabase
        .from('app_tool_sections')
        .update({
          title: sectionForm.title,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingSection.id);
    } else {
      await supabase.from('app_tool_sections').insert({
        title: sectionForm.title,
        sort_order: sections.length,
      });
    }
    setSectionOpen(false);
    load();
  };

  const removeSection = async (id: string) => {
    if (!confirm('删除分类会同时删除其下所有卡片，确定？')) return;
    await supabase.from('app_tool_sections').delete().eq('id', id);
    load();
  };

  const openAddCard = (sectionId: string) => {
    setCardSectionId(sectionId);
    setEditingCard(null);
    setCardForm(defaultCardForm);
    setCardOpen(true);
  };

  const openEditCard = (row: ToolCardRow) => {
    setCardSectionId(row.section_id);
    setEditingCard(row);
    setCardForm({
      icon_url: row.icon_url,
      title: row.title,
      subtitle: row.subtitle,
      bg_color: row.bg_color,
      link: row.link ?? '',
    });
    setCardOpen(true);
  };

  const saveCard = async () => {
    const payload = {
      icon_url: cardForm.icon_url,
      title: cardForm.title,
      subtitle: cardForm.subtitle,
      bg_color: cardForm.bg_color,
      link: cardForm.link || null,
      updated_at: new Date().toISOString(),
    };
    const section = sections.find((s) => s.id === cardSectionId);
    const cardList = section?.cards ?? [];
    if (editingCard) {
      await supabase.from('app_tool_cards').update(payload).eq('id', editingCard.id);
    } else if (cardSectionId) {
      await supabase.from('app_tool_cards').insert({
        ...payload,
        section_id: cardSectionId,
        sort_order: cardList.length,
      });
    }
    setCardOpen(false);
    load();
  };

  const removeCard = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await supabase.from('app_tool_cards').delete().eq('id', id);
    load();
  };

  if (loading) return <p style={{ color: 'var(--admin-text-secondary)' }}>加载中...</p>;

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-page-title">工具页</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openAddSection}><Plus size={16} /> 添加分类</button>
      </div>
      <p className="admin-page-desc">工具页的区块标题及每个区块下的卡片，可编辑标题、副标题、图标和链接。</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sections.map((sec) => (
          <div key={sec.id} className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button type="button" onClick={() => setExpandedId(expandedId === sec.id ? null : sec.id)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                  {expandedId === sec.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                <h3 className="admin-card-title" style={{ margin: 0 }}>{sec.title}</h3>
              </div>
              <div className="admin-actions">
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openAddCard(sec.id)}><Plus size={14} /> 卡片</button>
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEditSection(sec)}><Pencil size={14} /> 编辑</button>
                <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => removeSection(sec.id)} style={{ color: '#ff7875', borderColor: '#ff4d4f' }}><Trash2 size={14} /> 删除</button>
              </div>
            </div>
            {expandedId === sec.id && sec.cards && sec.cards.length > 0 && (
              <div className="admin-card-body" style={{ paddingTop: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sec.cards.map((c) => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid var(--admin-card-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={c.icon_url} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                        <div>
                          <p style={{ fontWeight: 500, margin: 0 }}>{c.title}</p>
                          <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: '2px 0 0' }}>{c.subtitle}</p>
                        </div>
                      </div>
                      <div className="admin-actions">
                        <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => openEditCard(c)}><Pencil size={14} /> 编辑</button>
                        <button type="button" className="admin-btn admin-btn-default admin-btn-sm" onClick={() => removeCard(c.id)} style={{ color: '#ff7875', borderColor: '#ff4d4f' }}><Trash2 size={14} /> 删除</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={sectionOpen} onOpenChange={setSectionOpen}>
        <DialogContent className="admin-dialog-content">
          <DialogHeader><DialogTitle>{editingSection ? '编辑分类' : '添加分类'}</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">区块标题</label>
              <input className="admin-form-input" value={sectionForm.title} onChange={(e) => setSectionForm((f) => ({ ...f, title: e.target.value }))} placeholder="优惠活动" />
            </div>
          </div>
          <DialogFooter>
            <button type="button" className="admin-btn admin-btn-default" onClick={() => setSectionOpen(false)}>取消</button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={saveSection}>保存</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cardOpen} onOpenChange={setCardOpen}>
        <DialogContent className="admin-dialog-content" style={{ maxWidth: 420 }}>
          <DialogHeader><DialogTitle>{editingCard ? '编辑卡片' : '添加卡片'}</DialogTitle></DialogHeader>
          <div style={{ padding: '16px 0' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">图标地址</label>
              <input className="admin-form-input" value={cardForm.icon_url} onChange={(e) => setCardForm((f) => ({ ...f, icon_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">标题</label>
              <input className="admin-form-input" value={cardForm.title} onChange={(e) => setCardForm((f) => ({ ...f, title: e.target.value }))} placeholder="优惠活动大厅" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">副标题</label>
              <input className="admin-form-input" value={cardForm.subtitle} onChange={(e) => setCardForm((f) => ({ ...f, subtitle: e.target.value }))} placeholder="各平台优惠活动大厅" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">背景样式（Tailwind 类）</label>
              <input className="admin-form-input" value={cardForm.bg_color} onChange={(e) => setCardForm((f) => ({ ...f, bg_color: e.target.value }))} placeholder="bg-gradient-to-br from-blue-600 to-blue-700" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">链接（可选）</label>
              <input className="admin-form-input" value={cardForm.link} onChange={(e) => setCardForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <button type="button" className="admin-btn admin-btn-default" onClick={() => setCardOpen(false)}>取消</button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={saveCard}>保存</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
