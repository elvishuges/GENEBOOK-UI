import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import messages from "./messages";
import actors from "./actors";
import files from "./files";
import player from "./player";
import items from "./items";
import locations from "./locations";
import ends from "./ends";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      messages,
      actors,
      files,
      player,
      items,
      locations,
      ends,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [createPersistedState()],
  });

  return Store;
});
