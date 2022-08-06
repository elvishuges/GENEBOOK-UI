export function set_messages({ commit, dispatch }, payload) {
  commit("SET_MESSAGES", { ...payload });
}

export function clean_messages({ commit, dispatch }, payload) {
  commit("CLEAN_MESSAGES", { ...payload });
}
