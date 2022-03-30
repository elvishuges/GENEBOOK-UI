const routes = [
  {
    path: "/",
    component: () => import("src/layouts/GeneBookUi.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/messages", component: () => import("pages/Messages.vue") },
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
