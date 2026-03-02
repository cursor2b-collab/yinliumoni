import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { supabase } from '../lib/supabase';
import './admin.css';

export default function AdminLogin() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(from, { replace: true });
    });
  }, [from, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: account.trim(),
        password,
      });
      if (err) {
        setError(err.message || '登录失败');
        setLoading(false);
        return;
      }
      if (data.session) {
        navigate(from, { replace: true });
      }
    } catch {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root" style={{ justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div className="admin-content-box" style={{ maxWidth: 400, width: '100%' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600, textAlign: 'center' }}>
          管理后台登录
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="account">
              账号（邮箱）
            </label>
            <input
              id="account"
              type="text"
              inputMode="email"
              autoComplete="username"
              className="admin-form-input"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="请输入邮箱"
              required
              disabled={loading}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="password">
              密码
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
              disabled={loading}
            />
          </div>
          {error && <div className="admin-alert-error" role="alert">{error}</div>}
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  );
}
