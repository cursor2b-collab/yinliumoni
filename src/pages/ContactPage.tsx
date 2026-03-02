import React from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-12 flex items-center justify-between flex-shrink-0">
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
        className="flex-1 w-full min-h-0 border-0"
        title="客服页面"
      />
      <BottomNav currentPage="contact" />
    </div>
  );
}
