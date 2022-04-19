export function create_actor({ commit, dispatch }, payload) {
  commit("CREATE_ACTOR", payload);
}

export function delete_actor({ commit, dispatch }, payload) {
  commit("DELETE_ACTOR", payload);
}
