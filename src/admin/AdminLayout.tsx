import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Image,
  Link2,
  Gamepad2,
  Sparkles,
  Wrench,
  Navigation,
  Type,
  PanelLeftClose,
  PanelLeft,
  LogOut,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import './admin.css';

const menuItems = [
  { path: '/admin', end: true, label: '概览', icon: LayoutDashboard },
  { path: '/admin/carousel', label: '首页轮播图', icon: Image },
  { path: '/admin/my-sites', label: '我的网站', icon: Link2 },
  { path: '/admin/games', label: '游戏卡片', icon: Gamepad2 },
  { path: '/admin/activities', label: '特色活动', icon: Sparkles },
  { path: '/admin/tools', label: '工具页', icon: Wrench },
  { path: '/admin/bottom-nav', label: '底部导航', icon: Navigation },
  { path: '/admin/page-titles', label: '页面标题', icon: Type },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-root">
      <aside className={`admin-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="admin-sidebar-header">
          {sidebarOpen && <span className="admin-sidebar-title">内容管理</span>}
          <button
            type="button"
            className="admin-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? '收起菜单' : '展开菜单'}
          >
            <PanelLeftClose size={20} style={{ display: sidebarOpen ? 'block' : 'none' }} />
            <PanelLeft size={20} style={{ display: sidebarOpen ? 'none' : 'block' }} />
          </button>
        </div>
        <nav className="admin-sidebar-nav">
          {menuItems.map(({ path, end, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={!!end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>管理后台</h1>
          <button
            type="button"
            className="admin-btn admin-btn-default admin-btn-sm"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            退出登录
          </button>
        </header>
        <div className="admin-content-wrap">
          <div className="admin-content-box">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
