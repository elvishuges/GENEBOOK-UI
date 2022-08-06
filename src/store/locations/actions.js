export function add_location({ commit, dispatch }, payload) {
  commit("ADD_LOCATION", payload);
}

export function update_location({ commit, dispatch }, payload) {
  commit("UPDATE_LOCATION", payload);
}

export function clean_locations({ commit, dispatch }, payload) {
  commit("CLEAN_LOCATIONS");
}
