import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type {
  CarouselRow,
  MySiteItemRow,
  GameRow,
  ToolSectionRow,
  ToolCardRow,
  BottomNavRow,
  ActivityRow,
  AdultItemRow,
} from '../lib/supabase';

export type AppContent = {
  carousel: CarouselRow[];
  mySiteItems: MySiteItemRow[];
  games: GameRow[];
  toolSections: (ToolSectionRow & { cards: ToolCardRow[] })[];
  activities: ActivityRow[];
  adultItems: AdultItemRow[];
  bottomNav: BottomNavRow[];
  pageSettings: Record<string, string>;
};

const defaultCarousel: CarouselRow[] = [
  {
    id: '',
    image_url: 'https://n25.ee/uploads/20251023/1a3f7138d86c4e632f98e0215d1d58e1.jpeg',
    link: null,
    alt: 'Carousel',
    sort_order: 0,
  },
];

const defaultMySiteItems: MySiteItemRow[] = [
  {
    id: '',
    label: '澳队体育',
    image_url: 'https://ik.imagekit.io/avrxcbzni/%E4%B8%8B%E8%BD%BD.png',
    link: 'https://www.adty71.com/access-restriction',
    sort_order: 0,
  },
];

const defaultGames: GameRow[] = [
  {
    id: '1',
    name: '君临国际',
    description: 'NG通下载链接国际',
    icon_url: 'https://images.unsplash.com/photo-1567225299676-9ebaa1d8b28f?auto=format&fit=crop&q=80&w=200',
    badge: 'HOT',
    badge_color: 'bg-cyan-400',
    link: null,
    sort_order: 0,
  },
  {
    id: '2',
    name: '新时代国际',
    description: '新时代国际首存100+赠88',
    icon_url: 'https://images.unsplash.com/photo-1572322180829-d313de469f34?auto=format&fit=crop&q=80&w=200',
    badge: 'NEW',
    badge_color: 'bg-blue-500',
    link: null,
    sort_order: 1,
  },
];

const defaultToolSections: (ToolSectionRow & { cards: ToolCardRow[] })[] = [
  {
    id: '1',
    title: '优惠活动',
    sort_order: 0,
    cards: [
      {
        id: '1',
        section_id: '1',
        icon_url: 'https://n25.ee/assets/yh.b7b6ece5.svg',
        title: '优惠活动大厅',
        subtitle: '各平台优惠活动大厅',
        bg_color: 'bg-gradient-to-br from-blue-600 to-blue-700',
        link: null,
        sort_order: 0,
      },
    ],
  },
  {
    id: '2',
    title: '黑科技工具',
    sort_order: 1,
    cards: [
      {
        id: '2',
        section_id: '2',
        icon_url: 'https://n25.ee/assets/hkjgz.a182ad46.svg',
        title: '黑科技工具大全',
        subtitle: '提供各式各样的黑科技工具',
        bg_color: 'bg-gradient-to-br from-blue-900 to-blue-950',
        link: null,
        sort_order: 0,
      },
    ],
  },
  {
    id: '3',
    title: '聊天软件',
    sort_order: 2,
    cards: [
      {
        id: '3',
        section_id: '3',
        icon_url: 'https://n25.ee/assets/jm.9aa3864a.svg',
        title: '聊天软件大全',
        subtitle: '各种聊天软件和安全浏览器',
        bg_color: 'bg-gradient-to-br from-purple-900 to-indigo-950',
        link: null,
        sort_order: 0,
      },
    ],
  },
];

// 仅保留：首页、模拟器、联系（联系在第三位）；游戏显示为「模拟器」
const defaultBottomNav: BottomNavRow[] = [
  { id: 'home', label: '首页', icon_default: 'https://ik.imagekit.io/avrxcbzni/3s.png', icon_active: 'https://ik.imagekit.io/avrxcbzni/2s.png', route_path: '/', sort_order: 0 },
  { id: 'games', label: '模拟器', icon_default: 'https://ik.imagekit.io/avrxcbzni/123m%20(8).png', icon_active: 'https://ik.imagekit.io/avrxcbzni/4s.png', route_path: '/games', sort_order: 1 },
  { id: 'contact', label: '客服', icon_default: 'https://ik.imagekit.io/avrxcbzni/123m%20(6).png', icon_active: 'https://ik.imagekit.io/avrxcbzni/1s.png', route_path: '/contact', sort_order: 2 },
];

const defaultActivities: ActivityRow[] = [
  { id: '1', title: 'PG模拟器', subtitle: '打开即玩', icon_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=200', link: null, sort_order: 0 },
  { id: '2', title: 'JDB模拟器', subtitle: '立即体验', icon_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200', link: null, sort_order: 1 },
  { id: '3', title: 'PP模拟器', subtitle: '免费试玩', icon_url: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?auto=format&fit=crop&q=80&w=200', link: null, sort_order: 2 },
  { id: '4', title: 'CQ9模拟器', subtitle: '立即试玩', icon_url: 'https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80&w=200', link: null, sort_order: 3 },
  { id: '5', title: 'FC模拟器', subtitle: '快速开始', icon_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200', link: null, sort_order: 4 },
  { id: '6', title: 'JL模拟器', subtitle: '限时开放', icon_url: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&q=80&w=200', link: null, sort_order: 5 },
];

const defaultAdultItems: AdultItemRow[] = [
  { id: '1', name: '君临国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 0 },
  { id: '2', name: '胜天国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 1 },
  { id: '3', name: '新时代', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 2 },
  { id: '4', name: '星耀国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 3 },
  { id: '5', name: '逐梦国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 4 },
  { id: '6', name: '巅峰国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 5 },
  { id: '7', name: '征途国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 6 },
  { id: '8', name: '凯旋娱乐', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 7 },
  { id: '9', name: '超凡国际', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 8 },
  { id: '10', name: '非凡娱乐', icon_url: 'https://ik.imagekit.io/avrxcbzni/123m%20(3).png', link: null, sort_order: 9 },
];

const defaultPageSettings: Record<string, string> = {
  my_sites_title: '我的网站',
  tools_header: '工具',
  home_header: '首页',
  games_header: '模拟器',
  share_header: '发布页',
  announcement_modal_title: '重要公告',
  announcement_modal_content: '',
  announcement_card_content: '南宫旗下ww6.pw，24x.my，所有的平台充1000返688，达标请联系旺旺客服846983525，分享此网站给朋友截图找旺旺客服领18.88',
  vpn_tab_content: 'VPN',
  footer_title: '官方客服 · 精品游戏 · 全网最低！',
  home_top_image_url: 'https://ik.imagekit.io/avrxcbzni/20260204_img_69824d158e725.jpg',
};

export function useAppContent(): { data: AppContent; loading: boolean } {
  const [data, setData] = useState<AppContent>({
    carousel: defaultCarousel,
    mySiteItems: defaultMySiteItems,
    games: defaultGames,
    toolSections: defaultToolSections,
    activities: defaultActivities,
    adultItems: defaultAdultItems,
    bottomNav: defaultBottomNav,
    pageSettings: defaultPageSettings,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    if (!url) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const [carouselRes, mySiteRes, gamesRes, sectionsRes, cardsRes, activitiesRes, adultItemsRes, navRes, settingsRes] =
          await Promise.all([
            supabase.from('app_carousel').select('*').order('sort_order'),
            supabase.from('app_my_site_items').select('*').order('sort_order'),
            supabase.from('app_games').select('*').order('sort_order'),
            supabase.from('app_tool_sections').select('*').order('sort_order'),
            supabase.from('app_tool_cards').select('*').order('sort_order'),
            supabase.from('app_activities').select('*').order('sort_order'),
            supabase.from('app_adult_items').select('*').order('sort_order'),
            supabase.from('app_bottom_nav').select('*').order('sort_order'),
            supabase.from('app_page_settings').select('key, value'),
          ]);

        if (cancelled) return;

        const carousel = (carouselRes.data ?? []).length ? carouselRes.data! : defaultCarousel;
        const mySiteItems = (mySiteRes.data ?? []).length ? mySiteRes.data! : defaultMySiteItems;
        const games = (gamesRes.data ?? []).length ? gamesRes.data! : defaultGames;
        const sections = sectionsRes.data ?? [];
        const cards = cardsRes.data ?? [];
        const rawBottomNav = (navRes.data ?? []).length ? navRes.data! : defaultBottomNav;
        // 只保留首页、模拟器、联系；顺序：首页(0)、模拟器(1)、联系(2)；游戏项显示为「模拟器」
        const orderIds = ['home', 'games', 'contact'];
        const bottomNav: BottomNavRow[] = orderIds
          .map((id) => rawBottomNav.find((r) => r.id === id))
          .filter((r): r is BottomNavRow => Boolean(r))
          .map((r, idx) => {
            const label = r.id === 'games' ? '模拟器' : r.id === 'contact' ? '客服' : r.label;
            const route_path = r.id === 'contact' ? '/contact' : r.route_path;
            return { ...r, label, route_path, sort_order: idx };
          });

        const toolSections = sections.map((s: ToolSectionRow) => ({
          ...s,
          cards: cards.filter((c: ToolCardRow) => c.section_id === s.id),
        }));

        const activities = (activitiesRes.data ?? []).length ? (activitiesRes.data as ActivityRow[]) : defaultActivities;
        const adultItems = (adultItemsRes.data ?? []).length ? (adultItemsRes.data as AdultItemRow[]) : defaultAdultItems;

        const pageSettings = { ...defaultPageSettings };
        (settingsRes.data ?? []).forEach((row: { key: string; value: unknown }) => {
          const v = row.value;
          pageSettings[row.key] =
            typeof v === 'string' ? v.replace(/^"|"$/g, '') : String(v ?? '');
        });

        setData({
          carousel,
          mySiteItems,
          games,
          toolSections: toolSections.length ? toolSections : defaultToolSections,
          activities,
          adultItems,
          bottomNav,
          pageSettings,
        });
      } catch {
        if (!cancelled) setLoading(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}
