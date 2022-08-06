export function add_action({ commit, dispatch }, payload) {
  commit("ADD_ACTION", payload);
}

export function clean_actions({ commit, dispatch }, payload) {
  commit("CLEAN_ACTIONS");
}
