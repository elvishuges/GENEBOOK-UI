const routes = [
  {
    path: "/index",
    component: () => import("src/layouts/GeneBookUi.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/messages", component: () => import("pages/Messages.vue") },
      { path: "/actors", component: () => import("pages/Actors.vue") },

      { path: "/items", component: () => import("pages/Items.vue") },
      {
        path: "/item/:index",
        name: "edit-item",
        component: () => import("pages/EditItem.vue"),
      },

      { path: "/locations", component: () => import("pages/Locations.vue") },
      {
        path: "/location/:index",
        name: "edit-location",
        component: () => import("pages/EditLocation.vue"),
      },
      { path: "/ends", component: () => import("pages/Ends.vue") },
      {
        path: "/ends/:index",
        name: "edit-end",
        component: () => import("pages/EditEnd.vue"),
      },
      { path: "/files", component: () => import("pages/Files.vue") },
      { path: "/player", component: () => import("pages/Player.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("src/layouts/Welcome.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
