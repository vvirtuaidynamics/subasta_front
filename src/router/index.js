import { route } from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import { useAppStore } from "stores/app-store";
import { publicRoutes, debugRoutes } from "./../config/publicRoutes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  const $appStore = useAppStore();
  if (process.env.NODE_ENV !== "production") publicRoutes.push(...debugRoutes);

  const { isAuth } = $appStore;

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  /**
   * Maneja que el usuario este autenticado antes de acceder a las rutas distintas de login y home
   */
  Router.beforeEach((to, from, next) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("nav: ", { from: from, to: to });
    }
    if (from && to) {
      // $appStore.setRouteData({ from: from, to: to });
    }
    //&& !pbService.isAutenticated()
    if (!publicRoutes.includes(to.name)) next({ name: "login" });
    else next();
  });

  return Router;
});
