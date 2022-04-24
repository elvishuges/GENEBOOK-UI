export function add_item({ commit, dispatch }, payload) {
  commit("ADD_ITEM", payload);
}

export function delete_item({ commit, dispatch }, payload) {
  commit("DELETE_ITEM", payload);
}
