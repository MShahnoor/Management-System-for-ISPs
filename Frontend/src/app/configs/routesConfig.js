import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import Dashboard from "../main/dashboard/Dashboard";
import Package from "../main/package/Package";
import Payment from "../main/payment/Payment";
import User from "../main/user/User";
import Area from "../main/area/Area";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";

const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Dashboard />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "payment",
    element: <Payment />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "user",
    element: <User />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "package",
    element: <Package />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "area",
    element: <Area />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
