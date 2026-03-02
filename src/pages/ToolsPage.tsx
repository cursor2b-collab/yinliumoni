import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { useAppContentContext } from '../context/AppContentContext';
import { BottomNav } from '../components/BottomNav';

interface ToolCardProps {
  icon: string;
  title: string;
  subtitle: string;
  bgColor: string;
  iconBg?: string;
}

const ToolCard = ({ icon, title, subtitle, bgColor, iconBg = 'bg-gradient-to-br from-yellow-400 to-orange-500' }: ToolCardProps) => (
  <div 
    className={`${bgColor} rounded-2xl p-4 flex items-center cursor-pointer active:scale-[0.98] transition-transform shadow-lg`}
  >
    <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
      <img src={icon} alt="" className="w-full h-full object-contain" />
    </div>
    <div className="flex-1 ml-3 flex items-center justify-between gap-2">
      <h3 className="text-white font-semibold text-base whitespace-nowrap">{title}</h3>
      <p className="text-white/60 text-xs text-right">{subtitle}</p>
    </div>
    <ChevronRight className="text-white/90 flex-shrink-0 ml-2" size={24} strokeWidth={2.5} />
  </div>
);

const ToolsPage = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppContentContext();
  const toolsHeader = data?.pageSettings?.tools_header ?? '工具';
  const toolSections = data?.toolSections ?? [];

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="header">
        <div className="header_left" onClick={() => navigate('/')}>
          <ChevronLeft size={24} />
        </div>
        <h1 className="header_title">{toolsHeader}</h1>
        <div className="header_right"></div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6">
        {toolSections.map((sec) => (
          <section key={sec.id} className="mb-6">
            <h2 className="text-gray-800 font-semibold text-base mb-3">{sec.title}</h2>
            {sec.cards?.map((card) => (
              <ToolCard
                key={card.id}
                icon={card.icon_url}
                title={card.title}
                subtitle={card.subtitle}
                bgColor={card.bg_color}
              />
            ))}
          </section>
        ))}
      </main>

      <BottomNav currentPage="tools" />
    </div>
  );
};

export default ToolsPage;