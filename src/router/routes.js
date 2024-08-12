import { useAuthStore } from "src/stores/auth";
import { useQuasar } from "quasar";

const routes = [
  {
    path: "/",
    component: () => import("layouts/FullPageLayout.vue"),
    meta: { requiredAuth: false },
    children: [
      {
        name: "home",
        path: "",
        meta: { requiredAuth: false, breadcrumb: "Home" },
        component: () => import("pages/HomePage.vue"),
      },
      {
        name: "login",
        path: "/login",
        meta: { requiredAuth: false, breadcrumb: "Login" },
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        name: "register",
        path: "/register",
        meta: { requiredAuth: false, breadcrumb: "Register" },
        component: () => import("pages/auth/RegisterPage.vue"),
      },
    ],
  },
  {
    name: "crud",
    path: "/crud",
    meta: { requiresAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      //{ path: "", component: () => import("pages/IndexPage.vue") },
      {
        name: "users",
        path: "users",
        component: () => import("pages/users/ListPage.vue"),
      },
      {
        name: "groups",
        path: "groups",
        component: () => import("pages/groups/ListPage.vue"),
      },
      {
        name: "logs",
        path: "logs",
        component: () => import("pages/logs/ListPage.vue"),
      },
      {
        name: "clients",
        path: "clients",
        component: () => import("pages/clients/ListPage.vue"),
      },
      {
        name: "carriers",
        path: "carriers",
        component: () => import("pages/carriers/ListPage.vue"),
      },
      {
        name: "bearings",
        path: "bearings",
        component: () => import("pages/bearings/ListPage.vue"),
      },
      {
        name: "validation_tasks",
        path: "validation_tasks",
        component: () => import("pages/validation_tasks/ListPage.vue"),
      },
      {
        name: "products",
        path: "products",
        component: () => import("pages/products/ListPage.vue"),
      },
    ],
  },

  {
    path: "/dev",
    meta: { requiredAuth: false, breadcrumb: "Desarrollo" },
    component: () => import("layouts/FullPageLayout.vue"),
    children: [
      {
        name: "icons",
        path: "icons",
        meta: { requiredAuth: false, breadcrumb: "Icons" },
        component: () => import("pages/dev/IconsPage.vue"),
      },
      {
        name: "debug",
        path: "debug",
        meta: { requiredAuth: false, breadcrumb: "Debug" },
        component: () => import("pages/dev/DebugPage.vue"),
      },
      {
        name: "components",
        path: "components",
        meta: { requiredAuth: false, breadcrumb: "Components" },
        component: () => import("pages/dev/ComponentsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
