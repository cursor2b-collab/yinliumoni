import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useAppContentContext } from '../context/AppContentContext';
import { BottomNav } from '../components/BottomNav';

interface SimulatorCardProps {
  icon: string;
  title: string;
  subtitle: string;
}

const SimulatorCard = ({ icon, title, subtitle }: SimulatorCardProps) => (
  <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
    <div className="w-14 h-14 flex-shrink-0">
      <img src={icon} alt={title} className="w-full h-full object-contain" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-1.5 mb-1">
        <h3 className="text-gray-900 font-medium text-base">{title}</h3>
        <CheckCircle2 className="text-blue-500" size={16} fill="currentColor" />
      </div>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  </div>
);

const SharePage = () => {
  const navigate = useNavigate();
  const { data } = useAppContentContext();
  const shareHeader = data?.pageSettings?.share_header ?? '发布页';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="header">
        <div className="header_left" onClick={() => navigate('/')}>
          <ChevronLeft size={24} />
        </div>
        <h1 className="header_title">{shareHeader}</h1>
        <div className="header_right"></div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* 截图保存防止迷路 Card */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-center text-gray-900 font-bold text-2xl mb-6">
            截图保存防止迷路
          </h2>
          
          <div className="space-y-2">
            <h3 className="text-center text-gray-900 font-semibold text-lg mb-3">
              我的网站
            </h3>
            
            <div className="text-center">
              <span className="text-gray-900 font-medium text-base">永久域名：</span>
              <span className="text-red-600 font-medium text-base">
                《兼职小妙招可以让本导航去抖音快手评论模拟器 有人找你就3-5块钱卖给他不需要成本一天也能赚几百不劳动手指就可以赚钱了充值满700还可以找站长返现288网址:n25.ee》
              </span>
            </div>
          </div>
        </div>

        {/* Simulator Cards */}
        <div className="space-y-3">
          <SimulatorCard 
            icon="https://via.placeholder.com/60/1a1a1a/ffffff?text=PG"
            title="PG模拟器"
            subtitle="打开即玩！无需加速器"
          />
          
          <SimulatorCard 
            icon="https://via.placeholder.com/60/1a1a1a/ffffff?text=PP"
            title="PP模拟器"
            subtitle="打开即玩！可卖免费"
          />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentPage="share" />
    </div>
  );
};

export default SharePage;
