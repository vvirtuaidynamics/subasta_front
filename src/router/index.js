import { route } from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "src/stores/auth";
import { Notify } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
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
  Router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      const authStore = useAuthStore(store);
      await authStore.ready;
      if (!authStore.authenticated) {
        Notify.create({
          position: "top-right",
          closeBtn: true,
          icon: "fa fa-times-circle",
          message:
            "Acceso denegado. Debe autenticarse para acceder a esta dirección",
          type: "negative",
          progress: true,
        });
        next({ name: "login", query: { next: to.fullPath } });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});
