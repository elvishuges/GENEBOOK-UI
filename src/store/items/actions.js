export function add_item({ commit, dispatch }, payload) {
  commit("ADD_ITEM", payload);
}

export function get_item({ commit, dispatch }, payload) {
  commit("GET_ITEM", payload);
}

export function update_item({ commit, dispatch }, payload) {
  commit("UPDATE_ITEM", payload);
}

export function delete_item({ commit, dispatch }, payload) {
  commit("DELETE_ITEM", payload);
}
