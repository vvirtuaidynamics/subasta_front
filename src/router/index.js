import {route} from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import {useAppStore} from "stores/app-store";
import {publicRoutes, debugRoutes} from "src/config/publicRoutes";
import {storeToRefs} from "pinia";

export default route(function ({store}) {
  const $appStore = useAppStore();
  if (process.env.NODE_ENV !== "production") publicRoutes.push(...debugRoutes);

  const {isAuthenticated} = storeToRefs($appStore);

  const Router = createRouter({
    scrollBehavior: () => ({left: 0, top: 0}),
    routes,
    history: createWebHistory(),
  });

  Router.beforeEach((to, from, next) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("nav: ", {from: from, to: to});
    }
    if (from && to) {
      // $appStore.setRouteData({from: from, to: to});
    }

    if (!publicRoutes.includes(to.name) && !isAuthenticated.value) next({name: "login"});
    else next();
  });

  return Router;
});
