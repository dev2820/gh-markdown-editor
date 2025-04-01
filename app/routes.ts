import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
  ]),
] satisfies RouteConfig;
