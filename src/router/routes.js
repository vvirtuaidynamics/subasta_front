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
