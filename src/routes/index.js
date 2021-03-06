import { lazy } from "react";

import publicRoutes from "./public";

const routes = [
  ...publicRoutes,

  {
    path: "/",
    exact: true,
    main: lazy(() => import("pages/Dashboard")),
    sidebar: () => <div></div>,
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
    path: "/sell/:id/edit",
    main: lazy(() => import("pages/sell/EditSellCampaign")),
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
    path: "/buy/:id/edit",
    main: lazy(() => import("pages/buy/EditBuyCampaign")),
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
  {
    path: "/finances",
    exact: true,
    main: lazy(() => import("pages/Finances")),
  },
];

export default routes;
