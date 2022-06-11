const routes = [
  {
    path: "/index",
    component: () => import("src/layouts/GeneBookUi.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/messages",
        component: () => import("src/pages/messages/Messages.vue"),
      },
      {
        path: "/actors",
        component: () => import("src/pages/actors/Actors.vue"),
      },

      { path: "/items", component: () => import("src/pages/items/Items.vue") },
      {
        path: "/item/:index",
        name: "edit-item",
        component: () => import("src/pages/items/EditItem.vue"),
      },

      {
        path: "/locations",
        component: () => import("src/pages/locations/Locations.vue"),
      },
      {
        path: "/location/:index",
        name: "edit-location",
        component: () => import("src/pages/locations/EditLocation.vue"),
      },
      { path: "/ends", component: () => import("src/pages/ends/Ends.vue") },
      {
        path: "/ends/:index",
        name: "edit-end",
        component: () => import("src/pages/ends/EditEnd.vue"),
      },
      { path: "/files", component: () => import("pages/Files.vue") },
      {
        path: "/player",
        component: () => import("src/pages/player/Player.vue"),
      },
      {
        path: "/actions",
        component: () => import("src/pages/actions/Actions.vue"),
      },
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
