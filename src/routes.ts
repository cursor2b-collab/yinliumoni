import { createBrowserRouter } from "react-router";
import { UserLayout } from "./components/UserLayout";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import ToolsPage from "./pages/ToolsPage";
import SharePage from "./pages/SharePage";
import ContactPage from "./pages/ContactPage";
import CryptoPage from "./pages/CryptoPage";
import RequireAdmin from "./admin/RequireAdmin";
import AdminOutlet from "./admin/AdminOutlet";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import CarouselEdit from "./admin/CarouselEdit";
import MySitesEdit from "./admin/MySitesEdit";
import GamesEdit from "./admin/GamesEdit";
import ToolsEdit from "./admin/ToolsEdit";
import BottomNavEdit from "./admin/BottomNavEdit";
import PageTitlesEdit from "./admin/PageTitlesEdit";
import ActivitiesEdit from "./admin/ActivitiesEdit";
import AdultItemsEdit from "./admin/AdultItemsEdit";
import AnnouncementEdit from "./admin/AnnouncementEdit";
import HomeCopyEdit from "./admin/HomeCopyEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "games", Component: GamesPage },
      { path: "tools", Component: ToolsPage },
      { path: "share", Component: SharePage },
      { path: "contact", Component: ContactPage },
      { path: "crypto", Component: CryptoPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminOutlet,
    children: [
      { path: "login", Component: AdminLogin },
      {
        path: "",
        Component: RequireAdmin,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "carousel", Component: CarouselEdit },
          { path: "my-sites", Component: MySitesEdit },
          { path: "games", Component: GamesEdit },
          { path: "activities", Component: ActivitiesEdit },
          { path: "adult-items", Component: AdultItemsEdit },
          { path: "tools", Component: ToolsEdit },
          { path: "bottom-nav", Component: BottomNavEdit },
          { path: "page-titles", Component: PageTitlesEdit },
          { path: "announcement", Component: AnnouncementEdit },
          { path: "home-copy", Component: HomeCopyEdit },
        ],
      },
    ],
  },
]);