import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

const CompanyView = lazy(
  () =>
    import(
      /* webpackChunkName: "home" */ "./components/CompanyComponents/CompanyView"
    )
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: <CompanyView shipments={[]} />,
  },
  {
    path: "/company/:id",
    element: <CompanyView shipments={[]} />,
  },
];

export default routes;
