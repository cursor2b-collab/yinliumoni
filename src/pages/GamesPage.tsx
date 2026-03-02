import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { useAppContentContext } from '../context/AppContentContext';
import { BottomNav } from '../components/BottomNav';

interface GameCardProps {
  name: string;
  description: string;
  icon: string;
  link?: string | null;
}

const GameCard = ({ name, description, icon, link }: GameCardProps) => {
  const content = (
    <>
      <img src="https://ik.imagekit.io/avrxcbzni/123m%20(3).png" alt="" className="rtop_img" />
      <div className="app_info_game">
        <img src={icon} alt={name} className="app_logo" />
        <span className="game_name">{name}</span>
      </div>
      <span className="gameText">{description}</span>
      <img src="https://ik.imagekit.io/avrxcbzni/123m%20(4).png" alt="进入" className="start_img_game" />
    </>
  );
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="game_item game_page" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {content}
      </a>
    );
  }
  return <div className="game_item game_page">{content}</div>;
};

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

const defaultGamesList = [
  { name: '君临国际', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1567225299676-9ebaa1d8b28f?auto=format&fit=crop&q=80&w=200' },
  { name: '新时代国际', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1572322180829-d313de469f34?auto=format&fit=crop&q=80&w=200' },
  { name: '星耀国际', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1670085734312-9e8362003c52?auto=format&fit=crop&q=80&w=200' },
  { name: '胜天国际', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1592602944193-0848995f4b5a?auto=format&fit=crop&q=80&w=200' },
  { name: '逐梦国际', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1719405731197-74fad3e7a7ea?auto=format&fit=crop&q=80&w=200' },
  { name: '凯乐欢乐', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1614907691085-f20a15126024?auto=format&fit=crop&q=80&w=200' },
  { name: '俄时捷', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1725109900649-fba28ac508fa?auto=format&fit=crop&q=80&w=200' },
  { name: '圣马娱乐', description: '这是一段描述，这是一段描述', icon: 'https://images.unsplash.com/photo-1633629544357-14223c9837d2?auto=format&fit=crop&q=80&w=200' },
];

const GamesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommend');
  const { data } = useAppContentContext();
  const rawGames = data?.games?.length
    ? data.games
    : defaultGamesList.map((g, i) => ({ id: String(i), name: g.name, description: g.description, icon_url: g.icon, sort_order: i }));
  const games = rawGames.map((g) => ({ name: g.name, description: g.description, icon: g.icon_url }));
  const gamesHeader = data?.pageSettings?.games_header ?? '游戏';

  const activities = (data?.activities?.length ? data.activities : []).map((a) => ({
    name: a.title,
    description: a.subtitle,
    icon: a.icon_url,
    link: a.link ?? undefined,
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="header">
        <div className="header_left" onClick={() => navigate('/')}>
          <ChevronLeft size={24} />
        </div>
        <h1 className="header_title">{gamesHeader}</h1>
        <div className="header_right"></div>
      </div>

      {/* Main Content */}
      <div className="body">
        <div className="gameContent">
          {/* Left Sidebar */}
          <div className="left_menu" style={{ marginTop: '16px' }}>
            <div 
              className={`gmenu_item ${activeTab === 'recommend' ? 'activel' : ''}`}
              onClick={() => setActiveTab('recommend')}
            >
              <img src="https://ik.imagekit.io/avrxcbzni/free_on.c34743c4%20(1).png" alt="" className="item_Img selectImg" />
              <img src="https://ik.imagekit.io/avrxcbzni/free_off.b3ac7d10.png" alt="" className="item_Img unSelectImg" />
              <div className="game-names">推荐游戏</div>
            </div>

            <div 
              className={`gmenu_item ${activeTab === 'activities' ? 'activel' : ''}`}
              onClick={() => setActiveTab('activities')}
            >
              <img src="https://ik.imagekit.io/avrxcbzni/free_on.c34743c4%20(1).png" alt="" className="item_Img selectImg" />
              <img src="https://ik.imagekit.io/avrxcbzni/free_off.b3ac7d10.png" alt="" className="item_Img unSelectImg" />
              <div className="game-names">特色活动</div>
            </div>
          </div>

          {/* Right Content - Games */}
          <div className={`right_gameList ${activeTab === 'recommend' ? 'active' : ''}`}>
            <div className="innerBox">
              {games.map((game, idx) => (
                <GameCard key={idx} {...game} />
              ))}
            </div>
          </div>

          {/* Right Content - Activities */}
          <div className={`right_gameList ${activeTab === 'activities' ? 'active' : ''}`}>
            <div className="innerBox">
              {activities.map((activity, idx) => (
                <GameCard key={activity.name + idx} {...activity} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentPage="games" />
    </div>
  );
};

export default GamesPage;