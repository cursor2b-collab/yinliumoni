import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContentContext } from '../context/AppContentContext';
import { BottomNav } from '../components/BottomNav';

const Header = ({ title = '首页' }: { title?: string }) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm px-4 h-12 flex items-center justify-center border-b border-gray-200">
    <h1 className="text-gray-800 font-semibold">{title}</h1>
  </header>
);

const CarouselIndicators = ({ total = 4, active = 0 }) => (
  <div className="flex justify-center gap-2 py-4">
    {Array.from({ length: total }).map((_, idx) => (
      <div 
        key={idx}
        className={`h-1.5 rounded-full transition-all ${
          idx === active ? 'w-8 bg-blue-500' : 'w-1.5 bg-gray-300'
        }`}
      />
    ))}
  </div>
);

const UserInfoBar = () => (
  <div className="px-4 py-3">
    <div className="flex overflow-hidden py-1 px-2 mx-2 bg-[#eef0fa] text-[#6478b1] justify-between items-center rounded-[20px]">
      <div className="flex-shrink-0 mr-2">
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAclBMVEUAAABkeLFkeLFldbBkeLJkd7FkeLFkeLJkeLFkeLFkeLFkd7Fjd7Bsc7NkeLFkeLFkeLFkeLBkeLJkeLFleLJkeLFkeLFkeLJkebFjeLFkeLFjd7FkeLFkeLFldrRjebFjfLVkd7FkebJkebJlebFkeLFIT5GIAAAAJXRSTlMA4fkU2D4z7Oata0cZCPXEpW9eVCnbtJyUffDfzoojHQ/Ph2NOvYzgCQAAAOFJREFUKM990lduwzAURNER1XsvjmM77e5/i0GEJLIs0vPBn4MHPJKjXYo0DuVM5EHq1L4CApeeAPDsWDY8Yb/mnv10ebvT4cyOTxDc/jV/Yc+5gbP/q5lh422glnS7zBMcWFEFmfQKPHL50UkZJKWwcAf5OthbeTAE0ic0VtYCoQoY7RytaxkqOw8rVxg7t5DLh8TKfkxcqofJdbFWmn7O0cJFPUshmELD3KS2R/U9WLSmMwcu3iH5+/IwfuBrAmYr7TU41MF8ucsUxWPkqqI9l+esFiCQM72BVO6EQbLf6BvTLjcoxYWKzwAAAABJRU5ErkJggg==" 
          alt="" 
          className="w-[24px] h-[24px]"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          充值600返388
        </div>
      </div>
    </div>
  </div>
);

const LanguageSelector = () => (
  <div className="px-4 py-3">
    <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-lg px-3 py-2">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs font-bold">A</span>
      </div>
      <span className="text-indigo-900 text-sm font-medium">蓝语</span>
    </div>
  </div>
);

const MySiteBar = ({ title, items }: { title: string; items: { label: string; image_url: string; link: string }[] }) => (
  <div className="px-6 py-3">
    <div className="flex items-center justify-between">
      <span className="text-gray-800 text-sm font-bold" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{title}</span>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
        >
          <img src={item.image_url} alt={item.label} className="h-8 object-contain" />
          <span className="text-xs text-gray-700 font-bold" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{item.label}</span>
        </a>
      ))}
    </div>
  </div>
);

interface GameCardProps {
  icon: string;
  name: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

const GameCard = ({ icon, name, description, badge, badgeColor = 'bg-cyan-400' }: GameCardProps) => (
  <div className="game_item">
    {badge && (
      <img 
        src="https://ik.imagekit.io/avrxcbzni/123m%20(3).png" 
        alt={badge}
        className="rtop_img"
      />
    )}
    <div className="app_info">
      <img src={icon} alt={name} className="app_logo" />
      <span className="game_name">{name}</span>
    </div>
    <span className="gameText">{description}</span>
    <span className="btn-enter-game">
      进入游戏
      <svg className="btn-enter-game__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
);

interface ActivityCardProps {
  title: string;
  subtitle: string;
  image: string;
  status: string;
  statusColor?: string;
}

const ActivityCard = ({ title, subtitle, image, status, statusColor = 'bg-green-500' }: ActivityCardProps) => (
  <div 
    className="activity_card" 
    style={{ 
      backgroundImage: `url(${image})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <div className="activity_content">
      <div className="activity_text">
        <h3 className="activity_title">{title}</h3>
        <p className="activity_subtitle">{subtitle}</p>
      </div>
    </div>
    <div className="activity_status">
      <span className={`status_dot ${statusColor}`}></span>
      <span className="status_text">{status}</span>
    </div>
  </div>
);

const HomePage = () => {
  const { data, loading } = useAppContentContext();

  const carousel = data?.carousel?.length ? data.carousel[0] : null;
  const mySiteTitle = data?.pageSettings?.my_sites_title ?? '我的网站';
  const mySiteItems = data?.mySiteItems ?? [];
  const games = data?.games ?? [];
  const headerTitle = data?.pageSettings?.home_header ?? '首页';

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title={headerTitle} />
      
      <main>
        {/* Carousel Area */}
        <div className="bg-white pt-6 pb-2">
          <div className="px-4">
            <div className="h-56 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden relative">
              {carousel ? (
                carousel.link ? (
                  <a href={carousel.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <img src={carousel.image_url} alt={carousel.alt ?? 'Carousel'} className="w-full h-full object-contain" />
                  </a>
                ) : (
                  <img src={carousel.image_url} alt={carousel.alt ?? 'Carousel'} className="w-full h-full object-contain" />
                )
              ) : (
                <img src="https://n25.ee/uploads/20251023/1a3f7138d86c4e632f98e0215d1d58e1.jpeg" alt="Carousel" className="w-full h-full object-contain" />
              )}
            </div>
          </div>
          <CarouselIndicators total={data?.carousel?.length || 1} active={0} />
        </div>

        <UserInfoBar />
        
        <MySiteBar title={mySiteTitle} items={mySiteItems} />
        
        {/* Game Recommendations */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img 
                src="https://ik.imagekit.io/avrxcbzni/123m%20(13).png" 
                alt="推荐游戏"
                className="h-6 object-contain"
              />
            </div>
            <button className="flex items-center">
              <img 
                src="https://ik.imagekit.io/avrxcbzni/123m%20(14).png" 
                alt="全部游戏"
                className="h-8 object-contain"
              />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {games.map((game) => (
              <GameCard
                key={game.id}
                icon={game.icon_url}
                name={game.name}
                description={game.description}
                badge={game.badge ?? undefined}
                badgeColor={game.badge_color ?? undefined}
              />
            ))}
          </div>
        </section>

        {/* Special Activities */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img 
                src="https://ik.imagekit.io/avrxcbzni/123m%20(12).png" 
                alt="特色活动"
                className="h-6 object-contain"
              />
            </div>
            <button className="flex items-center">
              <img 
                src="https://ik.imagekit.io/avrxcbzni/123m%20(14).png" 
                alt="全部活动"
                className="h-8 object-contain"
              />
            </button>
          </div>
          
          <div className="space-y-3">
            <ActivityCard 
              title="PG模拟器"
              subtitle="打开即玩"
              image="https://ik.imagekit.io/avrxcbzni/123m%20(2).png"
              status="已开启"
              statusColor="bg-green-500"
            />
          </div>
        </section>
      </main>
      
      <BottomNav currentPage="home" />
    </div>
  );
};

export default HomePage;