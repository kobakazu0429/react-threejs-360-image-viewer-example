import * as React from "react";
import { Link } from "react-router-dom";
import { createRouter } from "../routes";
import { TopPage } from "../pages/TopPage";
import { RotationSquarePage } from "../pages/RotationSquarePage";
import { RotationCubePage } from "../pages/RotationCubePage";
import { SpherePage } from "../pages/SpherePage";
import { PlainThreePage } from "../pages/PlainThreePage";

const routes = [
  {
    exact: true,
    path: "/",
    component: TopPage,
  },
  {
    exact: true,
    path: "/rotation_square",
    component: RotationSquarePage,
  },
  {
    exact: true,
    path: "/rotation_cube",
    component: RotationCubePage,
  },
  {
    exact: true,
    path: "/sphere",
    component: SpherePage,
  },
  {
    exact: true,
    path: "/plain_three",
    component: PlainThreePage,
  },
];

const Router = createRouter({ routes });

export const App: React.VFC = () => {
  return (
    <>
      <div>
        <ol>
          {routes.map((r) => (
            <li key={`key-of-path-${r.path}`}>
              <Link to={r.path}>{r.component.name}</Link>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ height: "100vh" }}>{Router}</div>
    </>
  );
};
