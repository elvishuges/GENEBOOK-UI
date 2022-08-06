export function add_end({ commit, dispatch }, payload) {
  commit("ADD_END", payload);
}

export function get_end({ commit, dispatch }, payload) {
  commit("GET_END", payload);
}

export function update_end({ commit, dispatch }, payload) {
  commit("UPDATE_END", payload);
}

export function clean_ends({ commit, dispatch }, payload) {
  commit("CLEAN_ENDS");
}
