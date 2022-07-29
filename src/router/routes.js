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

      // locations routes
      {
        path: "/locations",
        component: () => import("src/pages/locations/Locations.vue"),
      },
      {
        path: "/location/:index/details",
        name: "location-details",
        component: () => import("src/pages/locations/LocationDetails.vue"),
      },
      {
        path: "/location/:index/description",
        name: "location-descriptions",
        component: () => import("src/pages/locations/LocationDescriptions.vue"),
      },
      {
        path: "/location/:index/actions",
        name: "location-actions",
        component: () => import("src/pages/locations/LocationActions.vue"),
      },
      {
        path: "/location/:index/actions/:actionIndex",
        name: "location-action-details",
        component: () =>
          import("src/pages/locations/LocationActionDetails.vue"),
      },
      {
        path: "/location/:index/actions/:actionIndex/requiresToShow",
        name: "location-action-requiresToShow",
        component: () =>
          import("src/pages/locations/LocationActionRequiresToshow.vue"),
      },
      {
        path: "/location/:index/actions/:actionIndex/requiresToPerform",
        name: "location-action-requiresToPerform",
        component: () =>
          import("src/pages/locations/LocationActionRequiresToPerform.vue"),
      },
      {
        path: "/location/:index/actions/:actionIndex/sucess",
        name: "location-action-sucess",
        component: () => import("src/pages/locations/LocationActionSucess.vue"),
      },
      {
        path: "/location/:index/actions/:actionIndex/failure",
        name: "location-action-failure",
        component: () =>
          import("src/pages/locations/LocationActionFailure.vue"),
      },
      {
        path: "/location/:index/exits",
        name: "location-exits",
        component: () => import("src/pages/locations/LocationExits.vue"),
      },
      {
        path: "/location/:index/exits/:exitIndex",
        name: "location-exit-details",
        component: () => import("src/pages/locations/LocationExitDetails.vue"),
      },

      //ends routes

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
