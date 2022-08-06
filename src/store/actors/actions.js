export function create_actor({ commit, dispatch }, payload) {
  commit("CREATE_ACTOR", payload);
}

export function clean_actors({ commit, dispatch }, payload) {
  commit("CLEAN_ACTORS", payload);
}
