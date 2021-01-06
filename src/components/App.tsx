import * as React from "react";
import { createRouter } from "../routes";
import { TopPage } from "../pages/TopPage";

const routes = [
  {
    exact: true,
    path: "/",
    component: TopPage,
  },
];

const Router = createRouter({ routes });

export const App: React.VFC = () => {
  return <>{Router}</>;
};
