const routes = [
  {
    path: "/",
    component: () => import("layouts/FullPageLayout.vue"),
    meta: {requiredAuth: false},
    children: [
      {
        name: "home",
        path: "",
        meta: {requiredAuth: false, breadcrumb: "Home"},
        component: () => import("pages/HomePage.vue"),
      },
      {
        name: "login",
        path: "/login",
        meta: {requiredAuth: false, breadcrumb: "Login"},
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        name: "register",
        path: "/register",
        meta: {requiredAuth: false, breadcrumb: "Register"},
        component: () => import("pages/auth/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "app",
        path: "",
        meta: {requiredAuth: true, breadcrumb: "App"},
        component: () => import("pages/dashboard/DashboardPage.vue"),
      },
      {
        name: "users",
        path: "users",
        meta: {requiredAuth: true, breadcrumb: "Users"},
        component: () => import("pages/users/ListPage.vue"),
      },
      {
        name: "groups",
        path: "groups",
        meta: {requiredAuth: true, breadcrumb: "Groups"},
        component: () => import("pages/groups/ListPage.vue"),
      },
      {
        name: "history",
        path: "history",
        meta: {requiredAuth: true, breadcrumb: "History"},
        component: () => import("pages/history/ListPage.vue"),
      },
      {
        name: "clients",
        path: "clients",
        meta: {requiredAuth: true, breadcrumb: "Clients"},
        component: () => import("pages/clients/ListPage.vue"),
      },
      {
        name: "carriers",
        path: "carriers",
        meta: {requiredAuth: true, breadcrumb: "Carriers"},
        component: () => import("pages/carriers/ListPage.vue"),
      },
      {
        name: "bearings",
        path: "bearings",
        meta: {requiredAuth: true, breadcrumb: "Bearings"},
        component: () => import("pages/bearings/ListPage.vue"),
      },
      {
        name: "validation_tasks",
        path: "validation_tasks",
        meta: {requiredAuth: true, breadcrumb: "ValidationTasks"},
        component: () => import("pages/validation_tasks/ListPage.vue"),
      },
    ],
  },

  {
    path: "/dev",
    meta: {requiredAuth: false, breadcrumb: "Development"},
    component: () => import("layouts/FullPageLayout.vue"),
    children: [
      {
        name: "icons",
        path: "icons",
        meta: {requiredAuth: false, breadcrumb: "Icons"},
        component: () => import("pages/dev/IconsPage.vue"),
      },
      {
        name: "debug",
        path: "debug",
        meta: {requiredAuth: false, breadcrumb: "Debug"},
        component: () => import("pages/dev/DebugPage.vue"),
      },
      {
        name: "components",
        path: "components",
        meta: {requiredAuth: false, breadcrumb: "Components"},
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
