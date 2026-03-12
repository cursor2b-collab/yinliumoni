import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContentContext } from '../context/AppContentContext';
import { BottomNav } from '../components/BottomNav';

const GAME_TABS = [
  { id: 'normal', label: '热门游戏' },
  { id: 'adult', label: '成人影片' },
  { id: 'crypto', label: '虚拟币教程' },
  { id: 'vpn', label: 'VPN' },
];

const BADGE_BG_COLORS = [
  '#e74c3c', '#e67e22', '#27ae60', '#2980b9', '#8e44ad',
  '#16a085', '#c0392b', '#2471a3', '#1e8449', '#7d3c98',
];

const NG_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAclBMVEUAAABkeLFkeLFldbBkeLJkd7FkeLFkeLJkeLFkeLFkeLFkd7Fjd7Bsc7NkeLFkeLFkeLFkeLBkeLJkeLFleLJkeLFkeLFkeLJkebFjeLFkeLFjd7FkeLFkeLFldrRjebFjfLVkd7FkebJkebJlebFkeLFIT5GIAAAAJXRSTlMA4fkU2D4z7Oata0cZCPXEpW9eVCnbtJyUffDfzoojHQ/Ph2NOvYzgCQAAAOFJREFUKM990lduwzAURNER1XsvjmM77e5/i0GEJLIs0vPBn4MHPJKjXYo0DuVM5EHq1L4CApeeAPDsWDY8Yb/mnv10ebvT4cyOTxDc/jV/Yc+5gbP/q5lh422glnS7zBMcWFEFmfQKPHL50UkZJKWwcAf5OthbeTAE0ic0VtYCoQoY7RytaxkqOw8rVxg7t5DLh8TKfkxcqofJdbFWmn7O0cJFPUshmELD3KS2R/U9WLSmMwcu3iH5+/IwfuBrAmYr7TU41MF8ucsUxWPkqqI9l+esFiCQM72BVO6EQbLf6BvTLjcoxYWKzwAAAABJRU5ErkJggg==';

interface MiniGameCardProps {
  id: string;
  icon: string;
  name: string;
  description?: string;
  link?: string | null;
  colorIdx: number;
}

const MiniGameCard = ({ icon, name, link }: MiniGameCardProps) => {
  const cardContent = (
    <>
      <div style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(100,120,177,0.15)',
        background: '#f0f4ff',
      }}>
        <img
          src={icon}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <span className="app-title tjitem-gradient" style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%', minHeight: '1.25em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {name}
      </span>
    </>
  );

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    textDecoration: 'none',
    cursor: link ? 'pointer' : 'default',
  };

  if (link && link.trim()) {
    return (
      <a href={link.trim()} target="_blank" rel="noopener noreferrer" className="tjitem" style={wrapperStyle}>
        {cardContent}
      </a>
    );
  }
  return <div className="tjitem" style={wrapperStyle}>{cardContent}</div>;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading } = useAppContentContext();

  const carousel = data?.carousel?.[0] ?? null;
  const mySiteItems = data?.mySiteItems ?? [];
  const games = data?.games ?? [];
  const activities = data?.activities ?? [];
  const adultItems = data?.adultItems ?? [];

  if (loading && !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef0fa' }}>
        <p style={{ color: '#6478b1' }}>加载中...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#eef0fa', paddingBottom: '80px' }}>

      {/* ── 顶部图片（完整显示，无背景卡片）+ 两侧悬浮装饰 ── */}
      <div style={{ padding: '14px 14px 0', position: 'relative', minHeight: '100px' }}>
        <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
          <img
            src="https://ik.imagekit.io/avrxcbzni/pf_01.png"
            alt=""
            className="float-deco"
            style={{ width: '56px', height: 'auto', maxHeight: '80px', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <img
          src={(data?.pageSettings?.home_top_image_url ?? '').trim() || 'https://ik.imagekit.io/avrxcbzni/20260204_img_69824d158e725.jpg'}
          alt=""
          style={{ width: '100%', maxWidth: '240px', height: 'auto', maxHeight: '140px', display: 'block', objectFit: 'contain', margin: '0 auto', position: 'relative', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
          <img
            src="https://ik.imagekit.io/avrxcbzni/pf_02.png"
            alt=""
            className="float-deco"
            style={{ width: '56px', height: 'auto', maxHeight: '80px', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>

      {/* ── 顶部公告卡片 ── */}
      <div style={{ padding: '14px 14px 8px' }}>
        <div style={{
          background: '#5555FF',
          borderRadius: '14px',
          padding: '14px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 6px 24px rgba(91,115,232,0.35)',
        }}>
          {/* 装饰圆 */}
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '110px', height: '110px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

          <div style={{ position: 'relative' }}>
            {/* 公告文字 */}
            <div>
              <p style={{ fontSize: '12px', lineHeight: '1.65', color: 'rgba(255,255,255,0.95)', margin: 0, wordBreak: 'break-all' }}>
                {(data?.pageSettings?.announcement_card_content ?? '').trim() || '南宫旗下ww6.pw，24x.my，所有的平台充1000返688，达标请联系旺旺客服846983525，分享此网站给朋友截图找旺旺客服领18.88'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 通知滚动条 ── */}
      <div style={{ padding: '0 14px 10px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#dce5ff',
          borderRadius: '20px',
          padding: '5px 12px',
          gap: '8px',
          overflow: 'hidden',
        }}>
          <img
            src={NG_LOGO}
            alt=""
            style={{ width: '20px', height: '20px', flexShrink: 0 }}
          />
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div className="animate-marquee" style={{ whiteSpace: 'nowrap', color: '#6478b1', fontSize: '12px' }}>
              如果您的账号已注册成功，请联系在线客服获取最新优惠活动 19.88
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab 导航 ── */}
      <div style={{ padding: '0 14px 8px' }}>
        <div style={{
          display: 'flex',
          background: 'white',
          borderRadius: '10px',
          padding: '4px',
          gap: '2px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          {GAME_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => (tab.id === 'crypto' ? navigate('/crypto') : setActiveTab(idx))}
              style={{
                flex: 1,
                padding: '7px 2px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === idx
                  ? '#EFD0A4'
                  : 'transparent',
                color: activeTab === idx ? '#1a1a1a' : '#6478b1',
                fontSize: '12px',
                fontWeight: activeTab === idx ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 热门游戏：游戏网格 + 活动网格 ── */}
      {activeTab === 0 && (
        <>
          <div style={{ padding: '0 10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {games.map((game, idx) => (
                <MiniGameCard
                  key={game.id}
                  id={game.id}
                  icon={game.icon_url}
                  name={game.name}
                  description={game.description}
                  link={game.link}
                  colorIdx={idx}
                />
              ))}
            </div>
          </div>
          {activities.length > 0 && (
            <div style={{ padding: '10px 10px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {activities.map((act, idx) => (
                  <MiniGameCard
                    key={act.id}
                    id={act.id}
                    icon={act.icon_url}
                    name={act.title}
                    description={act.subtitle}
                    link={act.link}
                    colorIdx={idx + 4}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── 成人影片：与热门游戏相同网格样式，数据来自管理后台 ── */}
      {activeTab === 1 && (
        <div style={{ padding: '0 10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {adultItems.map((item, idx) => (
              <MiniGameCard
                key={item.id}
                id={item.id}
                icon={item.icon_url}
                name={item.name}
                link={item.link}
                colorIdx={idx}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── VPN 标签页内容 ── */}
      {activeTab === 3 && (
        <div style={{ padding: '24px 14px', textAlign: 'center', color: '#6478b1', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
          {(data?.pageSettings?.vpn_tab_content ?? '').trim() || 'VPN'}
        </div>
      )}

      {/* ── 底部联系信息 ── */}
      <div style={{
        padding: '16px 14px',
        textAlign: 'center',
        marginTop: '16px',
        borderTop: '1px solid #dce5ff',
      }}>
        <p style={{ fontSize: '12px', color: '#e74c3c', fontWeight: '700', marginBottom: '4px' }}>
          {data?.pageSettings?.footer_title?.trim() || '官方客服 · 精品游戏 · 全网最低！'}
        </p>
        {mySiteItems.map((item) => (
          <p key={item.id} style={{ fontSize: '11px', color: '#6478b1', lineHeight: '1.6' }}>
            前往网站：
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#5b73e8', fontWeight: '600' }}>
              {item.label}
            </a>
          </p>
        ))}
      </div>

      <BottomNav currentPage="home" />
    </div>
  );
};

export default HomePage;
