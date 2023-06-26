const routes = [
  { path: "/", component: () => import("src/layouts/MainLayout.vue") },
  { path: "/options", component: () => import("src/layouts/MainLayout.vue") },
  { path: "/popup", component: () => import("src/layouts/MainLayout.vue") },
  { path: "/devtools", component: () => import("src/layouts/MainLayout.vue") },
];

export default routes;
