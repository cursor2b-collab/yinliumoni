import React from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white flex flex-col"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        maxWidth: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      <div className="flex-shrink-0 z-50 bg-white border-b border-gray-200 px-4 h-12 flex items-center justify-between">
        <h1 className="text-gray-800 font-semibold">在线客服</h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 active:scale-95 transition-transform p-1"
          aria-label="返回"
        >
          <X size={24} />
        </button>
      </div>
      <iframe
        src="https://kefuim.vercel.app/"
        title="客服页面"
        style={{
          flex: 1,
          width: '100%',
          minHeight: 0,
          border: 'none',
          display: 'block',
        }}
      />
      <BottomNav currentPage="contact" />
    </div>
  );
}
