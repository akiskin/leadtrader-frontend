import { lazy } from "react";

import publicRoutes from "./public";

const routes = [
  ...publicRoutes,

  {
    path: "/",
    exact: true,
    main: lazy(() => import("pages/Dashboard")),
    sidebar: () => (
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Additional links and info
      </div>
    ),
  },
  {
    path: "/sell/new",
    exact: true,
    main: lazy(() => import("pages/sell/NewSellCampaign")),
  },
  {
    path: "/sell",
    exact: true,
    main: lazy(() => import("pages/sell/SellCampaigns")),
  },
  {
    path: "/sell/:id",
    main: lazy(() => import("pages/sell/SellCampaign")),
  },
  {
    path: "/buy/new",
    exact: true,
    main: lazy(() => import("pages/buy/NewBuyCampaign")),
  },
  {
    path: "/buy",
    exact: true,
    main: lazy(() => import("pages/buy/BuyCampaigns")),
  },
  {
    path: "/buy/:id",
    main: lazy(() => import("pages/buy/BuyCampaign")),
  },
  {
    path: "/catalogs/products",
    exact: true,
    main: lazy(() => import("pages/Products")),
  },
];

export default routes;
