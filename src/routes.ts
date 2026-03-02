import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import ToolsPage from "./pages/ToolsPage";
import SharePage from "./pages/SharePage";
import ContactPage from "./pages/ContactPage";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/games",
    Component: GamesPage,
  },
  {
    path: "/tools",
    Component: ToolsPage,
  },
  {
    path: "/share",
    Component: SharePage,
  },
  {
    path: "/contact",
    Component: ContactPage,
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
          { path: "tools", Component: ToolsEdit },
          { path: "bottom-nav", Component: BottomNavEdit },
          { path: "page-titles", Component: PageTitlesEdit },
        ],
      },
    ],
  },
]);